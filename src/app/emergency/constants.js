// INCIDENT_TYPES lists every category of emergency a rider can report
export const INCIDENT_TYPES = [
  "breakdown",
  "crash",
  "flat_tyre",
  "mechanical_issue",
  "fuel_issue",
  "medical_issue",
  "other",
];

// SEVERITIES lists the urgency levels available when creating an emergency
export const SEVERITIES = ["low", "medium", "high", "critical"];

// STATUS_LABELS maps the server's snake_case status strings to human-readable UI labels
export const STATUS_LABELS = {
  reported: "Reported",
  dispatching: "Dispatching",
  rider_responding: "Rider responding",
  help_on_the_way: "Help on the way",
  assistance_received: "Assistance received",
  resolved: "Resolved",
  cancelled: "Cancelled",
};

// QUICK_REPLIES provides one-tap message shortcuts so riders can respond fast in an emergency
export const QUICK_REPLIES = [
  "I'm nearby.",
  "Are you safe?",
  "I'm on the way.",
  "What exactly happened?",
  "Do you need medical help?",
];
