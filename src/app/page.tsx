"use client";
import useSWR from "swr";
const getPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts1");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}

export default function Home() {
  // "posts" này là key, mình có thể đưa 1 cái params vào getPosts nếu có
  // "posts" (key) dùng để phân biệt các request khác nhau
  // Key này phải là duy nhất trong ứng dụng của bạn
  // Để khi xử lý revalidate, SWR sẽ biết được dữ liệu nào cần được cập nhật
  // Ví dụ: Khi bạn fetch ở phía server, bạn có thể sử dụng key này để xác định dữ liệu nào cần được lấy
  // Key này nó sẽ tự động revalidate khi có sự thay đổi dữ liệu
  // getPosts là hàm fetcher, nó sẽ được gọi khi key "posts" được sử dụng
  // Tóm lại SWR sẽ quản lý rộng hơn và nhờ vào key này, nó sẽ biết được khi nào cần revalidate dữ liệu.
  const { data: posts, isLoading, error } = useSWR("posts", getPosts, {
    // Options có thể bao gồm revalidateOnFocus, refreshInterval, fallbackData, v.v.
    fallbackData: [],
  });
  if (isLoading) {
    return <h2 className="font-bold">Loading...</h2>
  }
  if (error) {
    return <h2 className="font-bold text-red-600">Error: {error.message}</h2>
  }
  return (
    <div>
      <h1>Home</h1>
      {
        posts.map((post: { id: number; title: string; body: string }) => (
          <div key={post.id}>
            <h2 className="font-bold">{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))
      }
    </div>
  );
}
