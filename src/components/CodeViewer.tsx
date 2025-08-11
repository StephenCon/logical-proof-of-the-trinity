import { useEffect, useMemo, useRef, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";      // theme first
import "prismjs/components/prism-python"; // then language

type Props = {
    src: string;           // e.g. "/trinity_formal_model.py"
    language?: "python" | "javascript" | "typescript" | "json";
    title?: string;
};

export default function CodeViewer({ src, language = "python", title }: Props) {
    const [code, setCode] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        let active = true;
        setError(null);
        fetch(src, { cache: "no-store" })
            .then(async (res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
                const txt = await res.text();
                if (active) setCode(txt);
            })
            .catch((e) => {
                if (active) setError(e.message || "Failed to load code.");
            });
        return () => {
            active = false;
        };
    }, [src]);

    const highlighted = useMemo(() => {
        try {
            return Prism.highlight(code, Prism.languages[language], language);
        } catch {
            return code; // fallback: raw
        }
    }, [code, language]);

    const onCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
        } catch {
            // ignore
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
                        className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-50"
                        type="button"
                    >
                        Copy
                    </button>
                </div>
            </div>

            {error ? (
                <div className="p-4 text-sm text-red-700">
                    Failed to load code: {error}
                </div>
            ) : (
                <pre className="overflow-x-auto p-4 text-sm">
                    <code
                        ref={codeRef}
                        className={`language-${language}`}
                        dangerouslySetInnerHTML={{ __html: highlighted }}
                    />
                </pre>
            )}
        </div>
    );
}
