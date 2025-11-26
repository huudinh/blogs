---
sidebar_position: 31
---

# Khởi tạo State

Giá trị mặc định của State được trả về bởi useState sẽ giống với initial_value truyền vào useState(initial_value)

![Create-HTML-1](images/state.png)

<ToggleTOC />

## I. Khởi tạo giá trị ban đầu cho State

Bây giờ bạn đã biết cách thêm hàm useState, hãy tạo biến trạng thái đầu tiên.

Để làm điều đó, chúng ta cần gọi hàm `useState` với cú pháp `useState(initial_value)`.

initial_value là giá trị khởi tạo ban đầu của trạng thái.

Ví dụ, để tạo component `<Stopwatch />`, chúng ta cần một biến trạng thái `seconds` và biến trạng thái đó sẽ bắt đầu từ 0.

Điều đó có nghĩa là giá trị khởi tạo là 0.

Vì vậy, bạn tạo trạng thái bằng cú pháp sau: `useState(0)`.

## II. useState trả về cái gì?

`useState` trả về một mảng gồm 2 phần tử:

-  Phần tử đầu tiên là giá trị hiện tại của trạng thái
-  Phần tử thứ hai là một hàm cập nhật trạng thái 

Vì vậy, thay vì viết:

```jsx
const result = useState(0)
const seconds = result[0];
const setSeconds = result[1];
```

Chúng ta sẽ sử dụng cú pháp array destructuring:

```jsx
const [seconds, setSeconds] = useState(0);
```

`seconds` hiện tại là một số có giá trị 0 và `setSeconds` là một hàm cập nhật trạng thái `seconds`.

Điều quan trọng là đặt tên các thuộc tính được destructure như sau:

-  Phần tử đầu tiên nên lấy tên của trạng thái (trong ví dụ này là seconds)
-  Phần tử thứ hai có phần đầu là `set` và theo sau là tên trạng thái viết hoa chữ cái đầu (trong ví dụ này là `setSeconds`)

Điều này quan trọng vì khi các component trở nên phức tạp hơn, chúng ta cần biết rằng `seconds` là trạng thái và `setSeconds` là hàm cập nhật trạng thái của seconds.

## III. Tạo một ví dụ về khởi tạo State

Hãy xem một ví dụ sử dụng trạng thái đầy đủ:

```jsx
import {useState} from "react";

function Stopwatch() {
    const [seconds, setSeconds] = useState(0);

    return <div>{seconds}</div>
}
```

Để ý đoạn code gọi useState(0) bên trong component Stopwatch.

Các điểm quan trọng cần lưu ý:

-  Bạn chỉ nên gọi `useState` bên trong component, không phải bên ngoài.
-  `useState` nên là thành phần đầu tiên được gọi bên trong hàm 

Lưu ý, vì trạng thái `seconds` là một biến, bạn có thể sử dụng nó như một biểu thức trong JSX: `<div>{seconds}</div>`.

seconds sẽ bằng 0 vì đó là giá trị khởi tạo mà ta đã truyền vào.

:::tip Tóm lại
 
- Hàm `useState()` nhận `initial_value` là đối số duy nhất.
- Hàm `useState()` trả về một mảng gồm 2 phần tử
- Luôn destructure `useState` thành `state` và `setState`, trong đó `state` là tên của trạng thái
- Giá trị mặc định của State được trả về bởi `useState` sẽ giống với `initial_value` truyền vào `useState()`.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Khởi tạo State là gì?

Trong React, khởi tạo state là bước đầu tiên để lưu trữ dữ liệu nội bộ của một component — giúp giao diện phản hồi linh hoạt với các thay đổi. Tùy vào cách bạn viết component (function hay class), cách khởi tạo sẽ khác nhau.