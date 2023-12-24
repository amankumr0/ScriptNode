
import JoditEditor from 'jodit-react';
import { Controller } from "react-hook-form";
import "./Textarea.css"


const Textarea =
    function ({
        id,
        control,
        label,
        name,
        className = "",
        defaultValue = "" }) {
        return (
            <div className="textarea-container">
                {label && <label style={{ color: "#fff" }} className="m-top-10px" htmlFor={id}>{label}</label>}
                <Controller
                    name={name || "content"}
                    control={control}
                    render={({ field: { onChange } }) => (
                        <JoditEditor
                            value={defaultValue}
                            onChange={onChange}
                        />
                    )}
                />
            </div>
        )
    }

export default Textarea