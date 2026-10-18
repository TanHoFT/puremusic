# PureMusic Cloud PWA

Bản thử nghiệm tích hợp OAuth 2.0 Authorization Code + PKCE (Google Drive, Microsoft OneDrive), duyệt nhạc cloud, phát qua HTML Audio và lưu offline vào IndexedDB.

## Triển khai
1. Đưa toàn bộ tệp trong thư mục `puremusic` vào root của GitHub Pages (HTTPS).
2. Mở URL công khai (ví dụ `https://username.github.io/puremusic/`).
3. Google Cloud Console: tạo dự án, bật Google Drive API, cấu hình OAuth consent screen, thêm tài khoản test (nếu ứng dụng ở Testing), tạo OAuth client **Web application**, thêm **Authorized JavaScript origins** là origin website và **Authorized redirect URIs** là URL đầy đủ của `index.html` (nếu URL kết thúc bằng `/`, dùng chính URL đó).
4. Microsoft Entra admin center: App registrations > New registration, chọn tài khoản cá nhân Microsoft phù hợp, Authentication > Add a platform > **Single-page application**, khai báo redirect URI đầy đủ; Microsoft Graph delegated permission `Files.Read` (và `User.Read` nếu cần).
5. Mở trang, nhập hai **Client ID công khai** trong Cấu hình kết nối rồi bấm Lưu. **Không nhập client secret, mật khẩu hoặc token vào mã nguồn.**
6. Đăng nhập từng cloud, chọn Quét nhạc. iPhone Safari > Share > Add to Home Screen.

## Hạn chế kỹ thuật quan trọng
- Đây là bản beta, chưa xác nhận hoạt động end-to-end trên iPhone thực tế. Google OAuth token endpoint, CORS và OneDrive download URL có thể yêu cầu điều chỉnh theo tenant và trình duyệt. OAuth Google scopes rộng `drive.readonly` có thể cần xác minh ứng dụng khi phát hành cho nhiều người.
- Token chỉ lưu sessionStorage và hết hạn sẽ cần đăng nhập lại. Chưa hỗ trợ refresh token, xử lý hết hạn, phân trang thư viện cực lớn, tải tuần tự, metadata ID3/FLAC, ảnh bìa, EQ hay playlist.
- Phát trực tiếp hiện tải toàn bộ tệp vào bộ nhớ rồi mới phát (không phải HTTP range streaming). Không phù hợp album FLAC dung lượng rất lớn; cần backend/proxy streaming hoặc giải pháp signed URL thích hợp.
- Safari có thể không phát một số FLAC/ALAC. Offline IndexedDB không được iOS bảo đảm lưu vĩnh viễn. HomePod mini qua menu AirPlay của iOS khi khả dụng; Google Home Mini cần Google Cast SDK native và luồng media receiver có thể truy cập.
- Để phát hành thực tế, cần kiểm thử OAuth/codec/CORS, bảo mật, chính sách quyền truy cập và xử lý lỗi.
