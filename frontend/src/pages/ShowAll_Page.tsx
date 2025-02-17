import React, { useState, useRef, useEffect } from "react";
import {
  faEllipsisVertical,
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
    account: "mehrozfarooq127@gmail.com",
    password: "*********234",
  },
  {
    id: 2,
    img: Google,
    title: "Facebook",
    account: "user1234@gmail.com",
    password: "*********567",
  },
  {
    id: 3,
    img: Google,
    title: "Twitter",
    account: "twituser678@gmail.com",
    password: "*********890",
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
  const [copyMessage, setCopyMessage] = useState<string>(""); // For showing feedback message
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

        // Provide feedback to the user
        setCopyMessage(
          `${type === "email" ? "Email" : "Password"} copied to clipboard.`
        );

        // Clear the message after a few seconds
        setTimeout(() => setCopyMessage(""), 3000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
        setCopyMessage("Failed to copy. Please try again.");
        setTimeout(() => setCopyMessage(""), 3000);
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
                <p className="activity_box_title">{password.title}</p>
                <p className="activity_box_account">{password.account}</p>
                <p className="activity_box_password">
                  {passwordVisibility[password.id]
                    ? password.password
                    : "*************"}{" "}
                  <FontAwesomeIcon
                    icon={
                      passwordVisibility[password.id]
                        ? faEyeSlash
                        : faEyeLowVision
                    }
                    onClick={() => handlePasswordVisibilityToggle(password.id)} // Toggle the password visibility
                  />
                </p>
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
        {copyMessage && (
          <div className="copy-feedback-message">{copyMessage}</div>
        )}{" "}
        {/* Display feedback */}
      </div>
    </div>
  );
};

export default ShowAll_Page;
