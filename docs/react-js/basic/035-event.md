---
sidebar_position: 35
---

# Event

Ta sử dụng `onClick` để gán sự kiện cho các phần tử trong JSX. Tuy nhiên, bạn chỉ nên thêm sự kiện này vào phần tử `<button>` nhằm đảm bảo khả năng truy cập.

![Create-HTML-1](images/state.png)

<ToggleTOC />

## I. Gắn sự kiện vào phần tử DOM

Trong JavaScript thuần túy, chúng ta sử dụng 

```jsx
element.addEventListener("click", () => {})
```
Tuy nhiên trong React, chúng ta sử dụng cú pháp sau trong JSX: `onClick={() => }`, 

```jsx
<button onClick={() => console.log("I was clicked")}>Login</button>
```

Điều quan trọng cần lưu ý là sử dụng `onClick` chứ không phải là `onclick` (tên sự kiện phải ở dạng lowerCamelCase).

Một lỗi thường gặp khác là quên định nghĩa hàm, vì vậy `<button onClick={console.log("I was clicked")}>Login</button>` sẽ in ra: `I was clicked` ngay lập tức khi trang được tải và không hoạt động khi nhấp chuột.

Điều đó bởi vì `I was clicked` sẽ được thực thi khi trang được tải và không được gắn vào trình xử lý sự kiện Click.

## II. Khả năng truy cập

Về mặt kỹ thuật, bạn có thể thêm `onClick` vào bất kỳ phần tử DOM nào, ví dụ:

- `p`
- `ul`
- `div`
- `button`
- `a`
- `v.v.`

Tuy nhiên, bạn chỉ nên thêm sự kiện này vào phần tử `<button>` nhằm đảm bảo khả năng truy cập.

Khả năng truy cập là khả năng làm cho trang web có thể truy cập (sử dụng) bởi tất cả người dùng, đảm bảo đáp ứng mọi nhu cầu và hạn chế của người dùng.

Ví dụ, một số người dùng có thể sử dụng Trình đọc màn hình để truy cập vào trang web. Nếu bạn thêm `onClick` vào các phần tử khác ngoài `button`, họ có thể không thể nhấp chuột vào những phần tử đó.

Bạn cần nhớ rằng bạn chỉ sử dụng `onClick` trên các phần tử `<button>`.

## III. Các loại sự kiện khác

Chúng ta sẽ chủ yếu làm việc với sự kiện `Click` cho đến khi chuyển sang khái niệm Biểu mẫu trong chương sau, tuy nhiên, bạn có thể đã từng thấy cách triển khai các loại sự kiện khác nhau như:

- "click" => `onClick`
- "keyup" => `onKeyUp`
- "keydown" => `onKeyDown`
- "change" => `onChange`

Lưu ý rằng tên sự kiện bắt đầu bằng `on` và viết ở dạng lowerCamelCase, có nghĩa là `onKeyPress` chứ không phải `onkeypress`. `K` phải là chữ `k` hoa (tương tự với `P`).

```jsx
// JSX Input UI
<input type="text" placeholder="Enter your name" onChange={() => console.log('change!')} />
```

:::tip Tóm lại
 
- `onClick` chỉ nên được sử dụng trên các phần tử `<button>` để cải thiện khả năng truy cập.
- `onEventName` là cú pháp chung để thêm sự kiện vào một phần tử.
- `onKeyDown` gắn sự kiện `keydown` vào một phần tử.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Event trong React là gì?

Trong React, event (sự kiện) là cách để bạn xử lý tương tác của người dùng với giao diện — như click chuột, nhập dữ liệu, di chuột, submit form, v.v. React cung cấp một hệ thống event riêng gọi là Synthetic Events, hoạt động giống như event trong DOM nhưng có thêm lớp trừu tượng để đảm bảo tính nhất quán giữa các trình duyệt.