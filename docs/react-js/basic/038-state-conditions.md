---
sidebar_position: 38
---

# Update State theo điều kiện

Thay đổi trạng thái có điều kiện không phải là một khái niệm đặc thù của React mà thực tế là một yêu cầu cần thiết trong nhiều dự án.

![Create-HTML-1](images/state.png)

<ToggleTOC />

## II. Áp dụng thực tế

Khi chúng ta xây dựng component `Countdown`, bộ đếm giảm từ 10 xuống 9 khi nhấp vào nút `Countdown`.

Sau đó là từ 9 xuống 8, cứ thế cho đến khi giá trị giảm xuống dưới 0, điều này không hợp lý từ quan điểm người dùng cuối; nó nên dừng lại ở 0.Đây là lúc khái niệm về thay đổi trạng thái có điều kiện trở nên hữu ích. Đó là khi bạn chỉ cập nhật trạng thái dựa trên một điều kiện cụ thể.

Hãy xem một ví dụ mà nút `Add second` chỉ cộng thêm giây cho đến khi đạt đến giây thứ 59.

```jsx
import {useState} from "react";

function Clock() {
    const [seconds, setSeconds] = useState(0);

    function handleIncrementClick() {
        if (seconds < 59) {
            setSeconds(seconds + 1);
        }
    }

    return (<>
        <h1>{seconds} seconds</h1>
        <button onClick={handleIncrementClick}>Add</button>
    </>);
}
```

Đoạn code đã thực hiện thay đổi trạng thái có điều kiện dựa trên trạng thái hiện tại

```jsx
if (seconds < 59) {
    setSeconds(seconds + 1);
}
```

Chúng ta chỉ tăng giây nếu `seconds < 59` trả về true.

Điều này có nghĩa là lần cuối cùng tăng giá trị là khi `seconds` là 58, sau đó `seconds` trở thành 59 và sau đó điều kiện if sẽ không chạy nữa.

## II. Lưu ý

Không đóng gói useState bằng điều kiện if

Chúng ta đóng gói `setSeconds` bằng điều kiện `if`, nhưng hook `useState` không nên được đóng gói bằng điều kiện if.

## III. Lý do

- React không cho phép đóng gói hook bằng điều kiện if.

- Bản thân trạng thái không có điều kiện. Chúng ta luôn muốn lấy trạng thái `seconds`; sự thay đổi chỉ xảy ra khi cuộc gọi `setSeconds` được thực hiện dưới điều kiện. Dù cho không gọi `setSeconds`, chúng ta vẫn sử dụng cú pháp `destructure` để lấy giá trị từ `useState`.

:::tip Tóm lại
 
- Thay đổi trạng thái có điều kiện là khi bạn đóng gói hàm setState bằng một điều kiện if để đáp ứng một số logic của dự án.

- KHÔNG đóng gói `useState` bằng điều kiện if.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Thay đổi State theo điều kiện trong React là gì?

Thay đổi State theo điều kiện trong React là cách để ứng dụng phản hồi linh hoạt với hành vi của người dùng hoặc dữ liệu bên ngoài. Đây là một phần cốt lõi giúp giao diện trở nên động, tương tác, và thông minh.

### Câu 2: Vì sao cần thay đổi State theo điều kiện?

Phản hồi hành vi người dùng

Hiển thị nội dung phù hợp với trạng thái

Tránh hiển thị nội dung trống hoặc lỗi khi chưa có dữ liệu

State giúp điều hướng giữa các phần của giao diện