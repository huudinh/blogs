---
sidebar_position: 93
---

# Fetch với async/await và xử lý lỗi

Việc sử dụng `async/await` trong sự kiện dễ dàng hơn so với việc sử dụng `useEffect`.

![Create-HTML-1](images/fetch.webp) 

<ToggleTOC />

## I. Sử dụng async/await trong sự kiện

Bạn chỉ cần thêm `async` vào trước hàm là có thể sử dụng từ khóa `await`.

```jsx
function App() {
    async function handleButtonClick() {
        // use fetch with await here
    }

    return <button onClick={handleButtonClick}>Load data</button>;
}
```

## II. Xử lý lỗi

Khi sử dụng `promise`, chúng ta thường sử dụng `.catch` để xử lý lỗi. Với `async/await`, bạn cần đóng gói đoạn code sử dụng `await` bằng khối `try...catch`.

```jsx
import {useEffect, useState} from "react";

function App() {
    const [users, setUsers] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
          try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users")
            const data = await response.json();
            setIsLoading(false)
            setUsers(data);
          } catch (error) {
              console.log(error)
              setIsLoading(false);
          } 
        })()
    }, []);

    return null
}
```

Để ý đoạn code trên dừng trình tải sau khi gọi `response.json()` trong khối `try` và trong trường hợp xảy ra lỗi, chúng ta xử lý lỗi đó trong khối `catch`.

## III. Tái cấu trúc các câu lệnh chung giữa khối `try` và `catch`

Bạn cũng có thể sử dụng từ khóa `finally` để tái cấu trúc các câu lệnh chung giữa khối `try` và `catch`:

```jsx
import {useEffect, useState} from "react";

function App() {
    const [users, setUsers] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
          try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users")
            const data = await response.json();
            setUsers(data);
          } catch (error) {
              console.log(error)
          } finally {
            setIsLoading(false)
          }
        })()
    }, []);

    return null
}
```

Khối `finally` sẽ được thực thi trong cả hai trường hợp, cho dù cuộc gọi try có thành công hay không.

:::tip[Tóm lại]

- Đối với sự kiện, bạn chỉ cần thêm `async` vào trước hàm là có thể sử dụng từ khóa `await`.
- Để xử lý lỗi, bạn cần đóng gói code trong khối try...catch.

:::

<iframe width="560" height="315" src="https://www.youtube.com/embed/uJ_E0jK-GCk?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Khi dùng async/await, ta cần làm gì để xử lý lỗi?

Đóng gói đoạn code có await trong khối try...catch.

### Câu 2. Tại sao nên dùng finally khi có các câu lệnh chung giữa try và catch?

 Vì finally luôn được thực thi dù try thành công hay thất bại, giúp tránh lặp lại cùng một đoạn code trong cả hai khối.

### Câu 3. Khi nào khối finally được thực thi?

Luôn luôn, bất kể khối try có thành công hay khối catch có lỗi.