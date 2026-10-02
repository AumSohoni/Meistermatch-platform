import { Context, Scenes } from 'telegraf';

export interface MyWizardSession extends Scenes.WizardSessionData {
    userRole?: 'customer' | 'worker';
    serviceType?: string;
    urgency?: string;
    location?: { lat: number; lng: number; address?: string; city?: string };
    description?: string;
    photoId?: string;
    skills?: string[];
    fullName?: string;
    phone?: string;
    experience?: number;
}

export interface MySession extends Scenes.WizardSession<MyWizardSession> {
    userRole?: 'customer' | 'worker';
    waitingForAmount?: string;
}

export interface MyContext extends Context {
    session: MySession;
    scene: Scenes.SceneContextScene<MyContext, MyWizardSession>;
    wizard: Scenes.WizardContextWizard<MyContext>;
}
