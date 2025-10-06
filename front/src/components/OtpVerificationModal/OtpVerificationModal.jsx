import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./OtpVerificationModal.css";
import { handleVerifyOtp } from "../../services/delete";

const OtpVerificationModal = ({ 
    item, 
    onCancel, 
    onDeleteConfirmed, 
    onSearchClick,
    setShowForm, 
    filters,
    setData
}) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return createPortal(
    <div className="otp-modal-backdrop" onClick={(e) => e.stopPropagation()}>
      <div className="otp-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Enter OTP</h2>
        <p>
          Please enter the OTP sent to <b>{item.email}</b>.
        </p>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="otp-input"
        />
        {error && <p className="otp-error">{error}</p>}
        <div className="otp-buttons">
          <button className="otp-delete-btn" onClick={() => handleVerifyOtp(
            setLoading, 
            setError,
            item,
            onSearchClick,
            onDeleteConfirmed,
            otp,
            setShowForm, 
            filters,
            setData
        )} disabled={loading}>
            {loading ? "Verifying..." : "Delete"}
          </button>
          <button className="otp-cancel-btn" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default OtpVerificationModal;
