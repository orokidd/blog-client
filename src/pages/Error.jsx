export default function Error({ errorType }) {
    const errorMessage = errorType === "not-found" ? "404 - Page Not Found" : "An unexpected error occurred.";

    return (
        <div className="error-page">
            <h1>{errorMessage}</h1>
        </div>
    )
}