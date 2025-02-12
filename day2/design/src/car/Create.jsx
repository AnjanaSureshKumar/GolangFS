import Navbar from '../header/Navbar';
function Create() {
  return (
    <>
      <Navbar/> 
      <h3>
        <a href="/" className="btn btn-light">
          Go back
        </a>
        Add Cars
      </h3>
      <div className="container bg-primary-subtle">
        <div className="form-group mb-3">
          <label htmlFor="number" className="form-label">
            Car Number:
          </label>
          <input
            type="text"
            className="form-control"
            id="number"
            placeholder="Please enter car number:"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="model" className="form-label">
            Car Model:
          </label>
          <input
            type="text"
            className="form-control"
            id="model"
            placeholder="Please enter car model:"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="type" className="form-label">
            Car Type:
          </label>
          <input
            type="text"
            className="form-control"
            id="type"
            placeholder="Please enter car type:"
          />
        </div>
        <button className="btn btn-danger">Create Cars</button>
      </div>
    </>
  );
}

export default Create;
