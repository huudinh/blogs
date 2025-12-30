---
sidebar_position: 93
---

# Fetch với async/await

async/await là cú pháp rút gọn cho promise, cho phép bạn biểu diễn logic của promise như một tập hợp các hoạt động chạy tuần tự theo từng dòng. Nhưng đừng quên rằng async/await vẫn chạy các promise thực tế và gọi .then() cho bạn.

![Create-HTML-1](images/fetch.webp) 

<ToggleTOC />

## I. Sử dụng promise truyền thống

```jsx
import {useEffect, useState} from "react";

function App() {
    const [users, setUsers] = useState();

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(data => {
            setUsers(data);
        });
    }, []);
}
```

Để sử dụng `async/await`, chúng ta cần đặt tiền tố `async` trước khai báo hàm để có thể sử dụng từ khóa `await`. Tuy nhiên, hàm `async` là một hàm trả về `Promise`.

Điều này không phù hợp với cách `React` xử lý `useEffect`. `React` chỉ muốn bạn trả về một hàm `cleanup` (dọn dẹp).

Vì vậy, đoạn code dưới đây KHÔNG hoạt động:

```jsx
useEffect(async () => {
    // this will break
});
```

Thay vào đó, chúng ta cần giữ `useEffect` như một hàm thông thường và tạo một hàm khác bên trong nó có thể được gọi ngay lập tức:

```jsx
useEffect(() => {
    (() => {
        // this is a function that will execute immediately
    })();
});
```

## II. Sử dụng async/await

```jsx
// 1) function definition:
() => {
    
}

// 2) wrap it with parentheses
(() => {

})

// 3) call this function with ()
(() => {

})();
```

Lý do ta thực hiện tất cả các bước trên là vì ta muốn biến hàm mới thành hàm `async` trả về một `promise`, mà không cần trả về bất cứ thứ gì từ hàm được truyền vào `useEffect`.

Bây giờ chúng ta cần làm cho hàm mới trở thành hàm `async` bằng cách thêm từ khóa `async` vào đầu hàm:

```jsx
useEffect(() => {
    (async () => {
        // we can use await here ✅
    })();
});
```

Và cuối cùng, với mọi hàm trả về `promise` (ví dụ: `fetch` và `response.json()`), chúng ta có thể thêm từ khóa `await` vào trước và loại bỏ `.then()`.

```jsx
import {useEffect, useState} from "react";

function App() {
    const [users, setUsers] = useState();

    useEffect(() => {
        (async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/users")
            const data = await response.json()
            setUsers(data);
        })();
    }, []);
}
```

:::tip Tóm lại

- Để sử dụng `await`, chúng ta cần đặt nó bên trong hàm `async`.
- Bạn không thể biến một hàm được truyền vào `useEffect` thành hàm `async` vì điều đó sẽ khiến nó sẽ trả về một `Promise`, trong khi React mong đợi giá trị trả về là `undefined` hoặc một hàm dọn dẹp.
- Thay vào đó, chúng ta nên thêm một biểu thức hàm `async` được gọi ngay lập tức bên trong `useEffect`.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/QePvBp5w4y4?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Đoạn code nào chịu trách nhiệm chuyển đổi dữ liệu từ response sang JSON?

Trong đoạn code truyền thống, `response.json()` chịu trách nhiệm chuyển đổi dữ liệu từ response sang JSON.

### Câu 2. Tại sao không thể biến một hàm được truyền vào useEffect thành hàm async?

Vì một hàm async luôn trả về Promise, trong khi React chỉ cho phép useEffect trả về một hàm cleanup (dọn dẹp). Điều này làm sai cách React xử lý vòng đời component.

### Câu 3. Giải pháp nào thay thế để có thể dùng async/await trong useEffect?

Giữ useEffect là một hàm thường, sau đó tạo một hàm async bên trong và gọi ngay lập tức 

### Câu 4. Khi dùng async/await, ta có thể loại bỏ .then() bằng cách nào?

Thêm từ khóa await trước các hàm trả về Promise như fetch và response.json().