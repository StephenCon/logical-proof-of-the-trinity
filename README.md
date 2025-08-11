# Logical Proof of the Trinity

This project hosts a small website presenting a **formal logical model** of the Nicene doctrine of the Trinity.  
The aim is not to prove that the Trinity is metaphysically true, but to **demonstrate that the Nicene formulation is internally consistent** under the rules of classical logic.

---

## 📖 Purpose

Many critics claim the Trinity is logically incoherent — that it is impossible to be both "three" and "one" in the way the creed describes.  
Using formal first-order logic and the [Z3 theorem prover](https://github.com/Z3Prover/z3), we show that the core Nicene claims can be encoded in a way that is **satisfiable** (no contradictions), while major historical heresies produce contradictions.

---

## 🧠 The Nicene Doctrine (Simplified)

The **Nicene-Constantinopolitan Creed** teaches that:

- The **Father**, **Son**, and **Holy Spirit** are **three distinct persons**.
- Each person fully shares **one divine essence**.
- All divine attributes are shared equally by each person.
- The Father begets the Son; the Holy Spirit proceeds from the Father.
- All three share **one will**.

These claims are turned into formal axioms and tested with Z3.

---

## ✅ What This Project Does

- Encodes the **core Nicene axioms** in classical first-order logic.
- Uses Z3 to test whether they are **satisfiable** (SAT).
- Runs **anti-heresy tests**:
  - **Modalism** → persons are identical → UNSAT
  - **Tritheism** → more than one essence → UNSAT
  - **Subordinationism** → Son lacks a divine attribute → UNSAT
- Shows that:
  - Nicene axioms are **SAT** → internally consistent.
  - Heretical variants are **UNSAT** → logically contradictory.

**Key point:** This is a *machine-verifiable* demonstration that the Nicene doctrine is not self-contradictory.  
It’s about logical coherence, **not** metaphysical proof.

---

## 🌐 Website Sections

- **Home** – Overview of the model and results.
- **Paper** – Link to the full PDF write-up.
- **Model** – Interactive, in-browser version of the Python model.
- **Code** – Direct access to the Z3 model.

---

## 🛠 Tech Stack

- **Frontend:** [Vite](https://vitejs.dev/), [React](https://react.dev/), TypeScript, Tailwind CSS.
- **Backend Model:** Python ([z3-solver](https://pypi.org/project/z3-solver/)).

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the site.

---

## 📜 Scripts

- `npm run dev` – Start the development server.
- `npm run build` – Type-check and create a production build.
- `npm run lint` – Run ESLint over the source.

---

## 🐍 Running the Python Model

The file `public/trinity_formal_model.py` contains the formal logic model backed by Z3.  
Run it locally with:

```bash
pip install z3-solver
python public/trinity_formal_model.py
```

Outputs:

- **SAT** → consistent  
- **UNSAT** → contradiction

For the full explanation of the method, axioms, and results, see `public/trinity_formal_model.pdf`.

---

## 📌 Disclaimer

This project does **not** attempt to prove that the Trinity is *true* in a metaphysical or theological sense.  
It simply shows that the Nicene formulation can be expressed in a way that is logically consistent within classical first-order logic.
