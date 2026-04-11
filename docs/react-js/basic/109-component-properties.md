---
sidebar_position: 109
---

# Thuộc tính Component

Component là một “thành phần” trong hệ thống phần mềm hoặc lập trình, dùng để chia nhỏ chức năng phức tạp thành các khối độc lập, dễ quản lý và tái sử dụng. Trong ReactJS, thuộc tính Component chính là khái niệm cốt lõi để xây dựng giao diện người dùng theo dạng module

![Create-HTML-1](images/react.jpg) 

<ToggleTOC />

## I. Đối tượng và component

Vì JSX luôn chuyển đổi `<Component />` thành cuộc gọi `React.createElement(Component, {})`, do đó một đối tượng có thể chứa nhiều component

```jsx
const Buttons = {
    Default: function(props) {
        return <button className="btn-default">{props.children}</button>;
    },
    Outline: function(props) {
        return <button className="btn-outline">{props.children}</button>;
    }
}
```

Sau đó, bạn có thể sử dụng các component trên như sau

```jsx
<Buttons.Default>Login</Buttons.Default>
<Buttons.Outline>Register</Buttons.Outline>
```

Lý do tại sao điều này hoạt động là vì chúng sẽ được chuyển đổi thành các cuộc gọi React.createElement như sau

```jsx
React.createElement(Buttons.Default, {}, "Login");
React.createElement(Buttons.Outline, {}, "Register");
```

## II. Sử dụng cú pháp

Chúng ta đã sử dụng `ThemeContext.Provider` trong các chương về `Context` và nó hoạt động tương tự như sau

```jsx
return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
```

Cú pháp cũng được sử dụng trong các Thư viện Giao diện người dùng, trong đó thư viện sẽ xuất tất cả các nút trong một đối tượng duy nhất tên là Buttons, và sau đó bạn có thể chọn loại nút bằng cách sử dụng `Buttons.Default` hoặc `Buttons.Outline`.

Cú pháp tương tự cũng được áp dụng cho `<React.StrictMode />`.


:::tip[Tóm lại]

- `<Buttons.Default />` được chuyển đổi thành `React.createElement(Buttons.Default, {})`

:::


## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Component trong hệ thống phần mềm và trong ReactJS có ý nghĩa gì?

Component là một “thành phần” trong hệ thống phần mềm hoặc lập trình, dùng để chia nhỏ chức năng phức tạp thành các khối độc lập, dễ quản lý và tái sử dụng. Trong ReactJS, thuộc tính Component chính là khái niệm cốt lõi để xây dựng giao diện người dùng theo dạng module.

### Câu 2. JSX chuyển đổi `<Component />` thành gì trong React?

JSX chuyển đổi `<Component />` thành `React.createElement(Component, {})`.

### Câu 3. Tại sao ta có thể gọi `<Buttons.Default>` và `<Buttons.Outline>` như một component?

Vì chúng được định nghĩa là các thuộc tính (properties) của đối tượng `Buttons`, và JSX cho phép gọi các thuộc tính này như component khi chúng là các hàm hoặc class component.

### Câu 4. Cú pháp `<ThemeContext.Provider>` hoạt động tương tự như thế nào?

Cú pháp này hoạt động tương tự như việc định nghĩa các component như thuộc tính của một đối tượng. `ThemeContext.Provider` là một component được export từ `ThemeContext`, và khi sử dụng, nó đóng vai trò như một "container" để truyền giá trị context xuống các component con bên trong nó.

### Câu 5. Ưu điểm của việc tổ chức component theo đối tượng (như Buttons.Default, Buttons.Outline) là gì?

Giúp gom nhóm các component liên quan vào một namespace chung.

Dễ quản lý, dễ mở rộng.

Tránh xung đột tên và tăng khả năng tái sử dụng.