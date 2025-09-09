import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./OtpVerificationModal.css";

const OtpVerificationModal = ({ item, onCancel, onDeleteConfirmed, onSearchClick }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/real-estate/objects/${item.id}/confirm_delete/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-TOKEN": process.env.API_SECRET_TOKEN,
        },
        body: JSON.stringify({ otp }),
      });
      if (!response.ok) throw new Error("Invalid OTP");

      await response.json();
      onDeleteConfirmed?.(item.id);
      onSearchClick?.(1); 
    } catch (e) {
      setError("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

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
          <button className="otp-delete-btn" onClick={handleVerifyOtp} disabled={loading}>
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
