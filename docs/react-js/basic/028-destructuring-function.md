---
sidebar_position: 28
---

# Destructuring Function

Bạn có thể destructure từ hàm, miễn là hàm đó trả về một mảng phần tử.

![Create-HTML-1](images/state.png)

<ToggleTOC />

## I. Trả về một mảng từ hàm

Bạn có thể nhận thấy rằng việc trả về một mảng từ hàm cũng cho phép trả về nhiều biến (có thể có cùng hoặc khác kiểu dữ liệu).

Giả sử bạn có hàm getUser sau:

```jsx
function sayHello() {
    return "Welcome!";
}

function getUser() {
    //return the id and a function that welcomes the user
    return [15, sayHello];
}
```

**Hàm trả về cái gì?**

- `getUser()` nên trả về một mảng.
- Mảng này chứa hai phần tử.
- Phần tử đầu tiên là `number`.
- Phần tử thứ hai là `function`.

`sayHello` là một tham chiếu của hàm 

Nhưng câu hỏi là: Chúng ta có thể sử dụng destructuring sau khi gọi getUser() không?

```jsx
const result = getUser();

const id = result[0];
const sayHello = result[1];
```

## II. Chúng ta có thể destructure getUser()

Hoàn toàn có thể! Cú pháp về cơ bản là giống nhau, nhưng chúng ta đã chia nhỏ ra vì cú pháp thể gây nhầm lẫn ban đầu.

Hãy thực hiện từng bước:

```jsx
const result = getUser();
const [id, sayHello] = result;
```

Đây là cách chúng ta destructure biến `result`, nhưng chúng ta có thể nâng cấp thêm và `destructure getUser()` trực tiếp mà không cần tạo ra biến trung gian `(result)`:

```jsx
const [id, sayHello] = getUser();
```

Vì vậy, ở đây chúng ta đang destructure `id` và `sayHello`, tương ứng với chỉ số 0 và 1, của dữ liệu được trả về từ `getUser()`.

## III. Làm thế nào để gọi hàm

Vì `sayHello` là một hàm, bạn có thể gọi nó bằng cách thêm `()`. Sau đây là ví dụ đầy đủ:

```jsx
function sayHello() {
    return "Welcome!";
}

function getUser() {
    //return the id and a function that welcomes the user
    return [15, sayHello];
}

const [id, sayHelloFunction] = getUser();
console.log(id); //15
console.log(sayHelloFunction()); //Welcome!
```

:::tip Tóm lại
 
- Bạn có thể destructure từ hàm, miễn là hàm đó trả về một mảng phần tử.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Destructuring với Function là gì??

Trong JavaScript (và React), destructuring với function là kỹ thuật giúp bạn trích xuất giá trị từ object hoặc array được truyền vào hàm một cách gọn gàng và dễ đọc. Thay vì truy cập từng thuộc tính qua obj.key, bạn có thể “giải nén” trực tiếp trong phần khai báo tham số của hàm.

### Câu 2: Lợi ích của destructuring trong function?

Ngắn gọn hơn: Không cần viết props.name, props.age...

Dễ đọc: Nhìn vào khai báo hàm là biết ngay cần những gì.

Tối ưu cho React: Khi nhận props, destructuring giúp code JSX sạch hơn.
