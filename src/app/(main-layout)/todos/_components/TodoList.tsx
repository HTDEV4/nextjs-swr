"use client";

import { useState } from "react";
import useSWR from "swr";

const getTodoList = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
};

const getTodoDetail = async (id: number) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}

export default function TodoList() {

    // Xử state này để xử lí th todoDetail.
    const [todoId, setTodoId] = useState(0);

    const { data, isLoading, error } = useSWR("/todos", getTodoList);
    const { data: todoDetail, isLoading: loadingDetail } = useSWR(todoId ? `/todos/${todoId}` : null,
        () => getTodoDetail(todoId)
    );

    const handleClick = (id: number) => {
        setTodoId(id);
    }

    if (isLoading) {
        return <h2 className="font-bold">Loading...</h2>
    }
    if (error) {
        return <h2 className="font-bold">Error: {error.message}</h2>
    }

    // Todo Detail
    if (loadingDetail) {
        return <h2 className="font-bold">Loading Detail...</h2>
    }

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Todo List</h1>

            <div className="space-y-4">
                {data?.map((todo: { id: number; title: string }) => (
                    <div
                        key={todo.id}
                        className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition"
                    >
                        <h2 className="font-medium text-gray-800">{todo.title}</h2>
                        <button
                            onClick={() => handleClick(todo.id)}
                            className="text-sm px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        >
                            Status
                        </button>
                        {todoId === todo.id && !loadingDetail ?
                            (<div className="font-bold">
                                {todoDetail?.completed ? "Active" : "Inactive"}
                            </div>) : null
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}
