import { useCallback } from 'react'
import "./Update.css"
import { useParams } from 'react-router-dom'
import { PostForm, SkeletonLoding, service } from '../../Component';
import { useReducer } from 'react';

const myReducer = (state, action) => {
    if (action.type === "data") {
        console.log(action)
        state = { data: action.data, loading: false }
        return state;
    }
    if (action.type === "loading") {
        state = { ...state, loading: true }
        return state;
    }
}

function Update() {
    const { postId } = useParams();
    const initialState = { data: null, loading: true };
    const [state, dispatch] = useReducer(myReducer, initialState)
    const call = useCallback(() => {
        service.getPost(postId)
            .then(post => {
                console.log("insise effect");
                dispatch({ type: "data", data: post });
            })
    }, [])
    call();
    console.log(state)
    return (
        <>
            {
                state.loading ?
                    <SkeletonLoding /> :
                    <PostForm post={state.data} />
            }
        </>
    )
}

export default Update