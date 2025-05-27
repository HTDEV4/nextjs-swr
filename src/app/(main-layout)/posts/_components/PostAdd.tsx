"use client";

import { FormEvent } from "react";
import { mutate } from "swr";

export default function PostAdd() {
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const title = formData.get("title");
        const body = formData.get("body");
        const response = await fetch(`http://localhost:3001/posts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, body }),
        })

        // Làm mới
        if (!response.ok) {
            alert("Fail to add post");
        }
        // Sử dụng mutate như v thì nó sẽ call lại API
        // mutate(`/posts`);

        // Những trường hợp bị lỗi có thể là lỗi `map`, `key`.
        const newPost = await response.json();
        mutate("/posts",
            (data: { id: number; title: string; body: string }[] | undefined) => {
                if (data) {
                    return [...data, newPost];
                }
                return data;
            },
            {
                // Mặc định nó sẽ là true
                revalidate: false,
            }
        );
        (e.target as HTMLFormElement).reset();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-lg space-y-6 max-w-xl mx-auto"
        >
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
                Add New Post
            </h2>

            <div>
                <label
                    htmlFor="title"
                    className="block text-gray-700 font-medium mb-1"
                >
                    Title
                </label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter title..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                />
            </div>

            <div>
                <label htmlFor="body" className="block text-gray-700 font-medium mb-1">
                    Body
                </label>
                <input
                    type="text"
                    name="body"
                    id="body"
                    placeholder="Enter body..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
            >
                Add
            </button>
        </form>

    );
}
