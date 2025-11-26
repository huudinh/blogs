---
sidebar_position: 34
---

# Closures

Closure là một khái niệm trong JavaScript nghe có vẻ phức tạp, nhưng trên thực tế thì nó khá đơn giản. 

![Create-HTML-1](images/state.png)

<ToggleTOC />

### I. Closures là gì

Closure là khi hàm bên trong có quyền truy cập vào các biến của hàm bên ngoài. Hãy xem ví dụ dưới đây:

```jsx
function getUser() {
    const name = "Sam";

    function getWelcomeMessage() {
        return `Hello ${name}`;
    }

    return {
        name: name,
        message: getWelcomeMessage()
    }
}
```

Chúng ta có một closure ở đây vì chúng ta có hàm `getWelcomeMessage` bên trong hàm `getUser`.

Giải thích đoạn code:

- Hàm `getUser` định nghĩa biến `name` có giá trị là `"Sam"`.

- Bên trong hàm đó, chúng ta định nghĩa hàm `getWelcomeMessage` trả về `Hello ${name}`.

- Sau đó, chúng ta `return` một đối tượng chứa `name` và `message`, trong đó `message` là kết quả trả về bởi `getWelcomeMessage()`.

Như bạn thấy, biến name có thể được truy cập bởi hàm `getWelcomeMessage` vì `getWelcomeMessage` được định nghĩa bên trong `getUser`.

Vì vậy, vì `name` được định nghĩa trong `getUser`, nó có thể được truy cập bởi bất kỳ hàm nào được định nghĩa bên trong `getUser`, trong ví dụ này là `getWelcomeMessage`.

Vì `getWelcomeMessage` được định nghĩa trong `getUser`, bạn có thể sử dụng biến `name`.

Và đó chính là khái niệm `closure`!

Lưu ý rằng `closure` có thể áp dụng cho bất kỳ hàm nào, không nhất thiết phải là một hàm được nghĩa bên trong hàm khác, ví dụ:

```jsx
const name = "Sam";

function getUser() {
    return name; // this works because the function has access to the outer scope.
}
```

Tuy nhiên đoạn code trên không nên được sử dụng trong các dự án thực tế trong react.

## II. Closure áp dụng cho Arrow Function

Closure cũng có thể áp dụng cho Arrow Function, vì vậy nếu bạn viết lại code:

```jsx
const getUser = () => {
    const name = "Sam";

    const getWelcomeMessage = () => {
        return `Hello ${name}`;
    }

    return {
        name: name,
        message: getWelcomeMessage()
    }
}
```

Và chúng ta sẽ nhận được kết quả tương tự.

## III. Tại sao cần sử dụng closures

Nhìn chung, closures được sử dụng khi chúng ta muốn định nghĩa một hàm mới trong khi vẫn có quyền truy cập vào các biến được định nghĩa trong hàm bên ngoài.

Nghe có vẻ như closures là một "tính năng" mà bạn quyết định sử dụng, nhưng thực tế, closures được tạo ra tự động khi bạn định nghĩa một hàm.

## IV. Sử dụng tên biến duy nhất

Câu hỏi đặt ra là: Điều gì sẽ xảy ra nếu có một biến đã tồn tại với cùng tên trong ngữ cảnh hiện tại của hàm?

Câu trả lời là JavaScript sẽ bắt đầu tìm kiếm trong phạm vi hiện tại trước khi đi ra bên ngoài hàm. Nó tiếp tục tìm kiếm cho đến khi đạt đến phạm vi toàn cục, tức là đối tượng window.

Nói chung, bạn nên sử dụng tên biến duy nhất để tránh vấn đề này. Dưới đây là một ví dụ sử dụng cùng một tên biến:

```jsx
let test = 1;

function doSomething() {
    return test;
}

doSomething(); // 1
```

Bây giờ, hãy định nghĩa biến test có giá trị là 2 bên trong hàm:

```jsx
let test = 1;

function doSomething() {
    let test = 2;
    return test;
}

doSomething(); // 2
```

## V. Ví dụ thực tế

Chúng ta cần tìm hiểu về closures vì khi làm việc với event và state, chúng ta cần có các trình xử lý sự kiện có thể truy cập vào trạng thái.

Trong ReactJS, Closures là một khái niệm quan trọng đến từ JavaScript. Closures cho phép một hàm truy cập vào các biến từ scope bên ngoài của nó, ngay cả sau khi hàm bên ngoài đã thực thi xong. Đây là một ví dụ về cách sử dụng closures trong một function component của React:

```jsx
import React, { useState, useEffect } from 'react';

const TimerComponent = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      // Closure ở đây cho phép truy cập biến `time` từ scope bên ngoài
      setTime(prevTime => prevTime + 1);
    }, 1000);

    // Cleanup function
    return () => clearInterval(timerId);
  }, []); // Mảng rỗng đảm bảo useEffect chỉ chạy một lần

  return <div>Thời gian: {time} giây</div>;
};

export default TimerComponent;
```

Trong ví dụ trên, hàm setInterval tạo ra một closure bằng cách truy cập vào hàm setTime từ scope bên ngoài của nó. 

Mặc dù useEffect chỉ chạy một lần, nhưng nhờ vào closure, mỗi lần callback của setInterval được gọi, nó vẫn có thể truy cập và cập nhật state time1.

:::tip Tóm lại
 
- Closures là khi một hàm bên trong có quyền truy cập vào các biến của hàm bên ngoài.
- Hàm trong JavaScript có quyền truy cập vào ngữ cảnh bên ngoài của chúng. Đây được gọi là Closures.
- Closures là điều bạn nhận được khi định nghĩa một hàm; không phải là điều mà bạn phải "kích hoạt" hoặc quyết định sử dụng.
- Các hàm được định nghĩa bên trong một hàm khác có thể sử dụng các biến được định nghĩa trong hàm bên ngoài.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Tính chất của Closures là hiển nhiên khi ta khai báo các hàm, vậy tại sao lại cần định nghĩa nó để tạo thành tên gọi Closures đặc biệt trong react?

Closure là một tính chất “hiển nhiên” trong JavaScript: bất kỳ hàm nào được khai báo bên trong một phạm vi đều có thể truy cập các biến từ phạm vi đó, ngay cả khi hàm đã được gọi ở nơi khác. Nhưng trong React, việc định nghĩa rõ ràng và gọi tên “closure” lại mang một ý nghĩa đặc biệt — không phải vì nó mới, mà vì nó ảnh hưởng trực tiếp đến cách component hoạt động và render.

### Câu 2: Vì sao cần gọi tên “closure” trong React?

Closures ảnh hưởng đến giá trị của State và Props

Khi bạn dùng closure trong các hàm bất đồng bộ (như setTimeout, fetch, onClick), nó có thể giữ lại giá trị cũ của state hoặc props — gây ra hành vi không mong muốn.

Các custom hook như useCounter, useToggle, useForm... đều dựa vào closure để giữ trạng thái nội bộ và expose các hàm xử lý.

Khi dùng useCallback hoặc useMemo, bạn đang kiểm soát việc tạo lại closures — để tránh việc tạo hàm mới không cần thiết, giúp component không re-render thừa.