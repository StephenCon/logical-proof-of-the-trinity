# Logical Proof of the Trinity

This project hosts a small website that presents a formal logical model of the Nicene doctrine of the Trinity. The front end is built with [Vite](https://vitejs.dev/), [React](https://react.dev/), TypeScript and Tailwind CSS.

The site includes:

- **Home** – overview of the approach and results.
- **Paper** – link to the full PDF write‑up.
- **Model** – in‑browser version of the Python model (beta).
- **Code** – direct access to the Z3 model.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the site.

## Scripts

- `npm run dev` – start the development server.
- `npm run build` – type‑check and create a production build.
- `npm run lint` – run ESLint over the source.

## Python model

`public/trinity_formal_model.py` contains the formal logic model backed by the [Z3 theorem prover](https://github.com/Z3Prover/z3). Run it locally with:

```bash
pip install z3-solver
python public/trinity_formal_model.py
```

The file `public/trinity_formal_model.pdf` summarizes the method, axioms and results.

---

The goal is not to prove the metaphysical truth of the Trinity but to show that the Nicene formulation is internally consistent in classical logic.

