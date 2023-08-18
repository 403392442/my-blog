import {useMutation} from "@apollo/client";
import {DELETE_COMMENT, UPDATE_COMMENT} from "../mutations/blogMutations";
import {useRouter} from "next/router";
import {useState} from "react";
import styles from './CommentItem.module.css';

const CommentItem = ({comment, commentsAmount, postId}) => {
    const [text, setText] = useState(comment.text);
    const [isChanging, setIsChanging] = useState(false);

    const date = (new Date(parseInt(comment.date))).toLocaleString().split(",")[0];
    const router = useRouter();

    const [deleteComment] = useMutation(DELETE_COMMENT, {
        variables: {
            id: comment.id,
            commentsAmount:commentsAmount,
            postId:postId,
        }
    })

    const [updateComment] = useMutation(UPDATE_COMMENT, {
        variables: {
            id: comment.id,
            text: text,
        }
    })
    const handleCommentDelete = () => {
        if (localStorage.getItem('username') !== comment.user) {
            alert(`You can't delete other people's comments`);
        } else if(confirm(`Are you sure want to delete the comment?`)) {
            deleteComment();
            router.reload();
        }
    }

    const handleCommentChange = () => {
        setIsChanging(true)
    }

    const handleSubmitClick = () => {
        updateComment();
        router.reload();
    }

    const handleCancelClick = () => {
        setText(comment.text)
        setIsChanging(false);
    }

    return (
        <div className={styles.commentContainer}>
            <div className={styles.userInfoContainer}>
                <p>👤{comment.user}</p>
                <p>📅{date}</p>
            </div>
            <hr className={styles.userInfoDivider}/>
            {isChanging? (
                <div className={styles.commentContentContainer}>
                    <textarea rows='30' value={text} onChange={(e) => setText(e.target.value)}/>
                    <button onClick={handleSubmitClick}>Submit</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                </div>
            ) : <div className={styles.commentContentContainer}>{text}</div>}
            <div className={styles.commentOperationsContainer}>
                <p onClick={handleCommentChange}>✏️</p>
                <p onClick={handleCommentDelete}>🗑️</p>
            </div>
            <hr/>
        </div>
    )
}

export default CommentItem;