import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState([]);
  const table_headers = [
    { label: "No", key: "no" },
    { label: "Category", key: "category" },
  ];

  const getDataFromUrl = async () => {
    const url = "https://api.publicapis.org/categories";
    await axios.get(url).then((response) => {
      console.log(response.data);
      setData(response.data);
      setShowData(response.data);
    });
  };
  useEffect(() => {
    getDataFromUrl();
  }, []);

  const onFilter = (value) => {
    let temp_data = [...data];
    temp_data = temp_data.filter((element) =>
      element.toLowerCase().includes(value.toLowerCase())
    );
    setShowData(temp_data);
  };

  return (
    <div>
      <label>
        Search:
        <input
          type="text"
          name="filter"
          onChange={(e) => {
            onFilter(e.target.value);
          }}
        />
      </label>
      <table>
        <thead>
          <tr>
            {table_headers.map((ele) => (
              <th key={ele.key}>{ele.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {showData.map((ele, index) => (
            <tr key={index + 1}>
              <th>{index + 1}</th>
              <th>{ele}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
