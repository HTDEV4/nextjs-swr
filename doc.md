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

## Automatic Revalidation

- `Revalidate on focus:` Khi mà người dùng focus vào component lập tức refresh lại. Nghĩa là nó sẽ lập tức call API và trả lại kết quả mới. Không nên tắt tính năng này đi
- `Refetch Interval:` Thiết lập thời gian trong bao lâu thì nó sẽ gửi yêu cầu. Thằng này nó liên quan tới http short polling. **Lưu ý** th này hạn chế sử dụng.
  - `Short Polling:` Client gửi request → Server trả kết quả ngay lập tức (có hoặc không có dữ liệu) → Client tiếp tục gửi request sau mỗi khoảng thời gian (ví dụ: 3s, 5s...).
    - `Ưu điểm:`
      - Dễ cài đặt (chỉ cần setInterval).
      - Phù hợp cho dữ liệu thay đổi không quá nhanh.
    - `Nhược điểm:`
      - Gửi request liên tục → tốn tài nguyên
      - Có thể nhận dữ liệu trễ (giữa 2 lần poll)
      - Lãng phí nếu server không có dữ liệu mới
    - `Ứng dụng thực tế:` Dashboard thống kê đơn giản, Kiểm tra trạng thái xử lý đơn hàng, Auto refresh comment sau vài giây
  - `Long Polling:` Client gửi request → Server giữ kết nối chờ dữ liệu có sẵn → nếu có thì trả về → client lập tức gửi request tiếp.
    - `Ưu điểm:`
      - Gửi ít request hơn (tiết kiệm)
      - Gần giống real-time (ít trễ hơn short polling).
      - Không cần WebSocket vẫn làm được gần real-time
    - `Nhược điểm:`
      - Phức tạp hơn Short Polling
      - Cần xử lý timeout, retry logic
      - Tốn tài nguyên server khi giữ kết nối nhiều
    - `Ứng dụng thực tế:` Thông báo (notification) thời gian thực, Tin nhắn chat realtime (Telegram web, Facebook chat thời đầu), Cập nhật tiến trình xử lý dữ liệu dài
- `Revalidate on Reconnect`: Thằng này dựa vào mạng của mình. Nghĩa là khi mình bị mất wifi sau khi phục hồi nó sẽ gửi refresh mới.
  **Chú ý**: 3 thằng này sử dụng khá nhiều trong thực tế.
  - refreshInterval: Hạn chế xài.
  - revalidateOnFocus với revalidateOnReconnect: Thì luôn để mặc định đi.
- Muốn cập nhật real-time giữa server và client liên tục thì xài Socket.

## Pagination

- \_limit: có bao nhiêu dữ liệu trong 1 trang.
- \_page: Số trang
- Ví dụ: \_limit=3&\_page=1 thì trang 1 có 3 dữ liệu

- Khi phân trang chú ý cái `key` của SWR là phải động. Còn kh xử lí lại thành động thì phải mutate.
