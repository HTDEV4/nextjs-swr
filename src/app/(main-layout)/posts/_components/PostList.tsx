"use client";

import Link from "next/link";
import useSWR, { mutate } from "swr";
import PostAdd from "./PostAdd";
const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts");
    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }
    return response.json();
}

export default function PostList() {
    // Key: "/posts"
    const {
        data: posts,
        isLoading,
        error,
        // mutate,
    } = useSWR("/posts", getPosts, {
        fallbackData: [],
        // revalidateOnFocus: false, // Kh nên tắt
        // refreshInterval: 1000, // Tránh sử dụng th này bởi vì nó sẽ gây nặng cho cả 2 phía trình duyệt hoặc server.
    });

    const handleReload = () => {

        mutate("/posts",
            (data: { id: number; title: string; body: string }[] | undefined) => {
                if (data) {
                    return [...data, { id: 4, title: "New Post", body: "This is a new post" }];
                }
                return data;
            },
            {
                // Mặc định nó sẽ là true
                revalidate: false,
            }
        );
    }

    if (isLoading) {
        return <h2 className="font-bold">Loading...</h2>
    }
    if (error) {
        return <h2 className="font-bold text-red-600">Error: {error.message}</h2>
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-4">
            {/* Title + Reload Button */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Post List</h1>
                <button
                    onClick={handleReload}
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 shadow-md transition duration-200"
                >
                    Reload
                </button>
            </div>

            {/* Post Items */}
            <div className="space-y-4 mb-10">
                {posts.map((post: { id: number; title: string; body: string }) => (
                    <div
                        key={post.id}
                        className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
                    >
                        <h2 className="text-xl font-semibold text-gray-700">
                            <Link
                                href={`/posts/${post.id}`}
                                className="text-blue-500 hover:underline"
                            >
                                {post.title}
                            </Link>
                        </h2>
                    </div>
                ))}
            </div>

            {/* Add Post Form */}
            <PostAdd />
        </div>
    );
}
