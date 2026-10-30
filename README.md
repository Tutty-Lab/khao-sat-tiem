# Khảo sát thông tin tiệm

Ứng dụng riêng: Next.js, Vercel, Vercel Blob private. Trang `/` gửi khảo sát; `/admin` đọc từng phiếu, tải bảng lương, không cần mật khẩu. Ai truy cập ứng dụng cũng có thể xem phiếu và tải bảng lương qua API. Danh sách nhân viên thêm/xóa dòng; tiệm nail không hỏi vị trí. PDF/JPG/PNG tối đa 3 MB.

## Chạy trên máy

1. `npm install`
2. Sao chép `.env.example` thành `.env.local`, điền các giá trị.
3. `npm run dev`

## Kết nối Vercel

1. `npx vercel login`, rồi `npx vercel link` tại thư mục này để tạo project riêng.
2. Vercel Dashboard → project → Storage → Create Database → Blob → chọn **Private**, kết nối project. Vercel thêm `BLOB_READ_WRITE_TOKEN`.
3. `npx vercel --prod`.
4. Mở URL chính để gửi thử; vào `/admin` để xác nhận phiếu và bảng lương.

Mỗi phiếu là một JSON trong `surveys/`, bảng lương trong `payroll/`. Blob riêng tư, nhưng API đọc phiếu và tải bảng lương được mở công khai theo cấu hình ứng dụng. Trang quản lý tải 30 phiếu mỗi lượt. Danh sách mặc định theo khóa lưu trữ, không theo thời gian.

Có thể bật Vercel Firewall rate limiting cho `/api/surveys` trong Dashboard để giới hạn spam.

`npm run build` kiểm tra biên dịch và TypeScript. Không có kho local giả: chưa có token Blob thì việc gửi phiếu báo lỗi rõ ràng, không báo thành công giả.
