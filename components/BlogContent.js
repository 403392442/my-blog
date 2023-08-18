import {useRouter} from "next/router";
import {useQuery} from "@apollo/client";
import {GET_BLOG} from "../queries/blogQueries";
import {useEffect, useRef, useState} from "react";
import {useMutation} from "@apollo/client";
import {ADD_COMMENT} from "../mutations/blogMutations";
import CommentItem from "./CommentItem";
import styles from './BlogContent.module.css';

const BlogContent = () => {
    const [response, setResponse] = useState("");
    const params = useRouter();
    const {id} = params.query;
    const username = useRef();

    const {data, loading} = useQuery(GET_BLOG, {
        variables: {
            postId: id,
        }
    });

    const commentsAmount = data?.getBlog?.comments?.length || 0;

    const [addComment] = useMutation(ADD_COMMENT, {
        variables: {
            postId: id,
            user: username.current,
            text: response,
            commentsAmount: commentsAmount,
        },
        refetchQueries: [{query: GET_BLOG, variables: {postId: id}}]
    });

    const handleResponseChange = e => {
        setResponse(e.target.value)
    }

    const handleCommentSubmission = e => {
        e.preventDefault();
        if (response !== null)
            addComment()
        setResponse('')
    }

    useEffect(() => {
        username.current = localStorage.getItem("username");
    },[])

    if (loading || !data) return (<div>Loading...</div>)
    const {title, author, content, comments} = data.getBlog;
    const date = (new Date(parseInt(data.getBlog.date))).toLocaleString().split(",")[0];

    return (
        <div className={styles.blogContentContainer}>
            <div>
                <h3>{title}</h3>
            </div>
            <hr className={styles.titleDivideLine}/>
            <div className={styles.authorInfoContainer}>
                <p>👤: {author}</p>
                <p>📅: {date}</p>
            </div>
            <hr className={styles.authorInfoDivideLine}/>
            <div className={styles.contentContainer}>
                <p>{content}</p>
            </div>

            <div>
                {comments && comments.map(comment => <CommentItem key={comment.id} comment={comment} commentsAmount={commentsAmount} postId={id}/>)}
            </div>

            {localStorage.getItem("username")? (
                <div className={styles.newContentContainer}>
                    <form>
                        <textarea
                            name="response"
                            cols="30"
                            rows="5"
                            value={response}
                            onChange={e => handleResponseChange(e)}
                        ></textarea>
                        <div>
                            <button onClick={e => handleCommentSubmission(e)}>Submit</button>
                        </div>
                    </form>
                </div>
            ) : null}
        </div>
    )
}

export default BlogContent;