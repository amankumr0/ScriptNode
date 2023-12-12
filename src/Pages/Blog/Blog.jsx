import { useEffect, useState } from 'react'
import "./Blog.css"
import { useParams } from 'react-router-dom'
import parse from "html-react-parser";
import { Container, service } from '../../Component'

function Blog() {
    const { postId } = useParams()
    const [data, setData] = useState(null);
    useEffect(() => {
        service.getPost(postId)
            .then(data => {
                console.log(data)
                setData(data);
            })
    }, [])
    return (
        <Container>
            <div className="post-container">
                <div className="post-title-container">
                    <h1>{data?.title}</h1>
                </div>
                <div className="post-image-container">
                    <img className="post-image" src={data ? service.getFilePreview(data?.featuredImage) : "https://media4.giphy.com/media/ycfHiJV6WZnQDFjSWH/giphy.gif?cid=ecf05e47gtwhlv166g4fmwwwjkus78otl34ylexyjp3k94v6&ep=v1_gifs_search&rid=giphy.gif&ct=g"} alt={data?.title} />
                </div>
                <div className="post-content-container">
                    {parse(String(data?.content))}
                </div>
            </div>
        </Container>
    )
}

export default Blog