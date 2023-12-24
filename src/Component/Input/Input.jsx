import React, { useId } from "react"
import "./Input.css"

const Input = React.forwardRef(
    function Input({
        label,
        className = "",
        type = "text",
        name,
        ...props },
        ref) {
        const id = useId();
        return (
            <div className="input-container">
                {label && <label className="m-top-10px" htmlFor={id}>{label}</label>}
                <input name={name} type={type} id={id} className={`input-field ${className}`} {...props} ref={ref} />
            </div>
        )
    }
)

export default Input;