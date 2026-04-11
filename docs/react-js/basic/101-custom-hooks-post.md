---
sidebar_position: 101
---

# Custom useFetch hooks với post

Trong bài học này, chúng ta sẽ tiếp tục viết hook tùy chỉnh `useFetch` bằng cách thêm một phương thức `post`.

![Create-HTML-1](images/custom-hooks.png) 

<ToggleTOC />

## I. Post thông thường

Phương thức `post` hoạt động tương tự như phương thức `get` nhưng nó cũng cần nhận tham số `body` để được gửi trong yêu cầu `fetch`.

```jsx
fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({grade: 50})
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);
  });
```

## II. Post với Custom Hook

```jsx
// useFetch.js

export default function useFetch(baseUrl) {
  const post = async (endpoint, body) => {
    try {
      const response = await fetch(`${baseUrl}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  return { post };
}

```

## III. Gọi hook post

```jsx
const { post } = useFetch("https://jsonplaceholder.typicode.com");

post("users", { grade: 20 })
  .then(data => console.log(data))
  .catch(error => console.log(error));
```
Lưu ý rằng hàm `post` nhận hai tham số: `endpoint` và `body` được gửi cùng với yêu cầu `post`.

:::tip[Tóm lại]

- Hàm `post` sẽ nhận `endpoint` mà bạn muốn gửi yêu cầu `fetch` và `endpoint` này sẽ được thêm vào `baseUrl` và thực hiện yêu cầu `fetch` với `post`.
- Hàm `post` cũng nhận tham số `body`, tham số này sẽ được chuyển thành chuỗi JSON và được gửi cùng với yêu cầu `fetch`.

:::



## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Tại sao chúng ta cần tạo custom hook với post? 

Việc tạo custom hook với post giúp giảm lặp code, tăng khả năng tái sử dụng, dễ bảo trì và mở rộng, đồng thời giữ cho component gọn gàng và tập trung vào UI.

### Câu 2. Custom hook với post và get khác nhau gì?

Chúng giống nhau ở cách dùng fetch và xử lý kết quả, nhưng khác nhau ở cấu hình request và tham số truyền vào.

### Câu 3. `post("users", { grade: 20 })` hoạt động như thế nào?

Gửi một POST request đến `endpoint /users` của API, với dữ liệu `{ grade: 20 }`. Sau đó, nó trả về kết quả từ server dưới dạng JSON để bạn xử lý trong code. baseUrl đã được truyền vào hook, nên ta chỉ cần thêm `endpoint /users`. Hook sẽ tự động nối `baseUrl + endpoint` để tạo URL đầy đủ.

