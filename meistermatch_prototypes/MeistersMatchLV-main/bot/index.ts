import { Telegraf, Scenes, session, Context, Markup } from 'telegraf';
import * as dotenv from 'dotenv';
import { supabase } from '../supabase';
import { customerFlowScene, CUSTOMER_FLOW_SCENE_ID } from './scenes/customerFlow';
import { workerFlowScene, WORKER_FLOW_SCENE_ID } from './scenes/workerFlow';
import { handleAcceptJob, dispatchJob } from './services/matching';

dotenv.config();

import { MyContext, MyWizardSession, MySession } from './types';

const token = process.env.BOT_TOKEN?.trim();
if (!token) {
    throw new Error('BOT_TOKEN must be provided!');
}
console.log('Token loaded, initializing Telegraf...', { hasToken: !!token });

const bot = new Telegraf<MyContext>(token);

// Stage
console.log('Setting up Scene Stage...');
const stage = new Scenes.Stage<MyContext>([customerFlowScene, workerFlowScene]);

// Middleware
console.log('Adding middleware...');
bot.use(session());
bot.use(stage.middleware());
console.log('Middleware added.');

// Extended Session for jobs
interface CustomSession extends MySession {
    waitingForAmount?: string; // JobID if waiting for amount
}

// Basic Start Command
bot.start(async (ctx) => {
    const { id, username, first_name, last_name } = ctx.from;
    const fullName = `${first_name} ${last_name || ''}`.trim();

    // Upsert user profile
    const { error } = await supabase
        .from('profiles')
        .upsert({
            id: id,
            username: username,
            full_name: fullName,
        }, { onConflict: 'id' });

    if (error) {
        console.error('Error upserting profile:', error);
    }

    await ctx.reply(`Welcome to MeisterMatch ⚡\nAre you looking to offer your skills as a Meister?\n*(Clients: Please use our website to submit a job request!)*`, Markup.inlineKeyboard([
        [Markup.button.callback('I am a worker', 'role_worker')]
    ]));
});

// Handle Role Selection
bot.action('role_customer', async (ctx) => {
    await ctx.answerCbQuery();
    await supabase.from('profiles').update({ role: 'customer' }).eq('id', ctx.from.id);
    ctx.session.userRole = 'customer';
    return ctx.scene.enter(CUSTOMER_FLOW_SCENE_ID);
});

bot.action('role_worker', async (ctx) => {
    await ctx.answerCbQuery();
    await supabase.from('profiles').update({ role: 'worker' }).eq('id', ctx.from.id);
    ctx.session.userRole = 'worker';
    return ctx.scene.enter(WORKER_FLOW_SCENE_ID);
});

// Check Status
bot.command('status', async (ctx) => {
    const { data: profile } = await supabase.from('profiles').select('availability_status, role').eq('id', ctx.from.id).single();

    if (profile?.role !== 'worker') {
        return ctx.reply('This command is only for workers.');
    }

    await ctx.reply(`Your current status is: ${profile.availability_status ? '✅ Available' : '❌ Unavailable'}\n\nUse /online to start receiving jobs.\nUse /offline to stop receiving jobs.`);
});

// Set Online
bot.command('online', async (ctx) => {
    await supabase.from('profiles').update({ availability_status: true }).eq('id', ctx.from.id);
    await ctx.reply('You are now ✅ Available to receive jobs!');
});

// Set Offline
bot.command('offline', async (ctx) => {
    await supabase.from('profiles').update({ availability_status: false }).eq('id', ctx.from.id);
    await ctx.reply('You are now ❌ Offline and will not receive jobs.');
});

// Handle Job Acceptance
bot.action(/^accept_job_(.+)$/, async (ctx) => {
    const jobId = ctx.match[1];
    await ctx.answerCbQuery();
    const result = await handleAcceptJob(bot, ctx.from.id, jobId);
    if (!result.success) {
        await ctx.reply(result.message);
    }
});

bot.action(/^decline_job_(.+)$/, async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.editMessageText('Job declined.');
});

bot.action(/^arrived_job_(.+)$/, async (ctx) => {
    const jobId = ctx.match[1];
    await ctx.answerCbQuery();
    await supabase.from('jobs').update({ status: 'arrived' }).eq('id', jobId);
    await ctx.reply('Status updated: Arrived at location. ✅');
});

bot.action(/^completed_job_(.+)$/, async (ctx) => {
    const jobId = ctx.match[1];
    await ctx.answerCbQuery();

    // Update status locally for worker interaction
    (ctx.session as CustomSession).waitingForAmount = jobId;

    await ctx.reply('Job completed! Please enter the total amount for the job (in EUR):');
});

