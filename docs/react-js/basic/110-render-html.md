---
sidebar_position: 110
---

# Render HTML thô

`dangerouslySetInnerHTML` là một thuộc tính đặc biệt trong React cho phép bạn chèn trực tiếp HTML thô vào bên trong component. Nó bỏ qua cơ chế tự động “escape” của React, vì vậy rất dễ dẫn đến lỗ hổng bảo mật XSS nếu dữ liệu không được kiểm soát.

![Create-HTML-1](images/react.jpg) 

<ToggleTOC />

## I. Thực thể HTML

Hãy xem xét component sau:

```jsx
function Footer() {
    const text = "<strong>All rights reserved ©</strong>";

    return <div>{text}</div>;
}
```

Bạn dự đoán component sẽ hiển thị: `All rights reserved © (in đậm)`; tuy nhiên, kết quả thực tế là:` <strong>All rights reserved &copy;</strong>` không in đậm và ký hiệu bản quyền được hiển thị dưới dạng một thực thể HTML.

Điều này xảy ra là vì khi bạn có một biểu thức trong JSX, React sẽ tự động thoát các thực thể HTML (chuyển đổi thực thể HTML thành ký tự an toàn). Đây là một tính năng bảo mật nhằm ngăn chặn XSS injection.

## II. XSS Injection là gì?

Cross-Site Scripting (XSS) là một lỗ hổng bảo mật trong đó người dùng có thể chèn code của họ (HTML, CSS hoặc JavaScript) vào trang web của bạn. Giả sử bạn muốn gửi lời chúc mừng sinh nhật cho bạn bè trên mạng xã hội. Thay vì viết: Happy Birthday, bạn viết:

```jsx
<script>alert("You got hacked!")</script>
```

Nếu trang mạng xã hội cho phép bạn viết tập lệnh của riêng bạn và hiển thị trên trang, đây sẽ là một lỗ hổng bảo mật nghiêm trọng vì bạn có thể đọc cookie của người dùng, mạo danh người dùng, chuyển hướng đến các trang web khác và thực hiện nhiều hành vi khác.

Để ngăn chặn XSS Injection, bạn cần thoát các phần tử HTML (nói một cách đơn giản).

Vì vậy, đoạn code ở trên trở thành: `&lt;script&gt;alert("You got hacked!")&lt;/script&gt;`. Bằng cách thoát các ký tự` < và >`, trình duyệt sẽ hiểu đoạn code trên là văn bản thông thường thay vì một đoạn lệnh.

## III. Biểu thức JSX được thoát

Các biểu thức trong React được tự động thoát để ngăn chặn các cuộc tấn công XSS thông thường. Đây là một biện pháp bảo mật tuyệt vời và thường nên được giữ nguyên.

Tuy nhiên, có các tình huống mà bạn muốn ghi đè lên hành vi này và bỏ qua biện pháp phòng ngừa. Ví dụ, khi bạn chắc chắn 100% rằng biểu thức bạn đã nhúng trong JSX được tạo bởi bạn (hoặc nhóm của bạn) mà không được cung cấp bởi người dùng cuối. Sau đây là cách thực hiện:

```jsx
function Footer() {
    const text = "<strong>All rights reserved ©</strong>";

    return <div dangerouslySetInnerHTML={{__html: text}}></div>;
}
```

Để ý là chúng ta đã loại bỏ biểu thức `{text}` và thêm một prop tên là `dangerouslySetInnerHTML`, nó nhận đối tượng `{__html: text}` được đóng gói bởi biểu thức `{}` (vì vậy chúng ta có `{{}}`, một cho đối tượng và một cho biểu thức).

Bên trong đối tượng này, bạn phải đặt khóa `__html` (hai dấu gạch dưới). Việc thiết kế `dangerouslySetInnerHTML` với cấu trúc phức tạp như vậy nhằm mục đích nhắc nhở bạn rằng việc sử dụng nó tiềm ẩn các rủi ro bảo mật.

Nguyên tắc vàng là không bao giờ tin tưởng dữ liệu được cung cấp bởi người dùng. Nếu biểu thức mà bạn nhúng đến từ người dùng cuối (ví dụ: bình luận, tên, họ, email, v.v.), bạn không bao giờ nên sử dụng `dangerouslySetInnerHTML`.

:::tip[Tóm lại]

- Cross-Site Scripting (XSS) là một lỗ hổng bảo mật trong đó người dùng có thể chèn code của họ (HTML, CSS hoặc JavaScript) vào trang web của bạn.
- Biểu thức JSX luôn được thoát.
- Bạn không nên sử dụng `dangerouslySetInnerHTML` nếu nội dung đến từ người dùng cuối. Không bao giờ tin tưởng dữ liệu được cung cấp bởi người dùng.

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