
import { useEffect, useState } from "react";
import PageHeader from "../header/PageHeader";
import axios from 'axios'
function EmpList() {
    const [employees, setEmps]= useState([{id:'',name:'',department:'',position:''}])
    const readAllEmps = async () => {
        try {
            const baseUrl = 'http://localhost:8080';
            const response = await axios.get(`${baseUrl}/employees`);
            const queriedEmps = response.data;
            setEmps(queriedEmps);
        } catch(error) {
            alert('Server Error');
        }
    };
    

    const deleteEmp = async (id) => {
        if(!confirm("Are you sure to delete?")) {
            return;
        }
        const baseUrl = "http://localhost:8080"
        try {
            const response = await axios.delete(`${baseUrl}/employees/${id}`)
            alert(response.data.message)
            await readAllEmps();
        } catch(error) {
            alert('Server Error');
        }
    };
    
    useEffect(()=>{
        readAllEmps();
    },[]);
    return (
        <>
            <PageHeader />
            <h3>List of Emps</h3>
            <div className="container">
                <table className="table table-success table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Emp Name</th>
                            <th scope="col">Department</th>
                            <th scope="col">Position</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody> 
                        
                        {(employees && employees.length > 0) ? employees.map(
                            (employee) =>  {return (<tr key={employee.id}>
                            <th scope="row">{employee.id}</th>
                            <td>{employee.name}</td>
                            <td>{employee.department}</td>
                            <td>{employee.position}</td>
                            <td><a href={`/employees/view/${employee.id}`} 
                                className="btn btn-success">View</a>
                                &nbsp;
                                <a href={`/employees/edit/${employee.id}`} 
                                className="btn btn-warning">Edit</a>
                                &nbsp;
                                <button  
                                className="btn btn-danger"
                                onClick={()=>deleteEmp(employee.id)}>Delete</button></td>
                        </tr>);}
                        ) : <tr><td colspan="5">No Data Found</td></tr>}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default EmpList;
