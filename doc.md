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
