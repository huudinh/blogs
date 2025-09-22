---
slug: cai-dat-ga4-trong-docusaurus
title: Cài đặt GA4 trong docusaurus?
authors: [DinhTrieu]
tags: [blog]
---

Để tích hợp Google Analytics 4 (GA4) vào một website sử dụng Docusaurus, bạn chỉ cần thực hiện vài bước cấu hình đơn giản. Dưới đây là hướng dẫn chi tiết

<!-- truncate -->

---

## 1. Tạo tài khoản GA4 và lấy mã đo lường
- Truy cập [Google Analytics](https://analytics.google.com/)
- Tạo tài sản GA4 mới → Chọn nền tảng là “Web”
- Nhập URL website và tên luồng dữ liệu
- Sau khi tạo xong, bạn sẽ nhận được **Measurement ID** có dạng `G-XXXXXXXXXX`

## 2. Cài đặt plugin Google Analytics trong Docusaurus
Docusaurus hỗ trợ tích hợp GA thông qua plugin `@docusaurus/plugin-google-gtag`.

**Cài đặt plugin:**
```bash
npm install @docusaurus/plugin-google-gtag
```

## 3. Cấu hình plugin 
Thêm đoạn sau vào file cấu hình:

```js
// docusaurus.config.js
module.exports = {
  // ... các cấu hình khác
  plugins: [
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-XXXXXXXXXX', // Thay bằng Measurement ID của bạn
        anonymizeIP: true, // Tùy chọn: ẩn địa chỉ IP người dùng
      },
    ],
  ],
};
```

## 4. Khởi động lại Docusaurus
```bash
npm run build
npm run serve
```

---

## 5. Kiểm tra hoạt động
- Truy cập website và mở tab GA4 → Kiểm tra luồng dữ liệu thời gian thực.
- Bạn có thể dùng tiện ích như Google Tag Assistant để xác minh mã GA đã được cài đúng.

---

Nếu bạn muốn theo dõi sự kiện tùy chỉnh (như click, scroll, v.v.), bạn có thể tích hợp thêm Google Tag Manager hoặc dùng `gtag()` trực tiếp trong mã nguồn.