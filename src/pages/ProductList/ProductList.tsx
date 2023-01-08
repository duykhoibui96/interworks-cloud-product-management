import { useContext, useEffect, useState, useCallback } from "react";

import {
  Table,
  Button,
  Form,
  InputGroup,
  Spinner,
  Alert,
} from "react-bootstrap";

import { API_BASE_URL, PROXY_URL, MAX_ITEMS_PER_PAGE } from "../../config";

import Pagination from "../../components/Pagination/Pagination";
import { AuthContext } from "../../contexts/Auth";
import { CustomError } from "../../utils/error";

enum SortingType {
  ASCENDING = "ASCENDING",
  DESCENDING = "DESCENDING",
  NONE = "NONE",
}

function filterProducts(
  searchText: string,
  sortingType: SortingType,
  products: any[]
) {
  let newProducts;
  if (searchText) {
    const formalizedSearchText = searchText.toLowerCase();
    newProducts = products.filter(
      ({ id, code, name }) =>
        id.toLowerCase().includes(formalizedSearchText) ||
        code.toLowerCase().includes(formalizedSearchText) ||
        name.toLowerCase().includes(formalizedSearchText)
    );
  } else {
    newProducts = [...products];
  }

  if (sortingType === SortingType.ASCENDING) {
    newProducts.sort(({ name: curName }, { name: nextName }) => {
      return curName < nextName ? -1 : curName > nextName ? 1 : 0;
    });
  } else if (sortingType === SortingType.DESCENDING) {
    newProducts.sort(({ name: curName }, { name: nextName }) => {
      return curName < nextName ? 1 : curName > nextName ? -1 : 0;
    });
  }

  console.log("go here");

  return newProducts;
}

const ProductList = () => {
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(MAX_ITEMS_PER_PAGE);
  const [totalPage, setTotalPage] = useState(50);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortingType, setSortingType] = useState<SortingType>(SortingType.NONE);

  const { token, clearToken } = useContext(AuthContext);

  const onLoadProducts = useCallback(
    (pageIndex: number, pageSize: number) => {
      setLoading(true);
      setIsError(false);
      setProducts([]);
      fetch(
        `${PROXY_URL}/api/products?${new URLSearchParams({
          pageIndex,
          pageSize,
        } as any).toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Target-URL": API_BASE_URL,
            "X-APi-version": "3",
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new CustomError(
              "HTTP status code: " + response.status,
              response.status
            );
          }
        })
        .then(({ data, paging }) => {
          setProducts(data);
          setTotalPage(paging.totalPages);
        })
        .catch((e) => {
          setIsError(true);
          const errStatus = e.status;
          console.log(errStatus);

          if (errStatus === 401) {
            clearToken();
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [token, clearToken]
  );

  useEffect(() => {
    if (token) {
      onLoadProducts(page, pageSize);
    }
  }, [onLoadProducts, token, page, pageSize]);

  // useEffect(() => {
  //   setFilteredProducts(filterProducts(searchText, products));
  // }, [searchText, products]);

  // const onSearch = (e: any) => {
  //   e.preventDefault();
  //   setFilteredProducts(filterProducts(searchText, products));
  // };

  function onRemoveProduct(productId: string) {
    const productIndex = products.findIndex(({ id }) => id === productId);
    if (productIndex >= 0) {
      const newProducts = [...products];
      newProducts.splice(productIndex, 1);
      setProducts(newProducts);
    }
  }

  function onChangePageSize(e: any) {
    setPageSize(e.target.value);
  }

  return (
    <>
      {/* <Form onSubmit={onSearch}> */}
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search product by ID, Code or Name"
          aria-label="Search product by ID, Code or Name"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.currentTarget.value);
          }}
          aria-describedby="search-btn"
        />
        {/* <Button variant="outline-secondary" type="submit" id="search-btn">
            Search
          </Button> */}
      </InputGroup>
      {/* </Form> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Form.Select
          value={pageSize}
          style={{ width: 300, marginBottom: "1rem" }}
          onChange={onChangePageSize}
          disabled={loading}
        >
          <option value={10}>10 items per page</option>
          <option value={20}>20 items per page</option>
          <option value={50}>50 items per page</option>
        </Form.Select>
        {totalPage > 0 && (
          <Pagination
            disabled={loading}
            page={page}
            changePage={setPage}
            totalPage={totalPage}
          />
        )}
        <Form
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Form.Check
            type="radio"
            name="order"
            label={"Ascending"}
            style={{ marginRight: 10 }}
            onChange={() => setSortingType(SortingType.ASCENDING)}
          />
          <Form.Check
            type="radio"
            name="order"
            label={"Descending"}
            style={{ marginRight: 10 }}
            onChange={() => setSortingType(SortingType.DESCENDING)}
          />
          <Form.Check
            defaultChecked
            type="radio"
            name="order"
            label={"No sort"}
            onChange={() => setSortingType(SortingType.NONE)}
          />
        </Form>
      </div>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : isError ? (
        <Alert variant="danger">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            <Button
              variant="danger"
              onClick={() => onLoadProducts(page, pageSize)}
            >
              Loading again
            </Button>
          </p>
        </Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Code</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {filterProducts(searchText, sortingType, products).map(
              ({ id, code, name }, index) => {
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>{id}</td>
                    <td>{code}</td>
                    <td>{name}</td>
                    <td>
                      <Button variant="secondary">View</Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => onRemoveProduct(id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductList;
