export default function About({ data }) {
    return (
        <section id="about" className="section-padding bg-white">
            <div className="container-custom">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="relative h-75 sm:h-100 md:h-125 order-2 md:order-1">
                        <img
                            alt="Blue Logistics team in meeting"
                            className="w-full h-full object-cover"
                            src={data.mainImage}
                        />
                        <div className="absolute -bottom-6 -right-4 sm:-right-6 w-32 sm:w-40 h-24 sm:h-28 shadow-lg hidden sm:block">
                            <img
                                alt="The Blue Logistics team is celebrating."
                                className="w-full h-full object-cover"
                                src={data.secondaryImage}
                            />
                        </div>
                    </div>

                    <div className="order-1 md:order-2">
                        <span className="text-accent text-sm font-light tracking-[0.2em] uppercase">
                            {data.badge}
                        </span>
                        <h2 className="heading-2 text-primary mt-3 mb-6">
                            {data.heading}
                        </h2>
                        <p className="text-gray-600 font-light leading-relaxed mb-8">
                            {data.description}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                            {data.features.map((f) => (
                                <div
                                    key={f.title}
                                    className="border-l-2 border-accent pl-4"
                                >
                                    <h4 className="text-primary font-medium mb-1">
                                        {f.title}
                                    </h4>
                                    <p className="text-gray-500 text-sm font-light">
                                        {f.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <a
                            className="inline-flex items-center text-primary font-light tracking-wider uppercase text-sm hover:text-accent transition-colors"
                            href={data.cta.href}
                        >
                            {data.cta.text}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-2 w-4 h-4"
                            >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
