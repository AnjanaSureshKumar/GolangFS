
import EmpList from './employees/EmpList'
import EmpCreate from './employees/EmpCreate'
import EmpView from './employees/EmpView'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmpEdit from './employees/EmpEdit';


function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<EmpList/>}/>
            <Route path="/employees/list" element={<EmpList/>}/>
            <Route path="/employees/create" element={<EmpCreate/>}/>
            <Route path="/employees/view/:id" element={<EmpView/>}/>
            <Route path="/employees/edit/:id" element={<EmpEdit/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
