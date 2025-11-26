---
sidebar_position: 9
---

# CSS với Next.JS

Next.js hỗ trợ nhiều phương pháp khác nhau để định kiểu (styling) cho ứng dụng, bao gồm **CSS Modules**, **CSS-in-JS**, **Styled Components**, và **Tailwind CSS**. Mỗi phương pháp có ưu và nhược điểm riêng, phù hợp với từng loại dự án.

<!-- ![Create-HTML-1](images/state.png) -->

<ToggleTOC />

---

## I. CSS-in-JS (styled-jsx & thư viện khác)

**CSS-in-JS** cho phép bạn viết CSS trực tiếp trong các component JavaScript hoặc TypeScript.
Next.js tích hợp sẵn **styled-jsx**, và cũng hỗ trợ các thư viện CSS-in-JS phổ biến khác như **styled-components**, **emotion**, v.v.

#### Ví dụ sử dụng `styled-jsx`:

```jsx
function HelloWorld() {
  return (
    <div>
      Hello world
      <p>scoped!</p>

      {/* CSS cục bộ */}
      <style jsx>{`
        p {
          color: blue;
        }
        div {
          background: red;
        }
        @media (max-width: 600px) {
          div {
            background: blue;
          }
        }
      `}</style>

      {/* CSS toàn cục */}
      <style global jsx>{`
        body {
          background: black;
        }
      `}</style>
    </div>
  )
}

export default HelloWorld;
```

**Giải thích:**

* Thẻ `<style jsx>` chỉ áp dụng style cho component hiện tại (phạm vi cục bộ).
* Thẻ `<style global jsx>` áp dụng style toàn cục cho toàn trang.
* Có thể viết CSS động hoặc sử dụng biến trong JS.

**Lưu ý:**
Hãy đảm bảo CSS được tải sớm để tránh hiện tượng **FOUC** (*Flash of Unstyled Content*), khi trang hiển thị trống hoặc chưa được áp dụng CSS trong giây lát.

---

## II. Styled Components

**Styled Components** là một thư viện CSS-in-JS phổ biến, cho phép định nghĩa style ngay trong component bằng cú pháp template literal.

#### Cài đặt:

```bash
npm install styled-components
```

#### Cấu hình `next.config.js`

```js
module.exports = {
  compiler: {
    styledComponents: true,
  },
}
```

#### Tạo component registry (`lib/registry.tsx`)

Dùng để thu thập và chèn CSS được render trên server.

```tsx
import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })

  if (typeof window !== 'undefined') return <>{children}</>

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  )
}
```

#### Sử dụng trong layout gốc (`app/layout.tsx`)

```tsx
import StyledComponentsRegistry from './lib/registry'

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang="vi">
      <body>
        <StyledComponentsRegistry>
          {props.children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
```

---

## III. Tailwind CSS

**Tailwind CSS** là framework CSS *utility-first* giúp xây dựng giao diện nhanh chóng bằng class tiện ích.

#### Cài đặt:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### Cấu hình `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

#### Thêm vào file CSS toàn cục (`globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Sử dụng trong component

```tsx
export default function Home() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}
```

---

## IV. CSS Modules

**CSS Modules** giúp cô lập phạm vi CSS cho từng component, tránh trùng lặp tên lớp.
Next.js hỗ trợ **CSS Modules** mặc định.

#### Ví dụ

```css
/* components/Button.module.css */
.error {
  color: white;
  background-color: red;
}
```

```tsx
// components/Button.tsx
import styles from './Button.module.css'

export function Button() {
  return (
    <button type="button" className={styles.error}>
      Destroy
    </button>
  )
}
```

✅ Mỗi class trong CSS Modules được Next.js tự động đổi tên thành chuỗi duy nhất khi build, đảm bảo không xung đột.

---

## V. SASS Modules

**SASS** mở rộng cú pháp CSS, giúp viết gọn hơn và có tính cấu trúc.

#### Cài đặt:

```bash
npm install sass
```

#### Tạo file SASS module: `/src/styles/app.module.scss`

```scss
.menu {
  display: flex;
  list-style: none;
  padding: 0;

  li {
    padding: 5px;
  }
}
```

#### Sử dụng trong component: `/src/app/components/Header.tsx`

```tsx
'use client'

import Link from 'next/link'
import styles from '@/styles/app.module.scss'

const Header = () => {
  return (
    <header>
      <ul className={styles.menu}>
        <li><Link href="/admin">Admin</Link></li>
        <li><Link href="/admin/dashboard">Dashboard</Link></li>
      </ul>
    </header>
  )
}

export default Header
```

