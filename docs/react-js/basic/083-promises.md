---
sidebar_position: 83
---

# Promises

Việc sử dụng promise là một yêu cầu cơ bản khi làm việc với Fetch API. Đây là một tính năng của ngôn ngữ JavaScript, do đó nó độc lập với React.
 Promise được sử dụng khi bạn cần thực thi một phần của khối lệnh trong tương lai.

![Create-HTML-1](images/fetch.webp) 

<ToggleTOC />

## I. Xử lý Promise

Kiến thức phổ biến nhất bạn cần biết về promise là cách xử lý promise.

Xử lý promise có nghĩa là thực hiện một hành động khi promise đã hoàn thành công việc của nó.

Giả sử chúng ta có hàm `functionThatReturnsPromise`, sau đây là cách bạn xử lý hàm:

```js
functionThatReturnsPromise().then(result => {
    console.log(result);
});
```

Để xử lý Promise, bạn cần gọi `.then()` trên promise và truyền một hàm callback. Hàm callback đó sẽ được gọi khi promise đã hoàn thành công việc của nó.

Đối số đầu tiên được truyền vào hàm callback đó (trong ví dụ này là result) sẽ là dữ liệu mà hàm đó đã tính toán. Đây chỉ là lý thuyết vì chúng ta đang nói về promise nói chung. Trong bài học tiếp theo, chúng ta sẽ làm việc với Fetch API và xử lý promise của nó để làm rõ vấn đề.

## II. Bắt lỗi

Promise cũng có thể gặp lỗi, trong trường hợp đó, hàm mà bạn truyền vào `.then()` sẽ KHÔNG được gọi. Bạn cần sử dụng `.catch()` để bắt lỗi. Đây là một ví dụ:

```js
functionThatReturnsPromise()
.then(result => {
    console.log(result); // when successful
})
.catch(error => {
    console.error(error); // when there's an error
})
```

:::tip Tóm lại

- Chúng ta sử dụng promise khi làm việc với Fetch API.
- Để xử lý promise, bạn cần gọi `.then(result => {})`
- Để xử lý lỗi được đưa ra bởi promise, bạn cần gọi `.catch(error => {})`
:::

<iframe width="560" height="315" src="https://www.youtube.com/embed/6mqZXEEElqY?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Promise trong JavaScript là gì?

Promise là một tính năng của JavaScript dùng để xử lý các thao tác bất đồng bộ. Nó đại diện cho một giá trị sẽ có trong tương lai — có thể là thành công hoặc thất bại.

### Câu 2. Promise có liên quan gì đến React không?

Không. Promise là một phần của JavaScript thuần và hoạt động độc lập với React. Tuy nhiên, nó thường được sử dụng trong React khi làm việc với các API như Fetch.

### Câu 3. Làm thế nào để xử lý một Promise khi nó hoàn thành?

Bạn sử dụng phương thức .then() để xử lý kết quả khi Promise hoàn thành

### Câu 4. Tham số truyền vào hàm callback trong .then() là gì?

Đó là giá trị mà Promise trả về sau khi hoàn thành, thường là dữ liệu từ thao tác bất đồng bộ.

### Câu 5. Điều gì xảy ra nếu Promise bị lỗi?

Nếu Promise bị lỗi, hàm trong .then() sẽ không được gọi. Thay vào đó, bạn cần dùng .catch() để xử lý lỗi

### Câu 6. Tại sao cần dùng .catch() khi làm việc với Promise?

Vì Promise có thể thất bại (ví dụ: lỗi mạng, lỗi cú pháp), nên .catch() giúp bạn xử lý các tình huống đó thay vì để ứng dụng bị crash.

### Câu 7. Promise có thể dùng với Fetch API không?

Có. Fetch API trả về một Promise, vì vậy bạn cần dùng .then() để xử lý dữ liệu trả về và .catch() để bắt lỗi nếu có.