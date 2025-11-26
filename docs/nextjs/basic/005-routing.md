---
sidebar_position: 5
---

# Routing

Next.js, framework JavaScript phổ biến cho phát triển ứng dụng web, cung cấp hệ thống routing mạnh mẽ và linh hoạt, giúp bạn dễ dàng tạo ra các ứng dụng web có cấu trúc rõ ràng và trải nghiệm người dùng mượt mà.

<!-- ![Create-HTML-1](images/state.png) -->

<ToggleTOC />

## I. App Routing

Kể từ Next.js 13 mang đến App Routing như một lựa chọn mới để khai báo route, giúp bạn tổ chức code và tái sử dụng logic routing hiệu quả hơn. Tuy nhiên, việc sử dụng thư mục app để khai báo route không bắt buộc và không thay thế cho việc khai báo route trong pages

## II. Lợi ích App Routing

App Routing cho phép bạn định nghĩa logic routing trong các file riêng biệt trong thư mục app, giúp cho code dễ tổ chức và bảo trì hơn.

Bạn có thể dễ dàng tái sử dụng logic routing giữa các trang khác nhau bằng cách import các file routing từ thư mục app

App Routing cung cấp cú pháp mới ...params cho dynamic routes, giúp bạn truy cập các tham số route động một cách linh hoạt hơn.

## II. Định nghĩa Route (Page)

Do NextJS là framework, bạn không cần phải tích hợp thư viện "react-router" như cách truyền thống, Nextjs đã tích hợp sẵn cho bạn

Tất cả route trong ứng dụng, đều được định nghĩa bên trong thư mục "app"

Tên thư mục viết thường không dùng cách viết có chữ hoa hay thường, ví dụ folderName

## III. Các bước thực hiện

- route "/" => component render là "page.tsx" nằm ở ngoài cùng

- route "/admin" => cần tạo folder "admin" và tạo file page.tsx

- route "/admin/dashboard" => cần tạo folder "admin" => folder "dashboard" và tạo file page.tsx ở folder "dashboard"

- Mỗi folder, là 1 thành phần trên đường link URL. file page.tsx chính là giao diện component được render ứng với route đấy.

## IV. Thực hành

Truy cập  http://localhost:3000 chuyển sang trang Home. Truy cập http://localhost:3000/about sẽ chuyển sang trang About


### 1. Tạo trang Home

```jsx title="Sửa file app/page.tsx"
import styles from "./page.module.css";

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

### 2. Tạo trang About

```jsx title="Tạo file app/about/page.tsx"
import styles from "../page.module.css";

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

### 3. Sửa Style

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
```


