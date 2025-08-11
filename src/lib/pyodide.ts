// src/lib/pyodide.ts

// Minimal Pyodide interface for our needs
export interface Pyodide {
    runPythonAsync(code: string): Promise<unknown>;
}

let pyodideReady: Promise<Pyodide> | null = null;

declare global {
    interface Window {
        loadPyodide?: (opts: { indexURL: string }) => Promise<Pyodide>;
    }
}

export async function getPyodide(): Promise<Pyodide> {
    if (pyodideReady) return pyodideReady;

    const url = "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js";

    // Load Pyodide script only once
    if (!document.querySelector(`script[src="${url}"]`)) {
        await new Promise<void>((resolve, reject) => {
            const s = document.createElement("script");
            s.src = url;
            s.async = true;
            s.onload = () => resolve();
            s.onerror = () => reject(new Error("Failed to load pyodide.js"));
            document.head.appendChild(s);
        });
    }

    if (!window.loadPyodide) {
        throw new Error("Pyodide loader not found after script load.");
    }

    pyodideReady = window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/",
    });

    return pyodideReady;
}
