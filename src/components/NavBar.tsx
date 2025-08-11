import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <Link to="/" className="font-semibold tracking-tight">
                    LogicalProofOfTheTrinity<span className="text-blue-600">.com</span>
                </Link>

                <nav className="flex gap-6 text-sm">
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
            </div>
        </header>
    );
}
