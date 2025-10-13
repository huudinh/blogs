---
sidebar_position: 77
---

# Kết hợp Effect, State và Events

Khi sử dụng hiệu ứng, trạng thái và sự kiện cùng lúc, chúng ta có thể bị nhầm lẫn hoặc gặp khó khăn trong việc quản lý các tương tác giữa chúng.

![Create-HTML-1](images/effect.webp) 

<ToggleTOC />

## I. Vấn đề của React khi Update State

Hãy xem xét component App dưới đây:

```jsx
import {useState} from "react";

function App() {
    const [count, setCount] = useState(0);

    function handleButtonClick() {
        setCount(prevCount => prevCount + 1);
        console.log(count);
    }

    return <>
      <h1>{count}</h1>
      <button onClick={handleButtonClick}>Add 1</button>
    </>;
}
```

Component này hiển thị giá trị hiện tại của biến count, bắt đầu từ 0.

Khi bạn nhấp vào nút Add 1, React sẽ tăng giá trị của `count` lên 1 và sau đó gọi `console.log(count)`.

Tuy nhiên, khi bạn gọi `console.log(count)` sau đó, nó sẽ hiển thị giá trị cũ của count. Lý do là vì cách cập nhật trạng thái của React có tính chất không đồng bộ. Điều này có nghĩa là nhiều trạng thái có thể được gộp lại và bạn không thể dựa vào giá trị của trạng thái để được cập nhật ngay sau khi gọi `setState`.

Điều đó cũng liên quan đến thiết kế của `Hook`; bạn chỉ nhận được giá trị mới của `count` khi hàm App được gọi lại, điều này sẽ gọi `const [count, setCount] = useState(0);` và cung cấp giá trị mới của `count` đã được cập nhật.

Việc này nghe có vẻ mâu thuẫn với logic thông thường, nhưng cách thiết kế này giúp cải thiện đáng kể hiệu suất của ứng dụng.

## II. Giải quyết vấn đề vời Effect

Nếu bạn cần ghi log hoặc sử dụng giá trị được cập nhật, bạn chỉ cần sử dụng một hiệu ứng với phụ thuộc là biến trạng thái đó.

Điều đó sẽ làm cho hiệu ứng chạy mỗi khi biến trạng thái thay đổi. Vì vậy, dưới đây là cách chúng ta sửa đoạn code trên:

```jsx
import {useState, useEffect} from "react";

function App() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log(count)
    }, [count]);

    function handleButtonClick() {
        setCount(prevCount => prevCount + 1)
    }

    return <>
      <h1>{count}</h1>
      <button onClick={handleButtonClick}>Click me</button>
    </>;
}
```

Hiệu ứng: `useEffect(() => {}, [count]);` sẽ cho phép bạn chạy một đoạn code (ví dụ: `console.log(count)`) mỗi khi trạng thái count có giá trị mới!

## III. Kết hợp với if để control kết quả

Sự thay đổi trên sẽ dẫn đến việc in ra 0 trên console khi component được hiển thị lần đầu tiên. Hành vi này không xảy ra trong đoạn code trước đó.

Nếu bạn không muốn ghi log giá trị khởi tạo khi component được hiển thị lần đầu tiên, bạn có thể đóng gói console.log trong một điều kiện if:

```jsx
useEffect(() => {
    if (count > 0) {
        console.log(count);
    }
}, [count]);
```

:::tip Tóm lại

- Việc cập nhật trạng thái của React được thực hiện không đồng bộ.
- Nếu bạn cần giá trị cập nhật mới nhất của một trạng thái sau khi nó thay đổi trong một sự kiện, bạn cần di chuyển logic vào hiệu ứng.

:::

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Trong React, điều gì xảy ra khi gọi setCount(prevCount => prevCount + 1)?

React sẽ lên lịch để cập nhật giá trị count, sau đó re-render component với giá trị count mới.

### Câu 2. Tại sao khi gọi console.log(count) ngay sau setCount thì giá trị in ra lại là giá trị cũ?

Vì cập nhật state trong React là bất đồng bộ (asynchronous). Giá trị count chỉ được cập nhật sau khi React hoàn thành re-render, nên trong cùng một lần gọi hàm, bạn vẫn thấy giá trị cũ.

### Câu 3. Khi nào bạn nhận được giá trị count mới?

Khi component được re-render và thực thi lại dòng const [count, setCount] = useState(0), khi đó React sẽ cung cấp giá trị count đã được cập nhật.

### Câu 4. Tại sao React lại thiết kế việc cập nhật state theo cách bất đồng bộ?

Để tối ưu hiệu suất — React có thể gộp nhiều cập nhật state lại và thực hiện re-render một lần thay vì nhiều lần liên tiếp.

### Câu 5. Làm sao để thực hiện hành động (ví dụ log ra console) sau khi state được cập nhật?

Đặt logic đó bên trong useEffect và thêm biến state vào mảng dependencies

### Câu 6. Tại sao lại cần kiểm tra điều kiện trong useEffect?

Vì useEffect sẽ luôn chạy ít nhất một lần sau khi component render lần đầu. Dùng if giúp bạn giới hạn chỉ chạy code khi thỏa mãn điều kiện (ví dụ: chỉ khi count > 0).