import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CInputType } from "../../types/Types";
import { forwardRef, useState } from "react";
import { faEye, faEyeLowVision } from "@fortawesome/free-solid-svg-icons";

const CPasswordInput = forwardRef<HTMLInputElement, CInputType>(
  ({ label, type, placeholder, id, disabled = false, error, ...rest }, ref) => {
    const [passwordToggle, setPasswordToggle] = useState<boolean>(false);
    return (
      <div className="add_new_password_field">
        {label && <label htmlFor={id}>{label}</label>}
        <div className="input_field">
          <input
            type={passwordToggle === true ? type : "text"}
            id={id}
            placeholder={placeholder}
            disabled={disabled}
            ref={ref}
            className={error ? "input_error" : ""}
            {...rest}
          />
          {type === "password" && (
            <FontAwesomeIcon
              icon={passwordToggle ? faEyeLowVision : faEye}
              onClick={() => setPasswordToggle(!passwordToggle)}
            />
          )}
        </div>
        {error && <p className="error_message">{error.message}</p>}
      </div>
    );
  }
);

export default CPasswordInput;
