import { Users, Globe, Star, Shield } from 'lucide-react';

export default function TrustSignals() {
    return (
        <div className="w-full py-8 border-y border-slate-800/50 bg-slate-950/30 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    <TrustMetric
                        icon={<Users className="h-5 w-5" />}
                        value="1,200+"
                        label="Active Users"
                    />
                    <TrustMetric
                        icon={<Globe className="h-5 w-5" />}
                        value="50K+"
                        label="Links Monitored Daily"
                    />
                    <TrustMetric
                        icon={<Star className="h-5 w-5" />}
                        value="4.8★"
                        label="User Rating"
                    />
                    <TrustMetric
                        icon={<Shield className="h-5 w-5" />}
                        value="99.9%"
                        label="Uptime"
                    />
                </div>
            </div>
        </div>
    );
}

function TrustMetric({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) {
    return (
        <div className="flex flex-col items-center text-center gap-2 group">
            <div className="p-2 bg-violet-500/10 rounded-lg text-violet-400 group-hover:bg-violet-500/20 transition-all">
                {icon}
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white">{value}</div>
            <div className="text-xs md:text-sm text-slate-400">{label}</div>
        </div>
    );
}
