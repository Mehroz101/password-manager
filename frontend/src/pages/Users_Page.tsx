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
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CompanyUsersFetch, DeleteUserFromCompany } from "../services/CompanyServices";
import { companyUsers } from "../types/Types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { notify } from "../utils/notification";

const Users_Page = () => {
  const [activeActionBoxId, setActiveActionBoxId] = useState<string | null>(null);
  const { userData } = useSelector((state: RootState) => state.profile);
  const navigate = useNavigate();
const queryClient = useQueryClient();
  const { data: usersData = [] } = useQuery<companyUsers[]>({
    queryKey: ["users"],
    queryFn: () => CompanyUsersFetch(userData?.user?.companyID as string),
    enabled: !!userData?.companyOwner,
  });
  const deleteUserMutation = useMutation({
    mutationFn: DeleteUserFromCompany,
    onSuccess: (data) => {
      if(data.success){
        // Invalidate the query to refetch the data
        queryClient.invalidateQueries({ queryKey: ["users"] });
        notify({ type: "success", message: data.message });
      }
      else{
        notify({ type: "error", message: data.message });
      }
    },
  });

  const handleActionBoxToggle = (userId: string) => {
    console.log("User ID:", userId);
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
            {usersData?.length} <span className="totalusers">/20</span>
          </p>
        </div>
      </div>

      <div className="user_container">
        <h3>Users</h3>
        <div className="user_boxs">
          {usersData?.length === 0 && (
            <div className="no_user">
              <p className="company_register_text">
          Register a company to enable advanced features{" "}
          <Link to={ROUTES.COMPANYREGISTER}>click here</Link>
        </p>
            </div>
          )}
          {/* Display the list of users */}
          {usersData.length > 0 && usersData.map((user) => (
            <div className="user_box" key={user._id}>
              <div className="user_box_left">
                <img
                  src={
                    user?.profileImg
                      ? `http://localhost:5000/uploads/${user.profileImg}`
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
                    handleActionBoxToggle(user._id);
                  }}
                />
                <div
                  className={`box_right_Action_dropdown ${
                    activeActionBoxId === user._id ? "box_right_Action_show" : ""
                  }`}
                >
                  <span onClick={() => {deleteUserMutation.mutate(user._id)}}>Delete</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {usersData?.length > 0 && (
      <div className="add_new_user">
        <button className="add_btn" onClick={() => navigate(ROUTES.ADDNEWUSER)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      )}
    </div>
  );
};

export default Users_Page;
