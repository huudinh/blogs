---
sidebar_position: 27
---

# Destructuring Array

Bạn có thể destructure từ hàm, miễn là hàm đó trả về một mảng phần tử.

![Create-HTML-1](images/state.png)

<ToggleTOC />

## I. Array destructuring cơ bản

Hãy bắt đầu với ví dụ cơ bản nhất về array destructuring.

Array destructuring cho phép bạn sử dụng cú pháp ngắn gọn hơn khi đọc nhiều phần tử của một mảng. Ví dụ, thay vì viết:

```js
const dimensions = [20, 5]

const width = dimensions[0]; //20
const height = dimensions[1]; //5
```

Bạn có thể tạo hai biến width và height bằng một cú pháp ngắn hơn gọi là array destructuring:

```js
const dimensions = [20, 5]

const [width, height] = dimensions;
```

Cách thức hoạt động như sau: `width` được gán cho `dimensions[0]` (vì nó là phần tử đầu tiên trong cú pháp destructuring) và height được gán cho `dimensions[1]` (vì nó là phần tử thứ hai trong cú pháp `destructuring`).

Thứ tự của các biến bên trong cú pháp `[]` tương ứng với chỉ số của mảng được destructure.

Một ví dụ khác về array destructuring:

```js
const point = [3.3124, 14.52028, 10]; //coordinates

const [lat, lng, elevation] = point

console.log(lat); //3.3124
console.log(lng); //14.52028
console.log(elevation); //10
```

Cú pháp này còn được gọi là sugar syntax (cú pháp rút gọn) giúp code dễ đọc hơn (khi bạn làm quen dần, code sẽ trở nên dễ đọc hơn).

## II. Array chứa các kiểu dữ liệu khác nhau

Array destructuring vẫn hoạt động ngay cả khi mảng chứa các kiểu dữ liệu khác nhau, ví dụ như số nguyên, chuỗi, đối tượng, hàm, v.v.. 
```js
//data contains the name, followed by the age, followed by the details object
const data = ["Sam", 23, {
    id: 1,
    created_at: "Jan 19"
}];
```

Bạn có thể destructure mảng data thành ba biến sử dụng cú pháp destructuring thông thường:

```js
const [name, age, details] = data;
```

và bạn sẽ nhận được:

- `name` là `"Sam"`

- `age` là `23`

- `details` là `{id: 1, created_at: "Jan 19"}`

Cú pháp destructuring sẽ luôn hoạt động dù cho nội dung của mảng là gì.

Cú pháp cũng hoạt động với mảng chứa hàm hoặc giá trị `boolean`.

:::tip Tóm lại
 
- Array destructuring là một cú pháp ngắn gọn được dùng để tạo các biến từ các phần tử của một mảng.
- Array destructuring luôn hoạt động bất kể mảng chứa kiểu dữ liệu gì.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Array Destructuring là gì?

Array Destructuring là một cú pháp trong JavaScript cho phép bạn trích xuất giá trị từ mảng và gán chúng vào các biến một cách ngắn gọn, thay vì truy cập từng phần tử bằng chỉ số.

### Câu 2: Khi nào nên dùng Array Destructuring?

Khi bạn muốn lấy nhanh các phần tử từ mảng

Khi xử lý dữ liệu trả về từ API (ví dụ: [data, error])

Khi viết hàm nhận mảng làm tham số