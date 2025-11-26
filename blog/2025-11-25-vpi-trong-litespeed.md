---
slug: vpi-trong-litespeed
title: VPI trong LiteSpeed là gì?
authors: [DinhTrieu]
tags: [blog]
---

Đây là một dịch vụ của LiteSpeed/QUIC.cloud giúp cải thiện trải nghiệm tải ảnh khi bật Lazy Load, đặc biệt với các ảnh **above-the-fold** (ảnh hiển thị ngay khi mở trang).

<!-- truncate -->
---

### I. Viewport Images
- **VPI (Viewport Images)** là một dịch vụ tối ưu hóa hình ảnh được giới thiệu trong LiteSpeed Cache v5.0.  
- Nó giải quyết nhược điểm của Lazy Load: khi bật Lazy Load, tất cả ảnh (kể cả ảnh trên màn hình đầu tiên) đều bị trì hoãn tải. Điều này có thể khiến người dùng thấy trang trống hoặc chỉ có khung xám.  
- VPI sẽ **xác định và ưu tiên tải ngay các ảnh trong vùng hiển thị đầu tiên (viewport)**, trong khi các ảnh khác vẫn Lazy Load như bình thường.  

---

### II. Ý nghĩa của “files left in queue”
- Khi bạn bật tính năng VPI trong LiteSpeed Cache, plugin sẽ gửi các yêu cầu đến dịch vụ QUIC.cloud để phân tích và tạo danh sách ảnh cần ưu tiên.  
- Những yêu cầu này được đưa vào **hàng đợi (queue)** để xử lý.  
- Thông báo *“499 VPI files left in queue”* nghĩa là hiện tại còn **499 trang/hình ảnh** đang chờ dịch vụ QUIC.cloud xử lý để tạo dữ liệu VPI.  

---

### III. Khi nào bạn thấy thông báo này?
- Sau khi bật **Viewport Images** trong LiteSpeed Cache.  
- Khi website có nhiều trang hoặc nhiều ảnh cần phân tích.  
- Nếu cron job hoặc kết nối với QUIC.cloud chưa chạy hết, số lượng file trong queue sẽ hiển thị.  

---

### IV. Lợi ích của VPI
- **Cải thiện tốc độ hiển thị ban đầu (First Contentful Paint, Largest Contentful Paint)**.  
- Người dùng sẽ thấy ảnh trên màn hình đầu tiên ngay lập tức, không phải chờ Lazy Load.  
- Giúp tăng điểm hiệu năng trên Google PageSpeed Insights và Core Web Vitals.  