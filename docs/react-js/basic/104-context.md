---
sidebar_position: 104
---

# Giới thiệu về Context

Trong lập trình, từ "context" có thể được hiểu là thông tin liên quan. Đó cũng là cách Context được sử dụng trong React. Nó được sử dụng khi bạn muốn làm cho một số thông tin liên quan đến ứng dụng có thể được sử dụng trong nhiều component.

![Create-HTML-1](images/context.jpg) 

<ToggleTOC />


## I. Dữ liệu toàn cục

Giả sử ứng dụng có sẵn giao diện chủ đề tối và chủ đề sáng. Chủ đề của ứng dụng có thể được biểu diễn bằng một biến trạng thái trong component cao nhất, component App. theme được định nghĩa là một biến trạng thái trong component App như sau:

```jsx
import {useState} from "react";

function App() {
    const [theme, setTheme] = useState("dark");

    return <Nav />
}

function Nav() {
    return <Button>Login</Button>;
}

function Button(props) {
    return <button>{props.children}</button>;
}
```

Tuy nhiên, chúng ta cần biết theme hiện tại trong component Button vì chúng ta sẽ hiển thị một lớp khác nhau dựa trên chủ đề. Do đó, chúng ta sẽ phải truyền chủ đề xuống như một prop từ App đến Nav và từ Nav đến Button như sau:

```jsx
import React, {useState} from "react";

function App() {
    const [theme, setTheme] = useState("dark");

    return <Nav theme={theme} />
}

function Nav(props) {
    return <Button theme={props.theme}>Login</Button>;
}

function Button(props) {
    // render class depending on props.theme
    return <button>{props.children}</button>;
}
```

Để ý rằng mỗi component trong ứng dụng cần nhận `theme` như một prop. Điều này sẽ làm cho code trong các component trở nên phức tạp và dài dòng.

## II. Sử dụng Context

Trường hợp sử dụng lý tưởng cho Context là khi bạn muốn làm cho dữ liệu toàn cục có thể truy cập được từ nhiều component trong ứng dụng. 

Ví dụ, chủ đề của ứng dụng, ngôn ngữ hiển thị, đơn vị tiền tệ được chọn hoặc chi tiết hồ sơ người dùng (id, hình ảnh, tiểu sử). 

Những thiết lập này sẽ ảnh hưởng đến nhiều component trong giao diện người dùng.

Thay vì phải truyền dữ liệu này qua toàn bộ cây component React, chúng ta sẽ sử dụng Context!

:::tip[Tóm lại]

- Khi chúng ta có dữ liệu toàn cục, chúng ta cần truyền nó xuống như một prop trong toàn bộ ứng dụng, điều này làm cho các component trở nên phức tạp và dài dòng.
- Trường hợp sử dụng lý tưởng cho Context là khi bạn muốn làm cho dữ liệu toàn cục có thể truy cập được từ nhiều component trong ứng dụng.
- Các trường hợp sử dụng Context: chủ đề hoặc ngôn ngữ hiển thị, đơn vị tiền tệ, chi tiết hồ sơ người dùng (id, hình ảnh, tiểu sử).

:::

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Context trong React được dùng để làm gì?

Context được dùng để chia sẻ dữ liệu toàn cục (global data) giữa nhiều component mà không cần truyền qua props ở từng cấp.

### Câu 2. Ví dụ nào minh họa cho việc cần dùng Context?

Khi ứng dụng có chế độ sáng/tối (theme), ngôn ngữ hiển thị, đơn vị tiền tệ, hoặc thông tin hồ sơ người dùng cần được truy cập ở nhiều component.

### Câu 3. Nếu không dùng Context, dữ liệu toàn cục sẽ được truyền như thế nào?

Dữ liệu phải được truyền xuống qua props từ component cha đến component con, dẫn đến code phức tạp và dài dòng.

### Câu 4. Context có phải là giải pháp thay thế cho mọi props không?

Không. Context chỉ nên dùng cho dữ liệu toàn cục. Với dữ liệu cục bộ, props vẫn là cách đơn giản và hiệu quả hơn.