---

## VI. Kết luận

| Phương pháp                | Ưu điểm                                 | Nhược điểm                        | Phù hợp cho                        |
| -------------------------- | --------------------------------------- | --------------------------------- | ---------------------------------- |
| **CSS Modules**            | Dễ dùng, hỗ trợ sẵn, cô lập phạm vi CSS | Không hỗ trợ CSS động             | Dự án vừa và nhỏ                   |
| **SASS Modules**           | Cấu trúc rõ, hỗ trợ biến & mixin        | Cần biên dịch thêm                | Dự án có UI phức tạp               |
| **CSS-in-JS (styled-jsx)** | Không cần cài thêm thư viện, hỗ trợ SSR | Cú pháp JSX phức tạp              | Component nhỏ, style động          |
| **Styled Components**      | Mạnh mẽ, hỗ trợ theme, dynamic style    | Cần cấu hình thêm                 | Dự án lớn, có SSR                  |
| **Tailwind CSS**           | Nhanh, tiện, chuẩn hoá thiết kế         | Class dài, khó đọc nếu không quen | UI hiện đại, cần tốc độ phát triển |

---


## III. Thực hành

Sử dụng Sass Modules áp dụng cho toàn bộ dự án đang chạy, chúng ta sẽ có 2 file scss chính là global.scss và app.module.scss. Sau khi tạo xong file scss bạn cần import chúng vào các file code đang chạy.

Các việc cần làm: 

- Tạo File SCSS Global cho toàn trang
- Tạo file SCSS Module App cho toàn trang
- Sửa Layout trang chủ
- Sửa trang chủ
- Sửa Component Header
- Sửa Component Footer
- Sửa trang About
- Sửa Layout Dashboard
- Sửa trang Dashboard
- Sửa trang Setting

Chú ý: Bạn cần cài đặt Sass sau đó chạy lại ứng dụng.

### 1. Tạo File SCSS Global cho toàn trang

Xóa file src/app/globals.css, thay bằng src/styles/global.scss

```css title="Tạo file src/styles/global.scss"
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

@media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
}
```

### 2. Tạo file SCSS Module App cho toàn trang

Tạo file Module App đồng thời xóa file page.module.css

```css title="Tạo file src/styles/app.module.scss"
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
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
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
    background-color: #0070f3;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
        background-color: #005bb5;
    }
}
```


### 3. Sửa Layout trang chủ

```jsx title="Sửa file src/app/layout.tsx"
import type { Metadata } from "next";
import "../styles/global.scss";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```


### 4. Sửa trang chủ

```jsx title="Sửa file src/app/page.tsx"
import styles from "../styles/app.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
        <div className={styles.title}>Homepage</div>
        <div className={styles.description}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, ad officiis suscipit porro modi necessitatibus consectetur laudantium alias minus quisquam laboriosam aperiam unde reprehenderit repellat! Suscipit voluptatem accusamus blanditiis incidunt.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas explicabo, quos corporis vitae cupiditate sapiente, libero harum illo, consectetur nulla aliquid repellat impedit iste distinctio reiciendis. Maiores est tenetur animi.</p>
        </div>
    </main>
  );
}
```

### 5. Sửa trang About

```jsx title="Sửa file src/app/about/page.tsx"
import styles from "../../styles/app.module.scss";

export default function About() {
  return (
    <main className={styles.main}>
        <div className={styles.title}>About Us</div>
        <div className={styles.description}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, ad officiis suscipit porro modi necessitatibus consectetur laudantium alias minus quisquam laboriosam aperiam unde reprehenderit repellat! Suscipit voluptatem accusamus blanditiis incidunt.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas explicabo, quos corporis vitae cupiditate sapiente, libero harum illo, consectetur nulla aliquid repellat impedit iste distinctio reiciendis. Maiores est tenetur animi.</p>
        </div>
    </main>
  );
}
```

### 6. Sửa Layout Dashboard

```jsx title="Sửa file src/app/dashboard/layout.tsx"
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
                    href="/dashboard/setting"
                    className={pathName === "/dashboard/setting" ? styles.active : ""}
                >
                    Setting
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

### 7. Sửa trang Dashboard

```jsx title="Sửa file src/app/dashboard/page.tsx"
import styles from "../../styles/app.module.scss";

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

### 8. Sửa trang Setting

```jsx title="Sửa file src/app/dashboard/setting/page.tsx"
import styles from "../../../styles/app.module.scss";

export default function Setting() {
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