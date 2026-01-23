'use client';

import Image from 'next/image';

const TEAM = [
    {
        name: "Alex M.",
        role: "Founder & Affiliate Marketer",
        bio: "Built LinkMonitor after losing $2k/month to broken Amazon links. 10 years in SEO.",
        image: "/images/team/founder.png"
    },
    {
        name: "Sarah K.",
        role: "Head of Engineering",
        bio: "Previously at Stripe. Obsessed with uptime and performance. Making sure your links are checked 24/7.",
        image: "/images/team/member1.png"
    },
    {
        name: "James L.",
        role: "Customer Success",
        bio: "Here to help you get set up. I reply to every email myself.",
        image: "/images/team/member2.png"
    }
];

export default function Team() {
    return (
        <section className="py-24 relative border-t border-slate-800/50">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet the team</h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        We're a small team of creators and developers building the tool we wished we had.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {TEAM.map((member, i) => (
                        <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-violet-500/30 transition-all text-center group">
                            <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-slate-700 group-hover:border-violet-500 transition-colors">
                                {/* Fallback to a colored div if image loads fail, but assuming paths exist from previous page.tsx usage */}
                                <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-slate-600 font-bold text-2xl">
                                    {member.name[0]}
                                </div>
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                    onError={(e) => {
                                        // Hide image on error to show fallback
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                            <p className="text-violet-400 text-sm font-medium mb-4">{member.role}</p>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                "{member.bio}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
