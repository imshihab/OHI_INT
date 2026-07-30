import Icon from "./Icon";

export default function Footer({ data }) {
    return (
        <footer className="gradient-bg text-white">
            <div className="container-custom py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div className="lg:col-span-1">
                        <img
                            alt="Footer logo"
                            className="h-14 w-auto object-contain mb-4 brightness-0 invert"
                            src={data.logo}
                        />
                        <p className="text-white/60 font-light mb-6">{data.tagline}</p>
                        <div className="flex space-x-4">
                            <a
                                href={data.social.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                            >
                                <Icon name="facebook" size={18} />
                            </a>
                            <a
                                href={data.social.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                            >
                                <Icon name="instagram" size={18} />
                            </a>
                        </div>
                    </div>

                    {data.columns.map((col, i) => (
                        <div key={i}>
                            <h4 className="text-sm font-medium tracking-wider uppercase mb-4">
                                {col.heading}
                            </h4>
                            {col.isContact ? (
                                <ul className="space-y-3">
                                    <li>
                                        <a
                                            href={`tel:${col.phone.replace(/\s/g, "")}`}
                                            className="flex items-center gap-3 text-white/60 hover:text-white transition-colors font-light text-sm"
                                        >
                                            <Icon name="phone" size={16} />
                                            {col.phone}
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={`mailto:${col.email}`}
                                            className="flex items-center gap-3 text-white/60 hover:text-white transition-colors font-light text-sm"
                                        >
                                            <Icon name="mail" size={16} />
                                            {col.email}
                                        </a>
                                    </li>
                                    <li>
                                        <div className="flex items-start gap-3 text-white/60 font-light text-sm">
                                            <Icon name="mapPin" size={16} className="flex-shrink-0 mt-0.5" />
                                            <span>
                                                {col.addressLine1}
                                                <br />
                                                {col.addressLine2}
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            ) : (
                                <ul className="space-y-3">
                                    {col.links.map((link) => (
                                        <li key={link.text}>
                                            <a
                                                className="text-white/60 hover:text-white transition-colors font-light text-sm"
                                                href={link.href}
                                            >
                                                {link.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-16 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="max-w-md w-full">
                        <h4 className="text-lg font-serif font-light mb-4">
                            {data.newsletter.heading}
                        </h4>
                        <p className="text-white/60 mb-6 text-sm font-light">
                            {data.newsletter.description}
                        </p>
                        <form
                            className="flex flex-col sm:flex-row gap-4"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <input
                                placeholder={data.newsletter.placeholder}
                                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition-colors text-sm"
                                type="email"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-white text-primary hover:bg-gray-100 transition-colors text-sm tracking-wider uppercase font-light"
                            >
                                {data.newsletter.button}
                            </button>
                        </form>
                    </div>
                    <a
                        href="https://www.livroreclamacoes.pt/inicio/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition-opacity flex-shrink-0"
                    >
                        <img
                            alt="Electronic Complaints Book"
                            className="h-16 w-auto object-contain brightness-0 invert"
                            src={data.complaintsBookImage}
                        />
                    </a>
                </div>
            </div>

            <div className="bg-black/20">
                <div className="container-custom py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                        <p className="text-white/50 text-sm font-light">© {data.copyright}</p>
                        <p className="text-white/50 text-sm mt-4 md:mt-0 font-light">
                            {data.credit.split("JF SOLUTECH")[0]}
                            <a
                                href={data.creditUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                JF SOLUTECH
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
