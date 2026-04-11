---
slug: tracking-su-kien-qua-google-tag-manager
title: Tracking sự kiện người dùng click vào các phần tử trên Landing Page qua Google Tag Manager
authors: [DinhTrieu]
tags: [blog]
---

Có thể cấu hình sự kiện trong gtag dựa trên ID của một phần tử trong trang (ví dụ: Landing page section, button, div…) mà không cần chỉnh sửa trực tiếp code gtag. Cách làm như sau

---

### 1. Tạo Trigger dựa trên ID phần tử
- Vào **Triggers** → **New**.
- Chọn loại trigger: **Click – All Elements** hoặc **Click – Just Links** (tuỳ phần tử).
- Trong phần **Trigger Configuration**, chọn:
  - **Some Clicks**.
  - Điều kiện: `Click ID` → `equals` → `landing` (giả sử ID phần tử là `landing`).
- Lưu trigger.

---

### 2. Tạo Tag gửi sự kiện về GA4
- Vào **Tags** → **New**.
- Chọn loại tag: **Google Analytics: GA4 Event**.
- Nhập:
  - **Configuration Tag**: chọn GA4 config đã có.
  - **Event Name**: ví dụ `click_landing`.
  - **Event Parameters**: thêm các tham số như:
    - `event_category` = `CTA`
    - `event_label` = `Landing Button`
- Gắn trigger vừa tạo ở bước 1.

---

### 3. Kiểm tra bằng Preview Mode
- Bấm **Preview** trong GTM.
- Mở Landing page, click vào phần tử có ID `landing`.
- Kiểm tra trong **Tag Assistant** xem tag có được kích hoạt không.

---

### 4. Xác nhận trong GA4
- Vào **Realtime report** trong GA4.
- Thực hiện click thử.
- Xem sự kiện `click_landing` có xuất hiện không.

---

👉 Như vậy, bạn không cần viết code thủ công, chỉ cần dùng GTM để bắt sự kiện theo ID phần tử. Nếu Landing page có nhiều nút/section khác nhau, bạn có thể tạo nhiều trigger tương ứng với từng ID.  
