import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();

    // Close menu on route change or Escape key
    useEffect(() => setOpen(false), [pathname]);
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                {/* Logo */}
                <Link to="/" className="font-semibold tracking-tight whitespace-nowrap">
                    LogicalProofOfTheTrinity<span className="text-blue-600">.com</span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex gap-6 text-sm ml-6">
                    <Link to="/paper" className="hover:text-blue-600">Paper</Link>
                    <Link to="/model" className="hover:text-blue-600">Model</Link>
                    <Link to="/code" className="hover:text-blue-600">Code</Link>
                    <a
                        href="/trinity_formal_model.pdf"
                        className="hover:text-blue-600"
                        target="_blank"
                        rel="noreferrer"
                    >
                        PDF
                    </a>
                </nav>

                {/* Mobile menu button */}
                <button
                    type="button"
                    className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    aria-label="Open menu"
                    aria-controls="mobile-menu"
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                >
                    <svg
                        className={`h-6 w-6 transition-transform ${open ? "rotate-90" : ""}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        {open ? (
                            // X icon
                            <path d="M18 6L6 18M6 6l12 12" />
                        ) : (
                            // Hamburger icon
                            <>
                                <path d="M4 6h16" />
                                <path d="M4 12h16" />
                                <path d="M4 18h16" />
                            </>
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile nav (collapsible) */}
            <div
                id="mobile-menu"
                className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-out ${open ? "max-h-96" : "max-h-0"
                    }`}
            >
                <nav className="px-4 pb-3 pt-1 text-sm">
                    <Link
                        to="/paper"
                        className="block rounded px-2 py-2 hover:bg-gray-100"
                    >
                        Paper
                    </Link>
                    <Link
                        to="/model"
                        className="block rounded px-2 py-2 hover:bg-gray-100"
                    >
                        Model
                    </Link>
                    <Link
                        to="/code"
                        className="block rounded px-2 py-2 hover:bg-gray-100"
                    >
                        Code
                    </Link>
                    <a
                        href="/trinity_formal_model.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded px-2 py-2 hover:bg-gray-100"
                    >
                        PDF
                    </a>
                </nav>
            </div>
        </header>
    );
}
