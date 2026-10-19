# PureMusic V8.9 – Playback Engine

**by Ho Tan** · PWA · Google Drive / OneDrive

## Cải tiến so với V8.8
- Tải trước bài kế tiếp theo **hàng chờ thực tế** (thay vì bài tiếp theo trong toàn thư viện).
- Chỉ tải trước khi biết kích thước và file không vượt 35 MB; không tải trước trên mạng yếu/tiết kiệm dữ liệu (khi trình duyệt cung cấp thông tin).
- Giới hạn bộ nhớ đệm RAM ở một bài; tái sử dụng tải dở và file offline.
- Hiển thị thống kê cache và thời gian chờ tại Cài đặt → Playback Engine.
- Giữ hàng chờ, Audio Lab, Google Drive/OneDrive, lyrics, giao diện.

## Giới hạn
- File FLAC đầu tiên **vẫn phải tải toàn bộ** trước khi phát. Chưa có streaming HTTP Range xác thực.
- Safari iOS có thể không cung cấp thông tin loại mạng; tốc độ thực tế phụ thuộc file và kết nối.
- Không xác nhận bit-perfect.

## Triển khai
Giải nén và upload cả 5 file vào thư mục gốc của repository GitHub Pages `puremusic`. Không tải nguyên ZIP lên GitHub.
