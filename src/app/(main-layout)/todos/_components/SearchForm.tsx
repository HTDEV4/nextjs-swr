"use client";

import { debounce } from "@/app/utils/debounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function SearchForm() {

    const [search, setSearch] = useState<string>("");
    const router = useRouter();
    useEffect(() => {
        if (search === "") {
            router.push(`/todos`)
        } else {
            router.push(`/todos?search=${search}`)
        }
    }, [search, router]);

    return (
        <div className="w-full max-w-md mx-auto mt-6 mb-3">
            <div className="relative">
                <input
                    type="search"
                    placeholder="Search..."
                    className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    onChange={debounce((e) => (setSearch(e.target.value), 500))}
                />
                <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.397h-.001l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85zm-5.242 1.156a5 5 0 110-10 5 5 0 010 10z" />
                </svg>
            </div>
        </div>
    );
}
