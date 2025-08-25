import React, { useState } from "react";
import "./DeleteConfirmationModal.css";

const DeleteConfirmationModal = ({ item, onCancel, onOtpSent }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/real-estate/objects/${id}/request_delete/`, {
            method: "POST", // or "DELETE" if your DRF view uses DELETE
            headers: {
                "Content-Type": "application/json",
                'X-API-TOKEN': 'your_generated_secret_token_here',
            },
            body: JSON.stringify({ id }), // optional, depends on your view
            });

            if (!response.ok) {
            throw new Error("Failed to trigger email");
            }

            const data = await response.json();
            console.log("Success:", data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Confirm Deletion</h2>
        <p>
          To delete this item, an email with an OTP will be sent to: <b>{item.email}</b>.
        </p>
        <p>Are you sure you want to delete it? Make sure you have access to this email.</p>
        {error && <p className="error">{error}</p>}
        <div className="modal-buttons">
          <button
            className="delete-btn"
            onClick={() => handleDelete(item.id)}
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Delete"}
          </button>
          <button className="cancel-btn" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
