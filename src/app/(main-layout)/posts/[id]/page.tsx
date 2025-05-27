import Post from "../_components/Post";

export default async function PostDetailPage({ params }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    return (
        <div>
            <Post id={id} />
        </div>
    );
}
