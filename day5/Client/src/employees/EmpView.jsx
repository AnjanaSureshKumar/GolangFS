
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../header/PageHeader";
import axios from 'axios'
function EmpView() {
    const [employee, setEmp] = useState({id:'',name:'',department:'',position:''});
    const params= useParams();
    const readById = async () => {
        const baseUrl = "http://localhost:8080"
        try {
            const response = await axios.get(`${baseUrl}/employees/${params.id}`)
            const queriedEmp = response.data;
            setEmp(queriedEmp);
        } catch(error) {
            alert('Server Error');
        }
    };
    useEffect(() => {
        readById();
    },[]);
    return(
        <>
            <PageHeader/>
            
            <h3><a href="/employees/list" className="btn btn-light">Go Back</a>View Emp</h3>
            <div className="container">
                <div className="form-group mb-3">
                    <label for="name" className="form-label">Emp Name:</label>
                    <div className="form-control" id="name">{employee.name}</div>
                </div>
                <div className="form-group mb-3">
                    <label for="department" className="form-label">Emp Department:</label>
                    <div className="form-control" id="department">{employee.department}</div>
                </div>
                <div className="form-group mb-3">
                    <label for="type" className="form-label">Emp Position:</label>
                    <div className="form-control" id="type">{employee.position}</div>
                </div>
            </div>
        </>
    );
}

export default EmpView;
