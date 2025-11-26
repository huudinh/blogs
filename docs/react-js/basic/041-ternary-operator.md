---
sidebar_position: 41
---

# Toán tử 3 ngôi

Có nhiều cách để kết xuất có điều kiện, chúng chủ yếu là các tính năng của JavaScript mà bạn có thể sử dụng trong React.

Bạn không bắt buộc phải sử dụng những phương pháp này, vì vậy phần thực hành sẽ không kiểm tra việc sử dụng các phương pháp một cách rõ ràng. Tuy nhiên, bạn có thể bắt gặp kỹ thuật này trong code của lập trình viên khác, vì vậy bạn cần nắm rõ cách thức hoạt động của các phương pháp.

![Create-HTML-1](images/components.jpg)

<ToggleTOC />

## I. Lưu trữ các phần tử trong biến

Kỹ thuật này đã được đề cập trong bài JSX, do đó bài này sẽ nhắc lại một chút.

Vì phần tử JSX như `<h1 className="title">Hello</h1>` chỉ là một cuộc gọi đến `React.createElement(...)` trả về một đối tượng, do đó, bạn có thể lưu trữ nó trong biến.

Việc lưu trữ phần tử JSX vào biến cho phép bạn tái sử dụng biến này nếu nó được lặp lại nhiều lần trong một mẫu hoặc bạn cần trả về nó theo điều kiện. 

```jsx
function App(props) {
    const loginButton = <button>Login</button>;
    const signupButton = <button>Signup</button>;
    if (props.existingUser) {
        return <div className="app-container">{loginButton}</div>;
    }
    return <div className="app-container">{signupButton}</div>;
}
```

## II. Toán tử ba ngôi

Toán tử ba ngôi là cú pháp JavaScript cho phép bạn thay thế điều kiện `if/else` bằng `? :.`

```jsx
function getWelcomeMessage(type) {
    if (type === "admin") {
        return "Welcome admin";
    } else {
        return "Welcome user";
    }
}
```

Có thể được viết lại như sau:

```jsx
function getWelcomeMessage(type) {
    return (type === "admin") ? "Welcome admin" : "Welcome user";
}
```

`? :` là toán tử ba ngôi, trong đó biểu thức sau `?` sẽ được thực hiện khi điều kiện (`type === "admin"`) là `true` và biểu thức sau `:` sẽ được thực hiện khi điều kiện là `false`.

Theo kinh nghiệm của những lập trình viên lâu năm, bạn không nên cố gắng sử dụng toán tử ba ngôi ở mọi nơi.

Quan trọng là viết code dễ đọc, không nhất thiết phải là viết ít code.

Trong ví dụ này, toàn bộ biểu thức viết vừa đủ trên một dòng và vẫn dễ đọc, vì vậy việc sử dụng toán tử ba ngôi là chấp nhận được. Bạn có thể giữ nguyên điều kiện `if/else` nếu code dễ đọc.

Vì vậy, bạn không nên lạm dụng những kỹ thuật này, viết code dễ đọc mới là nhiệm vụ hàng đầu của các lập trình viên.

:::tip Tóm lại
 
- Các phần tử JSX có thể được lưu trữ trong biến

- Bạn có thể sử dụng toán tử ba ngôi để rút gọn điều kiện if trong JSX

- Hãy cố gắng viết code dễ đọc thay vì viết code ngắn nhất có thể.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Toán tử 3 ngôi trong react có hữu ích không?

Toán tử ba ngôi (? :) trong React rất hữu ích khi bạn cần render có điều kiện với hai khả năng rõ ràng — tức là khi bạn muốn hiển thị một phần tử nếu điều kiện đúng, và một phần tử khác nếu điều kiện sai.

### Câu 2: Khi nào thì nên sử dụng toán tử 3 ngôi trong react?

Cần xử lý cả hai nhánh điều kiện

Thay vì viết if...else bên ngoài JSX, toán tử ba ngôi giúp bạn viết logic trực tiếp trong phần render.

Nếu bạn cần hiển thị một phần tử trong trường hợp true, và một phần tử khác trong trường hợp false, thì && không đủ — bạn cần toán tử ba ngôi.