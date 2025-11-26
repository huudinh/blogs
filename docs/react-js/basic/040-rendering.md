---
sidebar_position: 40
---

# Rendering theo điều kiện

Là một kỹ thuật hữu ích khi bạn muốn hiển thị các component khác nhau

![Create-HTML-1](images/components.jpg)

<ToggleTOC />


## I. Rendering theo điều kiện

Một component có thể hiển thị nhiều component khác nhau dựa trên một điều kiện cụ thể.

Đây được gọi là kết xuất có điều kiện (cụ thể là kết xuất component theo điều kiện).

Đây là một kỹ thuật hữu ích khi bạn muốn hiển thị các component khác nhau dựa trên điều kiện.

## II. Áp dụng 

Chúng ta có thể áp dụng điều kiện cho component để cuối cùng có được component theo điều kiện

```jsx
function WelcomeUser(props){
    if (props.user) {
        return <h1>Welcome {props.user}</h1>;
    } else {
        return <h1>Please login!</h1>;
    }
}
```

Giả sử chúng ta có hai component khác nhau (`DarkTheme` và `LightTheme`), component `<App />` có thể hiển thị một trong hai component dựa trên kết quả của điều kiện if.

```jsx
import DarkTheme from "./DarkTheme.js"
import LightTheme from "./LightTheme.js"

function App(props) {
    if (props.theme === "dark") {
        return <DarkTheme />;
    }
    return <LightTheme />;
}
```

<!-- :::tip Tóm lại
 

::: -->

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Rendering theo điều kiện trong react là gì?

Rendering theo điều kiện trong React là cách để bạn hiển thị các phần tử UI dựa trên trạng thái hoặc logic cụ thể. Đây là một kỹ thuật cực kỳ phổ biến và linh hoạt trong phát triển giao diện người dùng.

### Câu 2: Các cách phổ biến để render có điều kiện trong React?

Sử dụng if bên ngoài JSX

Toán tử ba ngôi ? : trong JSX

Toán tử && để render khi điều kiện đúng

Tạo component riêng biệt

Sử dụng switch hoặc if-else cho nhiều điều kiện

### Câu 3: Các lỗi có thể phát sinh khi Rendering theo điều kiện?

Tránh lồng quá nhiều toán tử ba ngôi trong JSX — dễ gây rối.

Nếu điều kiện phức tạp, nên tách ra thành biến hoặc hàm trước khi render.

Luôn kiểm tra giá trị falsy như 0, null, undefined khi dùng &&.