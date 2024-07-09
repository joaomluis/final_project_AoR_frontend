import { Pagination } from "react-bootstrap";
/**
 * Component to handle the pagination, it receives the current page, the total pages and the function to set the current page
 * It will display the pagination with a limit of 3 pages, if the current page is in the first 3 pages, it will display the first 3 pages
 * If the current page is in the last 3 pages, it will display the last 3 pages
 * If the current page is in the middle, it will display the current page and the 2 pages before and after
 * @param {*} param0
 * @returns
 */
const PaginationComponent = ({ currentPage, totalPages, setCurrentPage }) => {
  const pageLimit = 3;
  const halfPageRange = Math.floor(pageLimit / 2);
  const isMoreThanOnePage = totalPages > 1;
  /**
   * Method to handle the previous page button
   * It will decrement the current page if the current page is greater than 1
   */
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  /**
   * Method to handle the next page button
   * It will increment the current page if the current page is less than the total pages
   */
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  /**
   * Calculate the start and end page to be displayed
   * It will display the current page and the 2 pages before and after
   */
  let startPage = Math.max(1, currentPage - halfPageRange);
  let endPage = Math.min(totalPages, currentPage + halfPageRange);

  if (currentPage - halfPageRange < 1) {
    endPage = Math.min(totalPages, endPage + (1 - (currentPage - halfPageRange)));
  } else if (currentPage + halfPageRange > totalPages) {
    startPage = Math.max(1, startPage - (currentPage + halfPageRange - totalPages));
  }

  return (
    isMoreThanOnePage && (
      <Pagination style={{ display: "flex", justifyContent: "center" }} className="mt-4">
        <Pagination.Prev onClick={handlePreviousPage} disabled={currentPage === 1} />

        {startPage > 1 && <Pagination.Ellipsis />}
        {[...Array(endPage + 1 - startPage).keys()].map((page) => (
          <Pagination.Item key={startPage + page} active={startPage + page === currentPage} onClick={() => setCurrentPage(startPage + page)}>
            {startPage + page}
          </Pagination.Item>
        ))}
        {endPage < totalPages && <Pagination.Ellipsis />}

        <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages} />
      </Pagination>
    )
  );
};

export default PaginationComponent;
