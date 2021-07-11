import React from 'react'

function Input({name, title,type,bind , validate , hasChanged}) {
    return (
        <>
         {validate.error && hasChanged &&<p>{validate.error.message.replace('"value"' , title)}</p>}
         <input type={type} name={name} {...bind} placeholder={title} autoComplete="on"/>
        </>
    )
}

export default Input
