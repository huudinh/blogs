---
sidebar_position: 15
---

# Children trong JSX

JSX cho phép định nghĩa các phần tử con bên trong phần tử cha

![Create-HTML-1](images/jsx.jpg) 

<ToggleTOC />

## I. Phần tử con

Trong những bài học trước, chúng ta chỉ làm việc với các phần tử JSX không có phần tử con, ví dụ như div hoặc h1.

Tuy nhiên, trong thực tế, giao diện người dùng sẽ các nhiều phần tử phức tạp hơn, ví dụ như HTML sau:

```html
<ul>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
</ul>
```

Trong JSX, để biểu diễn danh sách như trên, chúng ta sử dụng cú pháp như sau

```jsx
const list = <ul>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
</ul>;
```

Đoạn code trên khi được chuyển đổi thành `React.createElement(...)` ngày càng trở nên phức tạp và khó đọc hơn:

```jsx
const list = React.createElement("ul", null, 
    React.createElement("li", null, "First item"),
    React.createElement("li", null, "Second item"),
    React.createElement("li", null, "Third item")
);
```

Đoạn code hoạt động vì `React.createElement` lấy tất cả các đối số được truyền sau đối số thứ hai và coi chúng là các phần tử con.

Vì vậy, trong trường hợp này, danh sách là `React.createElement("ul", null, child1, child2, child3)`.

Trong đó, `child1` là mục `li` đầu tiên, `child2` là mục `li` thứ hai, v.v.

Bạn không cần phải tự viết code `React.createElement(...)` nhưng nên hiểu cách nó hoạt động.

## II. Lưu ý

Sau này, bạn có thể sử dụng Prettier để định dạng code hoặc tự định dạng code, và khi bạn bắt đầu làm việc với các UI phức tạp hơn, bạn có thể có xu hướng viết return trên một dòng riêng và phần còn lại của code JSX trên các dòng khác, như sau

```jsx
function getList() {
    return 
        <ul>
            <li>First Item</li>
            <li>Second Item</li>
        </ul>;
}
```

Nhưng điều này sẽ làm cho chương trình gặp lỗi do một khái niệm JavaScript gọi là Automatic Semi-colon Insertion (ASI - tự động chèn dấu chấm phẩy).

Điều xảy ra ở đây là JavaScript tự động chèn một dấu chấm phẩy sau từ khóa return khi code được chuyển đổi từ JSX sang JavaScript, vì vậy đoạn code trở thành:

```jsx
function getList() {
    return;
    React.createElement("ul", null,
        React.createElement("li", null, "First Item"),
        React.createElement("li", null, "Second Item")
    );
}
```

Để ý `;` được thêm ngay sau từ khóa `return`, điều này có nghĩa là hàm không bao giờ tiếp thi đến `React.createElement("ul", ...)`. Đây là hành vi chính xác của JavaScript vì trình biên dịch yêu cầu tự động chèn một dấu chấm phẩy (nếu chưa có) sau một số từ khóa (đọc thêm chi tiết trên MDN).

Để tránh vấn đề này, hãy luôn luôn sử dụng cú pháp `return ()` và viết các phần tử JSX bên trong cặp dấu ngoặc đơn. Vì vậy, đoạn code trên trở thành:

```jsx
const getList = () => {
    return (
        <ul>
            <li>First Item</li>
            <li>Second Item</li>
        </ul>
    );
}
```

Bằng cách viết dấu ngoặc mở, không có dấu chấm phẩy tự động được chèn sau return cho đến khi gặp dấu ngoặc đóng và bạn tránh được các lỗi không mong muốn.

:::tip Tóm lại
 
- JSX cho phép định nghĩa các phần tử con bên trong phần tử cha
- Luôn đóng gói các phần tử JSX bằng () khi viết JSX sau một lệnh return.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Children trong JSX là gì?

Children là các phần tử con được đặt bên trong một phần tử cha trong JSX, giúp xây dựng giao diện người dùng phức tạp hơn.

### Câu 2. JSX được chuyển đổi thành gì khi biên dịch?

JSX sẽ được chuyển thành các lệnh React.createElement(...)

### Câu 3. React xử lý các phần tử con như thế nào trong React.createElement?

Các đối số sau đối số thứ hai trong React.createElement được coi là các phần tử con (children) của phần tử cha.

### Câu 4. Tại sao không nên viết return trên một dòng riêng trong hàm JSX?

Vì JavaScript có cơ chế Automatic Semicolon Insertion (ASI), nó sẽ tự động chèn dấu chấm phẩy sau return, khiến phần JSX phía sau không được thực thi.