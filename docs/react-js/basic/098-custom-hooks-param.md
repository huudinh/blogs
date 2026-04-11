---
sidebar_position: 98
---

# Custom hooks với tham số

Vì hook tùy chỉnh là hàm nên chúng có thể nhận `parameter`. Bạn có thể cung cấp một hoặc nhiều tham số, thuộc bất kỳ kiểu dữ liệu nào, giống như các hàm thông thường.

![Create-HTML-1](images/custom-hooks.png) 

<ToggleTOC />

## I. Truyền tham số

Chúng ta sẽ bắt đầu với một ví dụ cơ bản chỉ cung cấp một tham số có kiểu string.

Hãy xem ví dụ sau:

```jsx
function useWelcomeGreeting(name) {
    useEffect(() => {
        console.log(`Welcome ${name} to my app`);
    }, []);
}
```

Hook này nhận tham số `name`, cho phép bạn chỉ định tên của người dùng khi gọi `hook` (khi gọi hàm `useWelcomeGreeting`). Sau đây là cách sử dụng hàm:

```jsx
// assuming you imported that function (and it was exported)

function App() {
    useWelcomeGreeting("Sam");
}
```

Khi component App hiển thị lần đầu, chương trình sẽ in ra `"Welcome Sam to my app"`. 


## II. Quy tắc số 1: Chỉ gọi Hook từ các hàm React

Trước đây, chúng ta đã đơn giản hóa quy tắc đó và nói rằng bạn chỉ nên gọi hook bên trong component. Ngoài ra, bạn cũng có thể gọi Hook từ hook tùy chỉnh của riêng bạn

Ví dụ, bạn có thể gọi useEffect trong hook tùy chỉnh của riêng bạn.

Vì vậy, quy tắc số 1 là: Chỉ gọi Hook từ các hàm React, ví dụ như component hoặc hook tùy chỉnh. Bạn không nên gọi hook React trong bất kỳ hàm hoặc nơi nào khác.

## III. Quy tắc số 2: Chỉ gọi Hook ở cấp độ trên cùng

Hãy đảm bảo bạn không gọi nó bên trong vòng lặp, điều kiện hoặc các hàm lồng nhau vì thứ tự của các hook phải được giữ nguyên giữa các lần hiển thị lại.

## IV. Ví dụ: useDocumentTitle

```jsx
// useDocumentTitle.js
import { useEffect } from "react";

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

```

Khi component App hiển thị, nó sẽ thay đổi `document.title` thành Welcome to the online store.

```jsx
import { useState } from "react";
import useDocumentTitle from "./useDocumentTitle";

function App() {
  const [count, setCount] = useState(0);
  useDocumentTitle(`${count} products in your shopping list`);

  function handleButtonClick() {
    setCount(prevCount => prevCount + 1);
  }

  return <button onClick={handleButtonClick}>Add item</button>;
}

export default App;

```

Nếu bạn để ý cách viết hook tùy chỉnh `useDocumentTitle` thì mỗi khi bạn nhấp vào nút, chương trình sẽ hiển thị tiêu đề được cập nhật (với số đếm mới).


:::tip[Tóm lại]

- Vì hook tùy chỉnh là hàm nên chúng có thể nhận tham số. Bạn có thể cung cấp một hoặc nhiều tham số, thuộc bất kỳ kiểu dữ liệu nào, giống như các hàm thông thường.

- Các quy tắc làm việc với hook vẫn áp dụng cho hook tùy chỉnh.
    - Quy tắc số 1: Chỉ gọi Hook từ các hàm React (component hoặc hook tùy chỉnh).
    - Quy tắc số 2: Chỉ gọi Hook ở cấp độ trên cùng

:::

<iframe width="560" height="315" src="https://www.youtube.com/embed/dHpfTejZQ2Y?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

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
