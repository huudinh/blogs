---
sidebar_position: 25
---

# Comment và kết xuất có điều kiện

Bạn có thể destructure từ hàm, miễn là hàm đó trả về một mảng phần tử.

![Create-HTML-1](images/components.jpg) 

<ToggleTOC />


## I. Cú pháp Comment

Để viết comment trong JSX, bạn phải đóng gói nó trong một biểu thức và sau đó sử dụng cú pháp comment nhiều dòng trong JavaScript.

Dưới đây là cú pháp comment nhiều dòng trong JavaScript:

```js
/* This is a comment */
/* Which can
also be written
on multiple lines */
```

Trong JSX, bạn cần đóng gói nó bằng dấu ngoặc nhọn vì nó phải nằm trong biểu thức

```jsx
function Navbar() {
    return <div>{/*this is a comment - the comment won't render*/}hi</div>;
}
```

Component này đang trả về <div>hi</div> vì phần còn lại là comment.

## II. Kết xuất có điều kiện

Vì JSX là đối tượng đại diện cho các thành phần giao diện người dùng, chúng ta có thể sử dụng điều kiện if để làm cho các component linh hoạt hơn.

Ví dụ, chúng ta có thể trả về các phần tử React khác nhau từ component dựa trên props!

```jsx
function Navbar(props) {
    if (!props.loggedIn) {
        return <p>Register</p>
    }
    return <p>Welcome back!</p> 
}

const element1 = <Navbar loggedIn={true} />
const element2 = <Navbar loggedIn={false} />
```

:::tip Tóm lại
 
- Cú pháp viết comment trong JSX : `{ /* comment */ }`

- Kết xuất có điều kiện cho phép trả về các component khác nhau dựa trên props (hoặc điều kiện khác).

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Comment trong react là gì?

Trong React, việc viết comment (ghi chú) giúp bạn giải thích logic, đánh dấu TODOs hoặc đơn giản là làm cho code dễ hiểu hơn. Tuy nhiên, vì React sử dụng JSX (một cú pháp pha trộn giữa JavaScript và HTML), cách viết comment có chút khác biệt so với JavaScript thuần.

### Câu 2: Comment trong JSX (bên trong return)?

JSX không cho phép dùng // hoặc /* */ trực tiếp như trong HTML. Thay vào đó, bạn phải bọc comment trong {}:

### Câu 3: Kết xuất có điều kiện trong react?

Kết xuất có điều kiện (conditional rendering) trong React là kỹ thuật cho phép bạn hiển thị hoặc ẩn các phần tử giao diện dựa trên trạng thái (state) hoặc thuộc tính (props) của component. Nó giống như cách bạn dùng if hoặc switch trong JavaScript, nhưng áp dụng trong JSX để điều khiển UI.