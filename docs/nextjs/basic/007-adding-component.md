---
sidebar_position: 7
---

# Adding component

Tạo và sử dụng các thành phần (component) của React trong ứng dụng Next.js — giúp chia nhỏ giao diện thành các khối tái sử dụng được.

<!-- ![Create-HTML-1](images/state.png) -->

<ToggleTOC />

## I. Component thông thường

Khối giao diện độc lập trong React/Next.js, có thể là:

* Một nút bấm (`Button`)
* Một thanh menu (`Navbar`)
* Một thẻ hiển thị sản phẩm (`ProductCard`)
* Hoặc cả một trang (`Page`)

➡️ Mỗi component thường là **một file `.jsx` hoặc `.tsx`** (nếu dùng TypeScript).

---

## II. Adding component trong Next.js

**Bước 1: Tạo thư mục component**

Theo quy ước, bạn thường tạo folder:

```
/components
```

**Bước 2: Tạo file component**

Ví dụ, tạo file `Button.js` trong thư mục `components`:


**Bước 3: Import và sử dụng trong trang**

Ví dụ bạn có trang `app/page.js` hoặc `pages/index.js`:

```jsx
import Button from "../components/Button";

export default function Home() {
  return (
    <div>
      <h1>Trang chính</h1>
      <Button label="Nhấn vào đây" />
    </div>
  );
}
```

## III. Thực hành

Thêm Header và Footer cho toàn trang, Trong header tạo thẻ a liên kết đến các trang Home, About, Dashboad

### 1. Tạo Navbar component

```jsx title="Tạo file src/components/Navbar.tsx"
import styles from "../app/page.module.css";

const Navbar = () => {
    return (
        <nav className={styles.header}>
            <div className="logo">
                <h1>Logo</h1>
            </div>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/dashboard">Dashboard</a>
        </nav>
    )
}

export default Navbar;
```

### 2. Tạo Footer component

```jsx title="Tạo file src/components/Footer.tsx"
import styles from "../app/page.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>SCI Group</footer>
    )
}

export default Footer;
```

### 3. Sửa Layout toàn trang

```jsx title="Tạo file src/app/layout.tsx"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

```

### 4. Sửa Layout Dashboard

```jsx title="Tạo file src/app/dashboard/layout.tsx"
import styles from "../page.module.css"

export default function DashboardLayout({
    children
}:{
    children: React.ReactNode
}) {
    return (
        <section>      
            <div className={styles.main}>
                <a href="/dashboard">Dashboard</a> | <a href="/dashboard/setting">Setting</a>
            </div>      
            <main>{children}</main>            
        </section>
    )
}
```

### 5. Sửa Style

```css title="Sửa file src/app/page.module.css"
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
.header h1{
  margin: 0 0 10px;
  font-size: 2rem;
}
.header a{
  margin: 0 0.5rem;
}
.footer{
  background-color: #f1f1f1;
  padding: 1rem;
  text-align: center;
  color: #333;
}
```