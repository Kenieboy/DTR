import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!employeeNumber) return; // Don't fetch if employeeNumber is empty
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5501/api/users/${employeeNumber}`
        );
        console.log(response.data);
        setEmployeeData(response.data);
        setError(null);
        if (!Array.isArray(response.data)) {
          setError("Invalid data format received.");
          setEmployeeData(null);
        } else if (response.data.length === 0) {
          setError("No data found for the provided employee number.");
          setEmployeeData(null);
          alert("No data found for the provided employee number.");
        }
      } catch (error) {
        setEmployeeData(null);
        setError("Error fetching employee data. Please try again.");
      }
      setLoading(false);
    };

    fetchData(); // Trigger fetchData when employeeNumber changes
  }, [employeeNumber]);

  const handleChange = (event) => {
    setEmployeeNumber(event.target.value);
  };

  return (
    <div className="App">
      <h1>Employee Data App</h1>
      <form>
        <label>
          Enter Employee Number:
          <input type="text" value={employeeNumber} onChange={handleChange} />
        </label>
      </form>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      {employeeData && Array.isArray(employeeData) && !loading && (
        <div>
          <h2>Employee Details</h2>
          {employeeData.map((employee, index) => (
            <div key={index}>
              <p>Name: {employee.username}</p>
              <p>Password: {employee.password}</p>
              {/* Add more fields as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
