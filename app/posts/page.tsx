import Link from "next/link";

const Page = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error('Failed to fetch posts');
    const posts = await response.json();

    const truncateString = (description: string) => {
        const MAX_LENGTH = 100;
        if (description.length <= MAX_LENGTH) return description;

        return `${description.slice(0, MAX_LENGTH)}...`;
    }

    return (
        <div className="flex flex-col m-10 px-10 gap-5">
            <div className="flex justify-end">
                <Link href='/posts/create' className="bg-blue-600 rounded-lg text-center px-2">
                    Create post
                </Link>
            </div>
            <table className="">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posts.map((post: Post) => (
                            <tr key={post.id} className="gap-2">
                                <td>{post.title}</td>
                                <td>{truncateString(post.body)}</td>
                                <td>
                                    <Link href={`/posts/${post.id}/details`} className="text-blue-950">
                                        Comments
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Page;