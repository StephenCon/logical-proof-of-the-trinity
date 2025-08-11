// src/pages/Home.tsx
import { Link } from "react-router-dom";

function Pill({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "good" | "bad" }) {
    const tones = {
        default: "bg-gray-100 text-gray-800",
        good: "bg-green-100 text-green-800",
        bad: "bg-red-100 text-red-800",
    } as const;
    return (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${tones[tone]}`}>
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
                    We formalize the Nicene doctrine in first‑order logic and verify its internal consistency
                    with an automated theorem prover. Read the paper, inspect the code, and (soon) run the model in your browser.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                        to="/paper"
                        className="rounded-xl border border-blue-600 bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                    >
                        Read the Paper
                    </Link>
                    <Link
                        to="/model"
                        className="rounded-xl border px-5 py-3 hover:bg-gray-50"
                    >
                        Explore the Model (beta)
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

            {/* Layer 1 — Plain-English TL;DR */}
            <Card title="In one minute: what we did (for everyone)">
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>We wrote the Trinity as math‑like rules</strong> (axioms) instead of analogies.</li>
                    <li><strong>A computer checked those rules</strong> with a logic engine (Z3) to see if they contradict.</li>
                    <li><strong>Result:</strong> the Nicene statement “three persons, one essence” is <em>consistent</em> in classical logic.</li>
                </ul>

                <div className="mt-4 grid gap-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-800">Core Nicene formulation</span>
                        <Pill tone="good">SAT (consistent)</Pill>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-800">Modalism (Father = Son)</span>
                        <Pill tone="bad">UNSAT (contradiction)</Pill>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-800">Tritheism (multiple essences)</span>
                        <Pill tone="bad">UNSAT (contradiction)</Pill>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-800">Subordinationism (Son lacks an essential attribute)</span>
                        <Pill tone="bad">UNSAT (contradiction)</Pill>
                    </div>
                </div>

                <p className="mt-4 text-sm text-gray-600">
                    We’re <em>not</em> proving the Trinity is metaphysically true; we’re showing it isn’t a logical contradiction.
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
                        First‑order logic, Z3 sorts/functions, axioms, and UNSAT tests.
                    </p>
                </summary>

                <div className="mt-4 text-gray-700 space-y-4">
                    <div>
                        <h3 className="font-semibold">Entities (Sorts)</h3>
                        <ul className="list-disc pl-6">
                            <li><code>Person</code> = {`{Father, Son, Spirit}`}</li>
                            <li><code>Essence</code> with constant <code>E</code> (the one divine essence)</li>
                            <li><code>Attr</code> (divine attributes), <code>Will</code> (divine will)</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold">Relations / Functions</h3>
                        <ul className="list-disc pl-6">
                            <li><code>Shares(Person, Essence)</code> – a Person fully shares an Essence</li>
                            <li><code>Has(Essence, Attr)</code> and <code>HasP(Person, Attr)</code></li>
                            <li><code>Begets(parent, child)</code>, <code>Proceeds(source, person)</code></li>
                            <li><code>will_of(Person) → Will</code>, with unity of will</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold">Core axioms (sketch)</h3>
                        <ul className="list-disc pl-6">
                            <li><strong>Unique Essence:</strong> ∀x:Essence. x = E</li>
                            <li><strong>Consubstantiality:</strong> Shares(F,E) ∧ Shares(S,E) ∧ Shares(H,E)</li>
                            <li><strong>Attribute Sharing:</strong> ∀p,a. Has(E,a) → HasP(p,a)</li>
                            <li><strong>Relations of Origin:</strong> Begets(F,S) ∧ ¬Begets(S,F) ∧ Proceeds(F,H)</li>
                            <li><strong>Unity of Will:</strong> ∀p. will_of(p) = will_of_E</li>
                            <li><strong>Distinctness:</strong> F≠S ∧ F≠H ∧ S≠H</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold">Verification tasks</h3>
                        <ul className="list-disc pl-6">
                            <li>Check SAT for core axioms</li>
                            <li>Check UNSAT for:
                                <ul className="list-disc pl-6">
                                    <li>Modalism: add constraint F = S</li>
                                    <li>Tritheism: introduce E2 with E2 ≠ E</li>
                                    <li>Subordinationism: Has(E,Omni) ∧ ¬HasP(S,Omni)</li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-xl border bg-gray-50 p-4 text-sm">
                        Source: <a className="text-blue-600 underline" href="/trinity_formal_model.py" download>trinity_formal_model.py</a>.
                        Run locally with <code>pip install z3-solver</code>.
                    </div>
                </div>
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

                <div className="mt-4 text-gray-700 space-y-4">
                    <div>
                        <h3 className="font-semibold">Correspondence</h3>
                        <ul className="list-disc pl-6">
                            <li><strong>Persons (hypostases):</strong> <code>Person ∈ {`{F,S,H}`}</code></li>
                            <li><strong>One essence (ousia):</strong> constant <code>E</code> with <code>∀x:Essence. x = E</code></li>
                            <li><strong>Consubstantial:</strong> each Person shares <code>E</code> (<code>Shares(p,E)</code>)</li>
                            <li><strong>Unity of will:</strong> <code>will_of(F)=will_of(S)=will_of(H)</code></li>
                            <li><strong>Relations of origin:</strong> generation (Father→Son), procession (Father→Spirit)</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold">Why the heresies fail (in logic)</h3>
                        <ul className="list-disc pl-6">
                            <li><strong>Modalism:</strong> collapsing persons (<code>F=S</code>) violates “distinct hypostases”. With other axioms in place, this forces inconsistency.</li>
                            <li><strong>Tritheism:</strong> multiple essences (<code>E2≠E</code>) contradict the axiom of unique essence.</li>
                            <li><strong>Subordinationism:</strong> denying an essential attribute to the Son breaks “what the essence has, each Person has”.</li>
                        </ul>
                    </div>

                    <div className="rounded-xl border bg-gray-50 p-4 text-sm">
                        Full discussion and references are in the PDF:{" "}
                        <a className="text-blue-600 underline" href="/trinity_formal_model.pdf" target="_blank" rel="noreferrer">
                            trinity_formal_model.pdf
                        </a>.
                    </div>
                </div>
            </details>

            {/* What’s here */}
            <section className="mt-8 grid gap-6 sm:grid-cols-3">
                <a href="/trinity_formal_model.pdf" target="_blank" rel="noreferrer" className="rounded-2xl border p-6 hover:bg-gray-50">
                    <h3 className="text-lg font-semibold">Read the Paper</h3>
                    <p className="mt-2 text-gray-700">Method, axioms, and reproducible results.</p>
                </a>
                <a href="/trinity_formal_model.py" download className="rounded-2xl border p-6 hover:bg-gray-50">
                    <h3 className="text-lg font-semibold">View the Code</h3>
                    <p className="mt-2 text-gray-700">Python/Z3 source for replication.</p>
                </a>
                <Link to="/model" className="rounded-2xl border p-6 hover:bg-gray-50">
                    <h3 className="text-lg font-semibold">Run it (in browser)</h3>
                    <p className="mt-2 text-gray-700">Pyodide demo coming online.</p>
                </Link>
            </section>
        </main>
    );
}
