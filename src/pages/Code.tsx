import CodeViewer from "../components/CodeViewer";

export default function Code() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-10">
            <h1 className="text-3xl font-semibold">Source Code</h1>
            <p className="mt-2 max-w-2xl text-gray-700">
                This is the exact Python/Z3 model used in the paper. You can read it here,
                copy it, or download and run it locally with <code>pip install z3-solver</code>.
            </p>

            <div className="mt-6">
                <CodeViewer
                    src="/trinity_formal_model.py"
                    language="python"
                    title="trinity_formal_model.py"
                />
            </div>

            <div className="mt-6 rounded-xl border bg-gray-50 p-4 text-sm text-gray-700">
                Run locally:
                <ol className="mt-2 list-decimal pl-6">
                    <li>Install Z3: <code>pip install z3-solver</code></li>
                    <li>Download the file above</li>
                    <li>Run: <code>python trinity_formal_model.py</code></li>
                </ol>
            </div>
        </main>
    );
}
