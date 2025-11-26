---
sidebar_position: 8
---

# Điều hướng trang Navigation

Điều hướng trang (Navigation) trong Next.js liên quan đến việc quản lý các URL của ứng dụng web và điều hướng người dùng đến các trang khác nhau dựa trên yêu cầu của họ. Điều này được thực hiện thông qua một module gọi là Router.

<!-- ![Create-HTML-1](images/state.png) -->

<ToggleTOC />


## I. Cách sử dụng

Router trong Next.js cung cấp các chức năng định tuyến (routing) trên phía máy khách (client-side) và phía máy chủ (server-side) cho các ứng dụng web. Với Router trong Next.js, nhà phát triển web có thể dễ dàng tạo ra các ứng dụng web phía client và phía server-rendered với các tính năng như pre-fetching (tiền đọc) và code splitting (chia mã).

Để sử dụng Router trong Next.js, các nhà phát triển web có thể sử dụng các API đơn giản như push, replace và prefetch. 

Ví dụ, push cho phép chuyển hướng đến một URL mới, replace cho phép thay thế URL hiện tại với một URL mới và prefetch cho phép tiền đọc trang trước đó một cách động để cải thiện tốc độ tải trang.

Ngoài ra, bạn cũng có thể sử dụng component Link từ Next.js để tạo ra các liên kết điều hướng. Component này giúp tạo ra các liên kết có thể điều hướng người dùng đến các trang khác mà không cần tải lại trang.

## II. Use client

Trong Next.js, 'use client' là một chỉ thị được sử dụng để xác định rõ ràng một component nên được render và thực thi trong môi trường trình duyệt của người dùng, thay vì trên máy chủ.

Điều này có nghĩa là, khi bạn sử dụng 'use client', bạn đang chỉ định cho Next.js biết rằng các hoạt động render của component cụ thể nên xảy ra ở phía client. Điều này phù hợp với mô hình render phía client, cho phép cập nhật động và tương tác mà không cần tải lại toàn bộ trang.

Component phía client rất hiệu quả trong các tình huống cần cập nhật động và tương tác thời gian thực. Chúng được render trực tiếp trong trình duyệt của người dùng, cung cấp giao diện phản hồi nhanh mà không cần tải lại toàn bộ trang. Điều này rất lý tưởng cho các yếu tố tương tác như biểu mẫu trực tiếp, tính năng chat và tiện ích động.

Vì vậy, 'use client' được sử dụng để đảm bảo rằng component Admin sẽ được render và thực thi ở phía client, cho phép nó tương tác với API trình duyệt và thực hiện các cập nhật động.

## III. Thực hành

Sử dụng Link thay thẻ a để tối ưu trải nghiệm khách hàng không bị load lại trang khi vào các Link

Trong Dashboard In đậm menu Dashboard và Setting với slug tương ứng. Sử dụng useRouter thêm nút quay về Home

### 1. Sửa Navbar component

```jsx title="Sửa file src/components/Navbar.tsx"
import Link from "next/link";
import styles from "../app/page.module.css";

const Navbar = () => {
    return (
        <nav className={styles.header}>
            <div className="logo">
                <h1>Logo</h1>
            </div>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/dashboard">Dashboard</Link>
        </nav>
    )
}

export default Navbar;
```

### 2. Sửa Layout Dashboard

```jsx title="Sửa file src/app/dashboard/layout.tsx"
'use client';

import styles from "../page.module.css";
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

### 3. Sửa Style

```css title="Sửa file src/app/page.module.css"
.main{
  max-width: 800px;
  margin:0 auto;
  padding: 2rem;
}
.main a {
  color: #333;
  text-decoration: none;
}

.main a.active {
  font-weight: bold;
  color: #0070f3;
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
.btn{
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}
.btn:hover{
  background-color: #005bb5;
}
```