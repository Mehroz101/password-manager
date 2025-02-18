import React from "react";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { classNames } from "primereact/utils";
import { Controller, Control } from "react-hook-form";

interface Option {
  label: string;
  value: string | number;
}

interface OptionGroup {
  label: string;
  items: Option[];
}

interface MultiSelectProps {
  control: Control<any>;
  name: string;
  onChange?: (selectedValues: Option[]) => void;
  options?: (Option | OptionGroup)[]; // Supports both flat & grouped options
  placeholder?: string;
  required?: boolean;
  showErrorMessage?: boolean;
  errorMessage?: string;
  showClear?: boolean;
  disabled?: boolean;
  filter?: boolean;
  label?: string;
}

const CMultiSelect: React.FC<MultiSelectProps> = ({
  control,
  name,
  onChange,
  label = "",
  options = [],
  placeholder = "Select options",
  required = false,
  showErrorMessage = true,
  errorMessage = "This field is required!",
  showClear = false,
  disabled = false,
  filter = true,
}) => {
  // Flatten options for easier selection handling
  const flattenedOptions: Option[] = (options as OptionGroup[]).flatMap(
    (group) => ("items" in group ? group.items : [group])
  );

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

            <MultiSelect
              id={field.name}
              value={field.value || []} // Ensure value is an array
              options={options}
              optionLabel="label"
              optionValue="value"
              optionGroupLabel="label" // Enables multi-section
              optionGroupChildren="items"
              placeholder={placeholder}
              disabled={disabled}
              filter={filter}
              showClear={showClear}
              panelClassName="custom-dropdown"
              onChange={(e: MultiSelectChangeEvent) => {
                const selectedValues = e.value; // Selected values array
                field.onChange(selectedValues);

                if (onChange) {
                  const selectedOptions = flattenedOptions.filter((opt) =>
                    selectedValues.includes(opt.value)
                  );
                  onChange(selectedOptions);
                }
              }}
              className={classNames({ "p-invalids": fieldState.error })}
              style={{
                width: "100%",
                padding: "9px 8px",
                backgroundColor: "#eee",
              }}
              selectedItemTemplate={(option) => (
                <>
                {option ?
                <span className="custom-chip">{option}</span> : <span>select user</span>
                }
                </>
              )}
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

export default CMultiSelect;
