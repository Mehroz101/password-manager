import { useEffect, useRef, useState } from "react";
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

const users = [
  {
    id: 1,
    name: "Mehroz Farooq",
    username: "@mehrozfarooq",
    img: ProfileImg,
    belongs: "Development",
  },
  {
    id: 2,
    name: "Fahad Ahmed",
    username: "@fahadahmed",
    img: ProfileImg,
    belongs: "Sales",
  },
  {
    id: 3,
    name: "Hairat Ali",
    username: "@hairatali",
    img: ProfileImg,
    belongs: "Support",
  },
  {
    id: 4,
    name: "Fahad Farooq",
    username: "@fahadfarooq",
    img: ProfileImg,
    belongs: "Networking",
  },
  {
    id: 5,

    name: "Mehroz Farooq",
    username: "@mehrozfarooq",
    img: ProfileImg,
    belongs: "Development",
  },
  {
    id: 6,

    name: "Fahad Ahmed",
    username: "@fahadahmed",
    img: ProfileImg,
    belongs: "Sales",
  },
  {
    id: 7,

    name: "Hairat Ali",
    username: "@hairatali",
    img: ProfileImg,
    belongs: "Support",
  },
  {
    id: 8,

    name: "Fahad Farooq",
    username: "@fahadfarooq",
    img: ProfileImg,
    belongs: "Networking",
  },
];

const Users_Page = () => {
  const [showActionBox, setShowActionBox] = useState<{
    [key: number]: boolean;
  }>({});
  const actionBoxRef = useRef<HTMLDivElement | null>(null);

  const handleActionBoxToggle = (userId: number) => {
    setShowActionBox((prevState) => {
      const newState = {
        ...prevState,
        [userId]: !prevState[userId], // Toggle value
      };
      console.log("Updated State:", newState);
      return newState;
    });
  };
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      actionBoxRef.current &&
      event.target &&
      !actionBoxRef.current.contains(event.target as Node) &&
      !(event.target as HTMLElement).closest(".allpassword_box_right")
    ) {
      setShowActionBox((prev) => {
        // Close all action boxes, except the one that's currently open
        const newShowActionBox = { ...prev };
        for (const id in newShowActionBox) {
          if (newShowActionBox[id] === true) {
            newShowActionBox[id] = false;
          }
        }
        return newShowActionBox;
      });
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <div className="users_page">
        <div className="user_top_card">
          <div className="top_card_left">
            <FontAwesomeIcon icon={faPeopleGroup} />
          </div>
          <div className="top_card_right">
            <p className="top_card_title">Number of users</p>
            <p className="top_card_number">
              12 <span className="totalusers">/20</span>
            </p>
          </div>
        </div>
        <div className="user_container">
          <h3>Users</h3>
          <div className="user_boxs">
            {users &&
              users.map((user, index) => (
                <div className="user_box" key={index}>
                  <div className="user_box_left">
                    <img src={user.img} alt="" />
                  </div>
                  <div className="user_box_center">
                    <div className="user_box_center_top">
                      <p className="user_box_name">{user.name} </p>
                      <p className="user_box_belongs">{user.belongs}</p>
                    </div>
                    <div className="user_box_center_bottom">
                      <p className="user_box_username">{user.username}</p>
                    </div>
                  </div>
                  <div className="user_box_right">
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      onClick={() => handleActionBoxToggle(user.id)}
                    />
                    {showActionBox[user.id] ? (
                      <>{console.log("true")}</>
                    ) : (
                      <>{console.log("false")}</>
                    )}
                    {showActionBox[user.id] ? (
                      <>
                        <div
                          ref={actionBoxRef}
                          className={`box_right_Action_dropdown ${
                            showActionBox[user.id]
                              ? "box_right_Action_show"
                              : "" // Only show for the clicked item
                          }`}
                        >
                          <span onClick={() => {}}>Copy Email</span>
                          <span onClick={() => {}}>Copy Password</span>
                          <span onClick={() => {}}>Delete</span>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="add_new_user">
          <button
            className="add_btn"
            onClick={() => navigate(ROUTES.ADDNEWUSER)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Users_Page;
