import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "90vh",
      }}
    >
      <h1>Scan Barcode</h1>
      <Link to="/admin" style={{ textDecoration: "none" }}>
        <Button variant="contained">scan</Button>
      </Link>
    </div>
  );
}
