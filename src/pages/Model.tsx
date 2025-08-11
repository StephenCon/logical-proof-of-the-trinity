// src/pages/Model.tsx
import { useEffect, useMemo, useState } from "react";
import { getPyodide } from "@/lib/pyodide";

type Status = "idle" | "loading" | "ready" | "running" | "error";
type Verdict = "SAT" | "UNSAT";

function Pill({ verdict }: { verdict: Verdict }) {
    const ok = verdict === "SAT";
    return (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${ok ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {ok ? "SAT (consistent)" : "UNSAT (contradiction)"}
        </span>
    );
}

export default function Model() {
    const [status, setStatus] = useState<Status>("idle");
    const [log, setLog] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [modalism, setModalism] = useState(false);
    const [tritheism, setTritheism] = useState(false);
    const [subordination, setSubordination] = useState(false);

    const verdict: Verdict = useMemo(() => {
        if (modalism || tritheism || subordination) return "UNSAT";
        return "SAT";
    }, [modalism, tritheism, subordination]);

    useEffect(() => {
        (async () => {
            try {
                setStatus("loading");
                await getPyodide();
                setStatus("ready");
            } catch (e: any) {
                setStatus("error");
                setError(e?.message || "Failed to initialize Python runtime.");
            }
        })();
    }, []);

    async function runEnvTest() {
        setError(null);
        setStatus("running");
        try {
            const pyodide = await getPyodide();
            const code = `
import sys
import platform
msg = f"Hello from Python!\\nPython {platform.python_version()} on {platform.system()}\\nSys version: {sys.version.split()[0]}"
msg
      `;
            const out = await pyodide.runPythonAsync(code);
            setLog(String(out));
            setStatus("ready");
        } catch (e: any) {
            setStatus("error");
            setError(e?.message || "Execution failed.");
        }
    }

    async function runProof() {
        // This loads your file but will stop before import z3 (since z3 isn't available yet in Pyodide).
        setError(null);
        setStatus("running");
        try {
            const pyodide = await getPyodide();
            // Fetch the Python source from /public
            const src = await fetch("/trinity_formal_model.py").then(r => {
                if (!r.ok) throw new Error(`HTTP ${r.status} while fetching model`);
                return r.text();
            });

            // Quick precheck: warn about z3
            const hasZ3 = /from\s+z3\s+import|import\s+z3/.test(src);
            if (hasZ3) {
                setLog(
                    `Loaded trinity_formal_model.py (size ${src.length} bytes).

Note: This model imports 'z3'. Pyodide does not ship with a z3-solver wheel.
Next step is to load Z3's WebAssembly build and expose it to Python (Pyodide) or use Z3's JS API.

For now, the teaching verdict below mirrors our formal tests:
 - Base Nicene axioms: SAT
 - Modalism (F = S): UNSAT
 - Tritheism (E2 ≠ E): UNSAT
 - Subordinationism (Son lacks essential attribute): UNSAT`
                );
                setStatus("ready");
                return;
            }

            // If your file didn't import z3 (unlikely), we could run it directly:
            const out = await pyodide.runPythonAsync(src);
            setLog(String(out ?? "Model executed."));
            setStatus("ready");
        } catch (e: any) {
            setStatus("error");
            setError(e?.message || "Failed to run model.");
        }
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-10">
            <h1 className="text-3xl font-semibold">Interactive Model (Pyodide setup)</h1>
            <p className="mt-2 text-gray-700">
                Python-in-browser is ready. To run the full proof here, we need Z3’s WebAssembly build
                (the Python package <code>z3-solver</code> isn’t available in Pyodide). Until we add that,
                the toggles below mirror the exact logic of our formal tests, and the authoritative run
                remains the Python/Z3 script locally.
            </p>

            <section className="mt-6 grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border p-6">
                    <h2 className="text-lg font-semibold">Runtime</h2>
                    <p className="mt-2 text-sm text-gray-700">
                        Status: <strong>{status}</strong>
                    </p>
                    {error && (
                        <p className="mt-2 text-sm text-red-700">Error: {error}</p>
                    )}

                    <div className="mt-4 flex gap-3">
                        <button
                            className="rounded-lg border px-4 py-2 hover:bg-gray-50"
                            onClick={runEnvTest}
                            disabled={status === "loading" || status === "running"}
                        >
                            Run environment test
                        </button>
                        <button
                            className="rounded-lg border px-4 py-2 hover:bg-gray-50"
                            onClick={runProof}
                            disabled={status === "loading" || status === "running"}
                        >
                            Load & inspect model
                        </button>
                    </div>

                    {log && (
                        <pre className="mt-4 max-h-64 overflow-auto rounded-lg bg-gray-50 p-3 text-sm">
                            {log}
                        </pre>
                    )}
                </div>

                <div className="rounded-2xl border p-6">
                    <h2 className="text-lg font-semibold">Heresy toggles (explainer)</h2>

                    <label className="mt-4 flex items-start gap-3">
                        <input type="checkbox" checked={modalism} onChange={e => setModalism(e.target.checked)} />
                        <div>
                            <div className="font-medium">Modalism</div>
                            <div className="text-sm text-gray-700">
                                Force <code>Father = Son</code>. Violates “distinct hypostases” → contradiction with other axioms.
                            </div>
                        </div>
                    </label>

                    <label className="mt-4 flex items-start gap-3">
                        <input type="checkbox" checked={tritheism} onChange={e => setTritheism(e.target.checked)} />
                        <div>
                            <div className="font-medium">Tritheism</div>
                            <div className="text-sm text-gray-700">
                                Introduce a second essence <code>E2 ≠ E</code>. Contradicts “unique essence”.
                            </div>
                        </div>
                    </label>

                    <label className="mt-4 flex items-start gap-3">
                        <input type="checkbox" checked={subordination} onChange={e => setSubordination(e.target.checked)} />
                        <div>
                            <div className="font-medium">Subordinationism</div>
                            <div className="text-sm text-gray-700">
                                Claim the Son lacks an essential attribute of <code>E</code>. Contradicts “what <code>E</code> has, each Person has”.
                            </div>
                        </div>
                    </label>

                    <div className="mt-6 flex items-center justify-between">
                        <span className="text-sm text-gray-800">Current verdict</span>
                        <Pill verdict={verdict} />
                    </div>
                </div>
            </section>

            <section className="mt-8 rounded-2xl border p-6">
                <h2 className="text-lg font-semibold">Run the formal proof locally (today)</h2>
                <ol className="mt-3 list-decimal pl-6 text-gray-700">
                    <li>Install Z3: <code>pip install z3-solver</code></li>
                    <li>Download: <a className="text-blue-600 underline" href="/trinity_formal_model.py" download>trinity_formal_model.py</a></li>
                    <li>Run: <code>python trinity_formal_model.py</code></li>
                </ol>
            </section>

            <section className="mt-8 rounded-2xl border p-6">
                <h2 className="text-lg font-semibold">Next step: add Z3 WASM to Pyodide</h2>
                <p className="mt-2 text-gray-700">
                    We’ll compile/load Z3’s WebAssembly and bridge it into the Pyodide runtime. Once that’s in,
                    the button above will execute the actual proof here in the browser.
                </p>
            </section>
        </main>
    );
}
