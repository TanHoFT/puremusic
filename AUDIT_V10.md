# Audit kỹ thuật PureMusic V9.2 → V10.0

## Nguồn và phạm vi
Đọc toàn bộ gói V9.2 đã tạo trong cuộc hội thoại và các ảnh người dùng gửi. Không có kết quả đo Lighthouse, DevTools, Safari iOS hay dữ liệu mạng thực.

## Phát hiện
1. **P0 – Rủi ro bảo trì:** 19 khối script và 14 khối style trong một HTML ~160 KB, các bản nâng cấp chồng CSS và listener. Khả năng xung đột cao; chưa thể coi là đã refactor.
2. **P0 – Chất lượng phát nhạc:** hàm tải nhạc cloud còn đường đi qua blob toàn bộ, gây chờ file FLAC lớn; UI facelift không giải quyết vấn đề này.
3. **P0 – Audio trên iOS:** Web Audio có thể làm mất phát nền; Direct cần được giữ làm mặc định.
4. **P1 – Thông tin phiên bản:** Cài đặt còn ghi 9.0.0 ở gói V9.2.
5. **P1 – Thư viện:** thiết kế cũ màu tím/cyan phân tán, nhiều gradient, thẻ và hàng nhạc thiếu phân cấp; desktop thiếu mật độ phù hợp.
6. **P1 – Now Playing:** tỷ lệ ảnh bìa, spacing điều khiển và trạng thái phổ cần chuẩn hóa; không được hiển thị phổ giả khi thiếu FFT.
7. **P1 – Accessibility:** focus và Reduce Motion thiếu chuẩn nhất quán; nhiều điều khiển cần vùng chạm rộng hơn.
8. **P1 – Cache:** Service Worker cần đổi phiên bản để tránh UI cũ.
9. **P2 – Metadata/artwork:** khi thiếu ảnh chỉ dùng placeholder cục bộ; không nên gọi Internet tự động theo yêu cầu người dùng.

## Đã sửa trong V10.0
- Tạo bộ design tokens, giao diện Obsidian cho thư viện, trình phát, Audio Lab và Cài đặt.
- Layout desktop 4 cột và player cân giữa; mobile 2 cột, kích thước điều khiển rõ hơn.
- Focus visible, reduced motion, tên trang, nhãn trình phát và phiên bản 10.0.0.
- Bump cache Service Worker; README khớp phiên bản.

## Chưa sửa, cần V10.1+
- Hợp nhất event handler và loại bỏ script/CSS trùng; cần kiểm thử tự động trên Chrome/Safari.
- Streaming FLAC qua OAuth/HTTP Range, không hứa hỗ trợ nếu chưa kiểm chứng Safari.
- Đo hiệu năng tải bài đầu, phát nền, hồi quy playlist/queue/OAuth.
- Kiểm tra tương phản, voiceover, touch targets bằng thiết bị thật.

## Kiểm thử chấp nhận
1. Trên iPhone, mở Thư viện, xem album, phát FLAC, khóa màn hình 1 phút.
2. Chuyển bài, mở Hàng chờ, kiểm tra Lyrics và mở/đóng Now Playing.
3. Reload, xác minh thư viện lưu, kết nối cloud, trạng thái phát.
4. Chrome Windows: desktop grid, EQ, Spectrum chỉ khi FFT thực.
5. Xác minh phiên bản 10.0.0 trong Cài đặt.
