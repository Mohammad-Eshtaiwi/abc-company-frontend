import React from "react";

function TextArea({ name, title, type, bind, validate, hasChanged, rows }) {
  return (
    <>
      {validate.error && hasChanged && <p>{validate.error.message.replace('"value"', title)}</p>}
      <textarea {...bind} name={name} placeholder={title} id={name} rows={rows}></textarea>
    </>
  );
}

export default TextArea;
