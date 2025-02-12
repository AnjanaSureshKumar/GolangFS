//import './App.css'
import View from "./car/View"
import List from "./car/List"
import Create from "./car/Create"
import {BrowserRouter,Routes,Route} from "react-router-dom";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<List/>}/>
            <Route path="/car/List" element={<List/>}/>
            <Route path="/car/Create" element={<Create/>}/>
            <Route path="/car/View" element={<View/>}/>
            <Route path="/car/car/Create" element={<Create/>}/>
            <Route path="/car/car/View" element={<View/>}/>
        </Routes>
      
      </BrowserRouter>
    </>
  );
}

export default App
