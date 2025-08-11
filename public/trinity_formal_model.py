# ===============================================
# Trinity Formal Consistency Model (Nicene Creed)
# ===============================================
# Author: Stephen Connett
# Date: 10 August 2025
#
# PURPOSE:
# Uses the Z3 theorem prover to check whether the Nicene doctrine of the Trinity
# is logically consistent under classical first-order logic.
#
# NOTES:
# - This does NOT prove the Trinity is metaphysically true.
# - It only shows the axioms are non-contradictory (SAT) or contradictory (UNSAT).
#
# Z3 RESULTS:
# - sat   -> satisfiable (consistent)
# - unsat -> unsatisfiable (contradiction)
#
# INSTALL:
#   pip install z3-solver

from z3 import *

# -----------------------------
# STEP 1: Define categories
# -----------------------------

# Persons: exactly Father, Son, Spirit (pairwise distinct by construction)
Person, (F, S, H) = EnumSort("Person", ["Father", "Son", "Spirit"])

# Essence: the divine nature
Essence = DeclareSort("Essence")
E = Const("E", Essence)  # the one divine essence

# Attributes: divine properties (e.g., omnipotence, eternity)
Attr = DeclareSort("Attr")

# -----------------------------
# STEP 2: Theological relations
# -----------------------------

# Shares(person, essence): person fully possesses the essence
Shares = Function("Shares", Person, Essence, BoolSort())

# Has(essence, attribute): the essence has a given attribute
Has = Function("Has", Essence, Attr, BoolSort())

# HasP(person, attribute): the person has that attribute
HasP = Function("HasP", Person, Attr, BoolSort())

# Begets(parent, child): relation of generation
Begets = Function("Begets", Person, Person, BoolSort())

# Proceeds(source, person): relation of procession
Proceeds = Function("Proceeds", Person, Person, BoolSort())

# One will of the divine nature
Will = DeclareSort("Will")
will_of_E = Const("will_of_E", Will)
will_of = Function("will_of", Person, Will)

# --------------------------------
# STEP 3: Nicene axioms
# --------------------------------


def axioms():
    # Return a solver loaded with Nicene-orthodox axioms
    s = Solver()

    # Variables for quantifiers
    x = Const("x", Essence)
    a = Const("a", Attr)
    p = Const("p", Person)

    # (U1) Unique Essence: only one essence (all essences are E)
    s.add(ForAll(x, x == E))

    # (C1) Consubstantiality: each Person shares the one essence E
    s.add(Shares(F, E), Shares(S, E), Shares(H, E))

    # (A1) Attribute sharing: if the essence has an attribute, each Person has it
    s.add(ForAll([p, a], Implies(Has(E, a), HasP(p, a))))

    # (R1) Relations of origin (base, non-Filioque)
    s.add(Begets(F, S))  # Father begets Son
    s.add(Not(Begets(S, F)))  # Son does not beget Father
    s.add(Proceeds(F, H))  # Spirit proceeds from Father

    # (W1) Unity of will: all Persons have the same will
    s.add(ForAll(p, will_of(p) == will_of_E))

    # (D1) Distinct Persons
    s.add(F != S, F != H, S != H)

    return s


# --------------------------------
# STEP 4: Human-readable facts
# --------------------------------


def print_facts_creedal(s, title):
    # Print a readable summary of the core claims if SAT
    from z3 import sat, is_true

    def b(expr):
        return bool(is_true(s.model().eval(expr, model_completion=True)))

    print(f"\n--- {title} ---")
    if s.check() != sat:
        print("Model not SAT; cannot print facts.")
        return

    # Consubstantiality
    print(
        "The Father is God (fully possesses the one divine essence):", b(Shares(F, E))
    )
    print("The Son is God (fully possesses the one divine essence):", b(Shares(S, E)))
    print(
        "The Holy Spirit is God (fully possesses the one divine essence):",
        b(Shares(H, E)),
    )

    # Distinctness
    print("The Father is not the Son:", not b(F == S))
    print("The Father is not the Holy Spirit:", not b(F == H))
    print("The Son is not the Holy Spirit:", not b(S == H))

    # Relations of origin
    print("The Father begets the Son:", b(Begets(F, S)))
    print("The Son is begotten of the Father:", b(Begets(F, S)))
    print("The Holy Spirit proceeds from the Father:", b(Proceeds(F, H)))

    # Unity of will
    print("The will of the Father is the will of the Son:", b(will_of(F) == will_of(S)))
    print(
        "The will of the Son is the will of the Holy Spirit:",
        b(will_of(S) == will_of(H)),
    )


# --------------------------------
# STEP 5: Anti-heresy tests
# --------------------------------


def test_modalism_contradiction():
    # Modalism: forces persons to be identical (e.g., Father = Son)
    s = axioms()
    s.add(F == S)
    return s.check()


def test_tritheism_contradiction():
    # Tritheism: introduces a second essence distinct from E
    s = axioms()
    E2 = Const("E2", Essence)
    s.add(E2 != E)
    return s.check()


def test_subordinationism_contradiction():
    # Subordinationism: denies a divine attribute to the Son
    s = axioms()
    Omni = Const("Omnipotence", Attr)
    s.add(Has(E, Omni))  # Essence is omnipotent
    s.add(Not(HasP(S, Omni)))  # Claim: Son lacks omnipotence
    return s.check()


# --------------------------------
# STEP 6: Result helper
# --------------------------------


def print_result(name, res):
    print(f"{name}: {res}")
    if res == sat:
        print("  OK: Consistent (SAT)")
    elif res == unsat:
        print("  CONTRADICTION: (UNSAT)")
    else:
        print("  Unknown (solver could not decide)")


# --------------------------------
# STEP 7: Main
# --------------------------------

if __name__ == "__main__":
    print("=== Base (Non-Filioque) Trinity Model ===")
    s = axioms()
    print_result("Core model", s.check())
    print_facts_creedal(s, "Facts (Base Trinitarian Model)")

    print("\n=== Anti-heresy Safety Tests (should all be UNSAT) ===")
    print_result("Modalism forced (Father = Son)", test_modalism_contradiction())
    print_result(
        "Tritheism forced (Second essence E2 != E)", test_tritheism_contradiction()
    )
    print_result(
        "Subordinationism forced (Son lacks an essential attribute)",
        test_subordinationism_contradiction(),
    )
