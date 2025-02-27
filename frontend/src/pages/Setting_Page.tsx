import React from "react";
import "../styles/Setting.css";
import CInput from "../components/FormComponent/CInput";
import CButton from "../components/FormComponent/CButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import Netflix from "../assets/whatsapp.png";

const Setting_Page = () => {
  return (
    <>
      <div className="setting_page">
        {/* <div className="setting_top_card">
          <div className="top_card_left">
            <img src={Netflix} alt="appicon" />
          </div>
          <div className="top_card_right">
            <div className="top_card_right_top">
              <p className="top_card_title">Edusoft System Solution</p>
              <p className="top_card_category">Development</p>
              <FontAwesomeIcon icon={faSignOut} />
            </div>
            <div className="top_card_right_bottom">
              <p className="activity_box_account">
                <span>Joined Since</span> <span>12/07/2024</span>
              </p>
            </div>
          </div>
        </div> */}
        <div className="setting_form">
          <form action="" autoComplete="off">
            <CInput
              type="text"
              placeholder="Username"
              id="username"
              label="Username"
              disabled={true}
            />
            <CInput
              type="text"
              placeholder="Full Name"
              id="fullname"
              label="Full Name"
            />
            <CInput
              type="password"
              placeholder="Old Password"
              id="password"
              label="Old Password"
            />
            <CInput
              type="password"
              placeholder="New Password"
              id="password"
              label="New Password"
            />
            <CButton label="Update" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Setting_Page;
