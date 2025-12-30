---
sidebar_position: 13
---

# Tích hợp Ant Design

Ant Design là một thư viện UI mạnh mẽ, dễ dùng, và khi kết hợp với Next.js sẽ giúp bạn xây dựng ứng dụng web nhanh chóng, đẹp mắt và tối ưu SEO.

Xem thêm tài liệu chính thức tại [Ant Design](https://ant.design/).

<ToggleTOC />

---

## I. Ant Design là gì?
- **Ant Design (AntD)** là một **UI Design System** được phát triển bởi Ant Financial.  
- Nó cung cấp **bộ component phong phú** như Button, Input, Form, Table, Modal, Layout… giúp lập trình viên xây dựng giao diện nhanh chóng và nhất quán.  
- AntD đặc biệt mạnh mẽ trong hệ sinh thái **React**, hỗ trợ **tùy biến theme**, **responsive layout**, và tối ưu trải nghiệm người dùng.  
- Đây là một trong những framework UI phổ biến nhất thế giới cho React.  

## II. Khởi tạo dự án Next.js
```bash
npx create-next-app antd-demo
cd antd-demo
npm run dev
```
Mở trình duyệt tại `http://localhost:3000` để kiểm tra dự án Next.js đã chạy.

## III. Cài đặt Ant Design
```bash
npm install antd
```

## IV. Import component AntD
Ví dụ sử dụng Button trong `src/app/page.tsx`:
```tsx
import { Button } from 'antd';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js + AntD</h1>
      <Button type="primary">Click Me</Button>
    </div>
  );
}
```

## V. Thêm CSS của AntD
Trong Next.js 13+, bạn có thể import CSS trực tiếp trong `src/app/layout.tsx`:
```tsx
import 'antd/dist/reset.css'; // hoặc 'antd/dist/antd.css' tùy phiên bản
```

## VI. Tùy biến theme (tuỳ chọn)
AntD hỗ trợ **CSS-in-JS** và **custom theme**. Bạn có thể cấu hình màu sắc, font, kích thước trong file `theme.config.js` hoặc sử dụng `ConfigProvider`:
```tsx
import { ConfigProvider } from 'antd';

<ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
  <App />
</ConfigProvider>
```

:::tip Lưu ý khi tích hợp

- **Bundle size:** AntD khá lớn, nên chỉ import component cần dùng để giảm dung lượng.  
- **SSR (Server-Side Rendering):** Next.js hỗ trợ SSR, AntD hoạt động tốt nhưng cần đảm bảo import CSS đúng cách để tránh lỗi style.  
- **Responsive:** Sử dụng Layout và Grid của AntD để tối ưu hiển thị trên mobile. 

:::

## IX. Thực hành

Tích hợp AntD tạo giao diện thêm mới bài viết.

### 1. Tạo file thêm bài viết

```tsx title="Tạo file src/app/dashboard/create-post/page.tsx"
"use client"; // nếu dùng Next.js 13+ với App Router

import styles from "@/styles/app.module.scss";
import { Form, Input, Button } from "antd";

export default function AddPostForm() {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log("Form values:", values);
        // Ở đây bạn có thể gọi API để lưu bài viết
    };

    return (
        <main className={styles.main}>
            <h2>Thêm bài viết mới</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                {/* Tiêu đề */}
                <Form.Item
                    label="Tiêu đề"
                    name="title"
                    rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
                >
                    <Input placeholder="Nhập tiêu đề bài viết" />
                </Form.Item>

                {/* Nội dung */}
                <Form.Item
                    label="Nội dung"
                    name="content"
                    rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
                >
                    <Input.TextArea rows={6} placeholder="Nhập nội dung bài viết" />
                </Form.Item>

                {/* Nút submit */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Thêm bài viết
                    </Button>
                </Form.Item>
            </Form>
        </main>
    );
}
```

### 2. Sửa layout Dashboard

```tsx title="Sửa file src/app/dashboard/layout.tsx"
'use client';

import styles from "../../styles/app.module.scss";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {

    const pathName = usePathname();
    const router = useRouter();

    const handleClick = () => {
        router.push("/");
    }
    return (
        <section>
            <div className={styles.main}>
                <Link
                    href="/dashboard"
                    className={pathName === "/dashboard" ? styles.active : ""}
                >
                    Dashboard
                </Link>
                {" | "}
                <Link
                    href="/dashboard/create-post/"
                    className={pathName === "/dashboard/create-post/" ? styles.active : ""}
                >
                    Thêm mới bài viết
                </Link>
            </div>
            <main>{children}</main>
            <div className={styles.main}>
                <button className={styles.btn} onClick={handleClick}>Back Home</button>
            </div>
        </section>
    )
}
```

### 3. Sửa layout Home

```tsx title="Sửa file src/app/layout.tsx"
import type { Metadata } from "next";
import "../styles/global.scss";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import 'antd/dist/reset.css'; // hoặc 'antd/dist/antd.css' tùy phiên bản

export const metadata: Metadata = {
  title: "Welcome to Next.js",
  description: "Learn Next.js step by step",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

### 4. Sửa trang bài viết chi tiết

```tsx title="Sửa file src/app/dashboard/[id]/page.tsx"
import styles from "@/styles/app.module.scss";

export default async function Detail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetch(
    `http://10.196.61.148:3000/api/posts/${id}`
  );
  const data = await res.json();

  return (
    <main className={styles.main}>
      <div className={`${styles.title} ${styles.titleSub}`}>Post {data.title}</div>
      <div className={styles.description}>
        <p>{data.body}</p>
      </div>
    </main>
  );
}
```

### 5. Sửa Style

```scss title="Sửa file src/styles/app.module.scss"
.main {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;

    a {
        color: #333;
        text-decoration: none;

        &.active {
            font-weight: bold;
            color: #0070f3;
        }
    }
}

.title {
    font-size: 2.1rem;
    font-weight: bold;
    margin-bottom: 1rem;

    &Sub {
        font-size: 1.2rem;
    }
}

.description {
    font-size: 1.2rem;
    line-height: 1.6;
    color: #555;
    margin-bottom: 1rem;
}

.header {
    background-color: #0070f3;
    padding: 1rem;
    color: white;
    text-align: center;

    h1 {
        margin: 0 0 10px;
        font-size: 2rem;
    }

    a {
        margin: 0 0.5rem;
    }

}

.footer {
    background-color: #f1f1f1;
    padding: 1rem;
    text-align: center;
    color: #333;
}

.btn {
    background: none;
    color: #005bb5;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
        text-decoration: underline;
    }
}

.single {
    padding: 10px 16px;
    background: #eee;
    display: block;
    margin: 8px 0;
    border-left: 8px solid #eee;

    &:hover {
        border-left: 8px solid #005bb5;
    }

    h3 {
        margin: 0;
    }
}
```
