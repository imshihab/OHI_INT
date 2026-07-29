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
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
            const timer = setTimeout(() => setAnimateItems(true), 50);
            return () => clearTimeout(timer);
        } else {
            document.body.style.overflow = "unset";
            setAnimateItems(false);
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [mobileOpen]);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-40 flex items-center h-26 transition-all duration-700 ease-out ${
                    mounted
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-4 opacity-0"
                } ${scrolled ? "bg-white shadow-sm" : "bg-transparent"}`}
            >
                <div className="container-custom w-full">
                    <div className="flex justify-between items-center w-full">
                        <a
                            className="hover:opacity-80 transition-opacity duration-300"
                            href="/"
                        >
                            <img
                                alt={data?.logoAlt || "Logo"}
                                className={`h-14 xs:h-16 md:h-18 custom:h-16 lg:h-20 w-auto object-contain transition-all duration-300 ${
                                    scrolled ? "" : "brightness-0 invert"
                                }`}
                                src={data?.logo}
                            />
                        </a>

                        <div className="hidden lg:flex items-center space-x-6 lg:space-x-9">
                            {data?.links?.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={`text-sm text-center font-light tracking-wider uppercase transition-all duration-300 hover:opacity-70 ${
                                        scrolled ? "text-primary" : "text-white"
                                    }`}
                                >
                                    {link.title}
                                </a>
                            ))}
                        </div>

                        <div className="hidden lg:flex items-center gap-4">
                            <a
                                className={`text-xs py-3 px-8 transition-all duration-300 text-primary whitespace-nowrap ${
                                    scrolled
                                        ? "bg-transparent hover:bg-primary hover:text-white"
                                        : "bg-transparent text-white hover:bg-white hover:text-primary"
                                }`}
                                href={data?.cta?.href}
                            >
                                {data?.cta?.text}
                            </a>
                        </div>

                        <div className="flex items-center gap-3 lg:hidden">
                            <button
                                onClick={() => setMobileOpen(true)}
                                className={`p-2 transition-colors ${
                                    scrolled ? "text-primary" : "text-white"
                                } cursor-pointer`}
                                aria-label="Open menu"
                            >
                                <Icon name="menu" size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            {}
            <div
                className={`fixed inset-0 z-50 lg:hidden bg-white transition-opacity duration-400 ease-in-out ${
                    mobileOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
            >
                <div className="flex flex-col h-screen">
                    {}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <img
                            alt={data?.logoAlt || "Logo"}
                            className="h-12 w-auto object-contain"
                            src={data?.logo}
                        />
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="p-2 text-primary hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Close menu"
                        >
                            <Icon name="close" size={24} />
                        </button>
                    </div>

                    {}
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
                                    className={`block w-full text-left px-4 py-4 text-lg font-light text-primary hover:bg-gray-50 rounded-lg transform transition-all duration-500 ease-out ${
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

                    {}
                    <div
                        className={`p-6 border-t border-gray-100 space-y-4 transform transition-all duration-700 ease-out delay-300 ${
                            animateItems
                                ? "translate-y-0 opacity-100"
                                : "translate-y-8 opacity-0"
                        }`}
                    >
                        <a
                            href={data?.cta?.href}
                            className="block w-full py-4 text-white bg-blue-600 text-center rounded-lg font-light tracking-wider uppercase text-sm shadow-md hover:bg-blue-700 transition-colors"
                            onClick={() => setMobileOpen(false)}
                        >
                            {data?.cta?.text}
                        </a>

                        <div className="flex items-center justify-center space-x-6 text-gray-500">
                            {data?.phone && (
                                <a
                                    href={`tel:${data?.phone.replace(/\s+/g, "")}`}
                                    className="flex items-center gap-2 hover:text-primary transition-colors"
                                >
                                    <Icon name="language" size={18} />
                                    <span className="text-sm">
                                        {data?.phone}
                                    </span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
