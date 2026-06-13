# Hướng dẫn triển khai (Deploy) Landing Page lên Firebase Hosting

Dự án này đã được cấu hình sẵn tệp `firebase.json` ở thư mục gốc để có thể dễ dàng tải trang web lên Firebase Hosting.

Dưới đây là các bước hướng dẫn chi tiết thực hiện trên máy tính phát triển:

---

## Bước 1: Cài đặt và Đăng nhập Firebase CLI

Nếu máy tính chưa cài đặt công cụ Firebase toàn cục, có thể sử dụng trực tiếp qua `npx` mà không cần cài đặt.

Mở Terminal tại thư mục gốc của dự án (`driver-license-prep-web`) và chạy lệnh sau để thực hiện đăng nhập tài khoản Google quản trị:

```bash
npx firebase-tools login
```

*Trình duyệt web sẽ tự động mở ra. Đăng nhập tài khoản Google quản lý dự án Firebase và nhấn **Allow** (Cho phép) để cấp quyền cho Firebase CLI.*

---

## Bước 2: Liên kết với dự án Firebase

1. Xem danh sách các dự án Firebase hiện có trong tài khoản để lấy **Project ID**:
   ```bash
   npx firebase-tools projects:list
   ```

2. Liên kết thư mục mã nguồn này với dự án Firebase mong muốn (thay thế `<PROJECT_ID>` bằng ID dự án thực tế từ danh sách trên):
   ```bash
   npx firebase-tools use --add <PROJECT_ID>
   ```
   *Khi dòng lệnh yêu cầu đặt tên alias cho dự án này, nhập: `default`.*

*(Nếu chưa có dự án, truy cập [Firebase Console](https://console.firebase.google.com/) để tạo một dự án mới trước khi thực hiện bước này).*

---

## Bước 3: Triển khai lên Firebase Hosting

Chạy lệnh sau để tải toàn bộ trang web (bao gồm trang chủ, các trang điều khoản pháp lý, ảnh chụp màn hình và tệp xác minh quảng cáo `app-ads.txt`) lên máy chủ:

```bash
npx firebase-tools deploy
```

---

## Kết quả sau khi Deploy

Sau khi quá trình deploy hoàn tất thành công, terminal sẽ hiển thị các thông tin:
*   **Project Console:** Liên kết đến trang quản trị dự án trên Firebase.
*   **Hosting URL:** Địa chỉ trang web trực tuyến (thường có dạng `https://<ten-du-an>.web.app` hoặc `https://<ten-du-an>.firebaseapp.com`).

Sao chép địa chỉ **Hosting URL** này để làm trang chủ giới thiệu ứng dụng trên Google Play Console hoặc App Store Connect.
