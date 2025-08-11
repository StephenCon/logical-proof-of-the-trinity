// src/lib/pyodide.ts
let pyodideReady: Promise<any> | null = null;

export async function getPyodide() {
    if (pyodideReady) return pyodideReady;

    // Load the Pyodide script from CDN
    // (You can self-host later if you prefer.)
    const url = "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js";

    // Ensure script is only injected once
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

    // @ts-expect-error pyodide global injected by the script
    pyodideReady = window.loadPyodide?.({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/",
    });
    return pyodideReady!;
}
