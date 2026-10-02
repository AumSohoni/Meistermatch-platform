import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { FileText, Users, Briefcase, Download, CheckCircle, XCircle } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
    const [jobs, setJobs] = useState<any[]>([]);
    const [workers, setWorkers] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'jobs' | 'workers'>('jobs');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        if (activeTab === 'jobs') {
            const { data } = await supabase.from('jobs').select('*').order('created_at', { ascending: false });
            setJobs(data || []);
        } else {
            const { data } = await supabase.from('profiles').select('*').eq('role', 'worker').order('created_at', { ascending: false });
            setWorkers(data || []);
        }
        setLoading(false);
    };

    const toggleWorkerApproval = async (id: number, currentStatus: boolean) => {
        const updates: any = { is_verified: !currentStatus };
        if (!currentStatus) {
            // Also turn them on automatically when approved
            updates.availability_status = true;
        }

        const { error } = await supabase.from('profiles').update(updates).eq('id', id);
        if (!error) {
            setWorkers(workers.map(w => w.id === id ? { ...w, ...updates } : w));
        }
    };

    const exportJobsCSV = () => {
        const headers = ['ID', 'Category', 'Urgency', 'Client', 'Phone', 'Status', 'Worker ID', 'Created At'];
        const rows = jobs.map(j => [
            j.id, j.category, j.urgency, j.customer_name || '-', j.customer_phone || '-', j.status, j.worker_id || '-', new Date(j.created_at).toLocaleString()
        ]);
        const csvContent = "data:text/csv;charset=utf-8,"
            + [headers.join(','), ...rows.map(e => e.join(','))].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "jobs_export.csv");
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 px-4 pb-12">
            <div className="container mx-auto max-w-6xl">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                    <Briefcase className="text-riga-blue" />
                    Admin Dashboard
                </h1>

                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setActiveTab('jobs')}
                        className={`px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 ${activeTab === 'jobs' ? 'bg-riga-blue text-white shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    >
                        <FileText size={18} /> Jobs
                    </button>
                    <button
                        onClick={() => setActiveTab('workers')}
                        className={`px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 ${activeTab === 'workers' ? 'bg-riga-blue text-white shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    >
                        <Users size={18} /> Workers
                    </button>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    {activeTab === 'jobs' && (
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold dark:text-white">Recent Job Requests</h2>
                                <button onClick={exportJobsCSV} className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                                    <Download size={16} /> Export CSV
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400">
                                        <tr>
                                            <th className="p-4">Category</th>
                                            <th className="p-4">Client</th>
                                            <th className="p-4">Status</th>
                                            <th className="p-4">Urgency</th>
                                            <th className="p-4">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                        {loading ? (
                                            <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading...</td></tr>
                                        ) : jobs.length === 0 ? (
                                            <tr><td colSpan={5} className="p-8 text-center text-gray-500">No jobs found.</td></tr>
                                        ) : jobs.map(job => (
                                            <tr key={job.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20 text-gray-900 dark:text-gray-200">
                                                <td className="p-4 font-medium">{job.category}</td>
                                                <td className="p-4">{job.customer_name || 'Guest'}</td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${job.status === 'open' ? 'bg-blue-100 text-blue-700' :
                                                        job.status === 'accepted' ? 'bg-yellow-100 text-yellow-700' :
                                                            job.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                                'bg-gray-100 text-gray-700'
                                                        }`}>
                                                        {job.status.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="p-4">{job.urgency}</td>
                                                <td className="p-4 text-sm text-gray-500">{new Date(job.created_at).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'workers' && (
                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-4 dark:text-white">Registered Meisters</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400">
                                        <tr>
                                            <th className="p-4">Name</th>
                                            <th className="p-4">Username</th>
                                            <th className="p-4">Verified</th>
                                            <th className="p-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                        {loading ? (
                                            <tr><td colSpan={4} className="p-8 text-center text-gray-500">Loading...</td></tr>
                                        ) : workers.length === 0 ? (
                                            <tr><td colSpan={4} className="p-8 text-center text-gray-500">No workers found.</td></tr>
                                        ) : workers.map(worker => (
                                            <tr key={worker.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20 text-gray-900 dark:text-gray-200">
                                                <td className="p-4 font-medium">{worker.full_name}</td>
                                                <td className="p-4">@{worker.username || '-'}</td>
                                                <td className="p-4">
                                                    {worker.is_verified ? (
                                                        <span className="flex items-center gap-1 text-green-500 font-medium text-sm"><CheckCircle size={16} /> Yes</span>
                                                    ) : (
                                                        <span className="flex items-center gap-1 text-gray-500 font-medium text-sm"><XCircle size={16} /> No</span>
                                                    )}
                                                </td>
                                                <td className="p-4">
                                                    <button
                                                        onClick={() => toggleWorkerApproval(worker.id, worker.is_verified)}
                                                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${worker.is_verified ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                                                    >
                                                        {worker.is_verified ? 'Revoke Access' : 'Approve Meister'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
