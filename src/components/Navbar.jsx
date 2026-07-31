import React, { useState, useEffect } from "react";
import Icon from "./Icon";

export default function Navbar({ data }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [animateItems, setAnimateItems] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";

        if (mobileOpen) {
            const timer = setTimeout(() => setAnimateItems(true), 50);
            return () => clearTimeout(timer);
        } else {
            setAnimateItems(false);
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    return (
        <>
            <nav
                className={`fixed inset-x-0 top-0 w-full overflow-x-hidden z-40 flex items-center h-26 transition-all duration-700 ease-out ${
                    mounted
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-4 opacity-0"
                } ${scrolled ? "bg-white shadow-sm" : "bg-transparent"}`}
            >
                <div className="container-custom w-full">
                    <div className="flex items-center justify-between w-full min-w-0">
                        {/* Logo */}
                        <a
                            href="/"
                            className="shrink-0 hover:opacity-80 transition-opacity duration-300"
                        >
                            <img
                                src={data?.logo}
                                alt={data?.logoAlt || "Logo"}
                                className={`max-w-full h-14 xs:h-16 md:h-18 custom:h-16 lg:h-20 w-auto object-contain transition-all duration-300 ${
                                    scrolled ? "" : "brightness-0 invert"
                                }`}
                            />
                        </a>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex flex-1 items-center justify-center gap-6 lg:gap-9 min-w-0 overflow-hidden">
                            {data?.links?.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={`whitespace-nowrap text-sm text-center font-light tracking-wider uppercase transition-all duration-300 hover:opacity-70 ${
                                        scrolled ? "text-primary" : "text-white"
                                    }`}
                                >
                                    {link.title}
                                </a>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="hidden lg:flex items-center shrink-0">
                            <a
                                href={data?.cta?.href}
                                className={`text-xs py-3 px-6 lg:px-8 whitespace-nowrap transition-all duration-300 ${
                                    scrolled
                                        ? "text-primary hover:bg-primary hover:text-white"
                                        : "text-white hover:bg-white hover:text-primary"
                                }`}
                            >
                                {data?.cta?.text}
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex lg:hidden shrink-0">
                            <button
                                onClick={() => setMobileOpen(true)}
                                className={`p-2 ${
                                    scrolled ? "text-primary" : "text-white"
                                }`}
                                aria-label="Open menu"
                            >
                                <Icon name="menu" size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`fixed inset-0 w-screen overflow-x-hidden z-50 lg:hidden bg-white transition-opacity duration-300 ${
                    mobileOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <img
                            src={data?.logo}
                            alt={data?.logoAlt || "Logo"}
                            className="h-12 w-auto max-w-full object-contain"
                        />

                        <button
                            onClick={() => setMobileOpen(false)}
                            className="p-2 text-primary rounded-lg hover:bg-gray-100"
                            aria-label="Close menu"
                        >
                            <Icon name="close" size={24} />
                        </button>
                    </div>

                    <div className="flex-1 px-6 py-8 overflow-y-auto">
                        <div className="space-y-2">
                            {data?.links?.map((link, index) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    style={{
                                        transitionDelay: mobileOpen
                                            ? `${index * 75}ms`
                                            : "0ms",
                                    }}
                                    className={`block px-4 py-4 text-lg rounded-lg text-primary hover:bg-gray-50 transition-all duration-500 ${
                                        animateItems
                                            ? "translate-x-0 opacity-100"
                                            : "-translate-x-8 opacity-0"
                                    }`}
                                >
                                    {link.title}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div
                        className={`p-6 border-t border-gray-100 transition-all duration-700 ${
                            animateItems
                                ? "translate-y-0 opacity-100"
                                : "translate-y-8 opacity-0"
                        }`}
                    >
                        <a
                            href={data?.cta?.href}
                            onClick={() => setMobileOpen(false)}
                            className="block w-full py-4 rounded-lg bg-blue-600 text-white text-center hover:bg-blue-700 transition-colors"
                        >
                            {data?.cta?.text}
                        </a>

                        {data?.phone && (
                            <div className="mt-6 flex justify-center">
                                <a
                                    href={`tel:${data.phone.replace(/\s+/g, "")}`}
                                    className="flex items-center gap-2 text-gray-500 hover:text-primary"
                                >
                                    <Icon name="language" size={18} />
                                    <span>{data.phone}</span>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}