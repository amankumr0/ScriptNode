import "./Container.css"

function Container({ children }) {
    return (
        <div className="main-container">
            <div className="main-container-2">
                {children}
            </div>
        </div>
    )
}

export default Container