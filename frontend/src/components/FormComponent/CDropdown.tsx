import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import React from "react";
import { Controller, Control } from "react-hook-form";

interface Option {
  label: string;
  value: string | number;
}

interface CDropdownProps {
  control: Control<any>;
  name: string;
  onChange?: (selectedOption: Option) => void  | undefined;
  focusOptions?: (event?: any) => void;
  options: Option[];
  placeholder?: string;
  optionLabel?: string;
  optionValue?: string;
  required?: boolean;
  showOnFocus?: boolean;
  showClear?: boolean;
  filter?: boolean;
  disabled?: boolean;
  showErrorMessage?: boolean;
  autoFocus?: boolean;
  errorMessage?: string;
  label?: string;
}

const CDropdown: React.FC<CDropdownProps> = ({
  control,
  name,
  onChange,
  focusOptions = () => null,
  options = [],
  placeholder = "",
  optionLabel = "label",
  optionValue = "value",
  required = false,
  showOnFocus = true,
  showClear = false,
  filter = true,
  disabled = false,
  showErrorMessage = true,
  errorMessage = "This field is required!",
  autoFocus = false,
  label = "",
  ...moreOptions
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field, fieldState }) => (
        <>
          <div>
            {label && (
              <label htmlFor="" style={{ fontSize: "0.9rem" }}>
                {label}
              </label>
            )}
            <Dropdown
              id={field.name}
              value={field.value}
              optionLabel={optionLabel}
              optionValue={optionValue}
              placeholder={placeholder}
              options={options}
              autoFocus={autoFocus}
              onChange={(e) => {
                field.onChange(e.value);

                const originalEvent = e.originalEvent as
                  | KeyboardEvent
                  | undefined;

                if (focusOptions && originalEvent) {
                  if (
                    originalEvent.key !== "ArrowDown" &&
                    originalEvent.key !== "ArrowUp"
                  ) {
                    focusOptions(e);

                    let obj = {
                      value: e.value,
                      label:
                        (originalEvent.target as HTMLElement)?.innerText || "",
                    };

                    if (onChange) {
                      onChange(obj);
                    }
                  }
                }
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                if (focusOptions && e.key === "Enter") {
                  focusOptions(e);
                  if (onChange) {
                    onChange({ value: field.value, label: "" });
                  }
                }
              }}
              showOnFocus={showOnFocus}
              disabled={disabled}
              showClear={showClear}
              className={classNames({ "p-invalid": fieldState.error })}
              filter={filter}
              style={{
                width: "100%",
                padding: "9px 8px",
                backgroundColor: "#eee",
                border: "none",
                outline: "none",
              }}
              pt={{
                input: {
                  style: { padding: "0.25rem 0.4rem", fontSize: ".9em" },
                },
                item: { style: { padding: "0.4rem 0.4rem" } },
              }}
              resetFilterOnHide
              {...moreOptions}
            />
            {showErrorMessage && fieldState.error && (
              <span className="text-red-700 text-sm">{errorMessage}</span>
            )}
          </div>
        </>
      )}
    />
  );
};

// export const CDropdownWithOutControl: React.FC<Omit<CDropdownProps, "control">> = ({
//   name,
//   onChange,
//   focusOptions,
//   options = [],
//   placeholder = "",
//   optionLabel = "label",
//   optionValue = "value",
//   showOnFocus = true,
//   showClear = false,
//   filter = true,
//   disabled = false,
//   ...moreOptions
// }) => {
//   return (
//     <Dropdown
//       id={name}
//       value={options[0]?.value || ""}
//       optionLabel={optionLabel}
//       optionValue={optionValue}
//       placeholder={placeholder}
//       options={options}
//       filter={filter}
//       showOnFocus={showOnFocus}
//       disabled={disabled}
//       pt={{
//         input: { style: { padding: "0.25rem 0.4rem", fontSize: ".9em" } },
//         item: { style: { padding: "0.4rem 0.4rem" } },
//       }}
//       resetFilterOnHide
//       {...moreOptions}
//     />
//   );
// };

export default CDropdown;
