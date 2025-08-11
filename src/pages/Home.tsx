// src/pages/Home.tsx
import { Link } from "react-router-dom";

function Pill({
    children,
    tone = "default",
}: {
    children: React.ReactNode;
    tone?: "default" | "good" | "bad";
}) {
    const tones = {
        default: "bg-gray-100 text-gray-800",
        good: "bg-green-100 text-green-800",
        bad: "bg-red-100 text-red-800",
    } as const;
    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${tones[tone]}`}
        >
            {children}
        </span>
    );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">{title}</h2>
            <div className="mt-3 text-gray-700">{children}</div>
        </section>
    );
}

export default function Home() {
    return (
        <main className="mx-auto max-w-6xl px-4">
            {/* Hero */}
            <section className="py-16 sm:py-20">
                <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
                    A logical proof of the Trinity,
                    <span className="text-blue-600"> made clear.</span>
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-gray-700">
                    We turned the Nicene doctrine into precise logical rules and used an automated theorem prover to
                    check for contradictions. Read the paper, inspect the code, and (soon) run the model in your browser.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                        to="/paper"
                        className="rounded-xl border border-blue-600 bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                    >
                        Read the Paper
                    </Link>
                    <Link to="/model" className="rounded-xl border px-5 py-3 hover:bg-gray-50">
                        Explore the Model (beta)
                    </Link>
                    <Link to="/code" className="rounded-xl border px-5 py-3 hover:bg-gray-50">
                        View the Code
                    </Link>
                    <a
                        href="/trinity_formal_model.py"
                        className="rounded-xl border px-5 py-3 hover:bg-gray-50"
                        download
                    >
                        Download Code (.py)
                    </a>
                    <a
                        href="/trinity_formal_model.pdf"
                        className="rounded-xl border px-5 py-3 hover:bg-gray-50"
                        target="_blank"
                        rel="noreferrer"
                    >
                        View PDF
                    </a>
                </div>
            </section>

            {/* Layer 1 — Plain-English TL;DR (rewritten) */}
            <Card title="In one minute: what we did (for everyone)">
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>We turned the Trinity into clear, logical rules</strong> that a computer can check.
                    </li>
                    <li>
                        <strong>The computer tested those rules</strong> to see if they clash or contradict.
                    </li>
                    <li>
                        <strong>Result:</strong> No contradictions — the Nicene Trinity (“three persons, one essence”)
                        fits together logically.
                    </li>
                </ul>

                <div className="mt-6 rounded-xl bg-green-50 border border-green-200 p-4 text-green-800 font-semibold">
                    ✅ The Nicene Trinity is logically consistent.
                </div>

                <div className="mt-4 grid gap-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-800">Core Nicene formulation</span>
                        <Pill tone="good">SAT (consistent)</Pill>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-800">
                            Modalism — claims Father and Son are the same person
                        </span>
                        <Pill tone="bad">UNSAT (contradiction)</Pill>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-800">
                            Tritheism — claims there are three separate Gods
                        </span>
                        <Pill tone="bad">UNSAT (contradiction)</Pill>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-800">
                            Subordinationism — claims the Son is less divine than the Father
                        </span>
                        <Pill tone="bad">UNSAT (contradiction)</Pill>
                    </div>
                </div>

                <p className="mt-4 text-sm text-gray-600">
                    We’re <em>not</em> proving the Trinity is metaphysically true — only that it’s not a logical
                    contradiction.
                </p>
            </Card>

            {/* Layer 2 — For programmers */}
            <details className="mt-6 rounded-2xl border p-6 group open:shadow-sm">
                <summary className="cursor-pointer list-none">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Technical details (for programmers)</h2>
                        <span className="text-sm text-blue-600 group-open:rotate-180 transition">▼</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                        First-order logic, Z3 sorts/functions, axioms, and UNSAT tests.
                    </p>
                </summary>
                {/* ... programmer details unchanged ... */}
            </details>

            {/* Layer 3 — For theologians */}
            <details className="mt-4 rounded-2xl border p-6 group open:shadow-sm">
                <summary className="cursor-pointer list-none">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Theological mapping (for theologians)</h2>
                        <span className="text-sm text-blue-600 group-open:rotate-180 transition">▼</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                        How the formal symbols correspond to Nicene terms and why deviations break.
                    </p>
                </summary>
                {/* ... theologian details unchanged ... */}
            </details>

            {/* What’s here */}
            <section className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
                <a
                    href="/trinity_formal_model.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border p-6 hover:bg-gray-50"
                >
                    <h3 className="text-lg font-semibold">Read the Paper</h3>
                    <p className="mt-2 text-gray-700">Method, axioms, and reproducible results.</p>
                </a>
                <a
                    href="/trinity_formal_model.py"
                    download
                    className="rounded-2xl border p-6 hover:bg-gray-50"
                >
                    <h3 className="text-lg font-semibold">Download the Code</h3>
                    <p className="mt-2 text-gray-700">Python/Z3 source for replication.</p>
                </a>
                <Link to="/model" className="rounded-2xl border p-6 hover:bg-gray-50">
                    <h3 className="text-lg font-semibold">Run it (in browser)</h3>
                    <p className="mt-2 text-gray-700">Pyodide demo coming online.</p>
                </Link>
                <Link to="/code" className="rounded-2xl border p-6 hover:bg-gray-50">
                    <h3 className="text-lg font-semibold">View the Code</h3>
                    <p className="mt-2 text-gray-700">View the code in the browser.</p>
                </Link>
            </section>
        </main>
    );
}
