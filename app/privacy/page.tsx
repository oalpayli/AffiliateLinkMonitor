import React from 'react';
import { Shield, Lock, Eye, Server, Mail } from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 pb-20">
            <div className="bg-slate-900 border-b border-white/5 py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4 flex items-center justify-center gap-3">
                        <Shield className="h-10 w-10 text-emerald-400" />
                        Privacy Policy
                    </h1>
                    <p className="text-slate-400 text-lg">Last Updated: January 15, 2026</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl space-y-12">
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                        <Eye className="h-6 w-6 text-emerald-500" />
                        1. Information We Collect
                    </h2>
                    <p>
                        We collect information you provide directly to us when you create an account, subscribe to our newsletter, or communicate with us. This includes:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><strong>Account Information:</strong> Name, email address, and password.</li>
                        <li><strong>Payment Information:</strong> Processed securely by our payment providers (we do not store full credit card details).</li>
                        <li><strong>Usage Data:</strong> Information about how you use our services, including time of access and features used.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                        <Server className="h-6 w-6 text-blue-500" />
                        2. How We Use Your Information
                    </h2>
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Provide, maintain, and improve our services.</li>
                        <li>Process transactions and send related information.</li>
                        <li>Send you technical notices, updates, security alerts, and support messages.</li>
                        <li>Monitor and analyze trends, usage, and activities in connection with our services.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                        <Lock className="h-6 w-6 text-purple-500" />
                        3. Data Security
                    </h2>
                    <p>
                        We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
                        All sensitive data is encrypted in transit and at rest.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                        <Mail className="h-6 w-6 text-pink-500" />
                        4. Contact Us
                    </h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at:
                        <br />
                        <a href="mailto:info@affiliatelinkmonitoring.com" className="text-emerald-400 hover:underline">info@affiliatelinkmonitoring.com</a>
                    </p>
                </section>
            </div>
        </div>
    );
}
