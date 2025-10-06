import React from 'react';
import { useState } from "react";
import { handleFilesChange } from '../../services/submit';
import './UploadForm.css';

export default function UploadForm({ 
  formData, 
  setFormData, 
  handleFormSubmit, 
  PROPERTY_TYPES,
  setLoading,
  setShowForm,
  filters,
  setData,
  setError
}) {
  const [images, setImages] = useState([]);
  
  return (
    <div className="form-wrapper">
    <form
      className="upload-form"
        onSubmit={(e) =>
          handleFormSubmit(
            e,
            formData,
            setLoading,
            setShowForm,
            filters,
            setData,
            setError,
            setFormData
          )
        }
      encType="multipart/form-data"
    >
      <div className="form-grid">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="City"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="form-field"
          style={{ gridColumn: "span 2" }} // make textarea take full width
        />

        <input
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          style={{ gridColumn: "span 2" }}
        />

        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Area (m²)"
          value={formData.area_sq_m}
          onChange={(e) => setFormData({ ...formData, area_sq_m: e.target.value })}
        />

        <input
          type="number"
          placeholder="Rooms"
          value={formData.rooms}
          onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
        />
        <select
          value={formData.property_type}
          onChange={(e) =>
            setFormData({ ...formData, property_type: e.target.value })
          }
          required
        >
          <option value="" disabled>
            Select Property Type
          </option>
          {PROPERTY_TYPES.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <input
          type="email"
          placeholder="Your email (used to verify ownership for deletion)"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          style={{ gridColumn: "span 2" }}
        />
      </div>

      <small
        style={{ display: "block", marginBottom: "10px", color: "#555" }}
      >
        This email will be used to send a verification code (OTP) if you want to
        delete your listing.
      </small>

      <div className="file-input-wrapper">
        <button
          type="button"
          className="choose-image-button"
          onClick={() => document.getElementById("fileInput").click()}
        >
          Choose Images
        </button>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFilesChange(e, setImages, setFormData)}
          style={{ display: "none" }}
        />

        <div
          className="image-previews"
          style={{ display: "flex", gap: "10px", marginTop: "10px" }}
        >
          {images.map((image, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(image)}
              alt={`preview ${idx}`}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          ))}
        </div>
      </div>

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
    </div>
  );
}
