# Data Fetching Library

## Vấn đề

- Phải có State để lưu lại data fetching
- useEffect
- Loading
- Error

- Bên phía server sẽ hỗ trợ async

## Thư viện hỗ trợ

- SWR: hỗ trợ ssr / ssg kém ở trên router. Thường áp dụng phía client. NextJS thì dùng th này
- tandstack: Nhiều đồ chơi.
- redux toolkit query: Phức tạp.

## SWR trong NextJs

- Stale-while-revalidate: là 1 thư viện React Hook dùng để fetch data.
- Xử lí th này ở client.
- SWR sẽ cho người dùng dữ liệu mới nhất khi fetch bị trễ và nó sẽ tự động revalidate luôn.

## Mutation & Revalidation

- Khi bạn có sự thay đổi nào đó bên phía API mà bạn mún cập nhật lại giao diện thì dùng mutation.
- Trường hợp sử dụng mutation global là cho trường hợp tách components.
  - Phải xác định được `key` khi sử dụng global.
- Trường hợp không global thì khỏi xài key.

- Những trường hợp bị lỗi có thể là lỗi `map`, `key`.
