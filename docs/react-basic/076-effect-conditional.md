---
sidebar_position: 76
---

# Sử dụng Effect với Conditional

Một trường hợp sử dụng phổ biến khác là chạy hiệu ứng khi một biến cụ thể được bật hoặc tắt.

![Create-HTML-1](images/effect.webp) 

<ToggleTOC />

## I. Xây dựng component Stopwatch

Để làm điều đó, chúng ta tạo một biến trạng thái boolean và sử dụng nó như điều kiện if bên trong hiệu ứng.

Hãy tưởng tượng nó là nút bắt đầu và tạm dừng, nút đó bắt đầu và tạm dừng hiệu ứng.


```jsx title="Hãy xem ví dụ về Stopwatch"
function Stopwatch() {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        let timerId = setTimeout(() => {
            setCounter(prevCounter => prevCounter + 1);
        }, 1000);
        return () => {
            clearTimeout(timerId)
        }
    });

    function handleButtonClick() {
        // TODO
    }

    return <>
        <h2>{counter}</h2>
        <button onClick={handleButtonClick}>Start / Pause</button>
    </>
}
```
Chúng ta cùng phân tích đoạn code:

1. Component `Stopwatch` bắt đầu từ 0 (giá trị khởi tạo của `useState()`).
2. Component hiển thị giá trị của bộ đếm, ban đầu là 0, và nút `Start / Pause`.
3. `useEffect()` được gọi, tạo một bộ hẹn giờ được lên lịch chạy sau 1 giây.
4. Sau khi 1 giây đã trôi qua, ta gọi `setCounter(prevCounter => prevCounter + 1)` để tăng giá trị của bộ đếm lên 1.
5. Điều này dẫn đến việc hiển thị lại component, hiển thị 1 và `useEffect` chạy lại.
6. Và cứ tiếp tục như vậy.

Làm thế nào để làm cho nút `Start/Pause` hoạt động?

## II. Viết chức năng Start/Pause cho component

Để làm điều đó, chúng ta cần một biến state có kiểu dữ liệu boolean:

```jsx
const [running, setRunning] = useState(false)
```

Chúng ta sẽ sử dụng giá trị của running để quyết định xem `useEffect` có chạy hay không.

Nhưng nhớ lại rằng theo quy tắc sử dụng `hook`, chúng ta KHÔNG được phép đóng gói `useEffect` bằng điều kiện if.

Vì vậy, chúng ta nên đóng gói code bên trong `useEffect`:

```jsx
useEffect(() => {
    // the effect still runs every time
    // but the code inside of it only runs when 'running' is true
    if (running) { 
        let timerId = setTimeout(() => {
            setCounter(prevCounter => prevCounter + 1);
        }, 1000);
        return () => {
            clearTimeout(timerId)
        }
    }
});
```

Và cuối cùng, bạn sẽ cần làm cho nút đảo ngược giá trị của boolean. Để làm điều đó, chúng ta sử dụng toán tử Logic Not.

Vì vậy, hàm `handleButtonClick` trở thành:

```jsx
function handleButtonClick() {
    setRunning(prevValue => !prevValue);
}
```

## Ưu điểm khi chọn React code ứng dụng

Hãy xem xét component `<Stopwatch />` trong React:

```jsx
import {useState, useEffect} from "react";

function Stopwatch() {
    const [counter, setCounter] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        if (running) {
            let timerId = setTimeout(() => {
                setCounter(prevCounter => prevCounter + 1);
            }, 1000);
            return () => {
                clearTimeout(timerId)
            }
        }
    });
    
    function handleStopClick() {
      setCounter(0);
      setRunning(false);
    }
    
    return <>
        <h2>{counter}</h2>
        <button onClick={() => setRunning(prevRunning => !prevRunning)}>Start / Pause</button>
        <button onClick={handleStopClick}>Stop</button>
    </>
}
```

**Code JavaScript thuần túy**

```js
let counter = 0;
let running = false;

function tick() {
  counter += 1;
  document.querySelector("#counter").textContent = counter;
}

let intervalId = setInterval(tick, 1_000);

document.querySelector("#start-pause").addEventListener("click", () => {
  running = !running;
  if (running) {
    intervalId = setInterval(tick, 1_000);
  } else {
    clearInterval(intervalId);
  }
});

document.querySelector("#stop").addEventListener("click", () => {
  clearInterval(intervalId);
  counter = 0;
  running = false;
});
```

Mặc dù cả hai đều hoạt động nhưng phiên bản React ngắn gọn hơn một chút và dễ đọc hơn.

Nếu bạn thấy code còn khó hiểu, điều đó là do bạn vừa học về những khái niệm này. Tuy nhiên, sau khi bạn đã làm quen dần, bạn sẽ thấy dễ hiểu hơn.

Lưu ý rằng số dòng code không quan trọng, mục tiêu của chúng ta không phải là giải quyết bài tập bằng ít dòng code nhất mà là viết code có thể tái sử dụng và dễ bảo trì.

Và React đã thực hiện công việc này rất tốt. Một lưu ý nhỏ là React không phải là công cụ duy nhất có thể làm được điều đó.

:::tip Tóm lại

- Bạn có thể tạo một state kiểu boolean để quyết định khi nào chạy một hiệu ứng.
- Bạn KHÔNG nên đóng gói `useEffect` bằng điều kiện `if` mà hãy đặt điều kiện `if` bên trong `useEffect`. Điều này được áp dụng theo quy tắc sử dụng `hook`.

:::

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### 1. Cách triển khai chức năng Start/Pause?

Một biến state kiểu boolean được giới thiệu

Ví dụ: `const [running, setRunning] = useState(false)`. 

Chúng ta sử dụng giá trị của biến running này để quyết định xem code bên trong useEffect có chạy hay không

### 2. Việc gọi setCounter() (sau khi 1 giây trôi qua) ảnh hưởng đến component và useEffect như thế nào

Việc gọi `setCounter()` làm cho giá trị của bộ đếm thay đổi, điều này dẫn đến việc hiển thị lại component (re-render). Sau khi component hiển thị lại, useEffect cũng chạy lại, và quá trình này cứ tiếp tục (tạo một bộ hẹn giờ mới)

### 3. Hàm handleButtonClick() dùng để bật/tắt đồng hồ được triển khai như thế nào

Hàm này sử dụng toán tử Logic Not (!) để đảo ngược giá trị của biến boolean running. 

Việc này được thực hiện thông qua `setRunning(prevValue => !prevValue)`

### 4. Ưu điểm của phiên bản React so với code JavaScript thuần túy 

Mặc dù cả hai phiên bản (React và JavaScript thuần túy) đều hoạt động, phiên bản React được mô tả là ngắn gọn hơn một chút và dễ đọc hơn. React làm tốt công việc giúp chúng ta viết code có thể tái sử dụng và dễ bảo trì.

