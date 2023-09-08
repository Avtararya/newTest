import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const columns = [
  { field: "customer_id", headerName: "Customer ID", width: 120 },
  {
    field: "genre",
    headerName: "Genre",
    width: 120,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 120,
    editable: true,
  },
  {
    field: "annual_income",
    headerName: "Annual Income (k$)",
    type: "number",
    width: 160,
    editable: true,
  },
  {
    field: "spending_score",
    headerName: "Spending Score",
    type: "number",
    width: 160,
    editable: true,
  },
];

export default function DataGridDemo() {
  const [type, setType] = React.useState("genre");
  const [query, setQuery] = React.useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/customers/").then((response) => {
      console.log("API Response Data:", response.data); // Add this line for debugging
      setData(response.data);
      setFilteredData(response.data);
    });
  }, []);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleSub = async () => {
    // Send a POST request to filter customers
    const res = await axios.post("http://localhost:8000/api/filter/", {
      query,
      type,
    });
    setFilteredData(res.data);
  };

  const handleSub1 = (inputQuery) => {
    // Locally filter data based on the query and type
    const filteredData = data.filter((row) => {
      if (type === "genre" && row.Genre) {
        return row.Genre.toLowerCase().includes(inputQuery.toLowerCase());
      } else if (type === "age" && row.Age !== undefined) {
        return row.Age === parseInt(inputQuery, 10);
      } else if (
        type === "annual_income" &&
        row["Annual_Income_(k$)"] !== undefined
      ) {
        return row["Annual_Income_(k$)"] === parseInt(inputQuery, 10);
      } else if (
        type === "spending_score" &&
        row.Spending_Score !== undefined
      ) {
        return row.Spending_Score === parseInt(inputQuery, 10);
      }
      return true; // Default to true (no filter) if type is not recognized
    });

    setFilteredData(filteredData);
  };

  return (
    <Box sx={{ height: 400, width: "100%", margin: "50px" }}>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        value={query}
        onChange={(e) => {
          const inputValue = e.target.value;
          setQuery(inputValue);
          handleSub1(inputValue); // Locally filter data as the user types
        }}
      />

      <Box sx={{ minWidth: 120, marginTop: "30px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Filter By"
            onChange={handleChange}
          >
            <MenuItem value={"genre"}>Genre</MenuItem>
            <MenuItem value={"age"}>Age</MenuItem>
            <MenuItem value={"annual_income"}>Annual Income</MenuItem>
            <MenuItem value={"spending_score"}>Spending Score</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Button
        sx={{ marginTop: "30px" }}
        variant="contained"
        onClick={handleSub}
      >
        Search
      </Button>

      <DataGrid
        rows={filteredData}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(row) => row.customer_id}
      />
    </Box>
  );
}

// import React, { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import { DataGrid } from "@mui/x-data-grid";
// import axios from "axios";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";

// const columns = [
//   { field: "CustomerID", headerName: "Customer ID", width: 120 },
//   {
//     field: "Genre",
//     headerName: "Genre",
//     width: 120,
//     editable: true,
//   },
//   {
//     field: "Age",
//     headerName: "Age",
//     type: "number",
//     width: 120,
//     editable: true,
//   },
//   {
//     field: "Annual_Income_(k$)",
//     headerName: "Annual Income (k$)",
//     type: "number",
//     width: 160,
//     editable: true,
//   },
//   {
//     field: "Spending_Score",
//     headerName: "Spending Score",
//     type: "number",
//     width: 160,
//     editable: true,
//   },
// ];

// export default function DataGridDemo() {
//   const [type, setType] = React.useState("genre");
//   const [query, setQuery] = React.useState("");
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:8000/api/customers/").then((response) => {
//       console.log("API Response Data:", response.data); // Add this line for debugging
//       setData(response.data);
//       setFilteredData(response.data);
//     });
//   }, []);

//   const handleChange = (event) => {
//     setType(event.target.value);
//   };

//   const handleSub = async () => {
//     // Send a POST request to filter customers
//     const res = await axios.post("http://localhost:8000/api/filter/", {
//       query,
//       type,
//     });
//     setFilteredData(res.data);
//   };

//   const handleSub1 = () => {
//     // Locally filter data based on the query and type
//     const filteredData = data.filter((row) => {
//       if (type === "genre" && row.genre) {
//         return row.genre.toLowerCase().includes(query.toLowerCase());
//       } else if (type === "age" && row.age !== undefined) {
//         return row.age === parseInt(query, 10);
//       } else if (type === "annual_income" && row.annual_income !== undefined) {
//         return row.annual_income === parseInt(query, 10);
//       } else if (
//         type === "spending_score" &&
//         row.spending_score !== undefined
//       ) {
//         return row.spending_score === parseInt(query, 10);
//       }
//       return true; // Default to true (no filter) if type is not recognized
//     });

//     setFilteredData(filteredData);
//   };

//   return (
//     <Box sx={{ height: 400, width: "100%", margin: "50px" }}>
//       <TextField
//         id="outlined-basic"
//         label="Search"
//         variant="outlined"
//         value={query}
//         onChange={(e) => {
//           setQuery(e.target.value);
//           handleSub1(); // Locally filter data as the user types
//         }}
//       />

//       <Box sx={{ minWidth: 120, marginTop: "30px" }}>
//         <FormControl fullWidth>
//           <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             value={type}
//             label="Filter By"
//             onChange={handleChange}
//           >
//             <MenuItem value={"genre"}>Genre</MenuItem>
//             <MenuItem value={"age"}>Age</MenuItem>
//             <MenuItem value={"annual_income"}>Annual Income</MenuItem>
//             <MenuItem value={"spending_score"}>Spending Score</MenuItem>
//           </Select>
//         </FormControl>
//       </Box>

//       <Button
//         sx={{ marginTop: "30px" }}
//         variant="contained"
//         onClick={handleSub}
//       >
//         Search
//       </Button>

//       <DataGrid
//         rows={filteredData}
//         columns={columns}
//         pageSize={5}
//         checkboxSelection
//         disableSelectionOnClick
//         getRowId={(row) => row.CustomerID}
//       />
//     </Box>
//   );
// }
