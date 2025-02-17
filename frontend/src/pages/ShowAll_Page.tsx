import React, { useState, useRef, useEffect } from "react";
import {
  faEllipsisVertical,
  faEye,
  faEyeLowVision,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Google from "../assets/google.png";
import "../styles/ShowAll.css";
import SearchBox from "../components/SearchBox";

// Example of dynamic data for the password boxes
const passwordData = [
  {
    id: 1,
    img: Google,
    title: "Google",
    account: "mehrozfarooq127111111111111111111@gmail.com",
    password: "12343423412222222222222222222222222222",
  },
  {
    id: 2,
    img: Google,
    title: "Facebook",
    account: "user1234@gmail.com",
    password: "12343456712222222222222222222222222222",
  },
  {
    id: 3,
    img: Google,
    title: "Twitter",
    account: "twituser678@gmail.com",
    password: "12343489012222222222222222222222222222",
  },
  // Other items...
];

const ShowAll_Page = () => {
  const [showActionBox, setShowActionBox] = useState<{
    [key: number]: boolean;
  }>({});
  const [passwordVisibility, setPasswordVisibility] = useState<{
    [key: number]: boolean;
  }>({});
  const actionBoxRef = useRef<HTMLDivElement | null>(null);

  const handleActionBoxToggle = (accountId: number) => {
    setShowActionBox((previousState) => ({
      ...previousState,
      [accountId]: !previousState[accountId],
    }));
  };

  const handlePasswordVisibilityToggle = (id: number) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle password visibility
    }));
  };

  // Fallback clipboard copy function
  const handleCopyToClipboard = async (
    type: "email" | "password",
    id: number
  ) => {
    const passwordEntry = passwordData.find((entry) => entry.id === id);

    if (passwordEntry) {
      const textToCopy =
        type === "email" ? passwordEntry.account : passwordEntry.password;

      try {
        if (navigator.clipboard) {
          // Modern Clipboard API
          await navigator.clipboard.writeText(textToCopy);
          console.log(
            `${
              type === "email" ? "Email" : "Password"
            } copied to clipboard: ${textToCopy}`
          );
        } else {
          // Fallback for older browsers (execCommand)
          const textArea = document.createElement("textarea");
          textArea.value = textToCopy;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
          console.log(
            `${
              type === "email" ? "Email" : "Password"
            } copied to clipboard (fallback)`
          );
        }

        // Clear the message after a few seconds
        setShowActionBox((prev) => ({
          ...prev,
          [id]: false,
        }));
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
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

  return (
    <div className="showall_page">
      <SearchBox />
      <div className="showall_password_container">
        <h3>Password</h3>
        <div className="showall_password_boxs">
          {/* Dynamically render password boxes */}
          {passwordData.map((password) => (
            <div className="allpassword_box" key={password.id}>
              <div className="allpassword_box_left">
                <img src={password.img} alt={password.title} />
              </div>
              <div className="allpassword_box_center">
                <p className="allpassword_title">{password.title}</p>
                <p className="allpassword_account">{password.account}</p>
                <div className="password">
                  <p className="allpassword_password">
                    {passwordVisibility[password.id]
                      ? password.password
                      : "*************"}{" "}
                  </p>
                  <FontAwesomeIcon
                    icon={
                      passwordVisibility[password.id] ? faEye : faEyeLowVision
                    }
                    onClick={() => handlePasswordVisibilityToggle(password.id)} // Toggle the password visibility
                  />
                </div>
              </div>
              <div className="allpassword_box_right">
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  onClick={() => handleActionBoxToggle(password.id)} // Toggle the action box
                />
                <div
                  ref={actionBoxRef}
                  className={`box_right_Action_dropdown ${
                    showActionBox[password.id] ? "box_right_Action_show" : "" // Only show for the clicked item
                  }`}
                >
                  <span
                    onClick={() => handleCopyToClipboard("email", password.id)}
                  >
                    Copy Email
                  </span>
                  <span
                    onClick={() =>
                      handleCopyToClipboard("password", password.id)
                    }
                  >
                    Copy Password
                  </span>
                  <span onClick={() => handleActionBoxToggle(password.id)}>
                    Delete
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowAll_Page;
