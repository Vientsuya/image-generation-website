export default function Input({ type, placeholder, ...rest }) {
    
    const baseClasses = "w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";
    const inputClasses = "bg-gray-800 border border-gray-600";
    const submitClasses = "bg-gray-800 text-white text-lg font-semibold hover:bg-gray-900  cursor-pointer";

    return (
        <input
            type={type}
            placeholder={type !== "submit" ? placeholder : undefined}
            className={`${baseClasses} ${type === "submit" ? submitClasses : inputClasses}`}
            {...rest}
        />
    );
}