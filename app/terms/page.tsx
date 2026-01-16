import React from 'react';
import { Scale, FileText, AlertTriangle, HelpCircle, Mail } from 'lucide-react';

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 pb-20">
            <div className="bg-slate-900 border-b border-white/5 py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 mb-4 flex items-center justify-center gap-3">
                        <Scale className="h-10 w-10 text-blue-400" />
                        Terms of Service
                    </h1>
                    <p className="text-slate-400 text-lg">Last Updated: January 15, 2026</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl space-y-12">
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                        <FileText className="h-6 w-6 text-blue-500" />
                        1. Acceptance of Terms
                    </h2>
                    <p>
                        By accessing or using our website and services, you agree to bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                        <AlertTriangle className="h-6 w-6 text-amber-500" />
                        2. Use License
                    </h2>
                    <p>
                        Permission is granted to temporarily download one copy of the materials (information or software) on Affiliate Link Monitor's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Modify or copy the materials;</li>
                        <li>Use the materials for any commercial purpose, or for any public display;</li>
                        <li>Attempt to decompile or reverse engineer any software contained on the website;</li>
                        <li>Remove any copyright or other proprietary notations from the materials.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                        <Scale className="h-6 w-6 text-red-500" />
                        3. Disclaimer
                    </h2>
                    <p>
                        The materials on Affiliate Link Monitor's website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                        <HelpCircle className="h-6 w-6 text-purple-500" />
                        4. Limitations
                    </h2>
                    <p>
                        In no event shall Affiliate Link Monitor or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we have been notified orally or in writing of the possibility of such damage.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                        <Mail className="h-6 w-6 text-pink-500" />
                        5. Contact Info
                    </h2>
                    <p>
                        If you have any questions about these Terms, pleas contact us at <a href="mailto:info@affiliatelinkmonitor.com" className="text-indigo-400 hover:underline">info@affiliatelinkmonitor.com</a>.
                    </p>
                </section>
            </div>
        </div>
    );
}
