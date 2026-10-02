import { Scenes, Markup } from 'telegraf';
import { MyContext } from '../types';
import { supabase } from '../../supabase';
import { dispatchJob } from '../services/matching';

export const CUSTOMER_FLOW_SCENE_ID = 'CUSTOMER_FLOW_SCENE';


export const customerFlowScene = new Scenes.WizardScene<MyContext>(
    CUSTOMER_FLOW_SCENE_ID,
    // Step 1: Service Type
    async (ctx) => {
        await ctx.reply('What service do you need?', Markup.inlineKeyboard([
            [Markup.button.callback('Plumbing', 'service_plumbing')],
            [Markup.button.callback('Electrical', 'service_electrical')],
            [Markup.button.callback('Handyman', 'service_handyman')],
            [Markup.button.callback('Heating', 'service_heating')],
            [Markup.button.callback('Other', 'service_other')]
        ]));
        return ctx.wizard.next();
    },
    // Step 2: Handle Service Type & Ask Urgency
    async (ctx) => {
        if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
            const data = ctx.callbackQuery.data;
            if (data.startsWith('service_')) {
                const service = data.split('_')[1];
                (ctx.scene.session as any).serviceType = service;
                await ctx.answerCbQuery();

                if (service === 'other') {
                    await ctx.reply('Please describe the service you need:');
                    return; // Stay on this step to wait for text input
                }

                await ctx.reply('How urgent is this?', Markup.inlineKeyboard([
                    [Markup.button.callback('Emergency (ASAP)', 'urgency_emergency')],
                    [Markup.button.callback('Today', 'urgency_today')],
                    [Markup.button.callback('Within 2–3 days', 'urgency_2-3-days')],
                    [Markup.button.callback('Flexible', 'urgency_flexible')]
                ]));
                return ctx.wizard.next();
            }
        }

        if (ctx.message && 'text' in ctx.message) {
            (ctx.scene.session as any).serviceType = ctx.message.text;
            await ctx.reply('How urgent is this?', Markup.inlineKeyboard([
                [Markup.button.callback('Emergency (ASAP)', 'urgency_emergency')],
                [Markup.button.callback('Today', 'urgency_today')],
                [Markup.button.callback('Within 2–3 days', 'urgency_2-3-days')],
                [Markup.button.callback('Flexible', 'urgency_flexible')]
            ]));
            return ctx.wizard.next();
        }

        return;
    },
    // Step 3: Handle Urgency & Ask Location
    async (ctx) => {
        if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
            const data = ctx.callbackQuery.data;
            if (data.startsWith('urgency_')) {
                (ctx.scene.session as any).urgency = data.split('_')[1];
                await ctx.answerCbQuery();
                await ctx.reply('Where are you located?', Markup.keyboard([
                    [Markup.button.locationRequest('Share Live Location')],
                    ['Enter Address Manually']
                ]).oneTime().resize());
                return ctx.wizard.next();
            }
        }
        return;
    },
    // Step 4: Handle Location & Ask Description
    async (ctx) => {
        if (ctx.message && 'location' in ctx.message) {
            (ctx.scene.session as any).location = {
                lat: ctx.message.location.latitude,
                lng: ctx.message.location.longitude
            };
            await ctx.reply('Location captured! Please briefly describe the issue.', Markup.removeKeyboard());
            return ctx.wizard.next();
        }

        if (ctx.message && 'text' in ctx.message && ctx.message.text === 'Enter Address Manually') {
            await ctx.reply('Please enter your address:');
            return;
        }

        if (ctx.message && 'text' in ctx.message) {
            (ctx.scene.session as any).location = { address: ctx.message.text };
            await ctx.reply('Address recorded! Please briefly describe the issue.', Markup.removeKeyboard());
            return ctx.wizard.next();
        }
        return;
    },
    // Step 5: Handle Description & Ask Photo
    async (ctx) => {
        if (ctx.message && 'text' in ctx.message) {
            (ctx.scene.session as any).description = ctx.message.text;
            await ctx.reply('Upload a photo to help the professional prepare (optional).', Markup.inlineKeyboard([
                [Markup.button.callback('Skip', 'skip_photo')]
            ]));
            return ctx.wizard.next();
        }
        return;
    },
    // Step 6: Handle Photo & Show Confirmation
    async (ctx) => {
        if (ctx.message && 'photo' in ctx.message) {
            (ctx.scene.session as any).photoId = ctx.message.photo[ctx.message.photo.length - 1].file_id;
        } else if (ctx.callbackQuery && 'data' in ctx.callbackQuery && ctx.callbackQuery.data === 'skip_photo') {
            await ctx.answerCbQuery();
        }

        const session = ctx.scene.session as any;
        const summary = `Summary ⚡\nService: ${session.serviceType}\nUrgency: ${session.urgency}\nLocation: ${session.location?.address || 'Map Pin'}\nDescription: ${session.description}`;

        await ctx.reply(summary, Markup.inlineKeyboard([
            [Markup.button.callback('Confirm & Find Worker', 'confirm_job')],
            [Markup.button.callback('Edit', 'edit_job')]
        ]));

        return ctx.wizard.next();
    },
    // Step 7: Handle Confirmation
    async (ctx) => {
        if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
            if (ctx.callbackQuery.data === 'confirm_job') {
                const session = ctx.scene.session as any;

                // Save job to Supabase
                const { data: job, error } = await supabase.from('jobs').insert({
                    customer_id: ctx.from.id,
                    category: session.serviceType,
                    urgency: session.urgency,
                    description: session.description,
                    latitude: session.location?.lat,
                    longitude: session.location?.lng,
                    address: session.location?.address,
                    photo_url: session.photoId, // Storing telegram file_id for now
                    status: 'open'
                }).select().single();

                if (error) {
                    console.error('Error creating job:', error);
                    await ctx.answerCbQuery('Error creating job. Please try again.');
                    return;
                }

                await ctx.answerCbQuery('Searching for workers...');
                await dispatchJob(ctx.telegram as any, job.id); // Passing telegram instance

                await ctx.reply('Request sent! We are looking for the closest verified workers.');
                return ctx.scene.leave();
            } else if (ctx.callbackQuery.data === 'edit_job') {
                await ctx.answerCbQuery();
                await ctx.reply('Let\'s start over.');
                return ctx.scene.enter(CUSTOMER_FLOW_SCENE_ID);
            }
        }
        return;
    }
);
