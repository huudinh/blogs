---
sidebar_position: 96
---

# Custom Hooks useEffect

Trong bài học trước, chúng ta đã tìm hiểu về cách tạo custom hook. Bây giờ, chúng ta sẽ tìm hiểu về cách sử dụng custom hook với `useEffect`.

![Create-HTML-1](images/custom-hooks.png) 

<ToggleTOC />


## I. Xây dựng hook tùy chỉnh bằng `useEffect`

```jsx
import {useEffect} from "react";

function useHelloWorld() {
    useEffect(() => {
        console.log("Hello World!");
    });
}
```

Chúng ta sử dụng hook tùy chỉnh này theo cách tương tự như đã làm trong bài học trước.

Đoạn code này sẽ in `Hello World!` ra console sau mỗi lần component hiển thị lại (vì `console.log` được đóng gói trong `useEffect`).

Bạn cũng có thể chỉ cho hook chạy một lần duy nhất khi component được hiển thị lần đầu tiên; để làm điều đó, bạn phải chỉ định phụ thuộc của `useEffect` là một mảng rỗng:

```jsx
import {useEffect} from "react";

function useHelloWorld() {
    useEffect(() => {
        console.log("Hello World!");
    }, []);
}
```

## II. Khi nào nên áp dụng trường hợp trên?

Việc sử dụng hook tùy chỉnh với phụ thuộc là một mảng rỗng có thể hữu ích trong một số tình huống, chẳng hạn như gửi một sự kiện phân tích (ví dụ: sử dụng Google Analytics).

Giả sử bạn đã cài đặt Google Analytics trong dự án, bạn có thể tạo hook tùy chỉnh để gửi một sự kiện khi component hiển thị, ví dụ:

```jsx
import {useEffect} from "react";

function useAnalyticsEvent() {
    useEffect(() => {
        gtag("event", "component_rendered");
    }, []);
}
```

Hàm `gtag` được cung cấp bởi thư viện Google Analytics (giả định rằng bạn đã thêm thư viện vào dự án). Ví dụ này cho thấy rằng bạn có thể gửi sự kiện phân tích chỉ một lần duy nhất sau khi component được hiển thị lần đầu tiên. Điều này bởi vì ta đang sử dụng `useEffect(..., [])`.

Bạn có thể làm rất nhiều việc khác nhau khi sử dụng hook tùy chỉnh, chẳng hạn như nhận tham số, trả về các phần tử, gọi `useState`, v.v.


:::tip[Tóm lại]

- Hook tùy chỉnh có thể gọi `useEffect` miễn là `useEffect` đã được thêm vào file JavaScript.
- Mọi thứ bạn đã học về useEffect vẫn áp dụng cho hook tùy chỉnh (ví dụ: mảng phụ thuộc).

:::

<iframe width="560" height="315" src="https://www.youtube.com/embed/IlSHzEeXkZI?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Custom Hook với useEffect là gì?

Đó là một hook tùy chỉnh trong React, bên trong có sử dụng useEffect để thực hiện một hành động nào đó khi component được render hoặc cập nhật.

### Câu 2. Làm thế nào để hook chỉ chạy một lần duy nhất khi component được render lần đầu?

Để hook chỉ chạy một lần duy nhất khi component được render lần đầu, bạn cần chỉ định phụ thuộc của `useEffect` là một mảng rỗng: `useEffect(..., [])`.

### Câu 3. Khi nào nên áp dụng useEffect với dependency là mảng rỗng?

Việc sử dụng `useEffect` với dependency là một mảng rỗng có thể hữu ích trong một số tình huống, chẳng hạn như gửi một sự kiện phân tích (ví dụ: sử dụng Google Analytics).

### Câu 4. Custom Hook có thể làm được những gì ngoài useEffect?

Custom Hook có thể nhận tham số, trả về các phần tử, gọi `useState`, v.v.
