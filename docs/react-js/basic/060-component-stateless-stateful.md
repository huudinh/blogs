---
sidebar_position: 60
---

# Stateless và Stateful

Component React có thể được chia thành hai loại: stateless (không lưu trạng thái) hoặc stateful (lưu trạng thái). Sự khác biệt nằm ở việc component có xử lý State hay không.

![Create-HTML-1](images/components.jpg) 

<ToggleTOC />

## I. Stateful components

Stateless component KHÔNG quản lý state bên trong. Vì vậy, bạn sẽ không thể tìm thấy lệnh gọi `useState` bên trong chúng. Trong khi đó, stateful component sẽ quản lý ít nhất một state.

Khi ứng dụng ngày càng phát triển, bạn sẽ chia một stateful component lớn thành nhiều component nhỏ hơn. Một trong số những component này sẽ là stateless.

Điều này sẽ làm cho việc tái cấu trúc và tối giản hóa chương trình dễ dàng hơn khi ứng dụng ngày càng mở rộng.

## II. Stateless components

Stateless component có tính tương tác. Mặc dù stateless component không quản lý trạng thái bên trong, chúng vẫn có thể tương tác với người dùng.

Ví dụ, một stateless component có thể chứa một form cùng với một ô văn bản và nút gửi. Tuy nhiên, trạng thái sẽ được quản lý bởi component cha của nó.

Để làm điều đó, trước tiên bạn cần biết rằng `props` cũng có thể truyền các hàm.

:::tip Tóm lại

- Stateless component KHÔNG quản lý trạng thái bên trong. (Không có lệnh gọi useState bên trong component)
- Stateful component quản lý trạng thái bên trong (Có ít nhất một lệnh gọi useState bên trong component).
- Tuy nhiên, stateless component có thể tương tác với người dùng. Tuy nhiên, trạng thái sẽ được quản lý bởi một component cha.

:::

<iframe width="560" height="315" src="https://www.youtube.com/embed/IOw74KfXAM4?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Tại sao nói Stateless Component là Component không có trạng thái?

- Không quản lý state nội bộ.

- Chỉ nhận props từ component cha và hiển thị dữ liệu.

- Thường được viết dưới dạng function component đơn giản.

- Dễ kiểm thử, dễ tái sử dụng, ít lỗi.

### Câu 2: Tại sao nói Stateful Component là Component có trạng thái?

- Tự quản lý state nội bộ bằng useState, useReducer, hoặc this.state (class).

- Có thể thay đổi giao diện dựa trên sự thay đổi của state.

- Thường dùng để xử lý logic phức tạp, tương tác người dùng.

