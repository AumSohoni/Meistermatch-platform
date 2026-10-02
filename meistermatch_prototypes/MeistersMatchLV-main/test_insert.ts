import { supabase } from './supabase';

async function testInsert() {
    console.log('Inserting test job...');
    const { data, error } = await supabase.from('jobs').insert({
        category: 'Test Category',
        urgency: 'flexible',
        description: 'Test Job for debugging Realtime',
        status: 'open'
    }).select().single();

    if (error) {
        console.error('Insert error:', error);
    } else {
        console.log('Inserted job ID:', data.id);
    }
}

testInsert();
