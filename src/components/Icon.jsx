const Icon = ({ name, size = 24, className = "" }) => {
    return (
        <span
            className={`material-symbols-rounded ${className}`}
            style={{
                fontSize: size,
                fontVariationSettings: "'FILL' 1",
            }}
        >
            {name}
        </span>
    );
};

export default Icon;
