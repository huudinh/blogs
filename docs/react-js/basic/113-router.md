---
sidebar_position: 113
---

# React Router

React Router là một thư viện giúp tạo các route trong React dễ dàng hơn. Thư viện này không được xây dựng bởi đội ngũ phát triển React, do đó nó không phải là một gói React chính thức. Tuy nhiên, nó được sử dụng khá rộng rãi trong cộng đồng React.

![Create-HTML-1](images/router.jpg) 

<ToggleTOC />


## I. React Router là gì

Chúng ta có thể hiển thị các component dựa trên trạng thái đăng nhập của người dùng. Tuy nhiên, cách tiếp cận này có một số nhược điểm

- Việc quản lý code sẽ nhanh chóng trở nên phức tạp nếu chúng ta muốn thêm nhiều trang.
- URL của trang không bao giờ thay đổi. Vì vậy, nếu người dùng duyệt ứng dụng web và sau đó muốn lưu liên kết hoặc chia sẻ với bạn bè, URL đó sẽ không thay đổi.

React Router giải quyết những vấn đề này bằng cách cho phép ta định nghĩa các route một cách rõ ràng và kết nối chúng với các URL của trang. 



## II. Cài đặt React Router

```bash
npm install react-router-dom@6
```

Tên gói là `react-router-dom` và kích thước của gói sau khi tối ưu hóa là 52kb.

Gói `react-router-dom `sử dụng named export để xuất chức năng của nó. Điều này có nghĩa là bạn sẽ sử dụng cú pháp sau để nhập các component được cung cấp bởi gói này

```jsx
import {} from "react-router-dom";
```

Tên của component sẽ nằm giữa {} bởi vì chúng là named export.

Ví dụ, để thêm các component BrowserRouter và Route, bạn sử dụng cú pháp sau:

```jsx
import {BrowserRouter, Route} from "react-router-dom";
```

## III. Component và hook

Gói `react-router-dom` cung cấp nhiều component và hook cho việc quản lý route. Tuy nhiên, trong khóa học này, chúng ta sẽ tập trung vào 10 component và hook quan trọng nhất và thường được sử dụng

Trước đó, bạn cần biết 4 component phổ biến nhất được thêm trong mọi ứng dụng sử dụng React Router là:

- BrowserRouter
- Routes
- Route (Route - dạng số ít của Routes)
- Link

:::tip[Tóm lại]

- React Router cho phép chúng ta định nghĩa route một cách rõ ràng, URL trình duyệt sẽ được cập nhật khi chúng ta điều hướng qua ứng dụng.
- React Router không phải là một thư viện React chính thức. Tuy nhiên, nó được sử dụng khá rộng rãi trong cộng đồng React.
- Tên gói cho React Router là react-router-dom.
- react-router-dom sau khi được tối ưu hóa có kích thước là 52kb.
- Gói react-router-dom xuất các component sau: BrowserRouter, Route, Routes và Link.

:::

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. React Router là gì?

React Router là một thư viện giúp định nghĩa và quản lý các route trong ứng dụng React, cho phép kết nối component với URL để dễ dàng điều hướng.

### Câu 2. React Router có phải là gói chính thức của React không?

Không. React Router không được phát triển bởi đội ngũ React, nhưng nó rất phổ biến và được cộng đồng sử dụng rộng rãi.

### Câu 3. Tại sao cần dùng React Router thay vì chỉ hiển thị component theo trạng thái?

Vì nếu chỉ hiển thị component theo trạng thái, URL không thay đổi, khó chia sẻ hoặc lưu lại liên kết. Ngoài ra, việc quản lý code sẽ phức tạp khi có nhiều trang. React Router giải quyết bằng cách gắn route với URL rõ ràng.

### Câu 4. Những component phổ biến nhất trong React Router là gì?

Các component phổ biến nhất là BrowserRouter, Routes, Route và Link.
