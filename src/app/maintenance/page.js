"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Container, Stack, Spinner, Card, Row, Col } from "react-bootstrap";

import Navbar from "../components/Navbar";
import {
  groupByMonth,
  getPreviewFromForm,
  buildBikeTaskSummary,
} from "@/lib/maintenance";

import BikeSelector from "./BikeSelector";
import StatusBoard from "./StatusBoard";
import MaintenanceForm from "./MaintenanceForm";
import MaintenanceTimeline from "./MaintenanceTimeline";

// empty form state used when adding a new record or resetting the form after a submission
const EMPTY_FORM = {
  type: [],
  date: "",
  km: "",
  notes: "",
  advisories: "",
};

// MaintenancePage component that lets users search for a bike, log service records, and view their maintenance history
export default function MaintenancePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const email = session?.user?.email || null;

  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const [selectedBike, setSelectedBike] = useState("");
  const [bikeSearch, setBikeSearch] = useState({ make: "", model: "", year: "" });
  const [bikeResults, setBikeResults] = useState([]);
  const [bikeLoading, setBikeLoading] = useState(false);

  // memoize the timeline grouped by month so it only recalculates when records change
  const monthSections = useMemo(
    () => Object.entries(groupByMonth(records)),
    [records]
  );

  // memoize the task preview list based on the selected types and current mileage
  const previewList = useMemo(
    () => getPreviewFromForm(form.type, form.km),
    [form.type, form.km]
  );

  // memoize the per-bike task summaries used by the status board
  const bikeSummaries = useMemo(() => buildBikeTaskSummary(records), [records]);

  // memoize the summary for the currently selected bike so the status board updates reactively
  const selectedBikeSummary = useMemo(
    () =>
      selectedBike
        ? bikeSummaries.find((b) => b.bike === selectedBike) ?? null
        : null,
    [bikeSummaries, selectedBike]
  );

  // redirect unauthenticated users to the login page
  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  // Restore the last bike the user picked, and pre-fill the date with today.
  useEffect(() => {
    setSelectedBike(localStorage.getItem("userMotorbike") || "");
    setForm((prev) => ({
      ...prev,
      date: new Date().toISOString().slice(0, 10),
    }));
  }, []);

  // fetch maintenance records once the user's email is available after authentication
  useEffect(() => {
    fetchRecords();
  }, [email]);

  // fetchRecords retrieves all maintenance records for the current user from the API
  async function fetchRecords() {
    if (!email) return;

    const res = await fetch("/api/maintenance", {
      headers: { "x-user-email": email },
      cache: "no-store",
    });

    const data = await res.json();
    setRecords(Array.isArray(data) ? data : []);
  }

  // handleBikeSearch queries the motorcycle API using the make, model and year inputs and populates the results list
  async function handleBikeSearch() {
    setBikeResults([]);

    const { make, model, year } = bikeSearch;
    if (!make.trim() && !model.trim()) {
      alert("Enter a Make or Model to search.");
      return;
    }

    const qs = new URLSearchParams();
    if (make.trim()) qs.set("make", make.trim());
    if (model.trim()) qs.set("model", model.trim());
    if (year.trim()) qs.set("year", year.trim());

    setBikeLoading(true);
    try {
      const res = await fetch(`/api/motorcycles?${qs}`);
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Bike search failed");
        return;
      }
      setBikeResults(Array.isArray(data) ? data : []);
      if (!data?.length) alert("No bikes found.");
    } catch {
      alert("Bike search error.");
    } finally {
      setBikeLoading(false);
    }
  }

  // pickBike sets the selected bike label in state and persists it to localStorage for the next visit
  function pickBike(bike) {
    const label = `${bike.make} ${String(bike.model).trim()} (${bike.year})`;
    setSelectedBike(label);
    localStorage.setItem("userMotorbike", label);
    setBikeResults([]);
  }

  // toggleTask adds or removes a maintenance task type from the form's type array
  function toggleTask(task) {
    setForm((prev) => ({
      ...prev,
      type: prev.type.includes(task)
        ? prev.type.filter((t) => t !== task)
        : [...prev.type, task],
    }));
  }

  // handleSubmit creates a new maintenance record or updates an existing one depending on whether editingId is set
  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    if (!selectedBike) {
      alert("Please select a motorbike before adding a record.");
      return;
    }

    await fetch("/api/maintenance", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: email,
        motorbike: selectedBike,
        _id: editingId,
        ...form,
      }),
    });

    setForm({ ...EMPTY_FORM, date: new Date().toISOString().slice(0, 10) });
    setEditingId(null);
    await fetchRecords();
  }

  // startEdit populates the form with an existing record's data so the user can make changes
  function startEdit(record) {
    setEditingId(record._id);
    setSelectedBike(record.motorbike || "");
    setForm({
      type: Array.isArray(record.type) ? record.type : [record.type],
      date: record.date || "",
      km: record.km ?? "",
      notes: record.notes || "",
      advisories: record.advisories || "",
    });
  }

  // deleteRecord removes a record by id, updating local state immediately to avoid a full refetch
  async function deleteRecord(id) {
    await fetch("/api/maintenance", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id }),
    });
    setRecords((prev) => prev.filter((r) => r._id !== id));
  }

  // show a spinner while the session is being resolved
  if (status === "loading") {
    return (
      <div className="rg-maintenance-page d-flex align-items-center justify-content-center min-vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="rg-maintenance-page min-vh-100">
      <Navbar />

      <Container fluid="xxl" className="py-4">
        <Stack gap={3}>
          {/* page header with title and description */}
          <div>
            <h1 className="rg-page-title fw-bold mb-1 text-primary">
              <i className="bi bi-tools me-2"></i>
              Maintenance Records
            </h1>
            <p className="text-body-secondary mb-0">
              Track servicing, manage advisories, and monitor what your bike
              needs next.
            </p>
          </div>

          <Row className="g-3">
            {/* status board on the left showing the summary for the selected bike */}
            <Col xs={12} lg={4}>
              <StatusBoard
                summary={selectedBikeSummary}
                selectedBike={selectedBike}
              />
            </Col>

            <Col xs={12} lg={8}>
              <Stack gap={3}>
                {/* bike search card — must be filled before adding or editing records */}
                <Card className="rg-section-card border-0">
                  <Card.Body>
                    <div className="mb-3">
                      <h2 className="h5 fw-bold mb-1">Search Your Bike</h2>
                      <p className="text-body-secondary small mb-0">
                        Select the correct bike before adding or reviewing
                        maintenance records.
                      </p>
                    </div>

                    <BikeSelector
                      selectedBike={selectedBike}
                      bikeSearch={bikeSearch}
                      setBikeSearch={setBikeSearch}
                      bikeResults={bikeResults}
                      bikeLoading={bikeLoading}
                      onSearch={handleBikeSearch}
                      onPick={pickBike}
                    />
                  </Card.Body>
                </Card>

                {/* form card for adding a new record or editing an existing one */}
                <Card className="rg-section-card border-0">
                  <Card.Body>
                    <div className="mb-3">
                      <h2 className="h5 fw-bold mb-1">
                        {editingId
                          ? "Edit Maintenance Record"
                          : "Add Maintenance Record"}
                      </h2>
                      <p className="text-body-secondary small mb-0">
                        Save service history, current mileage, notes and
                        advisories for future reminders.
                      </p>
                    </div>

                    <MaintenanceForm
                      form={form}
                      setForm={setForm}
                      editingId={editingId}
                      previewList={previewList}
                      onSubmit={handleSubmit}
                      onToggleTask={toggleTask}
                    />
                  </Card.Body>
                </Card>

                {/* service timeline card showing all maintenance records grouped by month */}
                <Card className="rg-section-card border-0">
                  <Card.Body>
                    <div className="mb-3">
                      <h2 className="h5 fw-bold mb-1">Service Timeline</h2>
                      <p className="text-body-secondary small mb-0">
                        Browse your maintenance history grouped by month.
                      </p>
                    </div>

                    <div className="rg-timeline-scroll">
                      <MaintenanceTimeline
                        monthSections={monthSections}
                        onEdit={startEdit}
                        onDelete={deleteRecord}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Stack>
            </Col>
          </Row>
        </Stack>
      </Container>

      {/*custom styles for the maintenance page, including the background gradient, card styles and form field overrides*/} 
      <style>{`
        .rg-maintenance-page {
          background:
            radial-gradient(circle at top left, rgba(var(--bs-primary-rgb), 0.12), transparent 25%),
            radial-gradient(circle at top right, rgba(34, 197, 94, 0.10), transparent 25%),
            linear-gradient(180deg, #111827 0%, #0b0f17 100%);
          color: #fff;
        }
        .rg-page-title {
          font-size: clamp(1.8rem, 3.5vw, 2.4rem);
          letter-spacing: -0.02em;
        }
        .rg-section-card {
          background:
            linear-gradient(135deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02)),
            rgba(15, 23, 42, 0.92) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
        }
        .rg-timeline-scroll {
          max-height: 640px;
          overflow-y: auto;
          padding-right: 4px;
        }
        .rg-maintenance-page .form-control,
        .rg-maintenance-page .form-select {
          background: rgba(0, 0, 0, 0.3);
          border-color: rgba(255, 255, 255, 0.12);
          color: #fff;
        }
        .rg-maintenance-page .form-control:focus,
        .rg-maintenance-page .form-select:focus {
          background: rgba(0, 0, 0, 0.4);
          border-color: var(--bs-primary);
          box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.18);
          color: #fff;
        }
        .rg-maintenance-page .form-control::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        .rg-maintenance-page .form-check-input:checked {
          background-color: var(--bs-primary);
          border-color: var(--bs-primary);
        }
        .rg-maintenance-page .form-check-input:focus {
          box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.25);
          border-color: var(--bs-primary);
        }
      `}</style>
    </div>
  );
}
