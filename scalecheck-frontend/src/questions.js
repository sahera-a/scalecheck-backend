export const SECTOR_QUESTIONS = {
  healthcare: {
    ownership: [
      "Is a single named clinical or executive sponsor accountable for this AI initiative's full lifecycle?",
      "If that sponsor left tomorrow, would the initiative continue unaffected?",
      "Is there a documented owner for post-pilot clinical validation and maintenance?",
      "Does hospital/clinical leadership review this initiative on a fixed recurring cadence?",
      "Is ownership documented in a formal charter, rather than assumed informally by IT?",
    ],
    integration: [
      "Can the AI system access EHR/EMR data without manual handoffs?",
      "Are there defined, compliant interfaces (e.g. HL7/FHIR) connecting this system to hospital IT?",
      "Has clinical IT/informatics signed off on production integration requirements?",
      "Is there a plan for how this fits into existing clinical workflows, not just a standalone pilot?",
      "Can the system handle real patient data volumes without significant re-architecture?",
    ],
    financial_value: [
      "Is there a defined, measurable outcome metric (e.g. reduced readmissions, clinician time saved)?",
      "Has that metric been tracked since the pilot began, not just projected?",
      "Is the business case reviewed against actual, not projected, clinical or cost outcomes?",
      "Would this initiative survive a budget review based on demonstrated value alone?",
      "Is the ongoing cost of running this system in production already budgeted for?",
    ],
    governance: [
      "Are there documented policies for patient data usage, model risk, and regulatory compliance?",
      "Is there a clinical/ethics governance body reviewing this initiative?",
      "Are decisions about this initiative documented and auditable for regulators?",
      "Is there a defined escalation path if the system produces a harmful or incorrect clinical output?",
      "Has this initiative been reviewed against relevant healthcare data regulations?",
    ],
    transformation: [
      "Have the clinicians/staff who will use this system been trained on it?",
      "Has this initiative changed how clinical staff actually work, not just added a tool?",
      "Is there buy-in beyond the initial sponsoring department?",
      "Is change management (comms, training, incentives) part of the clinical rollout plan?",
      "Would clinical staff notice or object if this system were suddenly taken away?",
    ],
  },

  ai_tech: {
    ownership: [
      "Is a single named product or engineering lead accountable for this AI initiative's full lifecycle?",
      "If that lead left tomorrow, would the project continue unaffected?",
      "Is there a documented owner for post-launch maintenance and model iteration?",
      "Does leadership review this initiative on a fixed recurring cadence?",
      "Is ownership documented in a formal RACI or charter, rather than assumed informally?",
    ],
    integration: [
      "Can the AI system access production data/APIs without manual handoffs?",
      "Are there defined APIs/SDKs connecting this system to your existing product stack?",
      "Has engineering signed off on production integration and scaling requirements?",
      "Is there a plan for how this fits into your CI/CD and existing workflows, not just a demo?",
      "Can the system scale to production traffic/data volumes without significant re-architecture?",
    ],
    financial_value: [
      "Is there a defined, measurable ROI or unit-economics metric for this initiative?",
      "Has that metric been tracked since launch, not just projected?",
      "Is the business case reviewed against actual, not projected, usage and revenue numbers?",
      "Would this initiative survive a budget review based on demonstrated value alone?",
      "Is ongoing compute/inference cost already budgeted for at production scale?",
    ],
    governance: [
      "Are there documented policies for data usage, model risk, and responsible AI review?",
      "Is there a cross-functional governance body (security, legal, product) reviewing this initiative?",
      "Are model decisions and versions documented and auditable?",
      "Is there a defined escalation path if the model produces a harmful or incorrect output?",
      "Has this initiative been reviewed against relevant data/security compliance requirements?",
    ],
    transformation: [
      "Have the engineering/product teams who will use or maintain this system been trained on it?",
      "Has this initiative changed how teams actually build or ship, not just added a tool?",
      "Is there organizational buy-in beyond the initial sponsoring team?",
      "Is change management (docs, training, incentives) part of the rollout plan?",
      "Would engineering teams notice or object if this system were suddenly taken away?",
    ],
  },

  infrastructure: {
    ownership: [
      "Is a single named operations or engineering lead accountable for this AI initiative's full lifecycle?",
      "If that lead left tomorrow, would the initiative continue unaffected?",
      "Is there a documented owner for post-pilot maintenance across field/ops teams?",
      "Does leadership review this initiative on a fixed recurring cadence?",
      "Is ownership documented in a formal charter, rather than assumed informally by one team?",
    ],
    integration: [
      "Can the AI system access SCADA/IoT/OT data without manual handoffs?",
      "Are there defined interfaces connecting this system to existing legacy infrastructure systems?",
      "Has engineering/OT signed off on production integration requirements?",
      "Is there a plan for how this fits into existing field operations, not just a standalone pilot?",
      "Can the system handle real-world operational data volumes without significant re-architecture?",
    ],
    financial_value: [
      "Is there a defined, measurable metric (e.g. uptime gained, maintenance cost reduced)?",
      "Has that metric been tracked since the pilot began, not just projected?",
      "Is the business case reviewed against actual, not projected, operational outcomes?",
      "Would this initiative survive a budget review based on demonstrated value alone?",
      "Is the ongoing cost of running this system in production already budgeted for?",
    ],
    governance: [
      "Are there documented policies for data usage, model risk, and safety compliance?",
      "Is there a cross-functional governance body (safety, engineering, ops) reviewing this initiative?",
      "Are decisions about this initiative documented and auditable for regulators?",
      "Is there a defined escalation path if the system produces a harmful or incorrect output?",
      "Has this initiative been reviewed against relevant safety/regulatory standards?",
    ],
    transformation: [
      "Have the field/operations staff who will use this system been trained on it?",
      "Has this initiative changed how operations staff actually work, not just added a tool?",
      "Is there buy-in beyond the initial sponsoring team?",
      "Is change management (comms, training, incentives) part of the rollout plan?",
      "Would field/ops staff notice or object if this system were suddenly taken away?",
    ],
  },

  general: {
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
  },
};

export const DIMENSION_LABELS = {
  ownership: "Ownership",
  integration: "Integration Readiness",
  financial_value: "Financial Value",
  governance: "Governance",
  transformation: "Organizational Transformation",
};
export const SHORT_DIMENSION_LABELS = {
  ownership: "Ownership",
  integration: "Integration",
  financial_value: "Financial",
  governance: "Governance",
  transformation: "Transformation",
};
export const SECTOR_LABELS = {
  healthcare: "Healthcare / Medical",
  ai_tech: "AI & Technology",
  infrastructure: "Infrastructure",
  general: "Other / General",
};