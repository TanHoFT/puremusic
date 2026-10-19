# PureMusic Hi-Fi V8.0 — by Ho Tan

Nâng cấp trên V7.4, giữ lại Google Drive, OneDrive, thư viện, playlist, ảnh, lời và slideshow.

## Mới
- Audio Diagnostics: đọc STREAMINFO FLAC (sample rate, bit depth, số kênh), đọc header WAV; hiển thị dung lượng thực khi đã tải bài.
- EQ 10 dải trên nền tảng cho phép Web Audio. Trên Safari iPhone, DSP vẫn mặc định tắt để ưu tiên phát nhạc nền; EQ không tác động khi DSP tắt.
- Media Session: metadata và các lệnh màn hình khóa khi Safari hỗ trợ.
- Hẹn giờ tắt nhạc 15/30/60 phút (chỉ hoạt động khi trang còn chạy).
- Signal Path trung thực: không tuyên bố bit-perfect, Hi-Res đầu ra hay DSD khi chưa xác minh.

## Cài đặt
Giải nén ZIP, tải tất cả tệp lên thư mục gốc GitHub repository `puremusic`, commit. Đợi Pages cập nhật, mở lại PWA.

## Giới hạn
Đây vẫn là PWA, không có native DAC control, DoP, gapless được bảo đảm hoặc codec Bluetooth telemetry. Phát nhạc cloud hiện có thể cần tải cả tệp trước khi phát. Không có dữ liệu đo hiệu năng trên iPhone thực tế.
