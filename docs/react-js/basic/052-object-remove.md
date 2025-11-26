---
sidebar_position: 52
---

# Loại bỏ key-value khỏi Object

Để xóa cặp `key/value` khỏi đối tượng mà không làm thay đổi đối tượng gốc, chúng ta cũng cần sử dụng toán tử `spread` nhưng với một cách tiếp cận khác.

![Create-HTML-1](images/components.jpg)

<ToggleTOC />

## I. Phương thức làm thay đổi đối tượng

```jsx
const obj = {
    id: 1,
    title: "Harry potter",
    year: 2017,
    rating: 4.5
}

// BAD: mutates
delete obj.year;
console.log(obj); // { id: 1, title: "Harry potter", rating: 4.5}
```

## II. Xóa mà không thay đổi đối tượng

Để xóa `year` mà không làm thay đổi đối tượng, chúng ta sẽ phải sử dụng 2 tính năng của JavaScript: `destructuring` đối tượng và toán tử `spread`:

```jsx
const obj = {
    id: 1,
    title: "Harry potter",
    year: 2017,
    rating: 4.5
}

// GOOD: immutable
const {year, ...rest} = obj;
console.log(rest); // { id: 1, title: "Harry potter", rating: 4.5}
```

Đoạn code này hoạt động vì `const {year, ...rest} = obj` destructure giá trị của khóa `year` từ `obj`.

Điều này tương tự như việc đọc `obj.year`.

Tuy nhiên, chúng ta cũng yêu cầu JavaScript destructure phần còn lại của đối tượng với `...rest`; tương đương với việc kết hợp tất cả các `key/value` khác trong một đối tượng mới tên là `rest`.

Vì vậy, chúng ta có `rest` là một bản sao bất biến của `obj` nhưng không có khóa `year`!


## III. Ví dụ

```jsx
const data = {
    id: 1,
    grades: [10, 14, 8],
    count: 3,
    course: "react"
}

// Immutably remove: grades & course
const {grades, course, ...newData} = data;
console.log(newData); //{id: 1, count: 3}
```

Chúng ta bắt đầu bằng cách destructure `grades` và `course` và sau đó đặt tất cả các phần tử còn lại vào một đối tượng mới có tên là `newData`!

:::tip Tóm lại
 
- `const {keyToRemove, ...rest} = obj` là một cú pháp đơn giản cho phép xóa `keyToRemove` khỏi đối tượng mà không làm thay đổi đối tượng gốc.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Sự khác biệt giữa Destructuring, Spread, Rest?

Ba khái niệm Destructuring, Spread, và Rest trong JavaScript đều liên quan đến việc xử lý dữ liệu từ array và object, nhưng mỗi cái có mục đích riêng biệt.

Destructuring trích xuất dữ liệu từ array/object dùng để gán biến

Spread trải dữ liệu ra (sao chép/kết hợp) tạo array/object mới

Rest gom dữ liệu còn lại vào một biến sử dụng trong destructuring/hàm		

### Câu 2: Tại sao trong react chúng ta thường xóa làm sao để không làm thay đổi đối tượng?

Trong React, chúng ta thường xóa phần tử hoặc thuộc tính mà không làm thay đổi trực tiếp đối tượng gốc vì React dựa vào tính bất biến (immutability) để phát hiện và cập nhật giao diện một cách hiệu quả.

Dùng spread (...) để sao chép object hoặc array

Dùng filter, map, reduce để tạo mảng mới

Tránh dùng delete, splice, hoặc sửa trực tiếp

### Câu 3: Vì sao không nên thay đổi trực tiếp đối tượng?

React không phát hiện thay đổi nếu bạn sửa trực tiếp. Ví dụ: nếu bạn dùng obj.name = 'new', React không biết obj đã thay đổi → không re-render.

Tính bất biến giúp dễ debug và predict. Khi bạn luôn tạo bản sao mới, bạn tránh được các lỗi khó lường do tham chiếu.

Virtual DOM hoạt động tốt hơn. React so sánh object cũ và mới để quyết định có cần cập nhật giao diện hay không. Nếu bạn thay đổi trực tiếp, React không thể so sánh đúng.