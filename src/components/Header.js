import { useNavigate } from "react-router-dom";

function Header(props) {
  let navigate = useNavigate();
  return (
    <>
      <header className={"row justify-content-center " + props.color}>
        <div className="col-10 d-flex justify-content-between py-2">
          <div className="text-white">
            <p onClick={() => navigate("/")}>get the app</p>
          </div>

          <div className=" d-lg-flex">
            <button
              className="btn text-white"
              data-bs-toggle="modal"
              data-bs-target="#google-sign-in"
            >
              Investor Relations
            </button>
            <button className="btn text-white">Add restaurant</button>
            <button
              className="btn text-white"
              data-bs-toggle="modal"
              data-bs-target="#google-sign-in"
            >
              Log in
            </button>
            <button className="btn text-white">Sign up</button>
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;
