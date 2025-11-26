---
sidebar_position: 37
---

# State & Event  

Sau khi đã hiểu về event và closures, chúng ta có thể tiếp tục làm việc với state bên trong các component.

Hãy chuyển từ trình xử lý sự kiện trực tiếp sang trình xử lý sự kiện có tên

![Create-HTML-1](images/state.png)

<ToggleTOC />

## I. Update State trực tiếp

```jsx
import {useState} from "react";

function Stopwatch() {
    const [seconds, setSeconds] = useState(0);

    return (<>
        <h2>{seconds}</h2>
        <button onClick={() => setSeconds(seconds + 1)}>Click to add 1</button>
    </>);
}
```

## II. Update State qua Function

```jsx
import {useState} from "react";

function Stopwatch() {
    const [seconds, setSeconds] = useState(0);

    function handleIncrementClick() {
        setSeconds(seconds + 1);
    }

    return (<>
        <h2>{seconds}</h2>
        <button onClick={handleIncrementClick}>Click to add 1</button>
    </>);
}
```

Để ý `handleIncrementClick` được định nghĩa bên trong hàm `Stopwatch`.

Bởi vì chúng ta có một `closure` ở đây nên `handleIncrementClick` có thể truy cập biến `seconds` vì nó nằm trong phạm vi của `Stopwatch`.

Đó là lý do tại sao hàm `handleIncrementClick` nên được định nghĩa bên trong Component `Stopwatch`, nếu không, hàm sẽ không thể truy cập vào phạm vi của `Stopwatch` (bao gồm các biến/hàm như `seconds` và `setSeconds`).

:::tip Tóm lại
 
- Khi trình xử lý sự kiện được định nghĩa bên trong component, chúng có thể sử dụng các state nhờ có `closures`.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Mỗi quan hệ giữa Closures, Event và State?

Mối quan hệ giữa Closures, Event, và State trong React là một tam giác rất thú vị — chúng tương tác chặt chẽ để tạo nên hành vi động và linh hoạt của ứng dụng. 

Closure: Ghi nhớ giá trị của state tại thời điểm khai báo

Event: Kích hoạt hành động, thường là thay đổi state

State: Dữ liệu động, thay đổi theo event và ảnh hưởng đến closure