import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./DeleteConfirmationModal.css";
import OtpVerificationModal from "../OtpVerificationModal/OtpVerificationModal";

const DeleteConfirmationModal = ({ item, onCancel, onDeleteConfirmed, onSearchClick }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleDeleteRequest = async (id) => {
    setLoading(true);
    try {
        const response = await fetch(
        `/api/real-estate/objects/${id}/request_delete/`,
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "X-API-TOKEN": process.env.API_SECRET_TOKEN,
            },
            body: JSON.stringify({ id }),
        }
        );

        if (!response.ok) {
        throw new Error("Failed to trigger email");
        }

        const data = await response.json();  // ✅ read once
        console.log("Response data:", data);

        setOtpSent(true);  // switch to OTP modal
    } catch (error) {
        console.error("Catch error:", error);
        setError("Error sending OTP. Try again.");
    } finally {
        setLoading(false);
    }
  };

  // Show OTP modal *above* the confirmation modal
  return (
    <>
      {otpSent && (
        <OtpVerificationModal
          item={item}
          onCancel={onCancel}
          onDeleteConfirmed={onDeleteConfirmed}
          onSearchClick={onSearchClick}
        />
      )}

      {!otpSent && createPortal(
        <div className="modal-backdrop" onClick={(e) => e.stopPropagation()}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Confirm Deletion</h2>
            <p>
              To delete this item, an email with an OTP will be sent to:{" "}
              <b>{item.email}</b>.
            </p>
            <p>Are you sure you want to delete it?</p>
            {error && <p className="error">{error}</p>}
            <div className="modal-buttons">
              <button
                className="delete-btn"
                onClick={() => handleDeleteRequest(item.id)}
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Delete"}
              </button>
              <button className="cancel-btn" onClick={onCancel} disabled={loading}>
                Cancel
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default DeleteConfirmationModal;
