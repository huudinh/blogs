---
sidebar_position: 18
---

# Components

Component React là một hàm trả về một phần tử React mô tả một phần của giao diện người dùng.

![Create-HTML-1](images/components.jpg) 

<ToggleTOC />

### I. Component là gì?

Kể từ bài này, hầu hết các đoạn code JSX mà bạn viết sẽ được đóng gói (encapsulate) trong Component.

Component React là một hàm trả về một phần tử React, mô tả cách một phần giao diện người dùng nên được hiển thị.

Là kết quả của `React.createElement`. Phần tử trả về đó có thể có nhiều phần tử con.

Component cho phép chia giao diện người dùng thành các phần độc lập, có thể tái sử dụng. Việc sử dụng component cho phép bạn xem xét từng phần của giao diện người dùng một cách riêng biệt, giúp cho việc gỡ lỗi code dễ dàng hơn.

Component React là một mẫu hoặc bản thiết kế cho phép bạn mô tả một phần của giao diện người dùng; ví dụ: `<Footer></Footer>` là component mô tả phần chân trang.

Component khuyến khích việc tái sử dụng code.

## II. Ví dụ

Dưới đây là một ví dụ về component React

```jsx
function Footer() {
    return (
        <div>
            <h3>Company name</h3>
            <p>All rights reserved</p>
        </div>
    );
}
```

Sau khi định nghĩa, component Footer có thể được sử dụng trong cùng một file JavaScript với JSX:

```jsx
import {createRoot} from "react-dom/client";

function Footer() {
    return (
        <div>
            <h3>Company name</h3>
            <p>All rights reserved</p>
        </div>
    );
}

const root = document.querySelector("#root");

createRoot(root).render(<Footer></Footer>);
```

Chúng ta gọi đây là function component vì Component được định nghĩa dưới dạng hàm.

## III. Tên component viết hoa chữ cái đầu (UpperCamelCase)

Bạn có thể nhận thấy đoạn code trên gọi hàm là Footer thay vì footer. Điều này là cần thiết. Ký tự đầu tiên phải viết hoa để React nhận biết rằng đó là một Component

Hãy luôn viết tên hàm theo kiểu UpperCamelCase; dưới đây là một số ví dụ:

- `Footer`

- `ChatMessage`

- `Button`

- `ListItem`

:::tip Tóm lại
 
- Component React là một hàm trả về một phần tử React mô tả một phần của giao diện người dùng.
- Component được định nghĩa bằng hàm được gọi là function component.
- Component React khuyến khích việc tái sử dụng code và giúp dễ dàng gỡ lỗi chương trình.
- Tên của component React phải bắt đầu bằng chữ viết hoa.
- Sử dụng UpperCamelCase khi đặt tên cho component React.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Component trong React là gì?

Component React là một hàm trả về một phần tử React, mô tả cách một phần giao diện người dùng nên được hiển thị.

### Câu 2. Component giúp ích gì trong việc xây dựng giao diện người dùng?

Component cho phép chia giao diện thành các phần độc lập, có thể tái sử dụng, giúp dễ dàng quản lý và gỡ lỗi code.

### Câu 3. Component React được tạo ra từ đâu?

Component React là kết quả của hàm React.createElement, trả về một phần tử React có thể chứa nhiều phần tử con.

### Câu 4. Tại sao tên component phải viết hoa chữ cái đầu?

React phân biệt component với phần tử HTML thông qua chữ cái đầu viết hoa. Nếu viết thường, React sẽ hiểu đó là phần tử HTML.

### Câu 5. Component có thể tái sử dụng như thế nào?

Sau khi định nghĩa, component có thể được sử dụng nhiều lần trong JSX như một thẻ HTML, giúp tiết kiệm công sức và tăng tính nhất quán.