import "./AddBlog.css"
import { PostForm } from '../../Component'
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


function AddBlog() {
    const user = useSelector(state => state.user.status)
    const nevigate = useNavigate();
    useEffect(() => {
        if (!user) {
            nevigate("/home")
        }
    })
    return (
        <PostForm />
    )
}

export default AddBlog