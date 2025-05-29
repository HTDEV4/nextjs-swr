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

- SWR cho phép bạn cập nhật dữ liệu trong cache mà không cần gửi lại yêu cầu API.
- Trường hợp sử dụng mutation global là cho trường hợp tách components.
  - Phải xác định được `key` khi sử dụng global.
- Trường hợp không global thì khỏi xài key.

- Những trường hợp bị lỗi có thể là lỗi `map`, `key`.

## Conditional data fetching

- Xử lí tình huống mà mình muốn xử lí th swr theo điều kiện mà mình muốn

- TH1:
  - Sử dụng null trong key thì nó sẽ kh `fetch` và nó sẽ bỏ qua.
- TH2:
  - Tạo ra hàm trả về falsy.
- TH3:
  - Hàm xảy ra lỗi thì nó cũng sẽ bỏ qua và không fetch.
