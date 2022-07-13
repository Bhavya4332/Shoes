import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const ShoesTable = () => {
  const [shoes, setShoes] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredShoes, setFilteredShoes] = useState([]);

  const getShoes = async () => {
    try {
      const response = await fetch("https://retoolapi.dev/77Oh5m/data");
      const data = await response.json();
      setShoes(data);
      setFilteredShoes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "tamw",
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: "Size",
      selector: (row) => row.Size,
      sortable: true,
    },
    {
      name: "Color",
      selector: (row) => row.Color,
    },
    {
      name: "Price",
      selector: (row) => row.Price,
      sortable: true,
    },
    {
      name: "Brannd",
      selector: (row) => row.Brannd,
    },
    {
      name: "Ratings",
      selector: (row) => row.Ratings,
    },
    {
      name: "Quantity",
      selector: (row) => row.Quantity,
    },
  ];

  useEffect(() => {
    getShoes();
  }, []);

  useEffect(() => {
    const result = shoes.filter((shoe) => {
      console.log(shoe.Name);
      if (search === "") {
        return shoe;
      } else shoe.Name.toLowerCase().match(search.toLowerCase());
      return shoe;
    });
    setFilteredShoes(result);
  }, [search]);

  return (
    <DataTable
      title="Shoes List"
      columns={columns}
      data={filteredShoes}
      pagination
      fixedHeader
      fixedHeaderScrollHeight="600px"
      selectableRows
      selectableRowsHighlight
      highlightOnHover
      subHeader
      subHeaderComponent={
        <input
          type="text"
          placeholder="Search here"
          className="w-50 form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      }
    />
  );
};
export default ShoesTable;
