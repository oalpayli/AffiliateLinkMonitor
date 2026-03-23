import Image from 'next/image';
import { Star } from 'lucide-react';

interface Testimonial {
    name: string;
    role: string;
    company: string;
    quote: string;
    avatar: string;
    rating: number;
}

const testimonials: Testimonial[] = [
    {
        name: "Sarah Mitchell",
        role: "Lifestyle Blogger",
        company: "TheDailyEdit.com",
        quote: "Found 14 broken Amazon links in my first scan! Would've lost hundreds in commissions if I hadn't caught them. This tool pays for itself immediately.",
        avatar: "/images/testimonials/testimonial_avatar_1.png",
        rating: 5
    },
    {
        name: "Marcus Chen",
        role: "Tech Reviewer",
        company: "GadgetGuru",
        quote: "I was manually checking links every week. Now I just get an email when something breaks. Saved me 5+ hours per month and never miss a broken link again.",
        avatar: "/images/testimonials/testimonial_avatar_2.png",
        rating: 5
    },
    {
        name: "Jessica Torres",
        role: "Affiliate Marketer",
        company: "SmartShopperHub",
        quote: "The out-of-stock detection is a game-changer. I update my content immediately and my audience trusts me more. My CTR increased by 23% since using this.",
        avatar: "/images/testimonials/testimonial_avatar_3.png",
        rating: 5
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 relative bg-slate-950/30">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Trusted by affiliate marketers worldwide
                    </h2>
                    <p className="text-slate-400 text-lg">
                        Join 1,200+ content creators protecting their income
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    return (
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/30 transition-all group">
            {/* Rating */}
            <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
            </div>

            {/* Quote */}
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
                &quot;{testimonial.quote}&quot;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-slate-700 group-hover:border-violet-500/50 transition-all">
                    <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div>
                    <div className="font-semibold text-white text-sm">{testimonial.name}</div>
                    <div className="text-xs text-slate-400">{testimonial.role}</div>
                    <div className="text-xs text-violet-400">{testimonial.company}</div>
                </div>
            </div>
        </div>
    );
}
