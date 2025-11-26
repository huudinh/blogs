---
sidebar_position: 59
---

# Label

Trong React, cách sử dụng thẻ `label` có một số khác biệt nhỏ so với cách sử dụng thông thường, tương tự như việc sử dụng thuộc tính class trong React khác với cách sử dụng trong HTML thông thường.

![Create-HTML-1](images/components.jpg) 

<ToggleTOC />

## I. Label trong HTML

```html
<form>
    <label for="login-email">Email: </label>
    <input type="email" id="login-email" placeholder="alex@email.com">

    <label for="login-password">Password: </label>
    <input type="password" id="login-password" placeholder="Password">

    <input type="submit" >
</form>
```

Phần tử `<label>` cần một thuộc tính `for` trỏ tới `id` của trường nhập liệu/hộp chọn/vùng văn bản mà nó liên kết đến.

Để ý đoạn code làm cho phần tử HTML hoạt động bằng cách thêm: `id="login-email"` và sau đó tham chiếu đến nó bằng `for="login-email"`. Và đối với trường mật khẩu: `id="login-password"` và sau đó tham chiếu đến nó bằng `for="login-password"`.

Đảm bảo rằng `id` là duy nhất vì `id` đó chỉ nên được sử dụng một lần trên mỗi trang HTML.

## II. Label trong React

Trong React, chúng ta phải sử dụng `className` thay vì `class`. React truyền tất cả những `props` này xuống DOM, DOM mong đợi `props` là các trường thuộc tính hợp lệ của một phần tử HTML.

Điều tương tự áp dụng cho thuộc tính `for`. Tên trường thuộc tính thực tế là `htmlFor`.

Vì vậy, đây là biểu mẫu tương tự nhưng được viết bằng JSX:

```jsx
<form>
    <label htmlFor="login-email">Email: </label>
    <input type="email" id="login-email" placeholder="alex@email.com" />

    <label htmlFor="login-password">Password: </label>
    <input type="password" id="login-password" placeholder="Password" />

    <input type="submit" />
</form>
```

:::tip Tóm lại

- `<label />` cần một trường thuộc tính `htmlFor` trỏ tới `id` của phần tử.

:::

<iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Theo bạn Label trong react có cần thiết không?

Label trong React rất cần thiết, đặc biệt là khi bạn làm việc với các biểu mẫu (forms). Không chỉ là một phần của HTML, `<label>` còn đóng vai trò quan trọng trong trải nghiệm người dùng (UX) và truy cập (accessibility).

### Câu 2: Tại sao sử dụng Label là cần thiết?

**Tăng khả năng truy cập (Accessibility)**

- Người dùng sử dụng trình đọc màn hình (screen reader) sẽ dựa vào `<label>` để hiểu mục đích của input.

- Giúp người khuyết tật dễ dàng tương tác với form.

**Tăng vùng nhấp chuột (Click area)**

- Khi bạn liên kết `<label>` với một `<input>` bằng thuộc tính htmlFor, người dùng có thể nhấp vào label để focus vào input — rất tiện lợi trên thiết bị di động.

**Cải thiện UX và UI**

- Giao diện rõ ràng, dễ hiểu hơn khi mỗi input có label mô tả.

- Tránh nhầm lẫn khi có nhiều trường nhập liệu.