function Navbar(){

    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-info bg-danger">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Car Management System</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
              <li className="nav-item">
                <a className="nav-link active " aria-current="page" href="/">Cars List</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="car/Create">Add Cars</a>
              </li>
             </ul>
            
          </div>
        </div>
      </nav>
      </>
    );
  }
  
  export default Navbar;