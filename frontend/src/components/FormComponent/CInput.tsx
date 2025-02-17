import { CInputType } from "../../types/Types";
import { forwardRef } from "react";

const CInput = forwardRef<HTMLInputElement, CInputType>(
  ({ label, type, placeholder, id, ...rest }, ref) => {
    return (
      <div className="add_new_field">
        {label && <label htmlFor={id}>{label}</label>}
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);

export default CInput;
