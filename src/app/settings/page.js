"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Container,
  Card,
  Form,
  Button,
  Spinner,
  Stack,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import Navbar from "../components/Navbar";
import AccountPill from "../components/AccountPill";
import UnauthedPrompt from "../components/UnauthedPrompt";

// default settings used when no saved preferences exist for the user yet
const DEFAULTS = {
  emailReminders: true,
  documentReminders: true,
  maintenanceReminders: true,
  emergencyLocation: true,
  compactMode: false,
};

// SettingsPage component that lets users view and update their notification preferences and display options
export default function SettingsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState(DEFAULTS);
  const [toast, setToast] = useState(null);

  //fetch the user's saved settings from the API when the session resolves, or clear the loading state for unauthenticated users
  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      setLoading(false);
      return;
    }

    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/settings", { method: "GET" });
        const data = await res.json();
        if (res.ok) {
          // merge fetched settings over the defaults so any new keys still have a fallback value
          setSettings((prev) => ({ ...prev, ...(data?.settings || {}) }));
        } else {
          showToast("danger", data?.error || "Failed to load settings");
        }
      } catch {
        showToast("danger", "Server error loading settings");
      } finally {
        setLoading(false);
      }
    })();
  }, [status]);

  //showToast displays a toast notification with the given Bootstrap variant and message
  function showToast(variant, message) {
    setToast({ variant, message });
  }

  //toggle flips a single boolean setting key in the settings state
  function toggle(key) {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  //handleSave sends the current settings object to the API via a PUT request and shows a success or error toast
  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast("danger", data?.error || "Failed to save settings");
        return;
      }
      showToast("success", "Settings saved");
    } catch {
      showToast("danger", "Server error while saving");
    } finally {
      setSaving(false);
    }
  }

  const unauthenticated = status === "unauthenticated";

  return (
    <>
      <Navbar />

      <div className="rg-settings-page min-vh-100 py-4 py-md-5">
        <Container style={{ maxWidth: 1100 }}>
          {/* page header with title, description and account pill */}
          <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-3 mb-4">
            <div>
              <h1 className="rg-page-title fw-bold mb-2">
                <i className="bi bi-gear-fill me-2"></i>Settings
              </h1>
              <p className="text-body-secondary mb-0">
                Manage your preferences and reminders for RoadGuardian.
              </p>
            </div>
            {/* AccountPill showing the signed-in user's email, or null if unauthenticated */}
            <AccountPill email={unauthenticated ? null : session?.user?.email} />
          </div>

          <Card className="rg-section-card border-0">
            <Card.Body className="p-4">
              {/* skeleton shown while settings load, login prompt for unauthenticated users, or the preferences form */}
              {loading ? (
                <LoadingSkeleton />
              ) : unauthenticated ? (
                <UnauthedPrompt
                  message="Please log in to view and update your settings."
                  onLogin={() => router.push("/login")}
                />
              ) : (
                <>
                  {/* preferences header with a save button */}
                  <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 pb-3 mb-3 border-bottom border-secondary-subtle">
                    <div>
                      <h2 className="h5 fw-bold mb-1">Preferences</h2>
                      <p className="small text-body-secondary mb-0">
                        Saved to your account and synced across devices.
                      </p>
                    </div>
                    {/* save button shows a spinner while the settings are being written to the database */}
                    <Button
                      variant="primary"
                      onClick={handleSave}
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Saving...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-check-lg me-2"></i>
                          Save Settings
                        </>
                      )}
                    </Button>
                  </div>

                  {/* reminders section — controls for email, document and maintenance notification toggles */}
                  <SettingsSection title="Reminders" icon="bi-bell-fill">
                    <SettingRow
                      id="emailReminders"
                      title="Email reminders"
                      desc="Receive email notifications for important events."
                      enabled={settings.emailReminders}
                      onToggle={() => toggle("emailReminders")}
                    />
                    <SettingRow
                      id="documentReminders"
                      title="Document reminders"
                      desc="Get notified when documents are expiring soon."
                      enabled={settings.documentReminders}
                      onToggle={() => toggle("documentReminders")}
                    />
                    <SettingRow
                      id="maintenanceReminders"
                      title="Maintenance reminders"
                      desc="Get reminders based on your service history."
                      enabled={settings.maintenanceReminders}
                      onToggle={() => toggle("maintenanceReminders")}
                    />
                  </SettingsSection>

                  {/* safety section — controls whether the app can access the user's location for emergencies */}
                  <SettingsSection title="Safety" icon="bi-shield-fill-check">
                    <SettingRow
                      id="emergencyLocation"
                      title="Emergency location access"
                      desc="Allow RoadGuardian to use your location for emergency assistance."
                      enabled={settings.emergencyLocation}
                      onToggle={() => toggle("emergencyLocation")}
                    />
                  </SettingsSection>

                  {/* display section — controls UI layout preferences like compact mode */}
                  <SettingsSection title="Display" icon="bi-display" isLast>
                    <SettingRow
                      id="compactMode"
                      title="Compact mode"
                      desc="Tighter spacing for smaller screens."
                      enabled={settings.compactMode}
                      onToggle={() => toggle("compactMode")}
                    />
                  </SettingsSection>
                </>
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>

      {/* toast container for showing success or error feedback after saving settings */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          show={!!toast}
          onClose={() => setToast(null)}
          delay={3500}
          autohide
          bg={toast?.variant}
        >
          <Toast.Body className="text-white d-flex align-items-center gap-2">
            <i
              className={`bi ${
                toast?.variant === "success"
                  ? "bi-check-circle-fill"
                  : "bi-exclamation-triangle-fill"
              }`}
            ></i>
            {toast?.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {/* custom styles for the settings page, including the background, card styles and toggle switch overrides */}
      <style>{`
        .rg-settings-page {
          background: radial-gradient(circle at top, #101a1f, #000);
          color: #fff;
        }
        .rg-page-title {
          font-size: clamp(1.8rem, 3.5vw, 2.2rem);
          letter-spacing: -0.02em;
        }
        .rg-section-card {
          background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03)) !important;
          border: 1px solid rgba(255,255,255,0.10) !important;
          box-shadow: 0 18px 60px rgba(0,0,0,0.6);
        }
        .rg-settings-page .form-check-input {
          width: 2.5rem;
          height: 1.4rem;
          margin-top: 0;
        }
        .rg-settings-page .form-check-input:checked {
          background-color: var(--bs-primary);
          border-color: var(--bs-primary);
        }
        .rg-settings-page .form-check-input:focus {
          box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.25);
          border-color: var(--bs-primary);
        }
      `}</style>
    </>
  );
}

// SettingsSection component that groups related settings under a labelled heading with an icon
function SettingsSection({ title, icon, children, isLast }) {
  return (
    <section className={isLast ? "pt-3" : "pt-3 pb-2 border-bottom border-secondary-subtle mb-3"}>
      <h3 className="small fw-bold text-uppercase text-body-secondary mb-3">
        <i className={`bi ${icon} me-2`}></i>
        {title}
      </h3>
      <Stack gap={3}>{children}</Stack>
    </section>
  );
}

// SettingRow component that renders a setting's title, description and a toggle switch to enable or disable it
function SettingRow({ id, title, desc, enabled, onToggle }) {
  return (
    <div className="d-flex align-items-start justify-content-between gap-3">
      <label htmlFor={id} className="flex-grow-1 mb-0" style={{ cursor: "pointer" }}>
        <div className="fw-semibold mb-1">{title}</div>
        <div className="small text-body-secondary">{desc}</div>
      </label>
      <Form.Check
        type="switch"
        id={id}
        checked={enabled}
        onChange={onToggle}
        className="flex-shrink-0"
      />
    </div>
  );
}

// LoadingSkeleton component that shows a centred spinner while settings are being fetched from the server
function LoadingSkeleton() {
  return (
    <div className="d-flex align-items-center justify-content-center py-4">
      <Spinner animation="border" variant="primary" />
    </div>
  );
}