// Handle Payment Amount Input
bot.on('text', async (ctx, next) => {
    const session = ctx.session as CustomSession;
    if (session.waitingForAmount && !isNaN(parseFloat(ctx.message.text))) {
        const jobId = session.waitingForAmount;
        const amount = parseFloat(ctx.message.text);
        session.waitingForAmount = undefined;

        const { data: job } = await supabase.from('jobs').update({
            amount: amount,
            status: 'completed'
        }).eq('id', jobId).select().single();

        if (job) {
            await ctx.reply(`Amount ${amount} EUR recorded. Sending payment instructions to the customer.`);

            // Notify Customer
            await bot.telegram.sendMessage(job.customer_id, `The professional has completed the job. Total amount: ${amount} EUR.\n\nWas the job completed successfully?`, Markup.inlineKeyboard([
                [Markup.button.callback('Yes ✅', `rating_yes_${jobId}`)],
                [Markup.button.callback('No ❌', `rating_no_${jobId}`)]
            ]));
        }
        return;
    }
    return next();
});

// Handle Rating Flow
bot.action(/^rating_yes_(.+)$/, async (ctx) => {
    const jobId = ctx.match[1];
    await ctx.answerCbQuery();
    await ctx.reply('Great! Please rate the professional (1-5 stars):', Markup.inlineKeyboard([
        ['1', '2', '3', '4', '5'].map(star => Markup.button.callback(star + " ⭐", `rate_${jobId}_${star}`))
    ]));
});

bot.action(/^rate_(.+)_(.+)$/, async (ctx) => {
    const jobId = ctx.match[1];
    const star = parseInt(ctx.match[2]);
    await ctx.answerCbQuery();

    const { data: job } = await supabase.from('jobs').select('worker_id, customer_id').eq('id', jobId).single();

    if (job) {
        await supabase.from('ratings').insert({
            job_id: jobId,
            customer_id: job.customer_id,
            worker_id: job.worker_id,
            rating: star
        });
    }

    await ctx.editMessageText(`Thank you for your rating of ${star} ⭐!`);
});

bot.action(/^rating_no_(.+)$/, async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply('We are sorry to hear that. Our admin will contact you shortly to resolve this.');
});

// Admin Panel Logic
const isAdmin = (ctx: MyContext) => {
    const adminIds = (process.env.ADMIN_IDS || '').split(',').map(id => id.trim());
    return adminIds.includes(ctx.from?.id.toString() || '');
};

bot.command('admin', async (ctx) => {
    if (!isAdmin(ctx)) return ctx.reply('Unauthorized.');

    const { data: pendingWorkers } = await supabase.from('profiles').select('*').eq('role', 'worker').eq('is_verified', false);
    const { data: activeJobs } = await supabase.from('jobs').select('*').eq('status', 'open');

    let msg = `Admin Panel 🛠️\n\nPending Workers: ${pendingWorkers?.length || 0}\nActive Jobs: ${activeJobs?.length || 0}\n\n`;
    msg += `Use /approve <id> to verify a worker.\nUse /broadcast <msg> to message all workers.`;

    await ctx.reply(msg);
});

bot.command('approve', async (ctx) => {
    if (!isAdmin(ctx)) return ctx.reply('Unauthorized.');

    const workerId = ctx.payload;
    if (!workerId) return ctx.reply('Please provide a worker ID.');

    const { error } = await supabase.from('profiles').update({ is_verified: true, availability_status: true }).eq('id', workerId);

    if (error) return ctx.reply('Error approving worker.');

    await ctx.reply(`Worker ${workerId} approved! ✅`);
    await bot.telegram.sendMessage(workerId, 'Congratulations! Your profile has been verified and you are now online! You will notify immediately when jobs come in. Use /offline to stop receiving jobs, and /online to start again.');
});

bot.command('broadcast', async (ctx) => {
    if (!isAdmin(ctx)) return ctx.reply('Unauthorized.');

    const message = ctx.payload;
    if (!message) return ctx.reply('Please provide a message.');

    const { data: workers } = await supabase.from('profiles').select('id').eq('role', 'worker');

    if (workers) {
        for (const worker of workers) {
            await bot.telegram.sendMessage(worker.id, `Broadcast from Admin 📢\n\n${message}`);
        }
        await ctx.reply(`Message sent to ${workers.length} workers.`);
    }
});

console.log('Starting bot.launch()...');
console.log('MeisterMatchBot is now running (polling active)!');
bot.launch().catch((err) => {
    console.error('Failed to launch bot:', err);
});

console.log('Setting up Supabase Realtime Listener...');
supabase
    .channel('custom-insert-channel')
    .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'jobs' },
        (payload) => {
            console.log('Realtime Event received! New job:', payload.new.id);
            dispatchJob(bot, payload.new.id);
        }
    )
    .subscribe((status, err) => {
        console.log('Supabase Realtime subscription status:', status, err);
    });

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
