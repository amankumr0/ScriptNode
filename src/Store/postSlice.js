import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    posts: []
}

const postSlice = createSlice({
    name: 'post',
    initialstate,
    reducers: {
        addPost: (state, action) => {
            state.post.push(action.payload.post)
        },
        deletePost: (state, action) => {
            state.post.filter(post => (post.slug != action.payload.slug))
        }
    }
})

export const { addPost, deletePost } = postSlice.actions;
export default postSlice.reducer;
