const ErrorResponse = ({error}) => {
    return (
        error && <h2 className="text-red-500 py-4 text-[1.1rem]">{error}</h2>
    )
}

export default ErrorResponse