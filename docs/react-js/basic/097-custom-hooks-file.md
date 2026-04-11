---
sidebar_position: 97
---

# Di chuyển hooks vào file riêng

Mục tiêu của hook tùy chỉnh là tái sử dụng hook trong nhiều component. Việc đặt chúng vào một file riêng cũng giúp mã nguồn dễ đọc và dễ quản lý hơn. 

![Create-HTML-1](images/custom-hooks.png) 

<ToggleTOC />


## I. Xây dựng file custom hook 

Để làm cho mã nguồn gọn gàng và dễ đọc hơn, hãy đặt tên file chứa hook tùy chỉnh là: [useSomething].js, hãy thay thế [useSomething] bằng tên hook của bạn.

Ví dụ, hãy xem xét hook tùy chỉnh sau:

```jsx
import {useEffect} from "react";

function useHelloWorld() {
    useEffect(() => {
        console.log("Hello World!");
    });
}
```

Ở đây ta nên đặt tên là `useHelloWorld.js`.

Khi ta đặt hàm vào một file riêng, ta cần xuất nó ra để có thể sử dụng trong các file khác.

Giống như khi làm việc với nhiều component, bạn cần `export default` hàm hook. Vì vậy, hook tùy chỉnh trở thành:

```jsx
// useHelloWorld.js
import {useEffect} from "react";

export default function useHelloWorld() {
    useEffect(() => {
        console.log("Hello World!");
    });
}
```

## II. Có hai điều cần lưu ý

1. Đầu tiên chúng ta thêm `useEffect` vào file này vì chúng ta sẽ sử dụng nó trong hook tùy chỉnh.
2. Sau đó ta `export default` hàm hook tùy chỉnh để có thể thêm nó vào các file khác.

Bây giờ, quay trở lại component `App`, chúng ta có thể thêm nó vào như sau:

```jsx
import useHelloWorld from "./useHelloWorld.js";

function App() {
    useHelloWorld();

    return <h1>My App</h1>;
}
```

Code ngắn gọn hơn vì chúng ta có hook nằm trong file riêng của nó và chúng ta có thể thêm và sử dụng nó trong bất kỳ component nào khác.

Bạn cũng có thể đặt tên file là useHelloWorld.hook.js để chỉ rõ rằng đây là một hook tùy chỉnh. Điều này phụ thuộc vào bạn.

:::tip[Tóm lại]

- Hãy đặt tên cho hook là `[useSomething].js`, thay thế `[useSomething]` bằng tên hook của bạn.
- Nhớ thêm `useEffect` (hoặc các hook React khác) mà bạn định sử dụng vào file định nghĩa hook tùy chỉnh.
- Bạn cần `export default` hook tùy chỉnh để có thể thêm nó vào các file khác.

:::

<iframe width="560" height="315" src="https://www.youtube.com/embed/5L3TLGrXeAM?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Vì sao nên di chuyển hook tùy chỉnh vào file riêng?

Để tái sử dụng hook trong nhiều component, giúp mã nguồn gọn gàng, dễ đọc và dễ quản lý hơn.

### Câu 2. Quy tắc đặt tên file cho hook tùy chỉnh là gì?

Đặt tên file theo dạng [useSomething].js, trong đó [useSomething] là tên hook. Ví dụ: useHelloWorld.js.

### Câu 3. Khi tạo hook trong file riêng, cần làm gì để sử dụng được ở nơi khác?

Phải export default hàm hook để có thể import vào các component khác.

### Câu 4. Tại sao cần import useEffect trong file hook?

Vì hook tùy chỉnh sử dụng useEffect, nên cần import nó để hook hoạt động đúng.

### Câu 5. Có thể đặt tên file hook theo dạng khác không?

Có thể đặt tên là useHelloWorld.hook.js để rõ ràng hơn rằng đây là một hook tùy chỉnh. Tùy thuộc vào phong cách của bạn.

### Câu 6. Lợi ích chính khi tách hook ra file riêng là gì?

Tái sử dụng dễ dàng trong nhiều component.

Mã nguồn ngắn gọn, dễ đọc.

Quản lý và bảo trì thuận tiện hơn.
