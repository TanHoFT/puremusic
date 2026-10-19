# PureMusic 11.0.0 · by Ho Tan

Rebuild giao diện và luồng phát nhạc từ đầu. Không nhúng các lớp CSS/JS tích lũy từ V10.1.4.

## Triển khai

Upload 8 file trong thư mục này vào **root** GitHub Pages (thay thế file cũ), Commit. Mở lại trang, kiểm tra phiên bản **11.0.0** ở Cài đặt. Không xóa dữ liệu website trước khi thử, để bảo toàn nhạc offline và playlist cũ.

## Cần kiểm tra trên iPhone thật

1. Kết nối Google Drive/OneDrive và quét thư viện; thử phát FLAC/MP3.
2. Nhấn Next/Previous; nhấn trực tiếp bài số 4 trong Hàng chờ; để bài phát hết tự chuyển.
3. Tải offline 2 bài, bật chế độ máy bay và phát lại trong PWA đã cài.
4. Kiểm tra iOS khóa màn hình / AirPlay hệ thống; DSP Studio có thể làm giảm độ ổn định phát nền.
5. Thử metadata và ảnh bìa nhúng FLAC, playlist, Lyrics, hẹn giờ, EQ.

## Giới hạn minh bạch

- Bản này là **bản dựng lại để kiểm thử**, chưa được xác nhận tương thích 100% với toàn bộ tính năng/thiết bị của V10.1.4.
- File cloud hiện được tải đầy đủ trước khi phát. Streaming từng phần và Google Cast trên iPhone **chưa có**.
- Trình duyệt không cung cấp xác minh bit-perfect hoặc DAC output. Không tuyên bố bit-perfect.
- Token Google/Microsoft có thể hết hạn, khi đó cần đăng nhập lại.
- Offline nằm trong IndexedDB, có thể bị iOS thu hồi khi thiếu dung lượng.
- Dữ liệu localStorage cũ được đọc một phần (playlist, offline IDs, queue), không tự động xóa. Có thể cần đồng bộ lại thư viện.

## Bảng đối chiếu chức năng V10.1.4 → V11.0.0

| Nhóm | Tình trạng V11 |
|---|---|
| Google Drive OAuth và quét nhạc | Đã lập trình; cần đăng nhập thử trên iPhone |
| OneDrive OAuth và quét nhạc | Đã lập trình; cần kiểm tra Redirect URI trên tài khoản thật |
| Thư viện, tìm kiếm, album, nghệ sĩ, playlist | Đã lập trình, kiểm thử điều hướng cơ bản |
| Hàng chờ, chọn bài, Next, tự chuyển khi hết bài | Đã lập trình, đã thử nghiệm luồng mô phỏng Chromium |
| Offline IndexedDB, tải bài/album/playlist | Đã lập trình; chưa kiểm thử offline trên iPhone |
| FLAC/MP3, ảnh bìa nhúng, ReplayGain | Đã lập trình; chưa kiểm thử bộ sưu tập thực tế |
| Audio Lab: EQ 10 dải, preamp, preset | Đã lập trình; DSP có giới hạn phát nền trên iOS |
| Lyrics qua LRCLIB | Có lời dạng văn bản; chưa có đồng bộ karaoke |
| Hẹn giờ, yêu thích, phát ngẫu nhiên, lặp | Đã lập trình |
| Chọn thư mục cloud | Có giao diện chọn/lưu; **chưa giới hạn quét tự động theo thư mục đã chọn** |
| Tải trước FLAC, crossfade, crossfeed, convolution, AutoEQ | **Chưa phục hồi đầy đủ** trong bản rebuild này |
| Signal Path nâng cao, phổ FFT, gapless | **Chưa phục hồi đầy đủ** |
| Google Cast iOS | Chưa có; giới hạn PWA |

**Không nên ghi đè bản đang dùng nếu các tính năng đánh dấu chưa phục hồi là bắt buộc.** Nên triển khai nhánh thử nghiệm GitHub Pages hoặc sao lưu bản cũ trước khi thay thế.
