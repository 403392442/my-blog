import BlogItem from "../components/BlogItem";
import AddBlogIcon from "../components/AddBlogIcon";
import {useQuery} from "@apollo/client";
import {GET_BLOGS} from "../queries/blogQueries";

export default function Home() {
    const {loading, data} = useQuery(GET_BLOGS, {
        fetchPolicy: 'no-cache',
    });

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div>
            {data.getBlogs.map(item => (<BlogItem key={item.title} data={item}/>))}
            <AddBlogIcon/>
        </div>
    )
}
