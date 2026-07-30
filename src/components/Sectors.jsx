import { motion } from "framer-motion";
import Icon from "./Icon";

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
    }),
};

export default function Sectors({ data }) {
    return (
        <div className="relative overflow-hidden py-20 text-white">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <span className="text-white/60 text-base font-light tracking-[0.2em] uppercase">
                        {data.badge}
                    </span>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mt-3 mb-6">
                        {data.heading}
                    </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                    {data.items.map((item, i) => (
                        <motion.div
                            key={item.label}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={itemVariants}
                            className="text-center group"
                        >
                            <div className="w-14 h-14 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center mx-auto mb-3 transition-all duration-500">
                                <Icon
                                    name={item.icon}
                                    size={24}
                                    className="text-white/80"
                                    filled={false}
                                />
                            </div>
                            <p className="text-white/70 text-base font-light">
                                {item.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
