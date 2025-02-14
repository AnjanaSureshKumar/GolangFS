import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../header/PageHeader";
import axios from "axios";

function EmpEdit() {
    const [employee, setEmployee] = useState({ name: "", department: "", position: "" });
    const { id } = useParams();
    const navigate = useNavigate();
    const baseUrl = "http://localhost:8080";

    // Fetch employee details by ID
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`${baseUrl}/employees/${id}`);
                setEmployee(response.data);
            } catch (error) {
                console.error("Error fetching employee:", error.response ? error.response.data : error);
                alert("Error fetching employee data.");
            }
        };
        fetchEmployee();
    }, [id]);

    // Handle input field changes
    const handleInputChange = (event) => {
        setEmployee({ ...employee, [event.target.id]: event.target.value });
    };

    // Update Employee
    const updateEmployee = async () => {
        if (!employee.name || !employee.department || !employee.position) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.put(`${baseUrl}/employees/${id}`, employee, {
                headers: { "Content-Type": "application/json" }
            });
            alert(response.data.message);
            navigate("/employees/list");
        } catch (error) {
            console.error("Error updating employee:", error.response ? error.response.data : error);
            alert("Error updating employee.");
        }
    };

    return (
        <>
            <PageHeader />
            <h3>
                <button onClick={() => navigate("/employees/list")} className="btn btn-light">
                    Go Back
                </button>
                Edit Employee
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
                <button className="btn btn-warning" onClick={updateEmployee}>
                    Update Employee
                </button>
            </div>
        </>
    );
}

export default EmpEdit;
