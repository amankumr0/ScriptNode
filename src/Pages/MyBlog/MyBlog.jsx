import React, { useCallback, useEffect, useState } from 'react'
import { Container, PostCard, service } from '../../Component'
import { Query } from 'appwrite'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import "./MyBlog.css"

function MyBlog() {
    const [posts, setPost] = useState([]);
    const nevigate = useNavigate();
    const userData = useSelector(state => state.user.userData);
    const cll = useCallback(() => {
        if (!userData) {
            nevigate("/home")
        }
        service.getPosts([Query.equal("userId", `${userData?.$id}`)])
            .then(data => {
                console.log(data)
                setPost(data.documents)
            })
    }, [userData])
    useEffect(() => {
        cll();
    }, [userData])
    return (
        <Container>
            <div>{
                posts?.map(post => (
                    <div key={post.$id} className='user-post-card'>
                        <PostCard {...post} />
                        <div className="user-post-card-btn">
                            <button className='user-post-card-btn-edit user-cmn-btn' onClick={() => { nevigate(`/update/${post.$id}`) }}>Edit</button>
                            <button className='user-post-card-btn-delete user-cmn-btn' onClick={() => { service.deletePsot(post.$id); nevigate("/myblog") }}>Delete</button>
                        </div>
                    </div>
                ))
            }</div>
        </Container>
    )
}

export default MyBlog
