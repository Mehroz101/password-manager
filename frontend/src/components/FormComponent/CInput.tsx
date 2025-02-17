import { CInputType } from "../../types/Types";

const CInput = ({ label, type, placeholder, id, ref }: CInputType) => {
  return (
    <>
      <div className="add_new_field">
        {label && <label htmlFor={`${id}`}>{label}</label>}

        <input type={type} id={`${id}`} placeholder={placeholder} ref={ref} />
      </div>
    </>
  );
};

export default CInput;
