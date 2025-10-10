  import { getCoordinatesOSM } from './coordinates'
  import { handleSearchClick } from './search';
  
  export const handleFormSubmit = async (
        e,
        formData,
        setLoading,
        setShowForm,
        filters,
        setData,
        setError,
        setFormData
    ) => {
    e.preventDefault();

    try {
      console.log(`formData: ${formData}`);
      const coordinates = await getCoordinatesOSM(
        `${formData.address}, ${formData.city}, Україна`
      );
      
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("address", formData.address);
      data.append("city", formData.city);
      data.append("latitude", coordinates.lat);
      data.append("longitude", coordinates.lng);
      data.append("price", formData.price);
      data.append("area_sq_m", formData.area_sq_m);
      data.append("rooms", formData.rooms);
      data.append("property_type", formData.property_type);
      data.append("email", formData.email);

      if (formData.images && formData.images.length > 0) {
        for (let i = 0; i < formData.images.length; i++) {
          data.append("images", formData.images[i]);
        }
      }

      const response = await fetch("/api/real-estate/objects/", {
        method: "POST",
        headers: {
          "X-API-TOKEN": process.env.REACT_APP_API_SECRET_TOKEN,
        },
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      handleSearchClick({
        pageNumber: 1,
        setLoading,
        setShowForm,
        filters,
        setData,
        setError
      });

      setShowForm(false);
      setFormData({
        title: "",
        description: "",
        address: "",
        city: "",
        price: "",
        area_sq_m: "",
        rooms: "",
        property_type: "",
        images: [],
      });
    } catch (error) {
      console.error("Error creating real estate object:", error);
      alert("Failed to create object: " + error.message);
    }
  };

export const handleFilesChange = (e, setImages, setFormData) => {
    const selectedFiles = Array.from(e.target.files);
    setImages((prevImages) => {
      // Merge old + new files
      const combined = [...prevImages, ...selectedFiles];
      // Keep only first 10
      return combined.slice(0, 10);
    });

    // If you also want these images in formData for submit:
    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...selectedFiles].slice(0, 10),
    }));
  };