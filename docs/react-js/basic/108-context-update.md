---
sidebar_position: 108
---

# Cập nhật giá trị Context

Giá trị của provider trong context không nhất thiết phải là chuỗi. Nó có thể là một mảng hoặc đối tượng.

![Create-HTML-1](images/context.jpg) 

<ToggleTOC />

## I. Biến trạng thái 

Đôi khi chúng ta muốn thay đổi giá trị của theme tại một thời điểm nào đó, để làm điều đó, chúng ta cần tạo một biến trạng thái cho chủ đề thay vì sử dụng biến thông thường.

Chúng ta có thể sử dụng hook useState bên trong Context

```jsx
import { createContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider(props) {
  const [theme, setTheme] = useState("dark");

  function toggleTheme() {
    // toggle the theme here
  }

  const value = {
    theme: theme,
    toggleTheme: toggleTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
```

## II. Triển khai hàm

```jsx
function toggleTheme() {
    if (theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
}
```

Chúng ta có thể triển khai hàm `toggleTheme` hàm sẽ chuyển đổi theme từ "dark" sang "light" và ngược lại.

## III. Cập nhật theme

Với context trên, chúng ta có thể cập nhật theme từ bất kỳ đâu trong ứng dụng, miễn là chúng ta sử dụng ThemeContext. Dưới đây là cách thực hiện

```jsx
import {useContext} from "react";
import {ThemeContext} from "./ThemeContext.js";

function App() {
    const context = useContext(ThemeContext);
    console.log(context); // {theme: "dark", toggleTheme: Function}

    return <button onClick={() => context.toggleTheme()}>Toggle Theme</button>;
}
```

useContext(ThemeContext) bây giờ trả về một đối tượng chứa theme và hàm toggleTheme.

Sau đó, chúng ta gọi hàm context.toggleTheme() khi nút được nhấp (onClick).

<iframe src="https://codesandbox.io/embed/yjhp9c?view=preview"
     title="Theme Context Basic"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

:::tip[Tóm lại]

- Việc cập nhật trạng thái thông qua context.toggleTheme() sẽ kích hoạt thông báo (hiển thị lại) tất cả các component sử dụng ThemeContext này, đó là lý do tại sao bạn sẽ thấy theme mới được áp dụng ngay lập tức.

:::

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Tại sao cần sử dụng biến trạng thái (useState) cho theme thay vì biến thông thường?

Vì chúng ta muốn thay đổi giá trị theme tại một thời điểm nào đó và React cần biết để render lại giao diện. Biến thường không kích hoạt re-render, còn useState thì có.

### Câu 2. Hàm toggleTheme hoạt động như thế nào?

Hàm toggleTheme sẽ kiểm tra giá trị hiện tại của theme. Nếu là "dark" thì chuyển sang "light", ngược lại thì chuyển sang "dark".

### Câu 3. Làm thế nào để cập nhật theme từ bất kỳ đâu trong ứng dụng?

Chỉ cần sử dụng `useContext(ThemeContext)` để lấy đối tượng context, sau đó gọi `context.toggleTheme()` khi cần thay đổi theme.