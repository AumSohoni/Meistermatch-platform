import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle, MapPin, Clock, Info, Phone, Mail, MessageCircle, MessageSquare } from 'lucide-react';
import { supabase } from '../supabase';

const CATEGORIES = [
    { id: 'Plumbing', icon: '🔧' },
    { id: 'Cleaning', icon: '🧹' },
    { id: 'Babysitting', icon: '👶' },
    { id: 'Electrical', icon: '⚡' },
    { id: 'Handyman', icon: '🔨' },
    { id: 'Other', icon: '✨' },
];

const URGENCIES = [
    { id: 'emergency', label: 'Emergency (1-2h)' },
    { id: 'today', label: 'Today' },
    { id: '2-3-days', label: 'Next 2-3 days' },
    { id: 'flexible', label: 'Flexible' },
];

export const JobRequestForm: React.FC<{
    onClose: () => void;
}> = ({ onClose }) => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [category, setCategory] = useState('');
    const [otherCategory, setOtherCategory] = useState('');

    const [description, setDescription] = useState('');
    const [preferredTime, setPreferredTime] = useState('');
    const [address, setAddress] = useState('');
    const [urgency, setUrgency] = useState('today');

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [telegram, setTelegram] = useState('');
    const [email, setEmail] = useState('');

    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleNext = () => {
        setError('');
        if (step === 1) {
            if (!category) {
                setError('Please select a category');
                return;
            }
            if (category === 'Other' && !otherCategory) {
                setError('Please specify the category');
                return;
            }
        } else if (step === 2) {
            if (!description || !address || !preferredTime) {
                setError('Please fill in description, preferred time and address');
                return;
            }
        } else if (step === 3) {
            if (!name) {
                setError('Please provide your name');
                return;
            }
            if (!whatsapp && !telegram) {
                setError('At least one instant contact method (WhatsApp or Telegram) is required.');
                return;
            }
        }
        setStep(s => s + 1);
    };

    const handleBack = () => {
        setError('');
        setStep(s => s - 1);
    };

    const geocodeAddress = async (addressStr: string) => {
        try {
            // Adding Latvia to improve accuracy for MVP
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressStr + ', Latvia')}`);
            const data = await res.json();
            if (data && data.length > 0) {
                return {
                    lat: parseFloat(data[0].lat),
                    lng: parseFloat(data[0].lon)
                };
            }
        } catch (e) {
            console.error('Geocoding error:', e);
        }
        // Fallback coordinates (Riga center)
        return { lat: 56.9496, lng: 24.1052 };
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError('');

        try {
            const coords = await geocodeAddress(address);

            const finalCategory = category === 'Other' ? `Other: ${otherCategory}` : category;

            const { error: dbError } = await supabase.from('jobs').insert({
                category: finalCategory,
                description,
                address,
                latitude: coords.lat,
                longitude: coords.lng,
                location: `POINT(${coords.lng} ${coords.lat})`,
                urgency,
                preferred_time: preferredTime,
                customer_name: name,
                customer_phone: phone,
                customer_whatsapp: whatsapp,
                customer_telegram: telegram,
                customer_email: email,
                status: 'open'
            });

            if (dbError) throw dbError;

            setIsSuccess(true);
        } catch (err: any) {
            console.error('Submission error:', err);
            setError(err.message || 'Failed to submit request. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {isSuccess ? 'Request Submitted' : 'Request a Meister'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-gray-500"
                    >
                        ✕
                    </button>
                </div>

                {/* Progress Bar */}
                {!isSuccess && (
                    <div className="h-1 w-full bg-gray-100 dark:bg-gray-800">
                        <motion.div
                            className="h-full bg-riga-blue"
                            initial={{ width: '0%' }}
                            animate={{ width: `${(step / 4) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                )}

                {/* Body */}
                <div className="p-6 overflow-y-auto flex-1">
                    <AnimatePresence mode="wait">
                        {isSuccess ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center py-12 text-center"
                            >
                                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Request Sent Successfully!</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
                                    We are notifying available professionals in your area. You will be contacted shortly via your preferred instant contact method.
                                </p>
                                <button
                                    onClick={onClose}
                                    className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-xl hover:opacity-90 transition-opacity"
                                >
                                    Done
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-6"
                            >
                                {/* Step 1: Category */}
                                {step === 1 && (
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">What type of service do you need?</h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            {CATEGORIES.map(c => (
                                                <button
                                                    key={c.id}
                                                    onClick={() => setCategory(c.id)}
                                                    className={`p-4 rounded-xl border-2 text-left flex items-center gap-3 transition-all ${category === c.id
                                                            ? 'border-riga-blue bg-blue-50/50 dark:bg-riga-blue/10 dark:text-white'
                                                            : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 text-gray-600 dark:text-gray-400'
                                                        }`}
                                                >
                                                    <span className="text-2xl">{c.icon}</span>
                                                    <span className="font-medium">{c.id}</span>
                                                </button>
                                            ))}
                                        </div>
                                        {category === 'Other' && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                                                <input
                                                    type="text"
                                                    placeholder="Please specify..."
                                                    value={otherCategory}
                                                    onChange={e => setOtherCategory(e.target.value)}
                                                    className="w-full mt-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent dark:text-white outline-none focus:border-riga-blue"
                                                />
                                            </motion.div>
                                        )}
                                    </div>
                                )}

                                {/* Step 2: Job Details */}
                                {step === 2 && (
                                    <div className="space-y-5">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Describe the job</h3>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Description *</label>
                                            <textarea
                                                value={description}
                                                onChange={e => setDescription(e.target.value)}
                                                placeholder="E.g., Leaking pipe under the kitchen sink..."
                                                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent dark:text-white outline-none focus:border-riga-blue min-h-[100px]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Date/Time *</label>
                                            <div className="relative">
                                                <Clock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                                <input
                                                    type="text"
                                                    value={preferredTime}
                                                    onChange={e => setPreferredTime(e.target.value)}
                                                    placeholder="e.g., Tomorrow afternoon, Asap"
                                                    className="w-full pl-10 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent dark:text-white outline-none focus:border-riga-blue"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address (Riga/Latvia) *</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                                <input
                                                    type="text"
                                                    value={address}
                                                    onChange={e => setAddress(e.target.value)}
                                                    placeholder="Street, City"
                                                    className="w-full pl-10 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent dark:text-white outline-none focus:border-riga-blue"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Urgency Level</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {URGENCIES.map(u => (
                                                    <button
                                                        key={u.id}
                                                        onClick={() => setUrgency(u.id)}
                                                        className={`p-2 rounded-lg border text-sm transition-all ${urgency === u.id
                                                                ? 'border-riga-blue bg-blue-50/50 dark:bg-riga-blue/10 text-riga-blue font-medium'
                                                                : 'border-gray-100 dark:border-gray-800 text-gray-500 hover:border-gray-200'
                                                            }`}
                                                    >
                                                        {u.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Contact Info */}
                                {step === 3 && (
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Your Contact Details</h3>
                                        <p className="text-sm text-gray-500">Professionals will use these details to contact you once they accept the job.</p>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name *</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent dark:text-white outline-none focus:border-riga-blue"
                                            />
                                        </div>

                                        <div className="bg-blue-50 dark:bg-riga-blue/5 p-4 rounded-xl border border-blue-100 dark:border-riga-blue/10 mb-2">
                                            <p className="text-xs font-semibold text-riga-blue mb-3 flex items-center gap-1">
                                                <Info size={14} /> At least ONE instant contact method is required *
                                            </p>
                                            <div className="space-y-3">
                                                <div className="relative">
                                                    <MessageCircle className="absolute left-3 top-3.5 text-[#25D366]" size={18} />
                                                    <input
                                                        type="text"
                                                        value={whatsapp}
                                                        onChange={e => setWhatsapp(e.target.value)}
                                                        placeholder="WhatsApp Number"
                                                        className="w-full pl-10 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white outline-none focus:border-[#25D366]"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <MessageSquare className="absolute left-3 top-3.5 text-[#0088cc]" size={18} />
                                                    <input
                                                        type="text"
                                                        value={telegram}
                                                        onChange={e => setTelegram(e.target.value)}
                                                        placeholder="Telegram Username (@username)"
                                                        className="w-full pl-10 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white outline-none focus:border-[#0088cc]"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 pt-2">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Phone Number (Optional)</label>
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-2.5 text-gray-400" size={14} />
                                                    <input
                                                        type="text"
                                                        value={phone}
                                                        onChange={e => setPhone(e.target.value)}
                                                        className="w-full pl-9 p-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent dark:text-white outline-none focus:border-gray-400"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Email (Optional)</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-2.5 text-gray-400" size={14} />
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={e => setEmail(e.target.value)}
                                                        className="w-full pl-9 p-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent dark:text-white outline-none focus:border-gray-400"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 4: Summary */}
                                {step === 4 && (
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Review Request</h3>

                                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-4">
                                            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
                                                <span className="text-gray-500 dark:text-gray-400">Category</span>
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {category === 'Other' ? otherCategory : category}
                                                </span>
                                            </div>
                                            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
                                                <span className="text-gray-500 dark:text-gray-400">Urgency</span>
                                                <span className="font-medium text-gray-900 dark:text-white capitalize">{urgency}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
                                                <span className="text-gray-500 dark:text-gray-400">Time & Location</span>
                                                <div className="text-right">
                                                    <span className="block font-medium text-gray-900 dark:text-white">{preferredTime}</span>
                                                    <span className="block text-sm text-gray-500">{address}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 dark:text-gray-400 block mb-1">Description</span>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white whitespace-pre-line">{description}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer actions */}
                {!isSuccess && (
                    <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex justify-between items-center">
                        {step > 1 ? (
                            <button
                                onClick={handleBack}
                                className="px-4 py-2 text-gray-500 hover:text-gray-900 dark:hover:text-white font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
                                disabled={isSubmitting}
                            >
                                <ArrowLeft size={18} /> Back
                            </button>
                        ) : <div />}

                        <div className="flex items-center gap-4">
                            {error && <span className="text-red-500 text-sm font-medium">{error}</span>}

                            {step < 4 ? (
                                <button
                                    onClick={handleNext}
                                    className="px-6 py-2 bg-riga-blue text-white font-medium rounded-xl hover:bg-blue-600 transition-colors flex items-center gap-2"
                                >
                                    Next <ArrowRight size={18} />
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="px-8 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Request'} {isSubmitting ? null : <CheckCircle size={18} />}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};
