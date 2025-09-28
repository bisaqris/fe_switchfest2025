import React, { FC } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.ComponentPropsWithoutRef<'select'> {
  options: Option[];
  placeholder?: string;
}

const Select: FC<SelectProps> = ({
  options,
  placeholder = "Pilih salah satu...",
  className = "",
  value,
  ...props
}) => {

  return (
    <select
      className={`h-11 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${value ? "text-gray-800 dark:text-white/90" : "text-gray-400"
        } ${className}`}

      value={value || ""}

      {...props}
    >
      <option value="" disabled className="text-gray-400">
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value} className="text-gray-700 dark:bg-gray-900">
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;