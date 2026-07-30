import Icon from "./Icon";

export default function CTA({ data }) {
    return (
        <div className="relative overflow-hidden py-16 md:py-24 lg:py-32">
            {/* Content */}
            <div className="container-custom relative z-10">
                <div className="mx-auto max-w-4xl text-center text-white">

                    <h2 className="text-3xl font-light leading-tight md:text-4xl lg:text-5xl">
                        {data.heading}
                    </h2>

                    <div className="mx-auto my-6 h-px w-20 bg-white/40 md:my-8" />

                    <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-white/80 md:mb-10 md:text-lg lg:text-xl">
                        {data.description}
                    </p>

                    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">

                        <a
                            href={data.primaryButton.href}
                            className="inline-flex items-center rounded-none bg-white px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] text-primary transition-all duration-300 hover:bg-gray-100 md:px-9 md:py-4 md:text-sm"
                        >
                            {data.primaryButton.text}
                            <Icon
                                name="arrow_right_alt"
                                size={16}
                                className="ml-3 h-4 w-4"
                            />
                        </a>

                        <a
                            href={`tel:${data.secondaryButton.tel}`}
                            className="inline-flex items-center border border-white/50 px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-primary md:px-9 md:py-4 md:text-sm"
                        >
                            <Icon
                                name="phone"
                                size={16}
                                className="mr-2 h-4 w-4"
                            />
                            {data.secondaryButton.text}
                        </a>

                    </div>
                </div>
            </div>
        </div>
    );
}