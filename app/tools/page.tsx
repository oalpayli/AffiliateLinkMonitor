import Link from 'next/link';
import { Wrench, Link as LinkIcon, AlertTriangle, Activity, DollarSign, Search, ShieldCheck } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Free Affiliate Tools | LinkMonitor',
    description: 'Free tools for affiliate marketers to check broken links, monitor health, and calculate revenue loss.',
    openGraph: {
        title: 'Free Affiliate Tools | LinkMonitor',
        description: 'Free tools for affiliate marketers to check broken links, monitor health, and calculate revenue loss.',
        type: 'website',
        url: 'https://www.affiliatelinkmonitoring.com/tools',
    },
    alternates: {
        canonical: 'https://www.affiliatelinkmonitoring.com/tools',
    }
};

const tools = [
    {
        name: 'Amazon Broken Link Checker',
        description: 'Check your Amazon affiliate links instantly to ensure you are not losing commissions to out-of-stock or 404 products.',
        href: '/tools/amazon-broken-link-checker',
        icon: <LinkIcon className="h-6 w-6 text-orange-400" />
    },
    {
        name: 'Linktree Link Checker',
        description: 'Scan your Linktree to discover broken paths or invalid affiliate destinations before they cost you money.',
        href: '/tools/linktree-link-checker',
        icon: <AlertTriangle className="h-6 w-6 text-green-400" />
    },
    {
        name: 'Pinterest Link Monitor',
        description: 'Scan your Pinterest boards and pins to detect invalid affiliate links and redirect errors.',
        href: '/tools/pinterest-link-monitor',
        icon: <Wrench className="h-6 w-6 text-red-500" />
    },
    {
        name: 'Link Health Scanner',
        description: 'Analyze the health of any webpage and scan for broken or problematic URLs in seconds.',
        href: '/tools/link-health-scanner',
        icon: <Activity className="h-6 w-6 text-blue-400" />
    },
    {
        name: 'Revenue Loss Calculator',
        description: 'Calculate how much money you might be losing every month due to broken or unmonitored affiliate links.',
        href: '/tools/revenue-loss-calculator',
        icon: <DollarSign className="h-6 w-6 text-emerald-400" />
    },
    {
        name: 'Affiliate Link Auditor',
        description: 'Audit your entire post or page to extract and verify all your affiliate links at once.',
        href: '/tools/affiliate-link-auditor',
        icon: <ShieldCheck className="h-6 w-6 text-purple-400" />
    },
    {
        name: 'Amazon ASIN Checker',
        description: 'Instantly check any Amazon ASIN to verify its availability and discover mapping issues quickly.',
        href: '/tools/amazon-asin-checker',
        icon: <Search className="h-6 w-6 text-yellow-400" />
    }
];

export default function ToolsHubPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            <div className="pt-32 pb-20 border-b border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 to-transparent"></div>
                <div className="container mx-auto px-4 relative">
                    <div className="text-center max-w-3xl mx-auto space-y-6">
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                            Free Affiliate <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Marketing Tools</span>
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed">
                            Stop guessing. Use our free tools to verify your links, calculate potential losses, and start monitoring your affiliate income streams today.
                        </p>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {tools.map((tool) => (
                        <Link
                            key={tool.href}
                            href={tool.href}
                            className="bg-slate-900 border border-white/5 rounded-2xl p-6 hover:bg-slate-800 transition-all hover:-translate-y-1 block group relative overflow-hidden"
                        >
                            <div className="h-12 w-12 rounded-xl bg-slate-950 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {tool.icon}
                            </div>
                            <h2 className="text-xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors">
                                {tool.name}
                            </h2>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                {tool.description}
                            </p>
                            <div className="flex items-center text-sm font-semibold text-violet-400 group-hover:gap-3 gap-2 transition-all">
                                Try Tool <span>→</span>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-24 bg-gradient-to-br from-violet-900/40 to-slate-900 border border-violet-500/20 rounded-3xl p-10 max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Are free tools not enough?</h2>
                    <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                        Manually checking links is tedious. Set up daily tracking to get instant email alerts the moment an affiliate link breaks or a product goes out of stock.
                    </p>
                    <Link href="/pricing" className="inline-flex items-center justify-center gap-2 btn-primary px-8 py-4 rounded-xl font-bold shadow-lg shadow-violet-500/25">
                        <Activity className="h-5 w-5" />
                        Automate The Monitoring
                    </Link>
                </div>
            </main>
        </div>
    );
}
