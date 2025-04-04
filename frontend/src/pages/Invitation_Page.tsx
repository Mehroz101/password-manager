import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CButton from "../components/FormComponent/CButton";
import "../styles/InvitationPage.css";
import { useMutation } from "@tanstack/react-query";
import { notify } from "../utils/notification";
import { AcceptInvitation } from "../services/CompanyServices";
const Invitation_Page = () => {
  const url = useParams();
  const [token, settoken] = useState<string>("");
  const navigate = useNavigate();
  const InvitationMutation = useMutation({
    mutationFn: AcceptInvitation,
    onSuccess: (data) => {
      console.log(data);
      if (data.success) {
        notify({ type: "success", message: data.message });
      } else {
        notify({ type: "error", message: data.message });
      }
    },
  });
  useEffect(() => {
    if (url) {
      if (!url.token) {
        navigate("/");
      } else {
        settoken(url.token);
      }
    }
  }, [url]);
  return (
    <>
      <div className="invitation_page">
        <p>Invitation From {url.companyName}</p>
        <div className="action_btns">
          {/* <button
            className="accept_btn"
            onClick={() => {
              InvitationMutation.mutate({ token: token });
            }}
          >
            accept
          </button> */}
          <CButton
            label="Accept"
            action={() => {
              InvitationMutation.mutate({ token: token });
            }}
          />
          {/* <button className="reject_btn">reject</button> */}
        </div>
      </div>
    </>
  );
};

export default Invitation_Page;
