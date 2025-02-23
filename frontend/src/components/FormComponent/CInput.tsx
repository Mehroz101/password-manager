import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CInputType } from "../../types/Types";
import { forwardRef } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const CInput = forwardRef<HTMLInputElement, CInputType>(
  ({ label, type, placeholder, id, disabled = false, error, ...rest }, ref) => {
    return (
      <div className="add_new_field">
        {label && <label htmlFor={id}>{label}</label>}
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          ref={ref}
          className={error ? "input_error" : ""}
          {...rest}
        />
        {error && <p className="error_message">{error.message}</p>}
      </div>
    );
  }
);

export default CInput;
