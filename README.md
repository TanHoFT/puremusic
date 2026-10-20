# PureMusic 11.7.0 – Smart Google Reconnect

- Chỉ hiển thị Google Drive; OneDrive tạm ẩn. Không xóa dữ liệu nhạc offline hay cấu hình OneDrive cũ.
- Mỗi lần mở: kiểm tra access token đang lưu trong phiên trình duyệt và thời hạn; nếu hợp lệ tự sử dụng.
- Nếu token hết hạn và từng kết nối, hiện nút **Tiếp tục với Google** trong Thư viện. iOS yêu cầu người dùng chạm để mở OAuth.
- Thư viện đã cache và nhạc offline vẫn mở được khi mất mạng.
- Chỉ tự quét thư mục đã chọn khi cần (cách lần quét gần nhất trên 15 phút).
- Không tự động gia hạn token Google sau khi Safari đóng phiên; Google Identity Services không bảo đảm silent OAuth trên iOS.
- Giữ nguyên bộ phát, hàng chờ, FLAC, playlist, EQ, Lyrics và offline của 11.5.
- Cần kiểm thử thực tế OAuth và phát nhạc trên iPhone.
