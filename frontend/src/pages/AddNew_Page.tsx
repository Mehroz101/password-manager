import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchBox from "../components/SearchBox";
import "../styles/AddNewPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
const AddNew_Page = () => {
  const naviagte = useNavigate();
  return (
    <>
      <div className="add_new_page">
        <SearchBox />
        <div className="add_new_categories">
          <div className="add_new_category">
            <FontAwesomeIcon icon={faPlus} />
            <p>Add</p>
          </div>
          <div className="add_new_category">
            <p>Twitter</p>
          </div>
          <div className="add_new_category">
            <p>Instagram</p>
          </div>
          <div className="add_new_category">
            <p>Facebook</p>
          </div>
          <div className="add_new_category">
            <p>Google</p>
          </div>
          <div className="add_new_category">
            <p>Netflix</p>
          </div>
        </div>
        <div className="add_new_form">
          <form action="">
            <div className="add_new_field">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="Username" />
            </div>
            <div className="add_new_field">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="Email" />
            </div>
            <div className="add_new_field">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Password" />
            </div>
            <div className="auth_page_btn action_btn">
              <button
                style={{ width: "100%" }}
                onClick={() => {
                  navigate("/");
                }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNew_Page;
