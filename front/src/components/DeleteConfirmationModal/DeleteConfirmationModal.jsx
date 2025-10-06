import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./DeleteConfirmationModal.css";
import OtpVerificationModal from "../OtpVerificationModal/OtpVerificationModal";
import { handleDeleteRequest } from "../../services/delete";

const DeleteConfirmationModal = ({ 
    item, 
    onCancel, 
    onDeleteConfirmed, 
    onSearchClick,
    setShowForm, 
    filters,
    setData
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Show OTP modal *above* the confirmation modal
  return (
    <>
      {otpSent && (
        <OtpVerificationModal
          item={item}
          onCancel={onCancel}
          onDeleteConfirmed={onDeleteConfirmed}
          onSearchClick={onSearchClick}
          setShowForm={setShowForm}
          filters={filters}
          setData={setData}
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
                onClick={() => handleDeleteRequest(item.id, setLoading, setError, setOtpSent)}
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
