import { useEffect, useState } from 'react'
import "./Home.css"
import { PostCard, service, SkeletonLoding } from '../../Component'




function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        try {
            service.getPosts().then(data => {
                console.log(data);
                setData([...data.documents])
            })
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <div className='home-container'>
            {data.length > 0 ? <>
                <div className='home-container-child'>
                    {data?.map(content => (
                        <PostCard {...content} key={content.$id} />
                    ))}
                </div>
            </> : <SkeletonLoding />}
        </div>
    )
}

export default Home