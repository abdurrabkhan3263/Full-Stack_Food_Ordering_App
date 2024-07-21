import React, { forwardRef, useId } from "react";

function Input(
  { label = true, labelClass, inputClass, divClass, type = "text", ...props },
  ref,
) {
  const id = useId();
  return (
    <div className={`${divClass} flex flex-col gap-y-2`}>
      {label && (
        <label htmlFor={id} className={`${labelClass} text-lg text-stone-800`}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`${inputClass} rounded-md border border-stone-900 px-2 py-1.5 outline-none focus:border-none focus:ring`}
        ref={ref}
        {...props}
      />
    </div>
  );
}

export default forwardRef(Input);
