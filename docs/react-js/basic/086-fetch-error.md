---
sidebar_position: 86
---

# Fetch Error

Cố gắng truy cập vào một đối tượng/mảng được trả về từ API fetch trước khi fetch hoàn thành là một lỗi phổ biến khi sử dụng fetch.

![Create-HTML-1](images/fetch.webp) 

<ToggleTOC />

## I. Cannot read property X of undefined

Cannot read property X of undefined (Không thể đọc trường thuộc tính X của undefined) là một trong những lỗi phổ biến nhất mà bạn gặp phải khi làm việc với `Fetch` API trong React.

Dưới đây là một ví dụ về code lỗi

```jsx
import {useState, useEffect} from "react";

function App() {
    const [users, setUsers] = useState();

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setUsers(data);
        });
    }, []);
    
    // ❌ This will throw an error
    return <h1>There are {users.length} users</h1>
}
```

Code trên sẽ đưa ra thông báo lỗi: Cannot read property 'length' of undefined.

Điều này có nghĩa là trong biểu thức `users.length`, `users` có giá trị là `undefined`, vì vậy chúng ta không thể truy cập `.length` trên nó vì điều đó tương đương với việc chạy `undefined.length`.

## II. Tại sao code gặp lỗi?

Code gặp lỗi vì vào lần hiển thị đầu tiên của component, giá trị của `users` là `undefined` do khai báo `useState` như sau: `const [users, setUsers] = useState();`.

Bạn phải nhớ rằng `setUsers(data)` được gọi bên trong `.then()` sẽ thực thi vào một thời điểm trong tương lai.

Vì vậy, ở lần hiển thị đầu tiên của component App, `users` là `undefined` và việc cố gắng truy cập `users.length` sẽ gây ra lỗi. Khi `fetch` hoàn thành và chúng ta nhận được dữ liệu và gọi `setUsers(data)`, `users.length` mới trở thành giá trị hợp lệ. Tuy nhiên, component đã bị lỗi trước đó.

## III. Cách khắc phục vấn đề

Có nhiều cách để giải quyết vấn đề này, tùy thuộc vào nhiệm vụ của component.

Chúng ta kiểm tra if (!users) (hoặc if (users === undefined)) và trả về null hoặc thông báo như Loading...:

```jsx
import {useState, useEffect} from "react";

function App() {
    const [users, setUsers] = useState();

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setUsers(data);
        });
    }, []);
    
    if (!users) {
        return null;
    }

    return <h1>There are {users.length} users</h1>
}
```

:::tip Tóm lại

- Cố gắng truy cập vào một đối tượng/mảng được trả về từ API fetch trước khi fetch hoàn thành là một lỗi phổ biến khi sử dụng fetch.
- Để tránh gặp lỗi này, bạn có thể thêm một điều kiện if và trả về JSX khác (kết xuất có điều kiện).

:::

<iframe width="560" height="315" src="https://www.youtube.com/embed/VuMiaQ6AYzU?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Fetch Error thường xảy ra trong trường hợp nào?

Fetch Error thường xảy ra khi bạn cố gắng truy cập vào dữ liệu (object/array) được trả về từ API trước khi quá trình fetch hoàn tất. Điều này dẫn đến việc biến chứa dữ liệu vẫn là undefined.

### Câu 2. Thông báo lỗi "Cannot read property X of undefined" có nghĩa là gì?

Nó có nghĩa là bạn đang cố gắng truy cập một thuộc tính (ví dụ .length) của một biến có giá trị undefined. Trong ví dụ, users chưa được gán dữ liệu nên users.length gây lỗi.

### Câu 3. Vì sao việc kiểm tra điều kiện khi truy cập dữ liệu lại quan trọng?

Vì nó đảm bảo rằng component không cố gắng truy cập dữ liệu khi dữ liệu chưa sẵn sàng. Điều này giúp tránh lỗi runtime và cải thiện trải nghiệm người dùng bằng cách hiển thị trạng thái tải (Loading).