'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "How accurate is the monitoring?",
        answer: "Our monitoring system checks your links multiple times per day using advanced detection algorithms. We verify HTTP status codes, detect redirects, and check product availability using Schema.org markup and platform-specific APIs. We maintain 99.9% accuracy in detecting broken links and out-of-stock items."
    },
    {
        question: "What happens when a link breaks?",
        answer: "You'll receive an instant email alert within 60 seconds of detection. The alert includes the broken link URL, the page it's on, and the error type (404, out-of-stock, etc.). You can then quickly update your content before losing any significant commissions."
    },
    {
        question: "Can I monitor international affiliate programs?",
        answer: "Absolutely! We support all major affiliate networks worldwide including Amazon (US, UK, DE, TR, etc.), Hepsiburada, Trendyol, ShareASale, CJ, ClickBank, and thousands more. If it's a link, we can monitor it."
    },
    {
        question: "How often do you scan my links?",
        answer: "Free users get daily or weekly scans. Pro users can choose hourly, daily, or weekly monitoring frequency. You can set different frequencies for different monitors based on your needs."
    },
    {
        question: "Is my data secure?",
        answer: "Yes. We use enterprise-grade encryption, secure cloud infrastructure, and never store your page content. We only store the URLs you want monitored. We're GDPR compliant and SOC 2 certified."
    },
    {
        question: "Do you store my website content?",
        answer: "No. We only scan for links and their status. We don't cache or store your article content, images, or any other private data. We respect your intellectual property."
    },
    {
        question: "What's your refund policy?",
        answer: "We offer a 14-day money-back guarantee, no questions asked. If you're not satisfied with the service for any reason, just email us and we'll process your refund within 2 business days."
    },
    {
        question: "Can I cancel anytime?",
        answer: "Yes! You can cancel your subscription at any time from your account settings. Your monitors will continue working until the end of your billing period, and you won't be charged again."
    }
];

export default function FAQ() {
    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-400 text-lg">
                        Everything you need to know about affiliate link monitoring
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQAccordion key={index} faq={faq} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQAccordion({ faq }: { faq: FAQItem }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-slate-800 rounded-xl bg-slate-900/50 hover:border-violet-500/30 transition-all overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 flex items-center justify-between text-left gap-4 group"
            >
                <span className="font-semibold text-white group-hover:text-violet-400 transition-colors">
                    {faq.question}
                </span>
                <ChevronDown
                    className={`h-5 w-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                        }`}
                />
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-6 pb-4 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50 pt-4">
                    {faq.answer}
                </div>
            </div>
        </div>
    );
}
