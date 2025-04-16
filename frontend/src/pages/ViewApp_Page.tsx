import { useLocation, useNavigate } from "react-router-dom";
// import Netflix from "../assets/netflix.png";
import "../styles/ViewApp.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AddAndUpdatePasswordFunc,
  DeletePassword,
  GetSpecificPassword,
} from "../services/PasswordServices";
import { notify } from "../utils/notification";
import { formatDate } from "../utils/function";
import Img from "../assets/whatsapp.png"
const categoryOptions = [
  { label: "Developement", value: "Developement" },
  { label: "Wifi", value: "Wifi" },
  { label: "Card", value: "Card" },
  { label: "Support", value: "Support" },
  { label: "Google", value: "Google" },
  { label: "Gmail", value: "Gmail" },
  { label: "Netflix", value: "Netflix" },
  { label: "Linkedin", value: "Linkedin" },
  { label: "Other", value: "Other" },
];
const categoryTypeOptions = [
  { label: "API", value: "API" },
  { label: "Card", value: "Card" },
  { label: "Email", value: "Email" },
  { label: "Social", value: "Social" },
  { label: "Other", value: "Other" },
];

const ViewApp_Page = () => {
  const location = useLocation(); // useLocation() returns an object
  const pathSegments = location.pathname.split("/"); // Extract pathname and split it

  const appId = pathSegments[2] || "N/A"; // Ensure there's a fallback in case it's missing
  const navigate = useNavigate();
  const [copiedField, setCopiedField] = useState<string | null>(null);
const [appData,setAppData] = useState<any>()
  // const appData = {
  //   "App Name": "My Awesome App",
  //   "Email": "user@example.com",
  //   "Password": "mypassword123",
  //   "Recovery Email": "recovery@example.com",
  // };
  const handleCopy = (value: string, field: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value)
        .then(() => {
          setCopiedField(field);
          setTimeout(() => setCopiedField(null), 2000);
        })
        .catch(() => fallbackCopyText(value, field));
    } else {
      fallbackCopyText(value, field);
    }
  };
  
  const fallbackCopyText = (text: string, field: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };
  // React Hook Form Setup
  // const { control, register, handleSubmit, setValue, watch } =
  //   useForm<AddNewPassword>({
  //     defaultValues: {
  //       appName: "",
  //       username: "",
  //       email: "",
  //       password: "",
  //       url: "",
  //       categoryName: "",
  //       categoryType: "",
  //     },
  //   });

  // Form Submit Handler
  // const onSubmit: SubmitHandler<AddNewPassword> = (data) => {
  //   const sendData = {
  //     categoryName: data.categoryName,
  //     username: data.username,
  //     appName: data.appName,
  //     email: data.email,
  //     password: data.password,
  //     url: data.url,
  //     categoryType: data.categoryType,
  //     passwordID: Number(appId),
  //   };
  //   AddNewPasswordMutation.mutate(sendData);
  // };
  const deletePasswordMutation = useMutation({
    mutationFn: DeletePassword,
    onSuccess: (data) => {
      if (data.success) {
        notify({ type: "success", message: data.message });
        navigate("/showall");
      } else {
        notify({ type: "error", message: data.message });
      }
    },
  });
  const handleDeletePassword = (passwordId: number) => {
    deletePasswordMutation.mutate(passwordId);
  };
  const AddNewPasswordMutation = useMutation({
    mutationFn: AddAndUpdatePasswordFunc,
    onSuccess: (data) => {
      if (data.success) {
        notify({ type: "success", message: data.message });
        navigate("/showall");
      } else {
        notify({ type: "error", message: data.message });
      }
    },
  });
  const { data: specificData } = useQuery({
    queryKey: ["specificData"],
    queryFn: () => GetSpecificPassword(Number(appId)),
    enabled: appId ? true : false,
  });
  useEffect(() => {
    if (specificData) {
      console.log("specificData",specificData)
      setAppData(specificData?.fields)

    }
  }, [specificData]);

  return (
    <>
      <div className="viewapp_page">
        <div className="viewapp_top_card">
          <div className="top_card_left">
            <img src={`http://localhost:5000/uploads/${specificData?.type}.png` || Img} alt="appicon" />
            <img src={specificData?.type ? `http://localhost:5000/uploads/${specificData.type}.png` : Img} alt="appicon" />
          <div className="top_card_right">
            <div className="top_card_right_top">
              <p className="top_card_title">
                { appData?.appName || "App Name"}
                { appData?.appName ?? "App Name"}
                </p>
              <p className="top_card_category">{specificData?.categoryType}</p>
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => handleDeletePassword(Number(appId))}
              />
            </div>
            <div className="top_card_right_bottom">
              <p className="activity_box_account">
                <span>
                  {specificData?.lastAction?.actionType || "Created Now"}:{" "}
                  {specificData?.lastAction?.actionType ?? "Created Now"}:{" "}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="app-container">
      <h2 className="app-title">App Information</h2>
      <div className="app-info-list">
        {appData && Object.entries(appData).map(([key, value]) => (
          <div key={key} className="app-info-item">
            <div className="app-info-text">
              <p className="app-info-label">{key}</p>
              <p className="app-info-value">{String(value)}</p>
            </div>
            <div className="copy-container">
              <button
                className="copy-button"
                onClick={() => handleCopy(String(value), key)}
              >
                <FontAwesomeIcon
            icon={faClipboard}
            onClick={() => {}}
          />
                {/* <Copy size={16} /> */}
              </button>
              {copiedField === key && <span className="copied-tooltip">Copied!</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
        {/* <div className="form_fields">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CDropdown
              control={control}
              name="categoryType"
              options={categoryTypeOptions}
              placeholder="Select a type"
              label="Category Type"
              required={true}
             
            />
            <CDropdown
              control={control}
              name="categoryName"
              options={categoryOptions}
              placeholder="Select a department"
              label="Category"
              required={true}
              
            />
           
            <CInput
              label="App Name"
              id="appName"
              type="text"
              placeholder="Enter App Name"
              {...register("appName")}
            />
            <CInput
              label="Username"
              id="username"
              type="text"
              placeholder="Enter User Name"
              {...register("username")}
            />

            <CInput
              label="Email Address"
              id="email"
              type="email"
              placeholder="Email Address"
              {...register("email")}
            />

            <CPasswordInput
              label="Password"
              id="password"
              type="password"
              placeholder="Password"
              {...register("password")}
            />

            <CInput
              label="Website Link"
              id="link"
              type="text"
              placeholder="Website URL"
              {...register("url")}
            />

            <CButton label="Update" />
          </form>
        </div> */}
      </div>
      </div>
    </>
    )
};

export default ViewApp_Page;
