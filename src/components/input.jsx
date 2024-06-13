import { useState } from "react";

function Input({ placeholder,disabled, type, error,value, onInput = () => {} , onFocus = () => {} }) {
  return (
    <div className="mt-5">
    <div className={`bg-black h-14 overflow-hidden rounded-2xl border-[1px] ${!error ? "border-black" : "border-red-500"} shadow-[0_6px_0px_-3px]`}>
      <input
        className="disabled:bg-white px-[12px] text-base w-full h-full focus:outline-none focus-ring-0"
        type={type}
        placeholder={placeholder}
        onInput={onInput}
        onFocus={onFocus}
        disabled={disabled}
        value={value}
      />
    </div>
    {error && <span className="m-0 italic text-red-500 ml-2 text-sm">{error}</span>}
    </div>
  );
}

export default Input;
