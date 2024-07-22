import React, { forwardRef, useId } from "react";

function Input(
  { label, labelClass, inputClass, divClass, type = "text", Id, ...props },
  ref,
) {
  const id = useId();
  return (
    <div className={`${divClass} flex flex-col`}>
      {label && (
        <label
          htmlFor={id}
          className={`${labelClass} pb-2 text-lg text-stone-800`}
        >
          {label}
        </label>
      )}
      <input
        id={Id || id}
        type={type}
        className={`${inputClass} rounded-md border border-stone-900 px-2 py-1.5 outline-none focus:border-none focus:ring`}
        ref={ref}
        {...props}
      />
    </div>
  );
}

export default forwardRef(Input);
