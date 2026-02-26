'use client';

import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/">
                            <span className="text-[20px] font-bold text-slate-900 tracking-tight font-serif italic">
                                EstateIndia
                            </span>
                        </Link>
                        <p className="mt-3 text-[13px] text-gray-400 leading-relaxed">
                            Find your perfect property across India. Buy, rent, or list with ease.
                        </p>
                    </div>

                    {/* Explore */}
                    <div>
                        <h4 className="text-[12px] font-semibold text-gray-900 uppercase tracking-widest mb-4">Explore</h4>
                        <ul className="space-y-3">
                            {[
                                { label: 'Properties', href: '/properties' },
                                { label: 'Agents', href: '/agents' },
                                { label: 'Services', href: '/services' },
                                { label: 'Map', href: '/map' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-[12px] font-semibold text-gray-900 uppercase tracking-widest mb-4">Company</h4>
                        <ul className="space-y-3">
                            {[
                                { label: 'About Us', href: '/' },
                                { label: 'Careers', href: '/' },
                                { label: 'Blog', href: '/' },
                                { label: 'Contact', href: '/' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-[12px] font-semibold text-gray-900 uppercase tracking-widest mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {[
                                { label: 'Privacy Policy', href: '/' },
                                { label: 'Terms of Service', href: '/' },
                                { label: 'Cookie Policy', href: '/' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-[12px] text-gray-400">
                        &copy; 2026 EstateIndia. All rights reserved.
                    </p>
                    <div className="flex items-center gap-5">
                        <Link href="/" className="text-[12px] text-gray-400 hover:text-gray-700 transition-colors">Privacy</Link>
                        <Link href="/" className="text-[12px] text-gray-400 hover:text-gray-700 transition-colors">Terms</Link>
                        <Link href="/" className="text-[12px] text-gray-400 hover:text-gray-700 transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
