# Khảo sát thông tin tiệm

Ứng dụng riêng: Next.js, Vercel, Vercel Blob private. Trang `/` gửi khảo sát; `/admin` đăng nhập, đọc từng phiếu, tải bảng lương. Danh sách nhân viên thêm/xóa dòng; tiệm nail không hỏi vị trí. PDF/JPG/PNG tối đa 3 MB. Không lưu dữ liệu cá nhân vào trình duyệt.

## Chạy trên máy

1. `npm install`
2. Sao chép `.env.example` thành `.env.local`, điền các giá trị.
3. `npm run dev`

## Kết nối Vercel

1. `npx vercel login`, rồi `npx vercel link` tại thư mục này để tạo project riêng.
2. Vercel Dashboard → project → Storage → Create Database → Blob → chọn **Private**, kết nối project. Vercel thêm `BLOB_READ_WRITE_TOKEN`.
3. Thêm `ADMIN_PASSWORD` trong Environment Variables, dùng mật khẩu ngẫu nhiên dài ít nhất 20 ký tự. Không đặt tiền tố NEXT_PUBLIC cho các biến bí mật.
4. `npx vercel --prod`.
5. Mở URL chính để gửi thử; vào `/admin` để xác nhận phiếu và bảng lương. Chỉ chia sẻ mật khẩu quản lý với người phụ trách.

Mỗi phiếu là một JSON trong `surveys/`, bảng lương trong `payroll/`. Tất cả ở Blob riêng tư; tải tệp phải có phiên quản lý. Phiên hết hạn sau 8 giờ. Thay mật khẩu vô hiệu hóa phiên cũ. Trang quản lý tải 30 phiếu mỗi lượt. Danh sách mặc định theo khóa lưu trữ, không theo thời gian.

Trước khi phát liên kết rộng rãi, bật Vercel Firewall rate limiting cho `/api/login` và `/api/surveys` trong Dashboard để giới hạn đăng nhập và spam. Ứng dụng không có cơ chế khôi phục mật khẩu; thay `ADMIN_PASSWORD` trong Vercel rồi redeploy.

`npm run build` kiểm tra biên dịch và TypeScript. Không có kho local giả: chưa có token Blob thì việc gửi phiếu báo lỗi rõ ràng, không báo thành công giả.
