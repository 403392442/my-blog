import styles from './BlogItem.module.css'
import {useRouter} from "next/router";

const BlogItem = ({data}) => {
    const router = useRouter();
    const date = (new Date(parseInt(data.date))).toLocaleString().split(",")[0];

    const handleBlogClick = () => {
        router.push(`/blog-detail?id=${data.id}`)
    }

    return (
        <div onClick={handleBlogClick} className={styles.blogContainer}>
            <div className={styles.blogTitleContainer}>
                <div>
                    <h2>{data.title}</h2>
                    <span>{date}</span>
                </div>
                <div>
                    <p>👤 {data.author}</p>
                    <p>✍️ {data.commentsAmount}</p>
                </div>
            </div>
            <hr/>
            <div className={styles.blogContentContainer}>
                <p>{data.content}</p>
            </div>
        </div>
    )
}

export default BlogItem