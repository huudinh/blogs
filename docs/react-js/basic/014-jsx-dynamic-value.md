---
sidebar_position: 14
---

# Dynamic Value

Khi một trong các thuộc tính có một phần giá trị là động (thay đổi theo ngữ cảnh), bạn sẽ phải xem xét toàn bộ thuộc tính đó như là một giá trị hoàn toàn động

![Create-HTML-1](images/jsx.jpg) 

<ToggleTOC />

### I. Bài toán thực tế

```html
<li id="item-1"></li>
<li id="item-2"></li>
<li id="item-3"></li>
```

Giả sử bạn cần tạo các mục danh sách bằng JSX, id là item- và sau đó là một giá trị.

Giá trị là động, còn item- là không đổi.

Tuy nhiên, bạn phải xử lý thuộc tính id như một giá trị hoàn toàn động, nghĩa là giá trị của thuộc tính phải được đóng gói trong dấu ngoặc nhọn {}.

Có nhiều cách để tạo phần tử bằng JSX (giả sử có một biến tên là `count`):

## II. Sử dụng nối chuỗi

```jsx
<li id={"item-" + count}></li>
```

## III. Sử dụng template strings

```jsx
<li id={`item-${count}`}></li>
```

Bạn có thể sử dụng bất kỳ cách nào bạn muốn, nhưng đừng quên đóng gói thuộc tính trong dấu ngoặc nhọn `{}`.

## IV. Nhiều class

Một ứng dụng phổ biến khác là làm việc với nhiều tên lớp

```jsx
const clickable = "clickable";
const active = "active";

const button = <button className={clickable + " " + active}>Click me</button>;
```

Cách làm khác là sử dụng template strings:

```jsx
const button = <button className={`${clickable} ${active}`}>Click me</button>;
```

:::tip Tóm lại
 
- Khi một trong các thuộc tính có một phần giá trị là động (thay đổi theo ngữ cảnh), bạn sẽ phải xem xét toàn bộ thuộc tính đó như là một giá trị hoàn toàn động
- Bạn có thể sử dụng template string (với nội suy) hoặc nối chuỗi.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Dynamic value trong JSX là gì?

Dynamic value là giá trị thay đổi theo ngữ cảnh hoặc biến, thường được sử dụng trong các thuộc tính như id, className, v.v. Khi một phần của giá trị là động, toàn bộ thuộc tính phải được xử lý như một giá trị động bằng cách đặt trong dấu ngoặc nhọn {}.

### Câu 2. Tại sao phải đặt toàn bộ thuộc tính trong dấu ngoặc nhọn nếu chỉ một phần là động?

Vì JSX không cho phép trộn lẫn giữa chuỗi tĩnh và biểu thức động bên ngoài dấu {}. Do đó, nếu có bất kỳ phần nào là động, toàn bộ giá trị phải được viết dưới dạng biểu thức JavaScript trong {}.

### Câu 3. Điều gì xảy ra nếu bạn quên đặt dấu ngoặc nhọn quanh giá trị động trong JSX?

JSX sẽ hiểu giá trị đó là chuỗi tĩnh, không thực thi biểu thức JavaScript, dẫn đến lỗi hoặc kết quả không như mong đợi.