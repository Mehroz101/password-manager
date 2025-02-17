import { CButtonType } from "../../types/Types";

const CButton = ({ label, action }: CButtonType) => {
  return (
    <div className="add_new_btn action_btn">
      <button
        style={{ width: "100%" }}
        onClick={() => {
          action();
        }}
      >
        {label}
      </button>
    </div>
  );
};

export default CButton;
