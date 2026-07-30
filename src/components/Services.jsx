import Icon from "./Icon";

export default function Services({ data }) {
    return (
        <div id="services" className="section-padding bg-secondary/30">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <span className="text-accent text-sm font-light tracking-[0.2em] uppercase">
                        {data.badge}
                    </span>

                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-primary mt-3 mb-6">
                        {data.heading}
                    </h2>

                    <div className="divider" />

                    <p className="text-gray-600 font-light mt-6 max-w-2xl mx-auto">
                        {data.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {data.items.map((s) => (
                        <div
                            key={s.title}
                            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl"
                        >
                            {/* Icon */}
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5 transition-all duration-500 group-hover:bg-primary group-hover:scale-105">
                                <Icon
                                    name={s.icon}
                                    size={24}
                                    className="text-primary transition-colors duration-500 group-hover:text-white"
                                />
                            </div>

                            {/* Title */}
                            <h3 className="mb-3 text-xl font-semibold tracking-tight text-primary">
                                {s.title}
                            </h3>

                            {/* Description */}
                            <p className="mb-6 text-sm leading-7 text-gray-600">
                                {s.description}
                            </p>

                            {/* Link */}
                            <a
                                href={s.href}
                                className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-all duration-300 hover:text-primary"
                            >
                                Learn More
                                <Icon
                                    name="arrow_forward"
                                    size={18}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </a>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a
                        href={data.viewAllCta.href}
                        className="btn border border-primary bg-transparent text-primary transition-all duration-300 hover:bg-primary hover:text-white"
                    >
                        {data.viewAllCta.text}
                    </a>
                </div>
            </div>
        </div>
    );
}