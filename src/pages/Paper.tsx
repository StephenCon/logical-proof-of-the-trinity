export default function Paper() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-10">
            <h1 className="text-3xl font-semibold">The Paper</h1>
            <p className="mt-2 text-gray-700">
                Embedded below. You can also{" "}
                <a className="text-blue-600 underline" href="/trinity_formal_model.pdf" target="_blank" rel="noreferrer">
                    open it in a new tab
                </a>.
            </p>

            <div className="mt-6 rounded-2xl border">
                <object
                    data="/trinity_formal_model.pdf"
                    type="application/pdf"
                    className="h-[80vh] w-full rounded-2xl"
                >
                    <p className="p-4">
                        Your browser can’t display PDFs inline.{" "}
                        <a href="/trinity_formal_model.pdf" className="text-blue-600 underline" target="_blank" rel="noreferrer">
                            Click here to download the PDF.
                        </a>
                    </p>
                </object>
            </div>
        </main>
    );
}
