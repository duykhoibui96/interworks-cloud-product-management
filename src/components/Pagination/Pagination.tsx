import { useMemo } from "react";

import { Pagination } from "react-bootstrap";

type PaginationProps = {
  disabled: boolean;
  page: number;
  totalPage: number;
  changePage: (page: number) => any;
};

const PaginationComponent: React.FC<PaginationProps> = ({
  disabled,
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
          <Pagination.First onClick={() => changePage(1)} disabled={disabled} />
          <Pagination.Prev
            disabled={disabled}
            onClick={() => changePage(Math.max(currentPage - 1, 1))}
          />
          <Pagination.Item onClick={() => changePage(1)} disabled={disabled}>
            {1}
          </Pagination.Item>
          <Pagination.Ellipsis
            disabled={disabled}
            onClick={() => changePage(Math.max(currentPages[0] - 1, 1))}
          />
        </>
      )}
      {currentPages.map((page) => (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => changePage(page)}
          disabled={disabled}
        >
          {page}
        </Pagination.Item>
      ))}
      {currentPages[currentPages.length - 1] < totalPage && (
        <>
          <Pagination.Ellipsis
            disabled={disabled}
            onClick={() =>
              changePage(
                Math.min(currentPages[currentPages.length - 1] + 1, totalPage)
              )
            }
          />
          <Pagination.Item
            disabled={disabled}
            onClick={() => changePage(totalPage)}
          >
            {totalPage}
          </Pagination.Item>
          <Pagination.Next
            disabled={disabled}
            onClick={() => changePage(Math.min(currentPage + 1, totalPage))}
          />
          <Pagination.Last
            disabled={disabled}
            onClick={() => changePage(totalPage)}
          />
        </>
      )}
    </Pagination>
  );
};

export default PaginationComponent;
