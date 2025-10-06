 export const handleClick = (data, showForm) => {
    if (data || showForm) {
      window.location.reload(); // refresh the page
    }
  };

 export const handlePageChange = (setPage, newPage) => {
    setPage(newPage);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

export const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };