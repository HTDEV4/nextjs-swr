"use client";

import { notFound } from "next/navigation";
import useSWR from "swr";

interface CustomError extends Error {
    status?: number;
    message: string;
}

const getPost = async (id: string) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (response.status === 404) {
        const error: CustomError = new Error("Post not found");
        error.status = response.status;
        throw error;
    }
    if (!response.ok) {
        throw new Error("Failed to fetch post");
    }
    return response.json();
}

export default function Post({ id }: { id: string }) {
    // Kiểm soát tốt hơn thì kh cho truyền tự động id vào
    // Đặt key để thuận tiện cho bài toán mutation, revalidate, v.v.
    const { data, isLoading, error } = useSWR(`/posts/${id}`, () => getPost(id));

    if (isLoading) {
        return <h2 className="font-bold">Loading...</h2>;
    }

    if (error?.status === 404) {
        notFound();
    }

    if (error) {
        return <h2 className="font-bold text-red-600">Error: {error.message}</h2>;
    }

    return (
        <div>
            <h1 className="font-semibold">{data.title}</h1>
            <p>{data.body}</p>
        </div>
    );
}
