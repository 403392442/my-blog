import {useState} from "react";
import styles from './NewBlogForm.module.css';
import {ADD_BLOG} from "../mutations/blogMutations";
import {useMutation} from "@apollo/client";
import {useRouter} from "next/router";

const NewBlogForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const router = useRouter();

    const [addBlog] = useMutation(ADD_BLOG);

    const handleTitleChange = e => {
        setTitle(e.target.value)
    }

    const handleContentChange = e => {
        setContent(e.target.value)
    }

    const handleNewBlogSubmission = async (e) => {
        e.preventDefault();
        const res = await addBlog({
            variables: {
                author: localStorage.getItem("username"),
                title: title,
                content: content,
            }
        })
        if (res.data.addBlog.title) {
            alert('Blog posted');
            await router.push('/')
        }
    }

    return (
        <div className={styles.newBlogFormContainer}>
            <form>
                <div>
                    <label htmlFor="title">
                        <h2>Title:</h2>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Title"
                        onChange={e => handleTitleChange(e)} value={title}
                        required={true}
                    />
                </div>
                <hr/>
                <div>
                    <label htmlFor="content">
                        <h2>Content:</h2>
                        <textarea
                            name="content"
                            id=""
                            cols="50"
                            rows="10"
                            placeholder="Enter Content Here"
                            value={content} onChange={e => handleContentChange(e)}
                            required={true}
                        ></textarea>
                    </label>
                </div>
                <button onClick={e => handleNewBlogSubmission(e)}>Submit</button>
            </form>
        </div>
    )
}

export default NewBlogForm