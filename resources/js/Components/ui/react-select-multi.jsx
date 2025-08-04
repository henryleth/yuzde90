import React from "react";
import Select, { components } from "react-select";
import { cn } from "@/lib/utils";
import { X } from "lucide-react"; // X ikonunu import et

// React Select için Shadcn temasına uygun stiller
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "38px",
    borderRadius: "0.375rem", // rounded-md
    borderColor: state.isFocused ? "hsl(var(--input))" : "hsl(var(--input))", // input border-color
    boxShadow: state.isFocused ? "0 0 0 1px hsl(var(--ring))" : "none", // focus ring
    backgroundColor: "hsl(var(--background))",
    "&:hover": {
      borderColor: "hsl(var(--input))",
    },
  }),
  input: (provided) => ({
    ...provided,
    color: "hsl(var(--foreground))",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "hsl(var(--muted-foreground))",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "hsl(var(--foreground))",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "hsl(var(--secondary))", // badge background
    borderRadius: "0.375rem", // badge rounded-md
    padding: "0.25rem 0.5rem", // badge px-2 py-1
    display: "flex",
    alignItems: "center",
    color: "hsl(var(--secondary-foreground))", // badge text color
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "hsl(var(--secondary-foreground))", // badge text color
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "hsl(var(--secondary-foreground))",
    "&:hover": {
      backgroundColor: "hsl(var(--secondary-foreground))",
      color: "hsl(var(--secondary))",
    },
  }),
  indicatorSeparator: (provided) => ({ ...provided, display: "none" }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "hsl(var(--muted-foreground))",
    "&:hover": {
      color: "hsl(var(--foreground))",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "hsl(var(--popover))", // popover background
    borderRadius: "0.5rem", // popover rounded-md
    boxShadow: "hsl(var(--ring))", // basic shadow
    border: "1px solid hsl(var(--border))",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor:
      state.isFocused
        ? "hsl(var(--accent))"
        : state.isSelected
        ? "hsl(var(--accent))"
        : "hsl(var(--popover))",
    color: "hsl(var(--popover-foreground))",
    "&:hover": {
      backgroundColor: "hsl(var(--accent))",
      color: "hsl(var(--accent-foreground))",
    },
  }),
};

// Custom MultiValueRemove bileşeni - X ikonunu eklemek için
const CustomMultiValueRemove = (props) => (
  <components.MultiValueRemove {...props}>
    <X className="h-3 w-3 ml-1" />
  </components.MultiValueRemove>
);

export function ReactSelectMulti({ options, selected, onSelect, placeholder, className }) {
  const selectedOptions = options.filter(option => selected.includes(option.value));

  const handleChange = (selectedValues) => {
    // onSelect, ebeveyn bileşenin update fonksiyonunu çağırır
    onSelect(selectedValues ? selectedValues.map(option => option.value) : []);
  };

  return (
    <Select
      isMulti
      options={options}
      value={selectedOptions}
      onChange={handleChange}
      placeholder={placeholder}
      className={cn("react-select-container", className)}
      classNamePrefix="react-select"
      styles={customStyles}
      components={{ MultiValueRemove: CustomMultiValueRemove }}
      // Diğer props'lar (arama, klavye navigasyonu otomatik gelir)
    />
  );
} 