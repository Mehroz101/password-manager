import React, { useState, useRef, useEffect } from "react";
import {
  faEllipsisVertical,
  faEye,
  faEyeLowVision,
  faCreditCard,
  faPaperclip,
  faThumbsUp,
  faEnvelope,
  faFeather,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/ShowAll.css";
import SearchBox from "../components/SearchBox";
import { Category, GetAllPasswordResponse } from "../types/Types";
import CategoryCard from "../components/CategoryCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DeletePassword, GetAllPassword } from "../services/PasswordServices";
import { notify } from "../utils/notification";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routes";

const category_cards = [
  {
    icon: faGlobe,
    title: "ALL",
    cardNo: 1,
  },
  {
    icon: faCreditCard,
    title: "Card",
    cardNo: 2,
  },
  {
    icon: faEnvelope,
    title: "Email",
    cardNo: 3,
  },
  {
    icon: faThumbsUp,
    title: "Social",
    cardNo: 4,
  },
  {
    icon: faPaperclip,
    title: "API",
    cardNo: 5,
  },
  {
    icon: faFeather,
    title: "Other",
    cardNo: 6,
  },
];
// Example of dynamic data for the password boxes

const ShowAll_Page = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<GetAllPasswordResponse[]>(
    []
  );
  const [filteredCategory, setFilteredCategory] = useState<string>("ALL");
  const [showActionBox, setShowActionBox] = useState<{
    [key: number]: boolean;
  }>({});
  const [passwordVisibility, setPasswordVisibility] = useState<{
    [key: number]: boolean;
  }>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const { data: passwordData, refetch: passwordDataRefetch } = useQuery<
    GetAllPasswordResponse[]
  >({
    queryKey: ["passworddata"],
    queryFn: GetAllPassword,
  });
  const actionBoxRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
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
        type === "email"
          ? passwordEntry.fields.email
          : passwordEntry.fields.password;

      try {
        if (navigator.clipboard) {
          // Modern Clipboard API
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback for older browsers (execCommand)
          const textArea = document.createElement("textarea");
          textArea.value = textToCopy;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
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
  const deletePasswordMutation = useMutation({
    mutationFn: DeletePassword,
    onSuccess: (data) => {
      if (data.success) {
        notify({ type: "success", message: data.message });
        passwordDataRefetch();
      } else {
        notify({ type: "error", message: data.message });
      }
    },
  });
  const handleDeletePassword = (passwordId: number) => {
    deletePasswordMutation.mutate(passwordId);
  };
  const handleEditPassword = (passwordId: number) => {
    navigate(`/editpassword/${passwordId}`);
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const filtereddata = passwordData?.filter((item) => {
      return item.fields.appName
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setFilteredData(filtereddata || []);
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
  useEffect(() => {
    if (passwordData) {
      setFilteredData(passwordData);
    }
  }, [passwordData]);
  useEffect(() => {
    if (filteredCategory !== "ALL" && passwordData) {
      const filtereddata = passwordData?.filter((item) => {
        return item.type === filteredCategory;
      });
      setFilteredData(filtereddata || []);
    } else {
      setFilteredData(passwordData || []);
    }
  }, [filteredCategory]);

  return (
    <div className="showall_page">
      <SearchBox handleSearch={handleSearch} />
      <div className="category_container">
        <h3 className="section_heading">Category</h3>
        <div className="category_boxs">
          {categories &&
            categories.map((category, index) => (
              <CategoryCard
                key={index}
                category={category}
                filteredCategory={filteredCategory}
                setFilteredCategory={setFilteredCategory}
              />
            ))}
        </div>
      </div>
      <div className="showall_password_container">
        <h3>Password</h3>
        <div className="showall_password_boxs">
          {/* Dynamically render password boxes */}
          {filteredData && filteredData?.length > 0 ? (
            filteredData.map((password, index) => (
              <div
                className="allpassword_box"
                key={index}
                onClick={() =>
                  navigate(`${ROUTES.VIEWAPP}/${password.passwordID}`)
                }
              >
                <div className="allpassword_box_left">
                  <img
                    src={`http://localhost:5000/uploads/${password.type}.png`}
                    alt={password.fields.appName}
                  />
                </div>
                <div className="allpassword_box_center">
                  <p className="allpassword_title">{password.fields.appName}</p>
                  <p className="allpassword_account">
                    {password.fields.email
                      ? password.fields.email
                      : password.fields.username}
                  </p>
                  <div className="password">
                    <p className="allpassword_password">
                      {passwordVisibility[password.passwordID]
                        ? password.fields.password
                        : "*************"}{" "}
                    </p>
                    <FontAwesomeIcon
                      icon={
                        passwordVisibility[password.passwordID]
                          ? faEye
                          : faEyeLowVision
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePasswordVisibilityToggle(password.passwordID);
                      }} // Toggle the password visibility
                    />
                  </div>
                </div>
                <div className="allpassword_box_right">
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents the parent onClick from firing
                      handleActionBoxToggle(password.passwordID);
                    }} // Toggle the action box
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyToClipboard("email", password.passwordID);
                      }}
                    >
                      Copy Email
                    </span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();

                        handleCopyToClipboard("password", password.passwordID);
                      }}
                    >
                      Copy Password
                    </span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();

                        handleEditPassword(password.passwordID);
                      }}
                    >
                      Edit
                    </span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();

                        handleActionBoxToggle(password.passwordID);
                        handleDeletePassword(password.passwordID);
                      }}
                    >
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              <p>
                No Password Found <Link to="/addnew">Add Password</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowAll_Page;
