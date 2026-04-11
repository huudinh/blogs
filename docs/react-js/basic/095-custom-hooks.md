---
sidebar_position: 95
---

# Custom Hooks

Chúng ta đã tìm hiểu về những hook được cung cấp bởi React `useState`, `useEffect`. Ngoài ra, React còn cung cấp một số hook khác. Tuy nhiên, điều thú vị là bạn có thể xây dựng các hook tùy chỉnh (custom hook) của riêng mình.

![Create-HTML-1](images/custom-hooks.png) 

<ToggleTOC />

### I. Lợi ích

Xây dựng các hook riêng cho phép bạn:

- Dễ dàng tái sử dụng code trong nhiều component, giúp việc chia sẻ chức năng chung trở nên dễ dàng hơn.
- Xây dựng các trừu tượng làm cho một số logic phức tạp dễ đọc hơn.

### II. Cách thức hoạt động

Hook tùy chỉnh là một hàm JavaScript có tên bắt đầu bằng use. Hàm này có thể gọi các hook khác (ví dụ: useEffect, useState, v.v.).

### III. Tạo hook tùy chỉnh đầu tiên

Hãy bắt đầu với một hook làm công việc đơn giản là in ra: Hello World!.

Đầu tiên, chúng ta định nghĩa hook tùy chỉnh (hãy nhớ tên bắt đầu bằng use):

```jsx
function useHelloWorld() {
    console.log("Hello World!");
}
```

và sau đó bạn có thể sử dụng nó trong bất kỳ component nào 

```jsx
function App() {
    useHelloWorld();
}
```

Mỗi khi component App được hiển thị, bạn sẽ thấy Hello World! được in ra trên console.

:::tip[Tóm lại]

- Hook tùy chỉnh là một hàm JavaScript có tên bắt đầu bằng use.
- Hook tùy chỉnh có thể gọi các hook khác (ví dụ: useEffect, useState, v.v.).

:::

<iframe width="560" height="315" src="https://www.youtube.com/embed/06dCvDgBqOw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Custom Hook trong React là gì?

Custom Hook là một hàm JavaScript có tên bắt đầu bằng use. Nó cho phép bạn tái sử dụng logic giữa các component và có thể gọi các hook khác như useState, useEffect.

### Câu 2. Lợi ích của việc sử dụng Custom Hook là gì?

Giúp dễ dàng tái sử dụng code trong nhiều component.

Cho phép chia sẻ chức năng chung một cách thuận tiện.

Tạo ra các trừu tượng giúp logic phức tạp trở nên dễ đọc và dễ quản lý hơn.

### Câu 3. Quy tắc đặt tên cho Custom Hook như thế nào?

Tên của Custom Hook phải bắt đầu bằng use. Ví dụ: useHelloWorld, useFetch, useForm, v.v.

### Câu 4. Custom Hook có thể gọi các hook khác không?

Có, Custom Hook có thể gọi các hook khác như useState, useEffect, v.v.

### Câu 5. Custom Hook có thể trả về giá trị không?

Có, Custom Hook có thể trả về giá trị như bất kỳ hàm JavaScript nào khác.