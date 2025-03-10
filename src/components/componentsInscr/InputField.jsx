import React from 'react';

const InputField = ({ label, type, name, value, onChange, required, error }) => {
  return (
    <div className="relative z-0 w-full mb-5 group">
      <input
        type={type}
        name={name}
        id={name}
        className={`block py-2.5 px-0 w-full text-sm
                   ${error ? 'text-red-600' : 'text-gray-900'}
                   bg-transparent border-0 border-b-2
                   ${error ? 'border-red-500' : 'border-gray-300'}
                   appearance-none focus:outline-none focus:ring-0
                   ${error ? 'focus:border-red-600' : 'focus:border-blue-600'}
                   peer`}
        placeholder=" "
        value={value}
        onChange={onChange}
        required={required}
      />
      <label
        htmlFor={name}
        className={`peer-focus:font-medium absolute text-sm
                   ${error ? 'text-red-500' : 'text-gray-500'}
                   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                   peer-focus:left-0
                   ${error ? 'peer-focus:text-red-600' : 'peer-focus:text-blue-600'}
                   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                   peer-focus:scale-75 peer-focus:-translate-y-6`}
      >
        {label}
      </label>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default InputField;
