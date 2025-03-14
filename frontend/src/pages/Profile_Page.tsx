import "../styles/Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCircleInfo,
  faEdit,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons/faPeopleGroup";
import { ROUTES } from "../utils/routes";
import { useMutation } from "@tanstack/react-query";
import {
  UpdateProfileImg,
} from "../services/UserProfileService";
const API_URL = import.meta.env.REACT_APP_API_IMAGE_URL;
import profileImg from "../assets/profileImg.png";

import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getProfileData } from "../redux/ProfileSlice/ProfileSlice";
import { notify } from "../utils/notification";
const Profile_Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state.profile);
  const navigate = useNavigate();
  // const { data: userdata } = useQuery<ResponseInterface>({
  //   queryKey: ["userdata"],
  //   queryFn: GetUserProfileData,
  // });
  const profileImgUpdateMutation = useMutation({
    mutationFn: UpdateProfileImg,
    onSuccess:(data)=>{
      if(data.success)
      {
        dispatch(getProfileData())
        notify({type:"success",message:data.message})
      }
      else{
        notify({type:"error",message:data.message})

      }
    }
  });
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Ensure a file exists
    if (file) {
      profileImgUpdateMutation.mutate({ profileImg: file });
    }
  };
  const handleFileClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const stats = [
    { title: "Total Password", count: userData?.passwords },
    { title: "Departments", count: 5 },
    { title: "Employees", count: 10 },
    { title: "Reused", count: 230 },
  ];
  const menuItems = [
    {
      id: 1,
      title: "Setting",
      icon: faGear,
      action: () => navigate(ROUTES.SETTING),
    },
    {
      id: 2,
      title: "Users",
      icon: faPeopleGroup,
      action: () => navigate(ROUTES.USERS),
    },
    { id: 3, title: "Help Center", icon: faCircleInfo },
    {
      id: 4,
      title: "Logout",
      icon: faArrowRightFromBracket,
      action: () => {
        localStorage.removeItem("passwordmanager");
        navigate(ROUTES.AUTH);
      },
    },
  ];

  return (
    <div className="profile_page">
      {/* Profile Header */}
      <div className="profile_page_top">
        <div className="profile_img">
          <img
            src={
              userData?.user.profileImg
                ? `${API_URL}/uploads/${userData?.user.profileImg}`
                : profileImg
            }
            alt="Profile"
          />
          <div className="edit_profileImg">
            <FontAwesomeIcon icon={faEdit} onClick={handleFileClick} />
            <input
              type="file"
              ref={inputFileRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="profileImg"
              accept="image/*"
            />
          </div>
        </div>
        <h3 className="userorignalname">{userData?.user.fullname || "No Name" }</h3>
        <span className="username">@{userData?.user.username}</span>
      </div>

      {/* Profile Stats */}
      <div className="profile_page_cards">
        {stats.map((stat, index) => (
          <div className="profile_page_card" key={index}>
            <span className="card_title">{stat.title}</span>
            <span className="card_number">{stat.count}</span>
          </div>
        ))}
      </div>

      {/* Menu Items */}
      <div className="profile_page_menus">
        {menuItems.map((item, index) => (
          <div
            className={`profile_page_menu menu_${item.id}`}
            key={index}
            onClick={item.action ? item.action : undefined}
          >
            <div className="menu_left">
              <FontAwesomeIcon icon={item.icon} />
            </div>
            <div className="menu_right">
              <span>{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile_Page;
