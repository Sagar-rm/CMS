import React from "react";
import PropTypes from "prop-types";

const Checkbox = ({ checked, onChange, label, className }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      {label && <label className="text-sm text-gray-700">{label}</label>}
    </div>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};

Checkbox.defaultProps = {
  checked: false,
  label: "",
  className: "",
};

export default Checkbox;
