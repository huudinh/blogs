---
sidebar_position: 84
---

# Fetch API

Fetch API là một API của trình duyệt (tức là một chức năng có sẵn trong trình duyệt) cho phép bạn thực hiện yêu cầu mạng đến máy chủ khác.

![Create-HTML-1](images/fetch.webp) 

<ToggleTOC />

## I. Ứng dụng

Ứng dụng phổ biến nhất của `fetch` API khi xây dựng ứng dụng (web) là gửi và nhận dữ liệu từ backend/API.

`fetch` API trả về một `promise`, vì vậy chúng ta phải xử lý nó.

Dưới đây là một ví dụ sử dụng API fetch để GET dữ liệu từ backend/API: https://jsonplaceholder.typicode.com/users

```js
fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
```

## II. Bốn điều cần lưu ý

1. Cuộc gọi `fetch()` trả về một `promise`, vì vậy ta xử lý nó bằng `.then()`.
2. `response` mà ta nhận được từ `fetch` là một phản hồi chung, vì vậy ta cần chuyển đổi nó thành đối tượng `JSON` bằng cách gọi `response.json()`.
3. `response.json()` cũng trả về một `promise`, vì vậy ta cần xử lý nó một lần nữa bằng `.then()`.
4. Luôn luôn bắt đầu bằng `console.log(data)` vì mỗi backend/API sẽ trả về dữ liệu khác nhau dựa trên mục đích của API đó.

## III. Cấu trúc cơ bản của fetch

```js
fetch(URL)
.then(response => response.json())
.then(data => {
    console.log(data);
});
```

:::tip Tóm lại

- `fetch(url)` trả về một `promise` xử lý `response`.
- response là một phản hồi chung cần được chuyển đổi thành JSON bằng `response.json()`.
- `response.json()` cũng trả về một promise cần được xử lý.
- Luôn luôn bắt đầu bằng `console.log(data)` vì mỗi backend/API trả về dữ liệu khác nhau.

:::

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Fetch API là gì?

Fetch API là một API có sẵn trong trình duyệt, cho phép thực hiện các yêu cầu mạng (HTTP) đến máy chủ khác để gửi hoặc nhận dữ liệu.

### Câu 2. Fetch API thường được dùng để làm gì trong ứng dụng web?

Fetch API thường được dùng để gửi và nhận dữ liệu từ backend hoặc từ các API bên ngoài.

### Câu 3. Fetch API trả về kiểu dữ liệu gì?

Fetch API trả về một Promise, vì vậy cần xử lý kết quả bằng .then() hoặc async/await.

### Câu 4. Tại sao cần gọi response.json() sau khi dùng fetch?

Vì fetch() trả về một đối tượng phản hồi (response), không phải dữ liệu JSON. Ta cần gọi response.json() để chuyển đổi phản hồi đó thành đối tượng JSON có thể sử dụng.

### Câu 5. response.json() trả về gì?

response.json() cũng trả về một Promise, nên cần xử lý tiếp bằng .then() để lấy dữ liệu thực tế.

### Câu 6. Tại sao nên dùng console.log(data) sau khi nhận dữ liệu từ API?

Vì mỗi API có thể trả về dữ liệu khác nhau, nên việc log dữ liệu giúp kiểm tra cấu trúc và nội dung để xử lý phù hợp.