"use client";

import { useEffect } from "react";

// BootstrapClient component that imports the Bootstrap JS
export default function BootstrapClient() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return null;
}
