---
sidebar_position: 106
---

# Sử dụng Context

Sau khi định nghĩa ThemeContext và ThemeProvider, chúng ta sẽ sử dụng chúng trong ứng dụng.


![Create-HTML-1](images/context.jpg) 

<ToggleTOC />

## I. Đóng gói component với Provider

Để có thể sử dụng context trong ứng dụng, bạn phải đóng gói các component bằng Provider.

Hãy xem xét component App hiển thị `<Nav />`:

```jsx
// index.js
function App() {
    return <Nav />;
}
```

Đầu tiên, chúng ta cần thêm ThemeProvider và đóng gói tất cả các component trong nó:

```jsx
// index.js
import {ThemeProvider} from "./ThemeContext.js";

function App() {
    return (<ThemeProvider>
        <Nav />
    </ThemeProvider>);
}
```

Điều này cho phép tất cả các component được lồng trong ThemeProvider có quyền truy cập vào context được cung cấp bởi ThemeProvider.

## II. Sử dụng context trong các component

Bất kỳ component nào được lồng trong ThemeProvider bây giờ có thể truy cập vào context bằng cách thêm ThemeContext và truyền nó vào hook useContext(). Sau đây là cách thực hiện:

```jsx
// Button.js
import {useContext} from "react";
import {ThemeContext} from "./ThemeContext.js";

function Button(props) {
    const theme = useContext(ThemeContext);
    console.log(theme); // "dark"
    return <button>{props.children}</button>;
}
```

Chúng ta đã thêm hook useContext và truyền ThemeContext cho nó. Điều này cho phép ta sử dụng value đã được truyền cho provider trong bước trên, trong ví dụ này là "dark".

Cách làm này có vẻ phức tạp và rườm rà, nhưng lợi ích của việc này là chúng ta không cần phải truyền props.theme từ component cao nhất xuống tất cả các component con.

```jsx
import {useContext} from "react";
import {ThemeContext, ThemeProvider} from "./ThemeContext.js";

function App() {
    return (<ThemeProvider>
        <Nav />
    </ThemeProvider>);
}

function Nav() {
    return <Button>Login</Button>;
}

function Button(props) {
    const theme = useContext(ThemeContext);
    console.log(theme); // "dark"
    return <button>{props.children}</button>;
}
```

## III. Lưu ý

Context chủ yếu được sử dụng khi một số dữ liệu toàn cục cần được truy cập bởi nhiều component trong ứng dụng. 

Vì vậy, hãy sử dụng context một cách cẩn thận vì nó có thể làm cho việc tái sử dụng component khó khăn hơn vì những component này phụ thuộc vào context.

:::tip[Tóm lại]

- Để sử dụng context, bạn cần
    - Đóng gói các component trong Provider.
    - Trong các file component, truyền Context vào hook useContext.
- Lợi ích của việc sử dụng context là chúng ta không cần phải truyền cùng một prop trong toàn bộ cây component.

:::

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Tại sao cần đóng gói component bằng Provider khi sử dụng Context?

Vì Provider sẽ cung cấp dữ liệu cho toàn bộ cây component bên trong nó. Nếu không đóng gói bằng Provider, các component con sẽ không thể truy cập vào giá trị của Context.

### Câu 2. Làm thế nào để một component con lấy dữ liệu từ Context?

Để một component con lấy dữ liệu từ Context, bạn cần sử dụng hook `useContext` và truyền Context vào đó. Ví dụ: `const theme = useContext(ThemeContext);`.

### Câu 3. Cú pháp đóng gói component bằng Provider như thế nào?

Cú pháp đóng gói component bằng Provider như sau: `<ThemeProvider><App /></ThemeProvider>`.