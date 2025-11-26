---
sidebar_position: 12
---

# Biểu thức trong JSX

Biểu thức là bất kỳ đoạn code JavaScript hợp lệ nào có thể được tính toán thành một giá trị.

![Create-HTML-1](images/jsx.jpg) 

<ToggleTOC />

## I. Biểu thức là gì?

Đó là bất kỳ code JavaScript nào mà khi thực thi sẽ trả về một giá trị cuối cùng, ví dụ:

- `3 + 4`

- `"Sam"`

- `new Date()`

- `2 * 4`

- `name` (giả định rằng biến `name` đã được khai báo).

- v.v.

Mỗi biểu thức trả về một giá trị, ví dụ:

- `3 + 4` trả về giá trị 7.

- `"Sam"` trả về chuỗi "Sam".

- `new Date()` trả về một đối tượng ngày.

- `2 * 4` trả về giá trị 8.

- `name` trả về giá trị của biến name, thường là một chuỗi.

Bạn có thể sử dụng các biểu thức trên trong JSX bằng cách đóng gói trong dấu ngoặc nhọn {}.

## II. Ví dụ cơ bản

```jsx
const title = <h1>You have {2 + 3} notifications</h1>;
```

Câu lệnh này sẽ tạo một phần tử `h1` chứa văn bản: `You have 5 notifications`.

Hãy xem cách biểu thức `(2 + 3)` được thực thi và trả về `5`, sau đó được thay thế vào văn bản cuối cùng để trả về `You have 5 notifications`.

Để có thể hoạt động, biểu thức phải nằm trong dấu ngoặc nhọn.

## III. Biến

Việc sử dụng biến trong biểu thức thường có nhiều ứng dụng hữu ích, ví dụ: hiển thị tên người dùng trong thanh điều hướng

```jsx
const user = {
    id: 1,
    name: "Sam"
};

const element = <p className="user-info">Welcome {user.name}!</p>
```

Đoạn code này sẽ tạo một phần tử p chứa văn bản: Welcome Sam!.

## IV. Gọi hàm

Bạn cũng có thể gọi hàm trong biểu thức, ví dụ:

```jsx
function capitalise(word) {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
}
const name = "brendan";

const element = <p className="user-info">Welcome {capitalise(name)}</p>
```

Đoạn code trên sẽ tạo một đoạn văn bản chứa nội dung: Welcome Brendan (lưu ý chữ B viết hoa).

:::tip Tóm lại
 
- Biểu thức là bất kỳ đoạn code JavaScript hợp lệ nào có thể được tính toán thành một giá trị.
- Biểu thức trong JSX cần được đóng gói trong dấu ngoặc nhọn: `{expression}`
- `<h1 className="title">You have {2 + 3} notifications</h1>` là một ví dụ về JSX với một biểu thức.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Biểu thức trong JavaScript là gì?

Biểu thức là bất kỳ đoạn mã JavaScript nào khi thực thi sẽ trả về một giá trị. Ví dụ: 3 + 4, "Sam", new Date(), user.name.

### Câu 2. Làm thế nào để sử dụng biểu thức trong JSX?

Đặt biểu thức bên trong dấu ngoặc nhọn `{}` trong JSX

### Câu 3. Có thể gọi hàm trong biểu thức JSX không?

Có. Bạn có thể gọi hàm và sử dụng kết quả trả về trong JSX

### Câu 4. Tại sao phải đặt biểu thức trong dấu ngoặc nhọn {} trong JSX?

Vì JSX cần phân biệt giữa nội dung tĩnh (chuỗi) và nội dung động (biểu thức). Dấu `{}` cho phép nhúng biểu thức JavaScript vào trong JSX.