---
sidebar_position: 47
---

# Mảng bất biến

Khi làm việc với Mảng và Đối tượng, chúng ta cần chú trọng vào tính bất biến. Chúng ta sẽ tìm hiểu cách thêm, cập nhật và xóa các phần tử khỏi mảng theo cách bất biến (tức là không làm thay đổi mảng ban đầu).

![Create-HTML-1](images/components.jpg)

<ToggleTOC />



## I. Ôn lại cú pháp Spread

Trước khi bắt đầu, chúng ta cần ôn lại cú pháp spread, một tính năng của ES2015 (hoặc ES6).

```js
const numbers = [1, 2, 3];
const grades = [...numbers];
console.log(grades); // [1, 2, 3] (shallow copy)
```

`...numbers` sẽ sao chép các số. Điều này có nghĩa là nó sẽ loại bỏ các giá trị khỏi mảng, kết quả trả về `1, 2, 3`.

Vì vậy, `[...numbers]` tạo ra một bản sao mới của mảng với các giá trị tương tự vì nó tương đương với `[1, 2, 3]`.

Chúng ta gọi đây là bản sao nông vì nó là bản sao của các phần tử bên trong mảng.

## II. Nối mảng

Bạn có thể sử dụng cú pháp `spread` để nối mảng

```js
const winners = ["Jane", "Bob"];
const losers = ["Ronald", "Kevin"];

const players = [...winners, ...losers];
console.log(players); // ['Jane', 'Bob', 'Ronald', 'Kevin']
```

Mỗi cú pháp spread sao chép các phần tử vào mảng mới.

## III. Thêm phần tử vào mảng (bất biến)

Vậy làm thế nào để thêm một phần tử vào mảng mà vẫn duy trì tính bất biến?

Chúng ta không thể sử dụng `.push()` vì `push` sẽ thay đổi mảng.

Thay vào đó, chúng ta phải tạo một bản sao nông và chèn phần tử mới vào mảng mới:

```jsx
const numbers = [1, 2, 3];
const result = [...numbers, 4];
console.log(result); //[1, 2 ,3 ,4]
```

Chúng ta sao chép các giá trị của mảng numbers và sau đó thêm `4`. Mảng mới sẽ chứa `1, 2, 3, 4`.

Đây là thao tác bất biến vì chúng ta KHÔNG thay đổi mảng `numbers` mà tạo ra một bản sao mới và thêm giá trị vào.

:::tip Tóm lại
 
- Toán tử spread được dùng cho mảng để tạo một shallow copy.
- `[...existingArray, "newValue"]` thêm `newValue` vào mảng theo cách bất biến vì nó tạo ra một bản sao của mảng.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Mảng bất biến là gì?

Mảng bất biến (immutable array) là một mảng không bị thay đổi trực tiếp sau khi được tạo ra. Thay vì sửa đổi nội dung của mảng gốc, bạn tạo ra một bản sao mới với những thay đổi mong muốn.

### Câu 2: Lợi ích của mảng bất biến?

Dễ kiểm soát: Tránh lỗi do thay đổi dữ liệu ở nhiều nơi.

Tối ưu hiệu năng trong React: React dễ phát hiện thay đổi khi mảng mới được tạo.

Phù hợp với lập trình hàm: Giúp code rõ ràng, không có side effects.

Hỗ trợ undo/redo: Dễ lưu trữ lịch sử thay đổi.