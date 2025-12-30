---
sidebar_position: 86
---

# Fetch API với toán tử logic &&

Đôi khi bạn không muốn hiển thị một JSX mới hoàn toàn mà chỉ muốn bỏ qua việc hiển thị một phần của JSX phụ thuộc vào data từ API. 

![Create-HTML-1](images/fetch.webp) 

<ToggleTOC />

## I. Vấn đề

```jsx
import {useState, useEffect} from "react";

function App() {
    const [users, setUsers] = useState();

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(data => {
            setUsers(data);
        });
    }, []);
    
    // This will throw an ERROR
    return <>
        <h1>Users</h1>
        <ul>
            {users.map(user => <li key={user.id}>{user.name}</li>)}
        </ul>
  </>
}
```

Chương trình sẽ đưa ra thông báo lỗi: `Cannot read property 'map' of undefined.`

Vậy nếu bạn muốn chặn thông báo lỗi mà không thay đổi phần hiển thị của component thì phải làm như thế nào? Giả sử trước khi `users` được tải, bạn chỉ muốn component hiển thị JSX sau:

```jsx
<>
    <h1>Users</h1>
    <ul>
    </ul>
</>
```

Để ý là chúng ta bỏ qua `users.map(...)`.

Và sau đó, khi `users` đã được tải, `users.map(...)` sẽ được hiển thị.

Đây là một tình huống thường gặp và có thể được giải quyết dễ dàng bằng cách sử dụng toán tử `logic &&`.

## II. Giải quyết vấn đề

Bạn có thể thêm tiền tố `users &&` trước `users.map()`, kết quả cuối cùng như sau

```jsx
import {useState, useEffect} from "react";

function App() {
    const [users, setUsers] = useState();

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(data => {
            setUsers(data);
        });
    }, []);
    
    // this will work without breaking 👍
    return <>
        <h1>Users</h1>
        <ul>
            {users && users.map(user => <li key={user.id}>{user.name}</li>)}
        </ul>
  </>
}
```

Trước khi 'users' được tải: biểu thức `users && users.map()` sẽ gặp xung đột tại `users`, có nghĩa là nó sẽ không tiếp tục thực thi sau `&&` vì `users` trả về `undefined`. Điều này sẽ ngăn chặn việc thực thi `users.map()`, tránh gây ra lỗi.

Sau khi 'users' được tải: biểu thức `users && users.map()` sẽ được thực thi toàn bộ vì `users` không trả về một giá trị `falsy` (như `undefined` hoặc `false`). Do đó, `users.map()` sẽ được gọi.


:::tip Tóm lại

- Toán tử logic && có thể được sử dụng để tránh hiển thị một phần cụ thể của JSX.
- Toán tử này giúp tránh gây lỗi cho component trước khi state được thiết lập sau khi fetch đã được xử lý.

:::

<iframe width="560" height="315" src="https://www.youtube.com/embed/qRIDzWKVvk8?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Vấn đề chính khi sử dụng users.map()?

Ở lần render đầu tiên, users có giá trị undefined do chưa được gán dữ liệu từ API. Vì vậy, việc gọi users.map() gây lỗi: Cannot read property 'map' of undefined.

### Câu 2. Nếu muốn tránh lỗi nhưng vẫn giữ nguyên JSX, ta cần làm gì?

Ta có thể sử dụng toán tử logic && để kiểm tra users trước khi gọi users.map()

### Câu 3. Ưu điểm của việc dùng users && users.map(...) so với cách kiểm tra if (!users)?

Ngắn gọn, dễ đọc, không cần viết thêm nhiều logic điều kiện.

Giữ nguyên cấu trúc JSX, chỉ bỏ qua phần phụ thuộc vào dữ liệu khi chưa có dữ liệu.

Tránh lỗi runtime mà không cần render một component hoàn toàn khác.