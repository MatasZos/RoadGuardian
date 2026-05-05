"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import Navbar from "../components/Navbar";
import AiChat from "../components/AiChat";

// quick action cards shown on the home dashboard, each linking to a main feature of the app
const actions = [
  {
    //maintenance action card with label, description, path and icon
    label: "Maintenance",
    description: "Log services, oil changes and inspections.",
    path: "/maintenance",
    icon: "bi-wrench-adjustable",
    accent: "warning",
  },
  {
    //documents action card with label, description, path and icon
    label: "Documents",
    description: "Insurance, registration and receipts.",
    path: "/documents",
    icon: "bi-file-earmark-text-fill",
    accent: "info",
  },
  {
    //emergency action card with label, description, path and icon
    label: "Emergency",
    description: "Quick access to help and live location.",
    path: "/emergency",
    icon: "bi-exclamation-triangle-fill",
    accent: "danger",
  },
];

// HomePage component that displays a personalised welcome card, quick action shortcuts and the AI assistant
export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // redirect unauthenticated users to the login page
  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  // show a spinner while the session is being loaded
  if (status === "loading") {
    return (
      <div className="rg-home-page d-flex align-items-center justify-content-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  const name = session?.user?.name || "Rider";

  return (
    <div className="rg-home-page min-vh-100">
      <Navbar />

      <Container className="py-4 py-md-5">
        {/* welcome card showing the user's name and a brief description of the dashboard */}
        <Card className="rg-welcome-card border-0 mb-4 mb-md-5 overflow-hidden">
          <Card.Body className="p-4 p-md-5 position-relative">
            <div className="rg-welcome-eyebrow text-uppercase small fw-semibold mb-2">
              <i className="bi bi-shield-fill-check me-2"></i>RoadGuardian
            </div>
            <h1 className="display-5 fw-bold mb-2">Welcome, {name}</h1>
            <p className="text-body-secondary mb-0 fs-5">
              Your RoadGuardian dashboard
            </p>
          </Card.Body>
        </Card>

        {/* quick action cards that navigate the user to the main features */}
        <h2 className="h5 fw-bold mb-3">Quick Actions</h2>
        <Row className="g-3 g-md-4 mb-5">
          {actions.map((action) => (
            <Col key={action.path} xs={12} md={4}>
              <Card
                role="button"
                onClick={() => router.push(action.path)}
                className={`rg-action-card h-100 border-0 rg-action-${action.accent}`}
              >
                <Card.Body className="d-flex flex-column gap-3 p-4">
                  {/* icon with accent colour matching the feature category */}
                  <div className={`rg-action-icon bg-${action.accent}-subtle text-${action.accent}-emphasis`}>
                    <i className={`bi ${action.icon} fs-3`}></i>
                  </div>
                  <div>
                    <Card.Title className="fw-bold mb-1">
                      {action.label}
                    </Card.Title>
                    <Card.Text className="small text-body-secondary mb-0">
                      {action.description}
                    </Card.Text>
                  </div>
                  <div className="mt-auto small fw-semibold text-body">
                    Open <i className="bi bi-arrow-right ms-1"></i>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* AI assistant chat panel at the bottom of the dashboard */}
        <h2 className="h5 fw-bold mb-3">Assistant</h2>
        <AiChat />
      </Container>

      {/* custom styles for the home page, including the welcome card gradient and action card hover effects */}
      <style>{`
        .rg-home-page {
          background:
            radial-gradient(circle at top, rgba(var(--bs-primary-rgb), 0.18), transparent 25%),
            radial-gradient(circle at top right, rgba(52, 152, 219, 0.16), transparent 25%),
            linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%);
        }
        .rg-welcome-card {
          background:
            linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02)),
            rgba(20, 20, 20, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
        }
        .rg-welcome-card::before {
          content: "";
          position: absolute;
          top: -80px;
          right: -60px;
          width: 220px;
          height: 220px;
          background: radial-gradient(circle, rgba(var(--bs-primary-rgb), 0.2), transparent 65%);
          pointer-events: none;
        }
        .rg-welcome-card::after {
          content: "";
          position: absolute;
          bottom: -90px;
          left: -70px;
          width: 220px;
          height: 220px;
          background: radial-gradient(circle, rgba(52, 152, 219, 0.18), transparent 65%);
          pointer-events: none;
        }
        .rg-welcome-eyebrow {
          color: var(--bs-primary);
          letter-spacing: 0.12em;
        }
        .rg-action-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
          cursor: pointer;
        }
        .rg-action-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.4);
        }
        .rg-action-card.rg-action-warning:hover {
          border-color: var(--bs-warning) !important;
        }
        .rg-action-card.rg-action-info:hover {
          border-color: var(--bs-info) !important;
        }
        .rg-action-card.rg-action-danger:hover {
          border-color: var(--bs-danger) !important;
        }
        .rg-action-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
