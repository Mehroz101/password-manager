import { useEffect, useState } from "react";
import "../styles/Users.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faPeopleGroup,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import ProfileImg from "../assets/profileImg.png";
import { ROUTES } from "../utils/routes";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CompanyUsersFetch } from "../services/CompanyServices";
import { companyUsers } from "../types/Types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Users_Page = () => {
  const [activeActionBoxId, setActiveActionBoxId] = useState<string | null>(null);
  const { userData } = useSelector((state: RootState) => state.profile);
  const navigate = useNavigate();

  const { data: usersData = [] } = useQuery<companyUsers[]>({
    queryKey: ["users"],
    queryFn: () => CompanyUsersFetch(userData?.user?.companyID as string),
    enabled: !!userData?.companyOwner,
  });

  const handleActionBoxToggle = (userId: string) => {
    setActiveActionBoxId((prev) => (prev === userId ? null : userId));
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".user_box_right")) {
      setActiveActionBoxId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="users_page">
      <div className="user_top_card">
        <div className="top_card_left">
          <FontAwesomeIcon icon={faPeopleGroup} />
        </div>
        <div className="top_card_right">
          <p className="top_card_title">Number of users</p>
          <p className="top_card_number">
            {usersData.length} <span className="totalusers">/20</span>
          </p>
        </div>
      </div>

      <div className="user_container">
        <h3>Users</h3>
        <div className="user_boxs">
          {usersData.map((user) => (
            <div className="user_box" key={user.id}>
              <div className="user_box_left">
                <img
                  src={
                    user?.profileImage
                      ? `http://localhost:5000/uploads/${user.profileImage}`
                      : ProfileImg
                  }
                  alt={user?.fullname || "User"}
                />
              </div>

              <div className="user_box_center">
                <div className="user_box_center_top">
                  <p className="user_box_name">
                    {user?.fullname || user?.username}
                  </p>
                </div>
                <div className="user_box_center_bottom">
                  <p className="user_box_username">{user?.username}</p>
                </div>
              </div>

              <div className="user_box_right">
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  onClick={(e) => {
                    e.stopPropagation(); // prevent triggering document click
                    handleActionBoxToggle(user.id);
                  }}
                />
                <div
                  className={`box_right_Action_dropdown ${
                    activeActionBoxId === user.id ? "box_right_Action_show" : ""
                  }`}
                >
                  <span onClick={() => {}}>Delete</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="add_new_user">
        <button className="add_btn" onClick={() => navigate(ROUTES.ADDNEWUSER)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
};

export default Users_Page;
