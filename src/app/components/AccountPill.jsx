"use client";

import { Badge } from "react-bootstrap";

// AccountPill component that shows a green or grey status dot and the signed-in user's email, or "Signed out" if no email is provided
export default function AccountPill({ email }) {
  const signedIn = Boolean(email);
  return (
    <Badge
      pill
      bg="dark"
      className="rg-account-pill px-3 py-2 d-inline-flex align-items-center gap-2"
    >
      <span
        className={`rg-status-dot ${signedIn ? "rg-status-on" : "rg-status-off"}`}
      />
      <span className="text-body-secondary fw-normal small">
        {signedIn ? `Signed in as: ${email}` : "Signed out"}
      </span>
    </Badge>
  );
}
