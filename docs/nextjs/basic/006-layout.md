---
sidebar_position: 6
---

# Layout

Layout trong Next.js là một tính năng mạnh mẽ giúp bạn tái sử dụng code HTML chung cho nhiều component khác nhau, giúp cho code gọn gàng, dễ bảo trì và hiệu quả hơn

<!-- ![Create-HTML-1](images/state.png) -->

<ToggleTOC />

## I. Ưu điểm của Layout

Layout giúp bạn chia sẻ phần HTML chung giữa các component, tránh việc viết code lặp lại nhiều lần

Layout giúp chia nhỏ giao diện thành các phần riêng biệt, giúp code dễ tổ chức và quản lý hơn.

Layout đảm bảo sự nhất quán về giao diện và trải nghiệm người dùng trên toàn bộ ứng dụng.

## II. Yêu cầu tối thiểu để sử dụng Layout

- Layout chỉ hoạt động trên Next.js v9.0 trở lên

- Cần có ít nhất một file layout trong ứng dụng

## III. Quy tắc đặt tên file Layout

File layout phải có tên là layout.tsx nếu bạn sử dụng TypeScript, hoặc layout.js nếu bạn sử dụng JavaScript

File layout.tsx (hoặc layout.js) được đặt trong thư mục app

File layout.tsx (hoặc layout.js) được đặt trong thư mục của component mà bạn muốn sử dụng layout

## IV. Root layout

app/layout.tsx (hoặc app/layout.js)

Là layout cha cho tất cả các trang trong ứng dụng

Định nghĩa các thẻ HTML cơ bản như `<html>`, `<body>`, `<head>`, v.v.

Root layout không thể là server component

```jsx title="Root Layout: Sửa file app/layout.tsx"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Welcome to Next.js",
  description: "Learn Nexxt.js step by step",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

```

## V. Layout tự định nghĩa

Trong thư mục của component mà bạn muốn sử dụng layout

Là layout cho một nhóm component cụ thể

Cung cấp cấu trúc HTML chung cho nhóm component đó

Layout tự định nghĩa có thể là server component

## VI. Nested Layout

Next.js tự động hỗ trợ nested layout, giúp bạn tạo ra cấu trúc layout phức tạp một cách dễ dàng. Khi có nhiều file layout.tsx (hoặc layout.js) trong ứng dụng, Next.js sẽ tự động "lồng" các layout vào nhau, tạo ra cấu trúc layout phân cấp.

```
pages
  └─── blog
      └─── [slug]
          └─── layout.tsx (Layout cho trang chi tiết bài viết blog)
      └─── index.tsx (Có thể sử dụng layout của thư mục `blog`)
```

## VII. Thực hành

Truy cập http://localhost:3000/dashboard sẽ chuyển sang trang dashboard 

Truy cập http://localhost:3000/dashboard/setting sẽ chuyển sang trang setting 

Tạo Header, Footer chung cho dashboard 

### 1. Tạo trang dashboard 

```jsx title="Tạo file src/app/dashboard/page.tsx"
import styles from "../page.module.css";

export default function Dashboard() {
  return (
    <main className={styles.main}>
        <div className={styles.title}>Dashboard</div>
        <div className={styles.description}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, ad officiis suscipit porro modi necessitatibus consectetur laudantium alias minus quisquam laboriosam aperiam unde reprehenderit repellat! Suscipit voluptatem accusamus blanditiis incidunt.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas explicabo, quos corporis vitae cupiditate sapiente, libero harum illo, consectetur nulla aliquid repellat impedit iste distinctio reiciendis. Maiores est tenetur animi.</p>
        </div>
    </main>
  );
}
```

### 2. Tạo trang setting 

```jsx title="Tạo file src/app/dashboard/setting/page.tsx"
import styles from "../page.module.css";

export default function Dashboard() {
  return (
    <main className={styles.main}>
        <div className={styles.title}>Setting</div>
        <div className={styles.description}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, ad officiis suscipit porro modi necessitatibus consectetur laudantium alias minus quisquam laboriosam aperiam unde reprehenderit repellat! Suscipit voluptatem accusamus blanditiis incidunt.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas explicabo, quos corporis vitae cupiditate sapiente, libero harum illo, consectetur nulla aliquid repellat impedit iste distinctio reiciendis. Maiores est tenetur animi.</p>
        </div>
    </main>
  );
}
```

### 3. Tạo Header, Footer cho Dashboard

```jsx title="Tạo file src/app/dashboard/layout.tsx"
import styles from "../page.module.css";

export default function DashboardLayout({
    children
}:{
    children: React.ReactNode
}) {
    return (
        <section>
            <header className={styles.header}>Header</header>
            <main>{children}</main>
            <footer className={styles.footer}>Footer</footer>
        </section>
    )
}
```

### 4. Sửa Style

```css title="Sửa file app/page.module.css"
.main{
  max-width: 800px;
  margin:0 auto;
  padding: 2rem;
}
.title{
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.description{
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 1rem;
}
.header{
  background-color: #0070f3;
  padding: 1rem;
  color: white;
  text-align: center;

}
.footer{
  background-color: #f1f1f1;
  padding: 1rem;
  text-align: center;
  color: #333;
}
```