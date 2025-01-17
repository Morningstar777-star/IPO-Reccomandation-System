import React from 'react';

const FormInput = ({ label, name, type, options, required }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    {type === 'select' ? (
      <select
        name={name}
        required={required}
        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        name={name}
        required={required}
        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
      />
    )}
  </div>
);

export default FormInput;