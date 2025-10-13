---
slug: docusaurus-update-co-gi-moi
title: Docusaurus 3.9 có gì mới
authors: [DinhTrieu]
tags: [blog]
---

Docusaurus 3.9 vừa ra mắt với một loạt cải tiến đáng chú ý dành cho các nhà phát triển web documentation. Đây là những điểm nổi bật nhất từ bản cập nhật này

<!-- truncate -->

---

### 🚀 Tính năng mới

- **Hỗ trợ Algolia DocSearch v4**: Tích hợp AskAI – một trợ lý tìm kiếm thông minh có thể trả lời câu hỏi dựa trên nội dung tài liệu của bạn. Đây là bước tiến lớn trong việc nâng cao trải nghiệm tìm kiếm.
- **Nâng cấp i18n**: Thêm các tùy chọn `i18n.localeConfigs[locale].{url, baseUrl}` giúp triển khai đa ngôn ngữ phức tạp và hỗ trợ tốt hơn cho các website đa miền.
- **Mermaid ELK layout**: Hỗ trợ sơ đồ ELK trong Mermaid, giúp trực quan hóa dữ liệu tốt hơn.
- **Nâng cấp Rspack lên 1.5**: Tăng hiệu suất build và loại bỏ các tùy chọn lỗi thời.
- **Tùy chỉnh Markdown**: Cho phép vô hiệu hóa emoji và thêm hook xử lý Markdown qua `siteConfig.markdown.hooks`.

### ⚠️ Thay đổi quan trọng

- **Ngừng hỗ trợ Node.js 18**: Phiên bản mới yêu cầu Node.js ≥ 20.0 do Node.js 18 đã hết vòng đời và không còn nhận cập nhật bảo mật.

### 🐞 Sửa lỗi

- Cải thiện hiển thị sidebar, biểu tượng mạng xã hội, và xử lý các lỗi nhỏ liên quan đến copy code, heading anchors, v.v.


- Để update lên phiên bản mới nhất bạn gõ lệnh sau

```bash
npm i @docusaurus/core@latest @docusaurus/plugin-google-gtag@latest @docusaurus/preset-classic@latest @docusaurus/module-type-aliases@latest @docusaurus/types@latest
```

Nếu bạn đang dùng Docusaurus cho dự án tài liệu của mình, bản 3.9 là một bản nâng cấp đáng để cân nhắc.