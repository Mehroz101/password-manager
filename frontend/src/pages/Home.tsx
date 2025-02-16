import {
  faClipboard,
  faCreditCard,
  faPaperclip,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/HomePage.css";
import Netflix from "../assets/netflix.png";
import Whatsapp from "../assets/whatsapp.png";
import Google from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import SearchBox from "../components/SearchBox";
const Home = () => {
  return (
    <>
      <div className="home_page">
        <SearchBox />
        <div className="home_page_category_container">
          <h3 className="section_heading">Category</h3>
          <div className="home_page_category_boxs">
            <div className="home_page_category_box box_1">
              <div className="home_page_category_box_icon">
                <FontAwesomeIcon icon={faCreditCard} />
              </div>
              <p>Card</p>
            </div>
            <div className="home_page_category_box box_2">
              <div className="home_page_category_box_icon">
                <FontAwesomeIcon icon={faShield} />
              </div>
              <p>Login</p>
            </div>
            <div className="home_page_category_box box_3">
              <div className="home_page_category_box_icon">
                <FontAwesomeIcon icon={faPaperclip} />
              </div>
              <p>API</p>
            </div>
            <div className="home_page_category_box box_3">
              <div className="home_page_category_box_icon">
                <FontAwesomeIcon icon={faPaperclip} />
              </div>
              <p>API</p>
            </div>
          </div>
        </div>
        <div className="home_page_recent_activity_container">
          <h3 className="section_heading">Recent Activity</h3>
          <div className="home_page_recent_activity_boxs">
            <div className="home_page_recent_activity_box">
              <div className="recent_activity_box_left">
                <img src={Google} alt="google" />
              </div>
              <div className="recent_activity_box_center">
                <p className="activity_box_title">Google</p>
                <p className="activity_box_account">
                  mehrozfarooq127@gmail.com
                </p>
                <p className="activity_box_account">
                  <span>Last Edited: 24/07/2024</span> <span>12:30pm</span>
                </p>
              </div>
              <div className="recent_activity_box_right">
                <FontAwesomeIcon icon={faClipboard} />
              </div>
            </div>
            <div className="home_page_recent_activity_box">
              <div className="recent_activity_box_left">
                <img src={Netflix} alt="google" />
              </div>
              <div className="recent_activity_box_center">
                <p className="activity_box_title">Netflix</p>
                <p className="activity_box_account">fadiarain@gmail.com</p>
                <p className="activity_box_account">
                  <span>Last Used: 25/07/2024</span> <span>1:30pm</span>
                </p>
              </div>
              <div className="recent_activity_box_right">
                <FontAwesomeIcon icon={faClipboard} />
              </div>
            </div>
            <div className="home_page_recent_activity_box">
              <div className="recent_activity_box_left">
                <img src={Whatsapp} alt="google" />
              </div>
              <div className="recent_activity_box_center">
                <p className="activity_box_title">Whatsapp</p>
                <p className="activity_box_account">03061756719</p>
                <p className="activity_box_account">
                  <span>Last View: 24/01/2025</span> <span>2:30pm</span>
                </p>
              </div>
              <div className="recent_activity_box_right">
                <FontAwesomeIcon icon={faClipboard} />
              </div>
            </div>
            <div className="home_page_recent_activity_box">
              <div className="recent_activity_box_left">
                <img src={Whatsapp} alt="google" />
              </div>
              <div className="recent_activity_box_center">
                <p className="activity_box_title">Whatsapp</p>
                <p className="activity_box_account">03061756719</p>
                <p className="activity_box_account">
                  <span>Last View: 24/01/2025</span> <span>2:30pm</span>
                </p>
              </div>
              <div className="recent_activity_box_right">
                <FontAwesomeIcon icon={faClipboard} />
              </div>
            </div>
            <div className="home_page_recent_activity_box">
              <div className="recent_activity_box_left">
                <img src={Whatsapp} alt="google" />
              </div>
              <div className="recent_activity_box_center">
                <p className="activity_box_title">Whatsapp</p>
                <p className="activity_box_account">03061756719</p>
                <p className="activity_box_account">
                  <span>Last View: 24/01/2025</span> <span>2:30pm</span>
                </p>
              </div>
              <div className="recent_activity_box_right">
                <FontAwesomeIcon icon={faClipboard} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
