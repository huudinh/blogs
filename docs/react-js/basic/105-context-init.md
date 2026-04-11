---
sidebar_position: 105
---

# Khai báo Context

Trong React, Context là một cơ chế giúp truyền dữ liệu xuống nhiều cấp component mà không cần phải "props drilling" (truyền props qua từng cấp). Nó rất hữu ích khi bạn có dữ liệu dùng chung cho nhiều component, ví dụ như theme, ngôn ngữ, hoặc thông tin người dùng đăng nhập.

![Create-HTML-1](images/context.jpg) 

<ToggleTOC />


## I. Tạo Context

Bước đầu tiên là tạo một Context mới. Để làm điều đó, chúng ta cần thêm một named export: `createContext` từ gói React, ví dụ: `import {createContext} from "react"`.

Sau đó, chúng ta cần gọi hàm `createContext()` và lưu kết quả trả về vào một biến.

```jsx
import React, { createContext } from 'react';

// Khởi tạo Context
export const ThemeContext = createContext();

```

## II. Tạo Provider

Mỗi context đều cần một Provider. Provider sẽ cung cấp dữ liệu cho context. Trong trường hợp này, chúng ta đang tạo `ThemeContext` và muốn cung cấp `theme` (ví dụ `"dark"` hoặc `"light"`).

```jsx
import { createContext } from "react";

const ThemeContext = createContext();

function ThemeProvider(props) {
  const theme = "dark";

  return (
    <ThemeContext.Provider value={theme}>
      {props.children}
    </ThemeContext.Provider>
  );
};
```

`ThemeProvider` là một component React nhận props và hiển thị `props.children` được đóng gói bởi `<ThemeContext.Provider>`.

`ThemeContext.Provider` nhận một value, đó là giá trị mà tất cả các component con sẽ nhận được.

Cú pháp `.` tương tự cú pháp `React.StrictMode`. `ThemeContext` là một đối tượng và `Provider` là một khóa trong đối tượng đó. 

Nói chung, Provider sẽ đóng gói component `<App />` và cung cấp giá trị `value="dark"` để chúng ta có thể đọc theme từ bất kỳ component nào.

## III. Xuất Context & Provider

Cuối cùng, chúng ta cần xuất ThemeContext và ThemeProvider: `export {ThemeContext, ThemeProvider}`.

Dưới đây là chương trình hoàn chỉnh:

```jsx
import { createContext } from "react";

const ThemeContext = createContext();

function ThemeProvider(props) {
  const theme = "dark";

  return (
    <ThemeContext.Provider value={theme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
```

<iframe src="https://codesandbox.io/embed/yjhp9c?view=preview"
     title="Theme Context Basic"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

:::tip[Tóm lại]

- Các bước tạo context:
    - Tạo context
    - Tạo provider cho context.
    - Xuất context và provider.
- Provider sẽ đóng gói các component và cung cấp cho chúng giá trị (dữ liệu toàn cục).

:::

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Làm thế nào để tạo một Context mới trong React?

Để tạo một Context mới trong React, bạn cần sử dụng hàm `createContext` từ gói `react`. Hàm này trả về một đối tượng Context, sau đó bạn cần tạo một Provider để cung cấp giá trị cho Context.

### Câu 2. Provider trong Context có vai trò gì?

Provider có vai trò cung cấp dữ liệu cho Context. Nó sẽ đóng gói các component và cung cấp cho chúng giá trị (dữ liệu toàn cục).

### Câu 3. Tại sao cần xuất cả Context và Provider?

Chúng ta cần xuất cả Context và Provider để có thể sử dụng chúng ở các component khác nhau. Context được dùng để tạo ra một đối tượng Context, còn Provider được dùng để cung cấp giá trị cho Context.