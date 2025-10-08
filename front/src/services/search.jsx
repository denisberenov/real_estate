export const handleSearchClick = async ({
    pageNumber,
    setLoading,
    setShowForm,
    filters,
    setData,
    setError,
    returnData,
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
    // console.log(params.toString());
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

      if (returnData) {
        return result
      }
    //   console.log("==============================");
    //   for (let i=0; i<result.results.length; i++) {
    //     console.log(result.results[i].id);
    //   }
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
          const result = await handleSearchClick({
                pageNumber: page,
                setLoading,
                setShowForm,
                filters,
                setData,
                setError,
                returnData: true
          }); 
          
        //   console.log("===================");
        //   for (let i=0;i<result.results.length;i++) {
        //     console.log(result.results[i].id);
        //   }
          allObjects = allObjects.concat(result.results || []);
          const pageSize = 10; 
          totalPages = Math.ceil(result.count / pageSize);
          page += 1;
        } while (page <= totalPages);
        // for (let i=0; i<allObjects.length; i++) {
        //     console.log(`id: ${allObjects[i].id}, latitude: ${allObjects[i].latitude}, longtitude: ${allObjects[i].longitude}`);
        // }
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