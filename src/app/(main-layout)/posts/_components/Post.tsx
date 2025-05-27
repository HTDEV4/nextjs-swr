"use client";

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface CustomError extends Error {
    status?: number;
    message: string;
}

const getPost = async ({ id, token }: {
    id: string;
    token?: string;
}) => {
    // Check token 
    const headers: HeadersInit = {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        headers,
    });
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
    // Đây là trường hợp lấy token từ localStorage nhưng mà nó sẽ bị lỗi khi build
    // Cách xử lí trường hợp này là sử dụng useEffect 
    // const [token, setToken] = useState<string>("");

    const { data, isLoading, error } = useSWR(`/posts/${id}`, () => {
        const token = localStorage.getItem("token") ?? "";
        return getPost({ id, token });
    });

    // useEffect(() => {
    //     const token = localStorage.getItem("token") ?? "";
    //     setToken(token);
    // }, [])

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
