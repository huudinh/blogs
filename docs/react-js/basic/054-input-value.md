---
sidebar_position: 54
---

# Default Value

Khi bạn thiết lập value cho phần tử input trong React, giá trị đó sẽ không bao giờ thay đổi.

![Create-HTML-1](images/components.jpg) 

<ToggleTOC />

## I. Thuộc tính value trong HTML

Trong HTML, chúng ta thường cung cấp giá trị mặc định cho ô nhập liệu bằng cách chỉ định thuộc tính `value`, ví dụ:

```html
<!-- HTML example -->
<input type="text" name="address" value="Amsterdam">
```

Đoạn code trên sẽ hiển thị một trường nhập liệu chứa giá trị `Amsterdam` và người dùng có thể chỉnh sửa văn bản.

Tuy nhiên, trong React, cách hoạt động của phần tử này có chút khác biệt.

## II. Default Value

Khi bạn thiết lập `value` cho phần tử `input` trong React, giá trị đó sẽ không bao giờ thay đổi (trừ khi bạn chỉ định trình xử lý `onChange`).

Do đó, dòng code JSX dưới đây không nên được sử dụng

```jsx
<input type="text" name="address" value="Amsterdam" />
```

Để ý code sử dụng cú pháp tự đóng thẻ vì chúng ta đang sử dụng JSX, điều này là bắt buộc.

Kết quả trả về một trường nhập liệu chứa giá trị `Amsterdam` nhưng không thể thay đổi, nghĩa là nó là một trường nhập liệu chỉ đọc.

Thay vào đó, khi bạn muốn cung cấp giá trị mặc định cho người dùng, bạn nên sử dụng thuộc tính `defaultValue` như sau:

```jsx
<input type="text" name="address" defaultValue="Amsterdam" />
```

:::tip Tóm lại
 
- Thiết lập `value` cho trường nhập liệu mà không có trình xử lý `onChange` sẽ tạo ra một trường nhập liệu chỉ đọc.
- Nếu bạn muốn cung cấp giá trị mặc định, hãy sử dụng thuộc tính `defaultValue`.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: defaultValue và placehoder có giống nhau không?

Không giống nhau — defaultValue và placeholder trong React (và HTML nói chung) có mục đích hoàn toàn khác nhau.

Dùng defaultValue khi bạn muốn input có giá trị ban đầu.

Dùng placeholder khi bạn muốn hướng dẫn người dùng nhập gì.

### Câu 2: Tại sao trong react không cho sửa đổi trực tiếp giá trị value?

Muốn bạn quản lý dữ liệu qua state

Đảm bảo giao diện luôn đồng bộ với logic

Tránh lỗi khó phát hiện