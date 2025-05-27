"use client";

import Link from "next/link";
import useSWR, { mutate } from "swr";
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
    });

    const handleReload = () => {
        // Mutate: Nếu trên server có thay đổi thì sẽ lấy lại dữ liệu mới
        // Nó sẽ call lại API để lấy dữ liệu mới
        // mutate((data: { id: number; title: string; body: string }[]) => {
        //     // data này là data gốc 
        //     // Giữ nguyên dữ liệu cũ trong khi đang fetch dữ liệu mới
        //     return [...data, { id: 4, title: "New Post", body: "This is a new post" }];
        // }, {
        //     revalidate: false,
        // });
        // Nhớ phải trùng keyyyyy, cái gì quan trọng thì phải nói 3 lần
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
        <div>
            <h1>Post List</h1>
            <button
                onClick={handleReload}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ml-1"
            >
                Reload
            </button>
            {
                posts.map((post: { id: number; title: string; body: string }) => (
                    <div key={post.id}>
                        <h2 className="font-bold">
                            <Link href={`/posts/${post.id}`} className="text-blue-500 hover:underline">
                                {post.title}
                            </Link>
                        </h2>
                    </div>
                ))
            }
        </div>
    );
}
