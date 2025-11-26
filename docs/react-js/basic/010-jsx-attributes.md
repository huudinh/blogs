---
sidebar_position: 10
---

# Attributes trong JSX

Thuộc tính trong JSX được truyền làm đối số thứ hai của `React.createElement(...)`

![Create-HTML-1](images/jsx.jpg) 

<ToggleTOC />

## I. Thiết lập thuộc tính cho các phần tử trong JSX.

```jsx
const title = <h1 id="brand-title">Supermarket</h1>;
```

Code trên tương đương với đoạn code JavaScript sau:

```jsx
const title = React.createElement("h1", {id: "brand-title"}, "Supermarket");
```

## II. Cách thiết lập class

Bạn còn nhớ cách thiết lập lớp bằng React.createElement không?

Cách thiết lập lớp trong JSX cũng tương tự như khi sử dụng React.createElement

```jsx
const title = <h1 id="brand-title" className="primary-color">Supermarket</h1>;
```

Để thiết lập thuộc tính `class`; chúng ta phải sử dụng `className` thay vì `class` để tránh xung đột với từ khóa `class` của JavaScript.

Đây là lý do tại sao JSX KHÔNG PHẢI là HTML.

Trong HTML, chúng ta viết: `<h1 id="brand-title" class="primary-color">Supermarket</h1>` nhưng đây không phải là code JSX hợp lệ.

Vì vậy, đừng quên rằng JSX sẽ tự động chuyển đổi code thành `React.createElement(...)`.

Đừng quên đóng gói chuỗi trong dấu ngoặc kép.

:::tip Tóm lại
 
- Thuộc tính trong JSX được truyền làm đối số thứ hai của `React.createElement(...)`
- `<div className="active"></div>` là cách bạn gán lớp active cho phần tử này.
- Code JSX bạn viết được chuyển đổi thành React.createElement
- Khi thiết lập giá trị cho thuộc tính là chuỗi, chúng ta cần đóng gói giá trị đó trong dấu ngoặc kép.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Trong JSX, thuộc tính được truyền như thế nào vào phần tử?

Trong JSX, các thuộc tính được truyền vào phần tử như đối số thứ hai của hàm React.createElement(...).

### Câu 2. Làm sao để thiết lập thuộc tính class trong JSX?

Trong JSX, bạn phải sử dụng className thay vì class để thiết lập lớp CSS cho phần tử. Điều này giúp tránh xung đột với từ khóa class trong JavaScript.

### Câu 3. Tại sao không thể dùng class trong JSX như trong HTML?

JSX không phải là HTML. Trong JavaScript, class là một từ khóa dùng để định nghĩa lớp, nên JSX sử dụng className để tránh xung đột.

### Câu 4. JSX có tự động chuyển đổi thành React code không?

Có. JSX sẽ tự động chuyển đổi thành lời gọi hàm React.createElement(...) trong quá trình biên dịch. Vì vậy, khi viết JSX, bạn đang viết một dạng cú pháp rút gọn của React.

### Câu 5. Khi viết chuỗi trong JSX, cần lưu ý điều gì?

Chuỗi văn bản trong JSX phải được đóng gói trong dấu ngoặc kép để đảm bảo cú pháp hợp lệ.