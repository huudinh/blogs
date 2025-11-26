---
sidebar_position: 11
---

# Dynamic Routes

Dynamic Routes cho phép bạn tạo các đường dẫn có giá trị thay đổi dựa trên dữ liệu — ví dụ:

* `/blog/123`
* `/product/iphone-15`
* `/users/hoa-tran`

Trong App Router (`app/`), bạn tạo dynamic routes bằng cách đặt tên thư mục với **cặp ngoặc vuông**.

<ToggleTOC />

---

## I. Dynamic Segment Cơ Bản

#### 📁 Cấu trúc thư mục

```
app/
 └─ blog/
     └─ [slug]/
         └─ page.js
```

#### 📄 `page.js`

```js
export default function BlogDetail({ params }) {
  return <h1>Blog: {params.slug}</h1>;
}
```

#### ✔ URL khớp:

* `/blog/hello-world`
* `/blog/cong-nghe-ai`

#### 👉 `params.slug` lấy giá trị segment động:

```js
{ slug: "hello-world" }
```

---

## II. Dynamic Routes Nhiều Cấp

Ví dụ bạn có route:
`/product/laptop/dell-xps-13`

#### 📁 Cấu trúc:

```
app/product/[category]/[slug]/page.js
```

#### Code:

```js
export default function Product({ params }) {
  const { category, slug } = params;
  return <p>{category} - {slug}</p>;
}
```

---

## III. Catch-All Routes (`[...param]`)

Dùng khi bạn không biết chính xác độ sâu của route.

Ví dụ URL có thể là:

* `/docs/getting-started`
* `/docs/api/user/create`

#### 📁 Cấu trúc:

```
app/docs/[...slug]/page.js
```

#### Code:

```js
export default function Docs({ params }) {
  return <pre>{JSON.stringify(params)}</pre>;
}
```

#### Giá trị:

* `/docs/getting-started` → `{ slug: ["getting-started"] }`
* `/docs/api/user/create` → `{ slug: ["api", "user", "create"] }`

---

## IV. Optional Catch-All (`[[...param]]`)

Cho phép route hoạt động ở cả base path và nested path.

#### 📁 Cấu trúc:

```
app/shop/[[...filters]]/page.js
```

#### ✔ Khớp URL:

* `/shop`
* `/shop/price/cheap`
* `/shop/color/red/size/m`

#### Code:

```js
export default function Shop({ params }) {
  return <pre>{JSON.stringify(params)}</pre>;
}
```

---

## V. Tạo SEO URL với `generateStaticParams()`

Dùng để pre-render các trang dynamic (SSG).

#### 📁 Ví dụ blog `[slug]`

```
app/blog/[slug]/page.js
```

#### ⭐ Tạo danh sách slug để build tĩnh:

```js
export async function generateStaticParams() {
  return [
    { slug: 'hello-world' },
    { slug: 'react-hooks' },
  ];
}
```

#### Component:

```js
export default function Blog({ params }) {
  return <h1>{params.slug}</h1>;
}
```

## VI. Fetch dữ liệu theo Dynamic Params

Ví dụ trong route: /product/[id]

```jsx
export default async function ProductDetail({ params }) {
  const res = await fetch(
    `https://api.example.com/products/${params.id}`
  );
  const data = await res.json();

  return <h1>{data.name}</h1>;
}

```

## VII. Page-level Metadata cho Dynamic Routes

Next.js cho phép tạo meta động:

```js
export async function generateMetadata({ params }) {
  return {
    title: `Sản phẩm: ${params.slug}`,
  };
}
```

## VIII. Best Practices

#### ✔ Nên

* Dùng tên folder dynamic ngắn gọn (`[id]`, `[slug]`)
* Sử dụng `generateStaticParams()` cho nội dung tĩnh
* Dùng `notFound()` khi không có dữ liệu
* Tận dụng `generateMetadata()` cho SEO

#### ❌ Không nên

* Fetch dữ liệu trong client component cho nội dung SEO
* Lạm dụng catch-all routes nếu không cần
* Đặt quá nhiều tham số dynamic trong một path → khó SEO

---

:::tip Kết luận

Dynamic Routes trong Next.js rất mạnh mẽ, cho phép bạn tạo URL theo nội dung thực tế, load dữ liệu linh hoạt, và hỗ trợ SEO tuyệt vời với App Router.

:::

---

## IX. Thực hành

Áp dụng Dynamic Routes để tạo trang con cho trang Dashboard

Các việc cần làm: 

- Đổi tên thư mục setting thành [id]

- Sửa lại trang page.tsx trong thư mục [id]

- Sửa lại layout.tsx và page.tsx trong thư mục dashboard

- Thêm class titleSub trong app.module.scss

### 1. Sửa trang Dashboard

```jsx title="Sửa file src/app/dashoboard/page.tsx"
import styles from "../../styles/app.module.scss";
import Link from "next/link";
import { Suspense } from "react";

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok){
    throw new Error('Fail to fetch data');
  }
  return res.json();
}

export default async function Dashboard() {

  const data = await getData();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>All Post</h1>
      <Suspense fallback={<div>Loading...</div>}>
        {(data || []).map((item: any) => (
          <Link href={'/dashboard/' + item?.id} key={item?.id}>
            <div className={styles.single}>
              <h3>{item?.title}</h3>
            </div>
          </Link>
        ))}
      </Suspense>
    </main>
  );
}
```

### 2. Sửa layout Dashboard

```jsx title="Sửa file src/app/dashoboard/layout.tsx"
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
                    href="/dashboard/1"
                    className={pathName === "/dashboard/1" ? styles.active : ""}
                >
                    Hot News
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

### 3. Đổi tên thư mục setting thành [id], Sửa lại trang page.tsx trong thư mục [id]

```jsx title="Sửa file src/app/dashoboard/[id]/page.tsx"
import styles from "../../../styles/app.module.scss";

export default async function Detail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
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

### 4. Thêm class titleSub trong app.module.scss


```css title="Sửa file src/styles/app.module.scss"
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
    &Sub{
        font-size:1.2rem;
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
.single {
    padding: 10px 16px;
    background: #eee;
    display: block;
    margin: 8px 0;
    border-left: 8px solid #eee;
    &:hover{
        border-left: 8px solid #005bb5;
    }
}
```