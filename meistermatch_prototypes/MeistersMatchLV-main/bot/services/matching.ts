import { Telegraf, Markup } from 'telegraf';
import { supabase } from '../../supabase';
import { MyContext } from '../types';

export const dispatchJob = async (bot: Telegraf<MyContext>, jobId: string) => {
    // 1. Get job details
    const { data: job, error: jobError } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();

    if (jobError || !job) {
        console.error('Error fetching job for dispatch:', jobError);
        return;
    }

    // 2. Find closest workers
    const { data: workers, error: workersError } = await supabase.rpc('get_nearby_workers', {
        service_category: job.category,
        lat: job.latitude,
        lng: job.longitude,
        radius_meters: 10000 // 10km default
    });

    if (workersError) {
        console.error('Error finding workers:', workersError);
        return;
    }

    if (!workers || workers.length === 0) {
        if (job.customer_id) {
            await bot.telegram.sendMessage(job.customer_id, 'Sorry, no available workers found in your area. We will keep looking for a few minutes.');
        }
        return;
    }

    // 3. Notify top 5 workers
    for (const worker of workers) {
        const message = `New Job Request ⚡
Service: ${job.category}
Urgency: ${job.urgency}
Distance: ${(worker.distance / 1000).toFixed(1)} km
Description: ${job.description}

Accept within 60 seconds.`;

        await bot.telegram.sendMessage(worker.id, message, Markup.inlineKeyboard([
            [Markup.button.callback('Accept', `accept_job_${job.id}`)],
            [Markup.button.callback('Decline', `decline_job_${job.id}`)]
        ]));
    }

    // 4. Set auto-expire timer (5 minutes)
    setTimeout(async () => {
        const { data: currentJob } = await supabase.from('jobs').select('status, customer_id').eq('id', jobId).single();
        if (currentJob?.status === 'open') {
            await supabase.from('jobs').update({ status: 'expired' }).eq('id', jobId);

            // If it's a telegram customer, we notify them. Otherwise, web clients might check their phones or emails.
            if (currentJob.customer_id) {
                await bot.telegram.sendMessage(currentJob.customer_id, 'No worker accepted your request within 5 minutes. Please try again later or contact support.');
            }
        }
    }, 5 * 60 * 1000);
};

export const handleAcceptJob = async (bot: Telegraf<MyContext>, userId: number, jobId: string) => {
    // Use a transaction or atomic update to prevent double booking
    const { data, error } = await supabase
        .from('jobs')
        .update({
            worker_id: userId,
            status: 'accepted',
            updated_at: new Date().toISOString()
        })
        .eq('id', jobId)
        .eq('status', 'open') // Critical: Ensure job is still open
        .select()
        .single();

    if (error || !data) {
        return { success: false, message: 'Job already assigned to another professional.' };
    }

    const job = data;

    // Notify Customer
    const { data: worker } = await supabase.from('profiles').select('full_name, phone').eq('id', userId).single();

    if (job.customer_id) {
        await bot.telegram.sendMessage(job.customer_id, `Your professional is on the way! ⚡\nName: ${worker?.full_name}\nPhone: ${worker?.phone}`);
    }

    // Notify Worker with Customer Contact
    // Prefer guest job details if present
    const customerName = job.customer_name || 'Guest Client';
    const customerPhone = job.customer_phone || 'None provided';
    const whatsapp = job.customer_whatsapp ? `\nWhatsApp: ${job.customer_whatsapp}` : '';
    const telegram = job.customer_telegram ? `\nTelegram: ${job.customer_telegram}` : '';

    const workerMsg = `Job Accepted! ✅
Customer: ${customerName}
Phone: ${customerPhone}${whatsapp}${telegram}
Location: ${job.address || 'Map Pin'}
Description: ${job.description}

Click below when you arrive at the location.`;

    await bot.telegram.sendMessage(userId, workerMsg, Markup.inlineKeyboard([
        [Markup.button.callback('Arrived', `arrived_job_${job.id}`)],
        [Markup.button.callback('Job Completed', `completed_job_${job.id}`)],
        [Markup.button.callback('Cancel Job', `cancel_job_${job.id}`)]
    ]));

    return { success: true };
};
