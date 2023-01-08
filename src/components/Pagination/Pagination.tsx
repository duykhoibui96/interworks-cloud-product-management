import { useMemo } from "react";

import { Pagination } from "react-bootstrap";

type PaginationProps = {
  page: number;
  totalPage: number;
  changePage: (page: number) => any;
};

const PaginationComponent: React.FC<PaginationProps> = ({
  page: currentPage,
  totalPage,
  changePage,
}) => {
  const pageList = useMemo(() => {
    return Array.from(new Array(totalPage), (_, i) => i + 1);
  }, [totalPage]);

  const currentPages = pageList.slice(
    Math.max(currentPage - 3, 0),
    Math.min(currentPage + 3, totalPage)
  );

  return (
    <Pagination>
      {currentPages[0] > 1 && (
        <>
          <Pagination.First onClick={() => changePage(1)} />
          <Pagination.Prev
            onClick={() => changePage(Math.max(currentPage - 1, 1))}
          />
          <Pagination.Item onClick={() => changePage(1)}>{1}</Pagination.Item>
          <Pagination.Ellipsis
            onClick={() => changePage(Math.max(currentPages[0] - 1, 1))}
          />
        </>
      )}
      {currentPages.map((page) => (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => changePage(page)}
        >
          {page}
        </Pagination.Item>
      ))}
      {currentPages[currentPages.length - 1] < totalPage && (
        <>
          <Pagination.Ellipsis
            onClick={() =>
              changePage(
                Math.min(currentPages[currentPages.length - 1] + 1, totalPage)
              )
            }
          />
          <Pagination.Item onClick={() => changePage(totalPage)}>
            {totalPage}
          </Pagination.Item>
          <Pagination.Next
            onClick={() => changePage(Math.min(currentPage + 1, totalPage))}
          />
          <Pagination.Last onClick={() => changePage(totalPage)} />
        </>
      )}
    </Pagination>
  );
};

export default PaginationComponent;
