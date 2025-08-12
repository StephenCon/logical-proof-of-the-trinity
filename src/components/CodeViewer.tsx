import { useEffect, useMemo, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

// Language components
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-json";

type Props = {
    src: string; // e.g. "/trinity_formal_model.py"
    language?: "python" | "javascript" | "typescript" | "json";
    title?: string;
};

export default function CodeViewer({ src, language = "python", title }: Props) {
    const [code, setCode] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let active = true;
        setError(null);
        setLoading(true);

        fetch(src, { cache: "no-store" })
            .then(async (res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
                const txt = await res.text();
                if (active) setCode(txt);
            })
            .catch((e) => {
                if (active) setError(e.message || "Failed to load code.");
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, [src]);

    const highlighted = useMemo<string>(() => {
        try {
            return Prism.highlight(code, Prism.languages[language], language);
        } catch {
            // Encode raw text to avoid HTML injection
            return Prism.util.encode(code) as string;
        }
    }, [code, language]);

    // Clipboard copy with robust fallback
    const onCopy = async () => {
        // Early exit if nothing to copy
        if (!code) return;

        // Prefer async Clipboard API when available and permitted
        const tryModern = async () => {
            if (!("clipboard" in navigator) || !navigator.clipboard?.writeText) return false;
            try {
                await navigator.clipboard.writeText(code);
                return true;
            } catch {
                return false;
            }
        };

        // Fallback: temporary textarea + execCommand
        const tryFallback = () => {
            try {
                const ta = document.createElement("textarea");
                ta.value = code;
                ta.setAttribute("readonly", "");
                ta.style.position = "absolute";
                ta.style.left = "-9999px";
                document.body.appendChild(ta);
                ta.select();
                const ok = document.execCommand("copy");
                document.body.removeChild(ta);
                return ok;
            } catch {
                return false;
            }
        };

        const ok = (await tryModern()) || tryFallback();
        if (ok) {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="rounded-2xl border">
            <div className="flex items-center justify-between border-b px-4 py-3">
                <div className="truncate">
                    <div className="text-sm font-semibold">{title || src}</div>
                    <div className="text-xs text-gray-500">Language: {language}</div>
                </div>

                <div className="flex items-center gap-2">
                    <a
                        className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-50"
                        href={src}
                        download
                    >
                        Download
                    </a>

                    <button
                        onClick={onCopy}
                        type="button"
                        className={`rounded-lg border px-3 py-1 text-sm transition ${copied ? "bg-green-50 border-green-300" : "hover:bg-gray-50"
                            }`}
                        disabled={loading || !code || copied}
                        aria-live="polite"
                    >
                        {copied ? "Copied!" : "Copy"}
                    </button>
                </div>
            </div>

            {error ? (
                <div className="p-4 text-sm text-red-700">Failed to load code: {error}</div>
            ) : (
                <pre className="overflow-x-auto p-4 text-sm">
                    <code
                        className={`language-${language}`}
                        // Prism returns safe HTML for highlight; we encoded on fallback above
                        dangerouslySetInnerHTML={{ __html: highlighted }}
                    />
                </pre>
            )}
        </div>
    );
}
