import React, { useState, useRef, useEffect } from "react";
import {
  faEllipsisVertical,
  faEye,
  faEyeLowVision,
  faClipboard,
  faCreditCard,
  faPaperclip,
  faShield,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Google from "../assets/google.png";
import "../styles/ShowAll.css";
import SearchBox from "../components/SearchBox";
import { Category, GetAllPasswordResponse } from "../types/Types";
import CategoryCard from "../components/CategoryCard";
import { useQuery } from "@tanstack/react-query";
import { GetAllPassword } from "../services/PasswordServices";

const category_cards = [
  {
    icon: faCreditCard,
    title: "Card",
    cardNo: 1,
  },
  {
    icon: faClipboard,
    title: "Password",
    cardNo: 2,
  },
  {
    icon: faShield,
    title: "Login",
    cardNo: 3,
  },
  {
    icon: faPaperclip,
    title: "API",
    cardNo: 4,
  },
];
// Example of dynamic data for the password boxes
const passwordData1 = [
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
  const [categories, setCategories] = useState<Category[]>([]);
  const { data: passwordData } = useQuery<GetAllPasswordResponse[]>({
    queryKey: ["passworddata"],
    queryFn: GetAllPassword,
  });
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
    const passwordEntry = passwordData?.find(
      (entry) => entry.passwordID === id
    );

    if (passwordEntry) {
      const textToCopy =
        type === "email" ? passwordEntry.email : passwordEntry.password;

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
  useEffect(() => {
    if (category_cards) {
      setCategories(category_cards);
    }
  }, [category_cards]);

  return (
    <div className="showall_page">
      <SearchBox />
      <div className="category_container">
        <h3 className="section_heading">Category</h3>
        <div className="category_boxs">
          {categories &&
            categories.map((category, index) => (
              <CategoryCard key={index} category={category} />
            ))}
        </div>
      </div>
      <div className="showall_password_container">
        <h3>Password</h3>
        <div className="showall_password_boxs">
          {/* Dynamically render password boxes */}
          {passwordData &&
            passwordData.map((password, index) => (
              <div className="allpassword_box" key={index}>
                <div className="allpassword_box_left">
                  <img src={password.passwordImg} alt={password.appName} />
                </div>
                <div className="allpassword_box_center">
                  <p className="allpassword_title">{password.appName}</p>
                  <p className="allpassword_account">
                    {password.email ? password.email : password.username}
                  </p>
                  <div className="password">
                    <p className="allpassword_password">
                      {passwordVisibility[password.passwordID]
                        ? password.password
                        : "*************"}{" "}
                    </p>
                    <FontAwesomeIcon
                      icon={
                        passwordVisibility[password.passwordID]
                          ? faEye
                          : faEyeLowVision
                      }
                      onClick={() =>
                        handlePasswordVisibilityToggle(password.passwordID)
                      } // Toggle the password visibility
                    />
                  </div>
                </div>
                <div className="allpassword_box_right">
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    onClick={() => handleActionBoxToggle(password.passwordID)} // Toggle the action box
                  />
                  <div
                    ref={actionBoxRef}
                    className={`box_right_Action_dropdown ${
                      showActionBox[password.passwordID]
                        ? "box_right_Action_show"
                        : "" // Only show for the clicked item
                    }`}
                  >
                    <span
                      onClick={() =>
                        handleCopyToClipboard("email", password.passwordID)
                      }
                    >
                      Copy Email
                    </span>
                    <span
                      onClick={() =>
                        handleCopyToClipboard("password", password.passwordID)
                      }
                    >
                      Copy Password
                    </span>
                    <span
                      onClick={() => handleActionBoxToggle(password.passwordID)}
                    >
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
