import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    let title = "Unexpected Application Error";
    let message = "Something went wrong.";

    if (isRouteErrorResponse(error)) {
        title = `${error.status} ${error.statusText}`;
        message = error.data || "The page you’re looking for doesn’t exist.";
    }

    return (
        <main className="mx-auto max-w-3xl p-6">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="mt-2 text-gray-700">{message}</p>
            <a href="/" className="mt-6 inline-block rounded-lg border px-4 py-2 hover:bg-gray-50">
                Go home
            </a>
        </main>
    );
}
