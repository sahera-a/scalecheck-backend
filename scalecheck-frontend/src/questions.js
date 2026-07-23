export const QUESTIONS = {
  ownership: [
    "Is a single named executive accountable for this AI initiative's full lifecycle?",
    "If that accountable person left tomorrow, would the project continue unaffected?",
    "Is there a documented owner for post-pilot maintenance and iteration?",
    "Does leadership review this initiative on a fixed recurring cadence?",
    "Is ownership documented in a formal charter or RACI matrix, rather than assumed informally?",
  ],
  integration: [
    "Can the AI system access production data without manual handoffs?",
    "Are there defined APIs/interfaces connecting this system to existing enterprise tools?",
    "Has IT/engineering signed off on production integration requirements?",
    "Is there a plan for how this system fits into existing workflows, not just a standalone demo?",
    "Can the system scale to production data volumes without significant re-architecture?",
  ],
  financial_value: [
    "Is there a defined, measurable ROI metric for this initiative?",
    "Has that metric been tracked since the pilot began (not just projected)?",
    "Is the business case reviewed against actual, not projected, numbers?",
    "Would this initiative survive a budget review based on demonstrated value alone?",
    "Is the cost of running this system in production already budgeted for?",
  ],
  governance: [
    "Are there documented policies for data usage, model risk, and compliance?",
    "Is there a cross-functional governance body reviewing this initiative?",
    "Are decisions about this initiative documented and auditable?",
    "Is there a defined escalation path if the system produces a harmful or wrong output?",
    "Has this initiative been reviewed against relevant regulatory or compliance requirements?",
  ],
  transformation: [
    "Have the teams who will use this system been trained on it?",
    "Has this initiative changed how people actually do their jobs, not just added a tool?",
    "Is there organizational buy-in beyond the initial sponsoring team?",
    "Is change management (comms, training, incentives) part of the rollout plan?",
    "Would daily users notice or object if this system were suddenly taken away?",
  ],
};

export const DIMENSION_LABELS = {
  ownership: "Ownership",
  integration: "Integration Readiness",
  financial_value: "Financial Value",
  governance: "Governance",
  transformation: "Organizational Transformation",
};