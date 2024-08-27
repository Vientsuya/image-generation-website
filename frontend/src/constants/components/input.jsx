export default function TextInput({ id, name, type = "text", placeholder, ...rest }) {
    return (
        <div>
            <label htmlFor={id} className="sr-only">{placeholder}</label>
            <input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                {...rest}
            />
        </div>
    );
}
