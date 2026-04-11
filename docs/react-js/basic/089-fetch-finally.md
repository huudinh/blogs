---
sidebar_position: 89
---

# Promise.finally

Là một phương thức được gọi sau khi một Promise đã kết thúc (dù thành công hay thất bại). Nó dùng để chạy một đoạn code "dọn dẹp" hoặc xử lý chung, mà không quan tâm kết quả của Promise

![Create-HTML-1](images/fetch.webp) 

<ToggleTOC />

## I. Vấn đề

Bạn có thể nhận thấy có một số câu lệnh trùng lặp trong các ví dụ trước khi chúng ta gọi `setIsLoading(false)` ở 2 nơi:

1. trong phần .then()
2. trong phần .catch()

Một phương án hiệu quả hơn là sử dụng .finally(). Đây là một tính năng JavaScript cho Promise, dưới đây là một ví dụ:

```jsx
functionThatReturnsPromise().then(() => {
    console.log("success");
})
.catch(() => {
    console.log("error");
})
.finally(() => {
    console.log("done");
});
```

Khi `functionThatReturnsPromise` thực thi thành công, `console` sẽ in ra: `success` và `done`.

Khi `promise` bị từ chối với một lỗi, `console` sẽ in ra: `error` và `done`.

Để ý `callback` được truyền vào `.finally` sẽ chạy trong cả hai trường hợp.

Chúng ta có thể tận dụng điều đó và gọi `setIsLoading(false)` trong `.finally`.

```jsx
import {useEffect, useState} from "react";

function App() {
    const [isLoading, setIsLoading] = useState(true); // create and start the loader

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            setIsLoading(false); // stop the loader
        });
    }, []);
}
```

Lưu ý: chúng ta vẫn cần đặt trì khối `.catch` ngay cả khi sử dụng `.finally`:

```jsx
.catch(error => {
    console.log(error);
})
```

bởi vì nếu yêu cầu fetch thất bại và bạn không có khối .catch thì bạn sẽ nhận được một lỗi làm hỏng toàn bộ component.

## II. Sử dụng JSX để hiển thị trình tải

Có nhiều cách để hiển thị trình tải. Dưới đây là cách hiển thị thông báo Loading...:

```jsx
function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // same code above ...
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }
}
```

Bạn cũng có thể sử dụng toán tử `logic &&` hoặc toán tử ba ngôi để hiển thị thông báo đang tải:

```jsx
function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // same code above ...
    }, []);

    return (<>
        {isLoading && <p>Loading...</p>}
        {/* OR */}
        {isLoading ? <p>Loading...</p> : ""}
    </>);
}
```

## III. Vô hiệu hóa nút khi đang tải

Bạn cũng có thể vô hiệu hóa nút trong quá trình tải dữ liệu nhằm ngăn người dùng nhấp nút liên tục khi đã bắt đầu yêu cầu `fetch`. Để làm điều đó, bạn cần thiết lập thuộc tính `disabled` với giá trị là biểu thức `{isLoading}`. Ví dụ:

```jsx
<button disabled={isLoading}>Click me</button>
```

:::tip[Tóm lại]

- Callback được truyền vào `.finally()` sẽ chạy trong cả hai trường hợp: `fetch` thành công và lỗi.
- Bạn có thể gọi `setIsLoading(false)` trong `.finally()` thay vì phải gọi nó trong `.then()` và `.catch()`.
- Bất kỳ phương pháp kết xuất có điều kiện nào cũng sẽ cho phép bạn hiển thị thông báo đang tải khi `isLoading` là `true`.
- Bạn có thể vô hiệu hóa nút khi đang tải như sau: `<button disabled={isLoading}>Click me</button>`.

:::

<iframe width="560" height="315" src="https://www.youtube.com/embed/Fsrap6aGrSQ?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Giải pháp nào giúp tránh việc lặp lại câu lệnh setIsLoading(false)?

Sử dụng .finally(), vì callback trong .finally() luôn chạy sau khi Promise kết thúc, bất kể thành công hay thất bại.

### Câu 2. Tại sao vẫn cần .catch() ngay cả khi đã dùng .finally()?

Vì .finally() không xử lý lỗi. Nếu không có .catch(), lỗi từ Promise sẽ làm hỏng toàn bộ component.

### Câu 3. Làm thế nào để hiển thị thông báo "Loading..." khi dữ liệu đang tải?

Kiểm tra state isLoading. Nếu true, trả về JSX `<p>Loading...</p>`.

### Câu 4. Ngoài cách dùng if, còn cách nào khác để hiển thị "Loading..."?

Có thể dùng toán tử logic && hoặc toán tử ba ngôi.

### Câu 5. Làm thế nào để ngăn người dùng nhấp nút nhiều lần khi dữ liệu đang tải?

Gán thuộc tính `disabled={isLoading}` cho nút. Khi isLoading là true, nút sẽ bị vô hiệu hóa.