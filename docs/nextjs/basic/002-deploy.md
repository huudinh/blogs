---
sidebar_position: 2
---

# Deploy 

Hướng dẫn Deploy ứng dụng NextJS. Vercel là nền tảng do chính đội ngũ tạo ra Next.js phát triển, nên hỗ trợ rất tốt.

<!-- ![Create-HTML-1](images/state.png) -->

<ToggleTOC />

## I. Deploy Vercel

Tạo tài khoản tại vercel.com bằng tài khoản github

Import Git Repository "learn-nextjs

Trong màn hình New Project chọn Deploy

Màn hình Congratulations! bạn đã hoàn thành chọn Goto Dashboard xuất hiện màn hình quản lý ứng dụng

Click Visit để xem trực tiếp ứng dụng đã Deploy

## II. Update code Vercel

Để update code trên Vercel ta chỉ cần push code lên git

- Thay đổi code dưới máy tính

- Gõ lệnh sau, code sẽ được tự động đồng bộ lên Vercel

```bash
git add .
git commit -m "update code"
git push
```

## III. Build ứng dụng chạy static

Để Build ứng dụng static (html + css) bạn cấu hình file next.config.mjs

```
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    distDir: "build",
    output: "export",
  };

export default nextConfig;

```

sau đó gõ lệnh

```
npm run build
```

Code HTML, CSS sẽ xuất hiện trong thư mục build