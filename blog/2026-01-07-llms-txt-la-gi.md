---
slug: llms-txt-la-gi
title: LLMs.txt là gì?
authors: [DinhTrieu]
tags: [blog]
---

LLMs.txt là một tiêu chuẩn mới (giống như `robots.txt`) dùng để hướng dẫn các mô hình ngôn ngữ lớn (LLMs) như ChatGPT, Copilot… cách thu thập và sử dụng nội dung từ website của bạn. Để tích hợp vào WordPress, bạn chỉ cần tạo file `llms.txt` trong thư mục gốc của website và khai báo nội dung bạn muốn AI đọc hoặc bỏ qua.


---

## I. LLMs.txt là gì?
- **Định nghĩa:** Là một file văn bản đặt ở thư mục gốc website, giúp **AI crawler** biết nội dung nào quan trọng, nên ưu tiên, hoặc không được phép sử dụng.  
- **Tương tự robots.txt:** Nếu robots.txt hướng dẫn công cụ tìm kiếm (Google, Bing), thì llms.txt hướng dẫn **AI/LLMs**.  
- **Mục đích:**  
  - Giảm tải việc AI phải crawl toàn bộ site.  
  - Cho phép bạn **chọn lọc nội dung** mà AI có thể dùng để trả lời người dùng.  
  - Bảo vệ nội dung nhạy cảm hoặc không muốn AI sử dụng.

---

## II. Cách tích hợp LLMs.txt vào WordPress
1. **Tạo file llms.txt**  
   - Mở trình soạn thảo (Notepad, VS Code).  
   - Viết nội dung theo chuẩn, ví dụ:
     ```
     Allow: /blog/
     Disallow: /private/
     Sitemap: https://example.com/sitemap.xml
     ```
   - Lưu file với tên `llms.txt`.

2. **Đặt file vào thư mục gốc WordPress**  
   - Thư mục gốc thường là nơi chứa `wp-config.php`.  
   - Upload file `llms.txt` bằng FTP, cPanel hoặc File Manager.

3. **Kiểm tra truy cập**  
   - Truy cập `https://yourdomain.com/llms.txt` để chắc chắn file hiển thị.

4. **Tùy chỉnh nội dung**  
   - **Allow:** Chỉ định thư mục/nội dung mà AI có thể đọc.  
   - **Disallow:** Ngăn AI đọc nội dung.  
   - **Sitemap:** Khai báo sitemap để AI dễ tìm nội dung quan trọng.  
   - Có thể thêm link API, tài liệu, chính sách… để AI hiểu rõ hơn.

---

## III. Lưu ý & Rủi ro
- **Tiêu chuẩn mới:** LLMs.txt chưa được tất cả AI hỗ trợ, nhưng đang dần phổ biến.  
- **Không thay thế robots.txt:** Bạn vẫn cần robots.txt cho SEO.  
- **Quyền kiểm soát:** Không đảm bảo 100% rằng mọi AI sẽ tuân thủ, nhưng hầu hết các hệ thống lớn sẽ tôn trọng.  
- **Nội dung nhạy cảm:** Nếu có dữ liệu riêng tư, tốt nhất là **không public** thay vì chỉ Disallow.

---

## IV. So sánh nhanh

| Tiêu chuẩn | Đối tượng | Chức năng chính |
|------------|-----------|-----------------|
| robots.txt | Công cụ tìm kiếm (Google, Bing) | Điều hướng crawl cho SEO |
| sitemap.xml | Công cụ tìm kiếm | Liệt kê cấu trúc nội dung site |
| llms.txt | AI/LLMs (ChatGPT, Copilot…) | Điều hướng crawl cho AI, chọn lọc nội dung |

## V. Mẫu file llms.txt tối ưu

Đây là một **mẫu file `llms.txt` tối ưu** cho một website WordPress dạng blog + trang sản phẩm, đồng thời loại bỏ các khu vực quản trị và nội dung riêng tư:

```
# llms.txt - hướng dẫn cho AI/LLMs khi thu thập dữ liệu từ website WordPress

# Cho phép AI đọc nội dung chính
Allow: /blog/
Allow: /products/
Allow: /shop/
Allow: /category/
Allow: /tag/

# Không cho phép AI đọc các khu vực quản trị hoặc riêng tư
Disallow: /wp-admin/
Disallow: /wp-login.php
Disallow: /private/
Disallow: /cart/
Disallow: /checkout/
Disallow: /my-account/

# Khai báo sitemap để AI dễ tìm nội dung quan trọng
Sitemap: https://example.com/sitemap.xml

# Thông tin thêm (tùy chọn)
# Bạn có thể thêm link tới tài liệu, API hoặc chính sách
Documentation: https://example.com/docs/
Policy: https://example.com/privacy-policy/
```

- **Allow:** Chỉ định thư mục/nội dung mà bạn muốn AI ưu tiên (blog, sản phẩm).  
- **Disallow:** Ngăn AI đọc các trang quản trị, giỏ hàng, checkout, hoặc nội dung riêng tư.  
- **Sitemap:** Khai báo sitemap để AI dễ dàng tìm toàn bộ cấu trúc nội dung.  
- **Documentation/Policy:** (tùy chọn) giúp AI hiểu thêm về chính sách hoặc tài liệu liên quan.
