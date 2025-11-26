---
sidebar_position: 32
---

# Update State

Chúng ta sẽ tìm hiểu cách cập nhật trạng thái và cách React & ReactDOM tự động cập nhật lại Component và hiển thị các cập nhật trên trình duyệt.

![Create-HTML-1](images/state.png)

<ToggleTOC />

## I. Sự kiện

Sự kiện cơ bản nhất mà bạn có thể thực hiện trong React để cập nhật trạng thái khi người dùng nhấp chuột vào nút `<button>`.

Để thêm một sự kiện nhấp vào `<button>`, chúng ta phải thêm thuộc tính `onClick` (viết hoa chữ cái đầu) và gán nó cho hàm mũi tên: `() =>`

```jsx
function Welcome() {
    return <button onClick={() => console.log("button was clicked")}>Click me</button>
}
```

Đoạn lệnh trên sẽ in ra button was clicked mỗi khi bạn nhấp chuột vào nút.

Hãy phân tích cú pháp onClick={() => console.log("button was clicked")}:

- `onClick={}` thuộc tính JSX với một biểu thức động.
- `onClick` thêm một trình lắng nghe sự kiện
- `() => console.log("button was clicked")` là một arrow function. Vì phần thân của arrow function chỉ có 1 dòng, chúng ta có thể bỏ qua `{}`. Bạn cũng có thể viết: `() => {console.log("button was clicked")}`

## II. Thay đổi trạng thái

Trạng thái là một biến mà chúng ta có thể cập nhật vào thời điểm nào đó trong tương lai.

Ví dụ, khi người dùng nhấp vào nút hoặc khi bạn nhận dữ liệu từ API.

Để cập nhật trạng thái, bạn luôn phải sử dụng hàm `'set'` nhận được từ `useState`.

Vì vậy nếu ta tạo một trạng thái gọi là `seconds` thì ta sẽ sử dụng hàm `setSeconds(newValue)` đã được destructure. Hãy sử dụng Component `Stopwatch` giống như trước đây:

```jsx
import {useState} from "react";

function Stopwatch() {
    // hooks have to be at the top
    const [seconds, setSeconds] = useState(0);

    return (<>
        <h2>{seconds}</h2>
        {/* increment seconds state by 1, when you click on the button*/}
        <button onClick={() => setSeconds(seconds + 1)}>Click to add 1</button>
    </>);
}
```

Đoạn code cập nhật trạng thái bằng cách gọi `setSeconds()` và truyền vào đó giá trị mới của trạng thái.

Giá trị mới của trạng thái là `seconds + 1`, tương đương với: giá trị hiện tại + 1.

Điều đó xảy ra là vì `seconds` lưu giữ giá trị hiện tại của trạng thái, vì vậy `seconds + 1` sẽ tăng giá trị đó lên 1.

Có một cách hiệu quả hơn để cập nhật trạng thái đó là cập nhật trạng thái bằng hàm.

:::tip Tóm lại
 
- Sự kiện `onClick={() => console.log("Hello World")}` Khi người dùng click vào `<button>` sẽ in ra `"Hello World"`
- Để Update State, bạn luôn phải sử dụng hàm `'setState'` nhận được từ `useState` (ví dụ: `setSeconds`, `setCount`)

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Tại sao cần Update State?

Việc update state trong React là trung tâm của mọi hành động tương tác và thay đổi giao diện. Nếu không cập nhật state, ứng dụng React sẽ không phản hồi đúng với hành vi người dùng hoặc dữ liệu mới — khiến giao diện trở nên tĩnh và không còn “sống”.

### Câu 2: Vì sao cần cập nhật State?

React hoạt động theo nguyên tắc: state thay đổi → component re-render → giao diện cập nhật.

Người dùng click, nhập liệu, chọn tùy chọn... tất cả đều cần cập nhật state để phản ánh hành động đó.

State giúp bạn kiểm soát luồng logic

State là nơi lưu trữ dữ liệu nội bộ — không cần gửi lên server hoặc chia sẻ toàn cục

### Câu 3: Nếu không update state thì sao?

Giao diện không thay đổi → người dùng tưởng ứng dụng bị lỗi

Logic không chạy đúng → dễ gây bug

Trải nghiệm người dùng kém → mất tính tương tác