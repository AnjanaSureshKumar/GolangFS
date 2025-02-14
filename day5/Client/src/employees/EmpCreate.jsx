import { useState } from "react";
import PageHeader from "../header/PageHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EmpCreate() {
    const [employee, setEmployee] = useState({ name: "", department: "", position: "" });
    const navigate = useNavigate();
    const baseUrl = "http://localhost:8080";

    const handleInputChange = (event) => {
        setEmployee({ ...employee, [event.target.id]: event.target.value });
    };

    const createEmployee = async () => {
        try {
            const response = await axios.post(`${baseUrl}/employees`, employee, {
                headers: { "Content-Type": "application/json" }
            });
            alert(response.data.message);
            navigate("/employees/list");
        } catch (error) {
            console.error("Error creating employee:", error.response ? error.response.data : error);
            alert("Server Error");
        }
    };

    return (
        <>
            <PageHeader />
            <h3>
                <a href="/employees/list" className="btn btn-light">Go Back</a> Add Employee
            </h3>
            <div className="container">
                <div className="form-group mb-3">
                    <label htmlFor="name" className="form-label">Employee Name:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name"
                        placeholder="Enter employee name"
                        value={employee.name}
                        onChange={handleInputChange} 
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="department" className="form-label">Department:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="department"
                        placeholder="Enter department"
                        value={employee.department}
                        onChange={handleInputChange} 
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="position" className="form-label">Position:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="position"
                        placeholder="Enter position"
                        value={employee.position}
                        onChange={handleInputChange} 
                    />
                </div>
                <button className="btn btn-primary" onClick={createEmployee}>
                    Create Employee
                </button>
            </div>
        </>
    );
}

export default EmpCreate;
