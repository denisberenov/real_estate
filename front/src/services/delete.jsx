export const handleDeleteRequest = async (id, setLoading, setError, setOtpSent) => {
    setLoading(true);
    try {
        const response = await fetch(
        `/api/real-estate/objects/${id}/request_delete/`,
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "X-API-TOKEN": process.env.REACT_APP_API_SECRET_TOKEN,
            },
            body: JSON.stringify({ id }),
        }
        );

        if (!response.ok) {
        throw new Error("Failed to trigger email");
        }

        const data = await response.json();  // ✅ read once

        setOtpSent(true);  // switch to OTP modal
    } catch (error) {
        console.error("Catch error:", error);
        setError("Error sending OTP. Try again.");
    } finally {
        setLoading(false);
    }
  };

export const handleVerifyOtp = async (
    setLoading, 
    setError,
    item,
    onSearchClick,
    onDeleteConfirmed,
    otp,
    setShowForm, 
    filters,
    setData
) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/real-estate/objects/${item.id}/confirm_delete/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-TOKEN": process.env.REACT_APP_API_SECRET_TOKEN,
        },
        body: JSON.stringify({ otp }),
      });
      if (!response.ok) {
        const error = new Error("OTP error");
        error.status = response.status;
        throw error
      }

      await response.json();
      onDeleteConfirmed?.(item.id);
      onSearchClick?.(
        1,
        setLoading,
        setShowForm,
        filters,
        setData,
        setError
    ); 
    } catch (e) {
      const status = e.status
      if (status == 400) {
        setError("Invalid or expired OTP");
      } else if (status == 403) {
        setError("Max OTP attempts exceeded");
      }
    } finally {
      setLoading(false);
    }
  };