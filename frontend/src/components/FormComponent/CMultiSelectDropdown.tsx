import React, { useState } from "react";
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
  Path,
} from "react-hook-form";

interface Option {
  id: number | string; // ✅ FIXED: Ensuring `id` is `string | number`
  name: string;
}

interface CMultiSelectDropdownProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  options: Option[];
  valueKey?: keyof Option;
  labelKey?: keyof Option;
  rules?: RegisterOptions<T, Path<T>>;
  defaultValue?: any;
  isMultiSelect?: boolean;
  onChangeCallback?: (selectedValue: any) => void;
}

const CMultiSelectDropdown = <T extends FieldValues>({
  control,
  name,
  options = [],
  valueKey = "id",
  labelKey = "name",
  rules = {} as RegisterOptions<T, Path<T>>,
  defaultValue = [],
  isMultiSelect = true,
  onChangeCallback = () => {},
}: CMultiSelectDropdownProps<T>) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter((item) =>
    String(item[labelKey]).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const handleChange = (selectedValue: Option["id"]) => {
          let updatedValue: (string | number)[];

          if (isMultiSelect) {
            // ✅ FIX: Ensure `value` is correctly typed as an array of `string | number`
            const selectedArray = Array.isArray(value)
              ? (value as (string | number)[])
              : [];

            const isSelected = selectedArray.includes(selectedValue);
            updatedValue = isSelected
              ? selectedArray.filter((id) => id !== selectedValue)
              : [...selectedArray, selectedValue];
          } else {
            updatedValue = [selectedValue];
            setIsDropdownOpen(false);
          }

          onChange(updatedValue);
          onChangeCallback?.(updatedValue);
        };
        return (
          <div style={containerStyle}>
            {/* Input Container */}
            <div
              style={inputContainerStyle}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {isMultiSelect ? (
                <div style={chipContainerStyle}>
                  {Array.isArray(value) &&
                    (value as (string | number)[]).map((id) => {
                      const item = options.find((opt) => opt[valueKey] === id);
                      return (
                        item && (
                          <div key={String(id)} style={chipStyle}>
                            {String(item[labelKey])}
                            <span
                              style={chipCloseStyle}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleChange(id as Option["id"]); // ✅ Ensure correct type
                              }}
                            >
                              &times;
                            </span>
                          </div>
                        )
                      );
                    })}
                </div>
              ) : (
                <div style={singleSelectTextStyle}>
                  {value
                    ? options.find((item) => item[valueKey] === value)?.[
                        labelKey
                      ] ?? "Select an option"
                    : "Select an option"}
                </div>
              )}

              <i
                className={`pi ${
                  isDropdownOpen ? "pi-angle-up" : "pi-angle-down"
                } `}
                style={arrowStyle}
              ></i>
            </div>

            {/* Dropdown Options */}
            {isDropdownOpen && (
              <div style={dropdownStyle}>
                <input
                  type="text"
                  style={searchInputStyle}
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((item) => (
                    <div
                      key={String(item[valueKey])} // ✅ FIXED: Ensure `key` is always a `string`
                      style={{
                        ...dropdownItemStyle,
                        backgroundColor: isMultiSelect
                          ? Array.isArray(value) &&
                            value.includes(item[valueKey])
                            ? "#e0e0e0"
                            : "#fff"
                          : value === item[valueKey]
                          ? "#e0e0e0"
                          : "#fff",
                      }}
                      onClick={() => handleChange(item[valueKey])}
                    >
                      {String(item[labelKey])}
                    </div>
                  ))
                ) : (
                  <div style={noOptionsStyle}>No options found</div>
                )}
              </div>
            )}

            {error && <span style={errorStyle}>{error.message}</span>}
          </div>
        );
      }}
    />
  );
};

export default CMultiSelectDropdown;

const containerStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  fontFamily: "Inter var, sans-serif",
};

const inputContainerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: "8px",
  cursor: "pointer",
  backgroundColor: "#fff",
};

const chipContainerStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "4px",
};

const chipStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#e5e7eb",
  color: "#4b5563",
  borderRadius: "16px",
  padding: "0.375rem 0.75rem",
  fontSize: "15px",
};

const chipCloseStyle: React.CSSProperties = {
  marginLeft: "8px",
  fontSize: "14px",
  fontWeight: "bold",
  cursor: "pointer",
  border: "2px solid #4b5563",
  width: "17px",
  height: "17px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
};

const singleSelectTextStyle: React.CSSProperties = {
  flex: 1,
  fontSize: "14px",
  color: "#555",
};

const arrowStyle: React.CSSProperties = {
  fontSize: "15px",
};

const dropdownStyle: React.CSSProperties = {
  position: "absolute",
  top: "100%",
  left: "0",
  width: "100%",
  border: "1px solid #ccc",
  borderRadius: "4px",
  backgroundColor: "#fff",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  marginTop: "4px",
  maxHeight: "200px",
  overflowY: "auto",
  zIndex: 1000,
};

const searchInputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px",
  boxSizing: "border-box",
  border: "none",
  borderBottom: "1px solid #ccc",
  outline: "none",
  fontSize: "14px",
};

const dropdownItemStyle: React.CSSProperties = {
  padding: "8px",
  cursor: "pointer",
  fontSize: "14px",
};

const noOptionsStyle: React.CSSProperties = {
  padding: "8px",
  fontSize: "14px",
  color: "#888",
  textAlign: "center",
};

const errorStyle: React.CSSProperties = {
  color: "red",
  fontSize: "12px",
  marginTop: "4px",
};
