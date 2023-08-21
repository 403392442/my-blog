import BlogItem from "../components/BlogItem";
import AddBlogIcon from "../components/AddBlogIcon";
import {GET_BLOGS} from "../queries/blogQueries";
import {client} from "./_app";

export default function Home({data, loading}) {
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

export async function getServerSideProps () {
    const data = await client.query({
        query: GET_BLOGS
    });

    return {
        props: {
            data: data.data,
            loading: data.loading,
        }
    };
}