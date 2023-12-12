
import { Link } from 'react-router-dom'
import "./PostCard.css"
// import { parse } from 'html-react-parser';
function PostCard({ $id, title, content, userName, $createdAt }) {
    return (
        <div className='postContainer' >
            <Link to={`/post/${$id}`}
                className="link-container"
            >
                <div className="artical-container">
                    <div className="title-div">
                        <h2 className='artical-h1'>{title}</h2>
                        <div className='title-item'>
                            <p className='artical-p'><em>{`-by ${userName}`}</em></p>
                        </div>
                    </div>
                    <div className="date">
                        {/* {$createdAt} */}
                        {new Date($createdAt).toLocaleString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', weekday: "long", })}
                    </div>
                    <br />
                    {/* <div>{parse(String(content))}</div> */}
                </div>
            </Link>

        </div>
    )
}

export default PostCard