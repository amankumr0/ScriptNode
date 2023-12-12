import React from 'react'
import "./Button.css"
function Button({
    className = "",
    children,
    type = "button",
    bgColor = "#000"
}) {
    return (
        <button className={`my-button ${className} ${bgColor}`} type={type}>{children}</button>
    )
}

export default Button