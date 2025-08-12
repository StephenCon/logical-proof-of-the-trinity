import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <>
      <NavBar />
      <Outlet />
      <footer className="mt-24 border-t">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-gray-600">
          <p>© {new Date().getFullYear()} LogicalProofOfTheTrinity.com</p>
          <p className="mt-2">Built by Titan Webworks</p>
        </div>
      </footer>
    </>
  );
}
