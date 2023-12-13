import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Input, Textarea, service } from "../index"
import "./PstForm.css"

function PostForm({ post }) {
    console.log(post)
    const { register, handleSubmit, control, getValues } =
        useForm({
            defaultValues: {
                title: post?.title || "",
                content: post?.content || "",
                status: post?.status || "active"
            }
        });
    const userData = useSelector(state => state.user.userData);
    const nevigate = useNavigate();

    const handler = async (data) => {
        console.log(data)
        try {
            if (post) {
                const file = data?.image[0] ? await service.uploadFile(data.image[0]) : null;
                if (file) {
                    await service.deleteFile(post?.featuredImage)
                }
                const dbPost = await service.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                })
                if (dbPost) {
                    nevigate(`/post/${dbPost.$id}`)
                }
            } else {
                const file = await service.uploadFile(data.image[0]);
                if (file) {
                    data.featuredImage = file.$id;
                    const dbPost = await service.createPsot({
                        ...data,
                        userId: userData.$id,
                        userName: userData.name,
                    })
                    if (dbPost) {
                    
                     nevigate(`/post/${dbPost.$id}`)
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <Container>
            <div className="addBlog-container">
                <h2>ADD BLOG</h2>
                <form
                    onSubmit={handleSubmit(handler)}
                >
                    <Input
                        label="Title"
                        name="title"
                        id="title"
                        type="text"
                        {...register("title", { required: true })}
                    />
                    {/* <Input
                        label="Slug"
                        name="slug"
                        id="slug"
                        type="text"
                        {...register("slug", { required: true })}
                    /> */}
                    <Textarea
                        label="Content"
                        name="content"
                        id="content"
                        control={control}
                        defaultValue={getValues("content")}
                    />
                    <label htmlFor="select">
                        <p>Status</p>
                        <select className="addBlog-select" name="status" id="status" {...register("status", { required: true })}>
                            <option value="active">active</option>
                            <option value="inactive">inactive</option>
                        </select>
                    </label>
                    <Input
                        label="Cover"
                        id="image"
                        accept="image/png,
                    image/jpeg"
                        name="featuredImge"
                        type="file"
                        {...register("image", { required: !post })}
                    />
                    <Button
                        type="submit"
                        bgColor="green">
                        {post ? 'Update' : 'Add'}
                    </Button>
                </form>
            </div>
        </Container>
    )
}

export default PostForm
