# scoring.py
# Pure scoring logic for ScaleCheck — no Flask, no database.
# This lets us test the math on its own before wiring it to anything.

# Each dimension maps to your whitepaper's 5-criteria framework.
# Each question is scored 0-4 by the user (0 = worst, 4 = best).
QUESTIONS = {
    "ownership": [
        "Is a single named executive accountable for this AI initiative's full lifecycle?",
        "If that accountable person left tomorrow, would the project continue unaffected?",
        "Is there a documented owner for post-pilot maintenance and iteration?",
        "Does leadership review this initiative on a fixed recurring cadence?",
    ],
    "integration": [
        "Can the AI system access production data without manual handoffs?",
        "Are there defined APIs/interfaces connecting this system to existing enterprise tools?",
        "Has IT/engineering signed off on production integration requirements?",
        "Is there a plan for how this system fits into existing workflows, not just a standalone demo?",
    ],
    "financial_value": [
        "Is there a defined, measurable ROI metric for this initiative?",
        "Has that metric been tracked since the pilot began (not just projected)?",
        "Is the business case reviewed against actual, not projected, numbers?",
        "Would this initiative survive a budget review based on demonstrated value alone?",
    ],
    "governance": [
        "Are there documented policies for data usage, model risk, and compliance?",
        "Is there a cross-functional governance body reviewing this initiative?",
        "Are decisions about this initiative documented and auditable?",
        "Is there a defined escalation path if the system produces a harmful or wrong output?",
    ],
    "transformation": [
        "Have the teams who will use this system been trained on it?",
        "Has this initiative changed how people actually do their jobs, not just added a tool?",
        "Is there organizational buy-in beyond the initial sponsoring team?",
        "Is change management (comms, training, incentives) part of the rollout plan?",
    ],
}

def score_dimension(answers):
    """
    answers: list of ints (0-4), one per question in a dimension
    returns: score out of 100
    """
    max_possible = len(answers) * 4
    raw = sum(answers)
    return round((raw / max_possible) * 100)


def score_all(all_answers):
    """
    all_answers: dict like {"ownership": [3,2,4,1], "integration": [...], ...}
    returns: dict of dimension -> score (0-100)
    """
    return {dim: score_dimension(ans) for dim, ans in all_answers.items()}


def classify_risk(scores):
    """
    scores: dict of dimension -> score (0-100)
    returns: list of risk flags based on your whitepaper's three failure modes
    """
    flags = []

    # Ownership Dissolution risk: driven by ownership + governance
    if scores["ownership"] < 40 or scores["governance"] < 40:
        flags.append({
            "type": "Ownership Dissolution",
            "severity": "high" if scores["ownership"] < 25 else "moderate",
            "note": "No durable accountability structure — matches the 44% ownership maturity gap seen across stalled pilots."
        })

    # Integration Tax risk: driven by integration + transformation
    if scores["integration"] < 40 or scores["transformation"] < 40:
        flags.append({
            "type": "Integration Tax",
            "severity": "high" if scores["integration"] < 25 else "moderate",
            "note": "System exists apart from real workflows — the hidden cost of connecting it later grows the longer this goes unaddressed."
        })

    # Narrative Capture risk: driven by financial_value
    if scores["financial_value"] < 40:
        flags.append({
            "type": "Narrative Capture",
            "severity": "high" if scores["financial_value"] < 25 else "moderate",
            "note": "Value claims aren't backed by measured outcomes — the story is outrunning the evidence."
        })

    return flags


def run_assessment(all_answers):
    """
    Full pipeline: raw answers -> dimension scores -> risk flags -> overall score
    """
    scores = score_all(all_answers)
    flags = classify_risk(scores)
    overall = round(sum(scores.values()) / len(scores))
    return {
        "dimension_scores": scores,
        "overall_score": overall,
        "risk_flags": flags,
    }


# --- Quick test — run this file directly to sanity-check the logic ---
if __name__ == "__main__":
    sample_answers = {
        "ownership": [1, 0, 1, 2],       # weak — should trigger Ownership Dissolution
        "integration": [3, 4, 3, 4],     # strong — should NOT trigger Integration Tax
        "financial_value": [1, 1, 0, 1], # weak — should trigger Narrative Capture
        "governance": [2, 2, 3, 2],
        "transformation": [3, 3, 4, 3],
    }
    result = run_assessment(sample_answers)
    print("Dimension scores:", result["dimension_scores"])
    print("Overall score:", result["overall_score"])
    print("Risk flags:")
    for f in result["risk_flags"]:
        print(f"  - {f['type']} ({f['severity']}): {f['note']}")