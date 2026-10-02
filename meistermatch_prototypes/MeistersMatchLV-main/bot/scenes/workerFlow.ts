import { Scenes, Markup } from 'telegraf';
import { MyContext } from '../types';
import { supabase } from '../../supabase';

export const WORKER_FLOW_SCENE_ID = 'WORKER_FLOW_SCENE';


export const workerFlowScene = new Scenes.WizardScene<MyContext>(
    WORKER_FLOW_SCENE_ID,
    // Step 1: Skill Selection (Simplified for MVP, usually would be multi-select)
    async (ctx) => {
        (ctx.scene.session as any).skills = [];
        await ctx.reply('What services do you offer? (Select one for now, you can add more later)', Markup.inlineKeyboard([
            [Markup.button.callback('Plumbing', 'skill_plumbing')],
            [Markup.button.callback('Electrical', 'skill_electrical')],
            [Markup.button.callback('Handyman', 'skill_handyman')],
            [Markup.button.callback('Heating', 'skill_heating')]
        ]));
        return ctx.wizard.next();
    },
    // Step 2: Handle Skill & Ask Service Area
    async (ctx) => {
        if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
            const skill = ctx.callbackQuery.data.split('_')[1];
            (ctx.scene.session as any).skills.push(skill);
            await ctx.answerCbQuery();
            await ctx.reply('Share your service area (Share location or enter city):', Markup.keyboard([
                [Markup.button.locationRequest('Share My Location')],
                ['Enter City Manually']
            ]).oneTime().resize());
            return ctx.wizard.next();
        }
        return;
    },
    // Step 3: Handle Service Area & Ask Full Name
    async (ctx) => {
        if (ctx.message && 'location' in ctx.message) {
            (ctx.scene.session as any).location = {
                lat: ctx.message.location.latitude,
                lng: ctx.message.location.longitude
            };
            await ctx.reply('Got it! What is your full name?', Markup.removeKeyboard());
            return ctx.wizard.next();
        }

        if (ctx.message && 'text' in ctx.message && ctx.message.text === 'Enter City Manually') {
            await ctx.reply('Which city?');
            return;
        }

        if (ctx.message && 'text' in ctx.message) {
            (ctx.scene.session as any).location = { city: ctx.message.text };
            await ctx.reply('Great! What is your full name?', Markup.removeKeyboard());
            return ctx.wizard.next();
        }
        return;
    },
    // Step 4: Handle Full Name & Ask Phone
    async (ctx) => {
        if (ctx.message && 'text' in ctx.message) {
            (ctx.scene.session as any).fullName = ctx.message.text;
            await ctx.reply('What is your phone number?', Markup.keyboard([
                [Markup.button.contactRequest('Share Phone Number')]
            ]).oneTime().resize());
            return ctx.wizard.next();
        }
        return;
    },
    // Step 5: Handle Phone & Ask Experience
    async (ctx) => {
        if (ctx.message && 'contact' in ctx.message) {
            (ctx.scene.session as any).phone = ctx.message.contact.phone_number;
        } else if (ctx.message && 'text' in ctx.message) {
            (ctx.scene.session as any).phone = ctx.message.text;
        } else {
            return;
        }

        await ctx.reply('How many years of experience do you have in your field?', Markup.removeKeyboard());
        return ctx.wizard.next();
    },
    // Step 6: Handle Experience & Finalize
    async (ctx) => {
        if (ctx.message && 'text' in ctx.message) {
            const exp = parseInt(ctx.message.text);
            if (isNaN(exp)) {
                await ctx.reply('Please enter a number.');
                return;
            }
            (ctx.scene.session as any).experience = exp;

            const session = ctx.scene.session as any;

            // Update profile in DB
            const { error } = await supabase.from('profiles').update({
                full_name: session.fullName,
                phone: session.phone,
                experience_years: session.experience,
                latitude: session.location?.lat,
                longitude: session.location?.lng,
                is_verified: false // Admin review required
            }).eq('id', ctx.from.id);

            if (error) console.error('Error updating worker profile:', error);

            // Add skills
            for (const skill of session.skills) {
                await supabase.from('worker_skills').upsert({
                    worker_id: ctx.from.id,
                    skill: skill
                }, { onConflict: 'worker_id,skill' });
            }

            await ctx.reply('Profile submitted! Your profile is under review by our admin. We will notify you once you are verified.');
            return ctx.scene.leave();
        }
        return;
    }
);
