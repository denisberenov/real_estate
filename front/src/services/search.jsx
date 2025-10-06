export const handleSearchClick = async ({
    pageNumber,
    setLoading,
    setShowForm,
    filters,
    setData,
    setError
}) => {
    setLoading(true);
    setShowForm(false);

    // Build query params from filters + page
    const params = new URLSearchParams();
    params.append("page", pageNumber);

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && value !== null) {
        params.append(key, value);
      }
    });
    
    try {
      const response = await fetch(`/api/real-estate/objects/?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-TOKEN': "your_generated_secret_token_here",
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    }
    setLoading(false);
  };


  export const fetchAllObjects = async ({
                setLoading,
                setShowForm,
                filters,
                setData,
                setError,
                setfullData,
                data
          }) => {
      setLoading(true);
      setShowForm(false);
  
      let allObjects = [];
      let page = 1;
      let totalPages = 1;
  
      try {
        do {
          await handleSearchClick({
                pageNumber: page,
                setLoading,
                setShowForm,
                filters,
                setData,
                setError
          }); // <-- reuse your function
          const result = data;
          allObjects = allObjects.concat(result.results || []);
          const pageSize = 10; // or whatever your API uses
          totalPages = Math.ceil(result.count / pageSize);
          console.log(`total pages: ${totalPages}`);
          page += 1;
        } while (page <= totalPages);
        
        setfullData(allObjects);
        setError(null);
        
        const validItems = (allObjects || []).filter(
          (item) =>
            !isNaN(parseFloat(item.latitude)) && !isNaN(parseFloat(item.longitude))
        );
      } catch (err) {
        setError(err.message);
        setfullData([]);
      }
  
      setLoading(false);
    };

export const handleChange = (e, setFilters) => {
    const { name, value } = e.target;
        setFilters((prev) => ({
        ...prev,
        [name]: value,
    }));
};