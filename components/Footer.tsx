export default function Footer() {
    return (
        <footer className="border-t border-slate-800 bg-slate-950/50 backdrop-blur-sm mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-slate-500">
                        &copy; {new Date().getFullYear()} Affiliate Link Monitor. All rights reserved.
                    </div>
                    <div className="flex items-center gap-6 text-sm text-slate-400">
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                            GitHub
                        </a>
                        <a href="/MANUAL.md" className="hover:text-white transition-colors">
                            Documentation
                        </a>
                        <a href="/settings" className="hover:text-white transition-colors">
                            Settings
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
