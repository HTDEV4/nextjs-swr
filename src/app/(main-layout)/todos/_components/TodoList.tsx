"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter, useSearchParams } from "next/navigation";

// >>>> Chức năng phân trang (Pagination)
const LIMIT = 5;

const getTodoList = async (search: string = "", page: number = 1) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos?q=${search}&_page=${page}&_limit=${LIMIT}`);
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    // >>> Xử lí phân trang
    const data = await response.json();
    const count = response.headers.get("x-total-count");
    return { data, count };
};

const getTodoDetail = async (id: number) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}

export default function TodoList() {
    // >>>> Chức năng phân trang.
    // Tính tổng số trang
    // Tổng số bản ghi lấy từ API. Lưu ý đó là cái response ở getTodoList
    const [currentPage, setCurrentPage] = useState<number>(1); // Mặc định của nó là 1
    const [totalPage, setTotalPage] = useState<number>(0);
    // Tối ưu phân trang đẩy lên params cho biết mình đang ở trang thứ mấy
    const router = useRouter();

    // Xử lí search
    // Khi search thay đổi thì phải thêm state vô cho nó, và search nó sẽ phụ thuộc getTodoList
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? "";
    // Để lưu số trang trên Url
    const pageFromUrl = searchParams.get("page");

    // Xử state này để xử lí th todoDetail.
    // - todoId: Để lấy th todo detail ra  
    const [todoId, setTodoId] = useState(0);
    // currentPage là 1 dạng option có Page bởi sau này chúng ta sẽ giải quyết bài toán revalidate ở trong 1 Page thôi.
    // Tránh việc nó call lại từ đầu.
    // Chú ý cái key nếu nó tĩnh phải thay đổi key thành động. Nếu muốn xử lí key tĩnh thì phải mutate
    const { data, isLoading, error } = useSWR(`/todos?search=${search}&page=${currentPage}`,
        async () => {
            const { data, count } = await getTodoList(search, currentPage);
            setTotalPage(Math.ceil(Number(count) / LIMIT));
            return data;
        }
    );

    const { data: todoDetail, isLoading: loadingDetail } = useSWR(todoId ? `/todos/${todoId}` : null,
        () => getTodoDetail(todoId)
    );

    const handleClick = (id: number) => {
        setTodoId(id);
    }

    // Tối ưu phân trang
    useEffect(() => {
        if (currentPage > 1) {
            router.push(`/todos?page=${currentPage}`);
        } else {
            if (!search) {
                router.push(`/todos`);
            }
        }
    }, [currentPage, router, search]);

    // Lưu số trang lên url
    useEffect(() => {
        setCurrentPage(Number(pageFromUrl) || 1);
    }, [pageFromUrl])

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                <div className="flex items-center space-x-3">
                    <svg
                        className="animate-spin h-8 w-8 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                    </svg>
                    <h2 className="text-xl font-bold text-blue-600">Loading...</h2>
                </div>
            </div>
        );
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
            <div className="space-y-4">
                <h1 className="font-bold">Current Page: {currentPage}</h1>
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
                <div className="flex justify-between gap-4 mt-6">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1} // Phân trang nhớ có thằng này
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        Prev
                    </button>
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPage}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}