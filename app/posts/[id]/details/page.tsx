import Link from "next/link";

const Details = async ({params}: {params: Promise<{ id: string }>}) => {
    const { id } = await params;
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    if (!response.ok) throw new Error('An error ocurred');
    const posts = await response.json() as PostComments[];
    return (
        <div className="flex flex-col p-6">
            <Link href='/posts' className="bg-blue-600 rounded-lg max-w-1/12 text-center">
                Back
            </Link>

            {
                posts.map(post => (
                    <div key={post.id} className="m-5">
                        <h2 className="text-2xl">{post.name}</h2>
                        <span>{post.email}</span>
                        <p>{post.body}</p>
                    </div>
                ))
            }

        </div>
    );
}

export default Details;