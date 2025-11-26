---
sidebar_position: 1
---

# Cài đặt

Các bước tạo ứng dụng NextJS

<!-- ![Create-HTML-1](images/state.png) -->

<ToggleTOC />

## I. Tạo ứng dụng

```bash
npx create-next-app@latest
```
hoặc

```bash
npx create-next-app --ts
```

Khi cài đặt, bạn sẽ thấy lời nhắc sau:

```bash
What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like to use `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to customize the default import alias (@/*)? No / Yes
What import alias would you like configured? @/*
```

Sau lời nhắc, create-next-app sẽ tạo một thư mục có tên dự án của bạn và cài đặt các phụ thuộc cần thiết.

## II. Cấu trúc dự án Next.js 

.next: đây là code “đã được dịch” của Next.js (cái mà browser chạy)

public: chứa static file (CSS/JS/images)

src/app : chứa source dự án

.eslintrc.json : config eslint (warning ở terminal :v)

.gitignore: các files ko push lên git remote

next.config.js : cấu hình Next.js

package.json : thông tin thư viện cài đặt

tsconfig.json : cấu hình compiler của typescript

## III. Sửa trang Home

```jsx title="Sửa file src/app/page.tsx"
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
          <h1>Welcome to Next.js</h1>
    </div>
  );
}
```

Chạy ứng dụng

```bash
npm run dev
```

## IV. Đẩy dự án lên github

Vào https://github.com/new đặt tên cho repository là learn-nextjs

Chú ý không tạo bất cứ file nào

Sau đó gõ code sau để đẩy code lên git

```bash
git remote add origin https://github.com/huudinh/learn-nextjs.git
git push -u origin main
```