---
sidebar_position: 36
---

# Quy ước đặt tên cho Event

Thay vì sử dụng sự kiện trực tiếp, ta chuyển sang sự kiện được đặt tên, cho phép xử lý những sự kiện phức tạp hơn bên trong

![Create-HTML-1](images/state.png)

<ToggleTOC />

## I. Sự kiện được đặt tên

Trực tiếp gán một hàm (không có tên) cho sự kiện

```jsx
<button onClick={() => console.log("Logging in..")}>Login</button>
```

`() => console.log("Logging in..")` là arrow Function được viết trực tiếp trong thuộc tính của phần tử, cho phép bạn thực hiện `console.log` (hoặc thay đổi state).

Nhưng khi khám phá các khái niệm nâng cao hơn, chúng ta sẽ tạo các trình xử lý sự kiện phức tạp hơn, vì vậy ta cần định nghĩa các hàm và đặt tên cho chúng:

```jsx
function handleLoginClick() {
    console.log("Logging in..");
};

<button onClick={handleLoginClick}>Login</button>
```

Đoạn code định nghĩa hàm `handleLoginClick` và sau đó truyền tham chiếu của hàm vào trình xử lý `onClick`.

## II. Các lỗi phổ biến

Lưu ý là chúng ta cần truyền tên hàm chứ không gọi hàm, vì vậy câu lệnh sau sẽ không hoạt động

```jsx
// this will NOT work
<button onClick={handleLoginClick()}>Login</button>
```

Kết quả là hàm được gọi trong mỗi lần hiển thị vì () sẽ thực thi nó ngay lập tức.

## III. Quy ước đặt tên

Chúng ta cần duy trì sự tổ chức và cấu trúc rõ ràng trong chương trình khi các component trở nên phức tạp hơn. Vì vậy, ta cần có một quy ước đặt tên cho trình xử lý sự kiện.

Hãy nhớ rằng React không bắt buộc tuân thủ các quy ước đặt tên này, vì vậy chương trình vẫn hoạt động ngay cả khi bạn không tuân thủ quy ước.

Đây là quy ước đặt tên mà bạn nên tuân thủ:

> handleSubjectEvent

1. Tên hàm luôn bắt đầu bằng `handle`.
2. Tiếp theo là phần mô tả: ví dụ, Login cho nút Đăng nhập.
3. Sau đó là loại sự kiện: `Click` cho sự kiện nhấp chuột.

Vì vậy chúng ta có `handleLoginClick`.

## IV. Đặt tên cho các sự kiện/hàm thông dụng

- `handleFormSubmit` - cho sự kiện submit biểu mẫu
- `handleNameChange` - cho sự kiện change trên trường nhập tên
- `handleLogoutClick` - cho sự kiện click trên nút Đăng xuất
- `fetchUserData` - hàm lấy dữ liệu người dùng
- `updateProfileInfo` - hàm cập nhật thông tin hồ sơ
- `toggleSidebarVisibility` - hàm bật/tắt sidebar

## V. Tại sao không sử dụng handleEvent?

Bạn có thể thấy `handleClick` hoặc `handleSubmit` đều hoạt động tốt. Tuy nhiên, nếu bạn có hai sự kiện cùng loại trong cùng một component là vi phạm quy ước đặt tên.

Đó là lý do tại sao bạn nên sử dụng `handleSubjectEvent`.

:::tip Tóm lại
 
- Việc chuyển từ trình xử lý sự kiện trực tiếp sang trình xử lý sự kiện được đặt tên cho phép xử lý những sự kiện phức tạp hơn bên trong trình xử lý sự kiện.
- `<button onClick={handleLoginClick}>Đăng nhập</button>` gọi `handleLoginClick` khi nút được nhấp.
- Sử dụng quy ước đặt tên `handleSubjectEvent` cho các trình xử lý sự kiện

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Khi làm việc với các event handler ta nên đặt tên thế nào?

Ta nên đặt tên theo mẫu handleSubjectEvent, đây là một quy ước rất phổ biến và rõ ràng trong React (và JavaScript nói chung), đặc biệt khi làm việc với các event handler.

### Câu 2: Lợi ích của quy ước này?

Rõ ràng và dễ hiểu: Nhìn vào tên hàm là biết nó dùng để làm gì và liên quan đến phần tử nào.

Dễ bảo trì: Khi dự án lớn dần, việc tuân thủ quy ước giúp bạn (và đồng đội) dễ tìm kiếm và sửa lỗi.

Thống nhất trong team: Tránh việc mỗi người đặt tên một kiểu, gây rối loạn.