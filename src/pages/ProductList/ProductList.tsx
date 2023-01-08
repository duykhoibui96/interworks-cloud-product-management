import { useState } from "react";

import { Table, Button, Form, InputGroup } from "react-bootstrap";

import Pagination from "../../components/Pagination/Pagination";

const response = {
  data: [
    {
      id: "f101229c-b070-420a-96b4-00bedcec875a",
      name: "M365 - Exchange Online Protection (New Commerce)",
      code: "CFQ7TTC0LGZM:0001",
      type: "Primary",
      category: {
        id: "c4c1c3ba-eeb2-4cd3-961e-90fd63f0d4d3",
        name: "Microsoft 365",
      },
      unitOfMeasure: null,
      industries: [],
      chargeType: "Prepaid",
      unitGroup: {
        id: 17,
        name: "Recurring Charge",
      },
      productGroup: {
        id: "2142ce45-5a8e-4415-b11e-91857333bfe9",
        name: "(NCE) Exchange Online",
      },
      createdAt: "2021-11-26T12:17:22.327+11:00",
      updatedAt: "2022-02-28T12:14:52.54+11:00",
    },
    {
      id: "fdb93525-4b44-4b3d-986b-00efa7ff89a9",
      name: "Dynamics 365 Customer Insights B2C Profiles Add-on (Nonprofit Staff Pricing)",
      code: "27676E3E-CBC4-4B29-954C-2D3CB796D093",
      type: "Addon",
      category: {
        id: "3a9cb0d9-3a96-4558-b534-7309bce26c8e",
        name: "Dynamics",
      },
      unitOfMeasure: {
        id: "6cff6922-5208-44c2-8978-4c1093b51ac4",
        name: "Add-On Licenses",
      },
      industries: [],
      chargeType: "Prepaid",
      unitGroup: {
        id: 17,
        name: "Recurring Charge",
      },
      productGroup: null,
      createdAt: "2020-02-26T16:54:29.027+11:00",
      updatedAt: "2022-04-04T11:47:15.077+10:00",
    },
    {
      id: "5687696d-c531-42ff-90cc-0121b3e5bc60",
      name: "Dynamics 365 Business Central Team Member (Nonprofit Staff Pricing) (Nonprofit)",
      code: "DDEAF912-2BFE-4B4E-877B-E5FA6A6B7583",
      type: "Primary",
      category: null,
      unitOfMeasure: {
        id: "ceadfc34-93e9-41af-a8a6-e970e607d46b",
        name: "Licenses",
      },
      industries: [],
      chargeType: "Prepaid",
      unitGroup: {
        id: 17,
        name: "Recurring Charge",
      },
      productGroup: {
        id: "ace0198e-8150-4523-9418-8b1f85f243fd",
        name: "Dynamics 365 Business Central",
      },
      createdAt: "2020-02-26T16:54:04.643+11:00",
      updatedAt: "2022-04-04T11:47:41.95+10:00",
    },
    {
      id: "9f37231c-6413-4c8b-b992-014c48bba773",
      name: "Dynamics 365 Business Central External Accountant for Students (Education)",
      code: "D884FC51-643D-4F12-BBF5-A13E9320A950",
      type: "Primary",
      category: null,
      unitOfMeasure: {
        id: "ceadfc34-93e9-41af-a8a6-e970e607d46b",
        name: "Licenses",
      },
      industries: [],
      chargeType: "Prepaid",
      unitGroup: {
        id: 17,
        name: "Recurring Charge",
      },
      productGroup: {
        id: "ace0198e-8150-4523-9418-8b1f85f243fd",
        name: "Dynamics 365 Business Central",
      },
      createdAt: "2020-02-26T16:54:04.05+11:00",
      updatedAt: "2020-08-05T10:28:23.693+10:00",
    },
    {
      id: "a911b30a-753e-43db-9209-014ebd91017e",
      name: "Dynamics 365 Field Service (Qualified Offer) (1000 seat minimum requirement) (Enterprise)",
      code: "05D9C319-13CE-4DA2-B8B7-395BE527F7FA",
      type: "Primary",
      category: null,
      unitOfMeasure: {
        id: "ceadfc34-93e9-41af-a8a6-e970e607d46b",
        name: "Licenses",
      },
      industries: [],
      chargeType: "Prepaid",
      unitGroup: {
        id: 17,
        name: "Recurring Charge",
      },
      productGroup: {
        id: "cbc8a370-611e-46b8-b410-6ffc690e3e42",
        name: "Dynamics 365 Enterprise Applications: Field Service",
      },
      createdAt: "2020-02-26T16:54:11.183+11:00",
      updatedAt: "2020-02-26T16:54:11.19+11:00",
    },
    {
      id: "f2df126e-595c-4923-941f-015c3ea7de29",
      name: "Dynamics 365 Sales Professional Attach to Qualifying Dynamics 365 Base Offer (Nonprofit Staff Pricing) (Nonprofit)",
      code: "A66BA149-97B4-4CC8-8E39-A01E0478A7F3",
      type: "Primary",
      category: null,
      unitOfMeasure: {
        id: "ceadfc34-93e9-41af-a8a6-e970e607d46b",
        name: "Licenses",
      },
      industries: [],
      chargeType: "Prepaid",
      unitGroup: {
        id: 17,
        name: "Recurring Charge",
      },
      productGroup: {
        id: "58f7e3d0-5739-4ed7-be0f-adf82e1e3674",
        name: "Dynamics 365 Enterprise Applications: Sales",
      },
      createdAt: "2020-02-26T16:54:22.537+11:00",
      updatedAt: "2022-04-04T11:47:57.027+10:00",
    },
    {
      id: "5d097163-150b-4944-bd84-016f930b711b",
      name: "SQL Server 2019 - 1 Device CAL (Commercial)",
      code: "DG7GMGF0FKZW:0002",
      type: "Primary",
      category: {
        id: "b69fb0bf-a035-476b-8164-ab4f28fe4ffb",
        name: "Perpetual Licenses",
      },
      unitOfMeasure: null,
      industries: [],
      chargeType: "Prepaid",
      unitGroup: {
        id: 17,
        name: "Recurring Charge",
      },
      productGroup: {
        id: "beacc598-05d6-4a03-afb0-0834abf41e67",
        name: "SQL Server 2019 Perpetual",
      },
      createdAt: "2021-01-20T09:14:51.59+11:00",
      updatedAt: "2021-02-02T09:44:15.2+11:00",
    },
    {
      id: "75f4fc98-a64a-46e1-9003-01dafa3a5ded",
      name: "Microsoft Defender for Office 365 (Plan 2)",
      code: "EFE1183A-8FA0-4138-BF0A-5AE271AB6E3C",
      type: "Addon",
      category: {
        id: "1e4b923a-3f31-434a-ad9f-013423f6afa2",
        name: "Office 365",
      },
      unitOfMeasure: {
        id: "ceadfc34-93e9-41af-a8a6-e970e607d46b",
        name: "Licenses",
      },
      industries: [],
      chargeType: "Prepaid",
      unitGroup: {
        id: 17,
        name: "Recurring Charge",
      },
      productGroup: null,
      createdAt: "2020-02-26T16:55:15.207+11:00",
      updatedAt: "2020-06-11T16:46:54.827+10:00",
    },
    {
      id: "b1846589-ca55-4c99-859f-02416220fd9c",
      name: "Office LTSC Standard for Mac 2021 (Commercial)",
      code: "DG7GMGF0D7D1:0002",
      type: "Primary",
      category: {
        id: "1e4b923a-3f31-434a-ad9f-013423f6afa2",
        name: "Office 365",
      },
      unitOfMeasure: null,
      industries: [],
      chargeType: "Prepaid",
      unitGroup: {
        id: 17,
        name: "Recurring Charge",
      },
      productGroup: {
        id: "a63fea59-4ee4-4286-8cfc-0fcda232e6c3",
        name: "Office 2021/2 Perpetual",
      },
      createdAt: "2021-10-17T10:22:05.903+11:00",
      updatedAt: "2021-10-26T10:29:49.75+11:00",
    },
    {
      id: "90440eec-3e27-41fd-9d75-02f03b2a4a9f",
      name: "SQL Server 2019 Standard Core - 2 Core License Pack (Commercial)",
      code: "DG7GMGF0FLR2:0002",
      type: "Primary",
      category: {
        id: "b69fb0bf-a035-476b-8164-ab4f28fe4ffb",
        name: "Perpetual Licenses",
      },
      unitOfMeasure: null,
      industries: [],
      chargeType: "Prepaid",
      unitGroup: {
        id: 17,
        name: "Recurring Charge",
      },
      productGroup: {
        id: "beacc598-05d6-4a03-afb0-0834abf41e67",
        name: "SQL Server 2019 Perpetual",
      },
      createdAt: "2021-01-20T09:14:52.957+11:00",
      updatedAt: "2021-02-02T09:44:15.2+11:00",
    },
  ],
  paging: {
    page: 1,
    size: 10,
    totalPages: 90,
    totalRecords: 899,
  },
  links: {
    self: "https://bss.leadercloud.com.au/api/products?pageIndex=1&pageSize=10",
    first:
      "https://bss.leadercloud.com.au/api/products?pageIndex=1&pageSize=10",
    last: "https://bss.leadercloud.com.au/api/products?pageIndex=90&pageSize=10",
    next: "https://bss.leadercloud.com.au/api/products?pageIndex=2&pageSize=10",
    previous: null,
  },
};

const ProductList = () => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(50);
  const [products, setProducts] = useState(response.data);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchText, setSearchText] = useState("");

  const onSearch = (e: any) => {
    e.preventDefault();
    if (searchText) {
      const formalizedSearchText = searchText.toLowerCase();
      setFilteredProducts(
        products.filter(
          ({ id, code, name }) =>
            id.toLowerCase().includes(formalizedSearchText) ||
            code.toLowerCase().includes(formalizedSearchText) ||
            name.toLowerCase().includes(formalizedSearchText)
        )
      );
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <>
      <Form onSubmit={onSearch}>
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
          <Button variant="outline-secondary" type="submit" id="search-btn">
            Search
          </Button>
        </InputGroup>
      </Form>
      {totalPage > 0 && (
        <Pagination page={page} changePage={setPage} totalPage={totalPage} />
      )}
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
          {filteredProducts.map(({ id, code, name }, index) => {
            return (
              <tr key={id}>
                <td>{index + 1}</td>
                <td>{id}</td>
                <td>{code}</td>
                <td>{name}</td>
                <td>
                  <Button variant="secondary">View</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default ProductList;
