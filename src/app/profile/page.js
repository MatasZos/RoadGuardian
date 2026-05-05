"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Row,
  Col,
  InputGroup,
  Spinner,
  Stack,
} from "react-bootstrap";
import Navbar from "../components/Navbar";

// ProfilePage component that displays the user's account details and allows them to update their name, phone and password
export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  //display values shown when the form is not in edit mode
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  //edit mode state and editable field values
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //feedback state for showing error and success alerts after save attempts
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  //on session load, redirect unauthenticated users and seed the display fields from the session
  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    const sessionName = session?.user?.name || "";
    const sessionEmail = session?.user?.email || "";

    setFullName(sessionName);
    setEmail(sessionEmail);
    setEditName(sessionName);
  }, [status, session, router]);

  //once the email is available, fetch the full profile from the API to get the phone number and latest name
  useEffect(() => {
    if (!email) return;

    (async () => {
      try {
        const res = await fetch("/api/profile", {
          headers: { "x-user-email": email },
          cache: "no-store",
        });
        const data = await res.json();

        if (!res.ok) {
          setError(data?.error || "Failed to load profile");
          return;
        }

        setFullName(data.fullName || session?.user?.name || "");
        setPhone(data.phone || "");
        setEditName(data.fullName || session?.user?.name || "");
        setEditPhone(data.phone || "");
      } catch {
        setError("Server error loading profile");
      }
    })();
  }, [email, session]);

  //startEditing enters edit mode and resets any previous feedback messages
  function startEditing() {
    setError("");
    setSuccess("");
    setIsEditing(true);
    setEditName(fullName);
    setEditPhone(phone);
    setEditPassword("");
    setConfirmPassword("");
  }

  //cancelEditing exits edit mode and restores the fields to their last saved values
  function cancelEditing() {
    setError("");
    setIsEditing(false);
    setEditName(fullName);
    setEditPhone(phone);
    setEditPassword("");
    setConfirmPassword("");
  }

  //handleSave validates the edited fields and sends a POST request to update the user's profile, including an optional password change
  async function handleSave(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const trimmedName = editName.trim();
    const trimmedPhone = editPhone.trim();

    if (!trimmedName) {
      setError("Name cannot be empty.");
      return;
    }
    if (!trimmedPhone) {
      setError("Phone number cannot be empty.");
      return;
    }

    //only validate password fields if the user has entered something in either password box
    const wantsPasswordChange =
      editPassword.length > 0 || confirmPassword.length > 0;

    if (wantsPasswordChange) {
      if (editPassword.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
      if (editPassword !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    setSaving(true);
    try {
      const res = await fetch("/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          fullName: trimmedName,
          phone: trimmedPhone,
          password: wantsPasswordChange ? editPassword : "",
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Update failed");
        return;
      }

      setFullName(trimmedName);
      setPhone(trimmedPhone);
      setIsEditing(false);
      setEditPassword("");
      setConfirmPassword("");
      setSuccess("Profile updated successfully.");
    } catch {
      setError("Server error while saving");
    } finally {
      setSaving(false);
    }
  }

  //handleSignOut signs the user out of their session and redirects them to the login page
  async function handleSignOut() {
    await signOut({ callbackUrl: "/login" });
  }

  // show a spinner while the session is being resolved
  if (status === "loading") {
    return (
      <div className="rg-profile-page min-vh-100 d-flex align-items-center justify-content-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="rg-profile-page min-vh-100">
      <Navbar />

      <Container className="py-4 py-md-5" style={{ maxWidth: 760 }}>
        {/* hero card showing the page title and description */}
        <Card className="rg-section-card border-0 mb-4 overflow-hidden">
          <Card.Body className="p-4 p-md-5">
            <h1 className="rg-page-title fw-bold mb-2">
              <i className="bi bi-person-circle me-2"></i>Profile
            </h1>
            <p className="text-body-secondary mb-0">
              Manage your personal details and account information.
            </p>
          </Card.Body>
        </Card>

        {/* profile form card with read-only display or editable fields depending on isEditing state */}
        <Card className="rg-section-card border-0">
          <Card.Body className="p-4">
            <Form onSubmit={handleSave}>
              <Stack gap={3}>
              {/*error and success alerts shown above the form fields after a save attempt*/}
                {error && (
                  <Alert variant="danger" className="mb-0">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                  </Alert>
                )}
                {success && (
                  <Alert
                    variant="success"
                    className="mb-0"
                    dismissible
                    onClose={() => setSuccess("")}
                  >
                    <i className="bi bi-check-circle-fill me-2"></i>
                    {success}
                  </Alert>
                )}

                {/*   name field — shown as read-only text when not editing, or as an input when editing*/}
                <Form.Group controlId="profileName">
                  <Form.Label className="text-body-secondary small fw-semibold">
                    NAME
                  </Form.Label>
                  {!isEditing ? (
                    <div className="rg-readonly-value">{fullName || "—"}</div>
                  ) : (
                    <Form.Control
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Your name"
                    />
                  )}
                </Form.Group>

                <hr className="border-secondary-subtle my-0" />

                {/*email field is always read-only as it is tied to the user's account and cannot be changed here*/}
                <Form.Group>
                  <Form.Label className="text-body-secondary small fw-semibold">
                    EMAIL
                  </Form.Label>
                  <div className="rg-readonly-value">
                    {email || "Not set yet"}
                  </div>
                </Form.Group>

                <hr className="border-secondary-subtle my-0" />

                {/*phone field — shown as read-only text when not editing, or as an input when editing*/}
                <Form.Group controlId="profilePhone">
                  <Form.Label className="text-body-secondary small fw-semibold">
                    PHONE
                  </Form.Label>
                  {!isEditing ? (
                    <div className="rg-readonly-value">
                      {phone || "Not set yet"}
                    </div>
                  ) : (
                    <Form.Control
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      placeholder="e.g. 08XXXXXXXX"
                    />
                  )}
                </Form.Group>

                <hr className="border-secondary-subtle my-0" />

                {/* password field — shown as masked dots when not editing, or as new/confirm inputs when editing*/}
                <Form.Group>
                  <Form.Label className="text-body-secondary small fw-semibold">
                    PASSWORD
                  </Form.Label>
                  {!isEditing ? (
                    <div className="rg-readonly-value">••••••••••••</div>
                  ) : (
                    <Stack gap={2}>
                      {/*new password input with a toggle to reveal the typed characters*/}
                      <InputGroup>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          value={editPassword}
                          onChange={(e) => setEditPassword(e.target.value)}
                          placeholder="New password"
                          autoComplete="new-password"
                        />
                        <Button
                          variant="outline-secondary"
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          tabIndex={-1}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          <i
                            className={`bi ${
                              showPassword ? "bi-eye-slash" : "bi-eye"
                            }`}
                          ></i>
                        </Button>
                      </InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        autoComplete="new-password"
                      />
                      <Form.Text className="text-body-secondary">
                        Leave blank to keep your current password.
                      </Form.Text>
                    </Stack>
                  )}
                </Form.Group>

                <hr className="border-secondary-subtle my-0" />

                {/* action buttons — edit/save/cancel on the left, sign out on the right */}
                <Row className="g-2">
                  <Col xs={12} sm="auto">
                    {/* edit profile button or save/cancel buttons depending on editing state */}
                    {!isEditing ? (
                      <Button
                        variant="primary"
                        onClick={startEditing}
                        className="w-100"
                      >
                        <i className="bi bi-pencil-fill me-2"></i>
                        Edit Profile
                      </Button>
                    ) : (
                      <Stack
                        direction="horizontal"
                        gap={2}
                        className="flex-wrap"
                      >
                        <Button
                          type="submit"
                          variant="primary"
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
                              Save Changes
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline-secondary"
                          type="button"
                          onClick={cancelEditing}
                          disabled={saving}
                        >
                          Cancel
                        </Button>
                      </Stack>
                    )}
                  </Col>
                  <Col className="d-flex justify-content-sm-end">
                    {/*sign out button always visible to allow the user to log out from any state*/}
                    <Button
                      variant="outline-danger"
                      type="button"
                      onClick={handleSignOut}
                      className="w-100 w-sm-auto"
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Sign Out
                    </Button>
                  </Col>
                </Row>
              </Stack>
            </Form>
          </Card.Body>
        </Card>
      </Container>

      {/*custom styles for the profile page, including the background gradient, card styles and form field overrides*/}
      <style>{`
        .rg-profile-page {
          background:
            radial-gradient(circle at top, rgba(var(--bs-primary-rgb), 0.14), transparent 24%),
            radial-gradient(circle at top right, rgba(255, 255, 255, 0.04), transparent 22%),
            linear-gradient(180deg, #151922 0%, #0c1118 100%);
        }
        .rg-section-card {
          background:
            linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02)),
            rgba(15, 15, 18, 0.92) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          box-shadow:
            0 24px 60px rgba(0, 0, 0, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }
        .rg-page-title {
          font-size: clamp(2rem, 3.8vw, 2.7rem);
          letter-spacing: -0.03em;
          color: var(--bs-primary);
        }
        .rg-readonly-value {
          color: #fff;
          font-weight: 600;
          padding: 8px 0;
        }
        .rg-section-card .form-control {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.12);
          color: #fff;
        }
        .rg-section-card .form-control:focus {
          background: rgba(255, 255, 255, 0.06);
          border-color: var(--bs-primary);
          box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.18);
          color: #fff;
        }
        .rg-section-card .form-control::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
