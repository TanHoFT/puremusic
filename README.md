# PureMusic V9.2 – Adaptive Audio Visualizer

**by Ho Tan** · PWA · Google Drive / OneDrive

## Thay đổi
- FFT thực 32/64/128 dải qua Web Audio AnalyserNode; không mô phỏng âm lượng.
- Chrome Windows: có thể kích hoạt phân tích âm thanh trong Audio Lab.
- iPhone: mặc định Direct để ưu tiên phát nền; có nút bật Spectrum thật kèm cảnh báo.
- Trạng thái minh bạch khi không có dữ liệu FFT.
- Giữ thư viện, cloud, hàng chờ, ReplayGain, EQ và các chức năng V9.1.

## Giới hạn
Safari iOS có thể dừng phát nền khi sử dụng Web Audio. Trở về Direct cần tải lại trang. FFT đo tín hiệu trong graph, không đo mức âm lượng thực tế ở loa/Bluetooth.

## Triển khai
Upload 5 file vào thư mục gốc GitHub Pages và Commit. Kiểm thử trên Chrome Windows và Safari iPhone.
