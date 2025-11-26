---
sidebar_position: 11
---

# Làm việc với JSX

Vì JSX được chuyển đổi thành `React.createElement(...)` trả về một đối tượng, bạn có thể coi phần tử JSX như một đối tượng.

![Create-HTML-1](images/jsx.jpg) 

<ToggleTOC />

### JSX là một đối tượng

Bạn có thể coi `<h1 className="title">Supermarket</h1>` như một đối tượng với các thuộc tính sau (được đơn giản hóa):

```jsx
{
  type: 'h1',
  props: {
    className: "title",
    children: "Supermarket"
  }
}
```

Đối tượng này là dạng biểu diễn cho một phần của giao diện người dùng mà React duy trì trong DOM ảo.

Điều này giúp React xác định những thay đổi một cách hiệu quả và sau đó hiển thị lại bằng cách sử dụng ReactDOM.

Vì `<h1 className="title">Supermarket</h1>` là một đối tượng, bạn có thể xem nó như một đối tượng thông thường.

## II. Gán đối tượng cho biến

```jsx
const title = <h1 className="title">Supermarket</h1>;
```

## III. Trả về đối tượng từ hàm

```jsx
function getTitle() {
    return <h1 className="title">Supermarket</h1>
}
```

## IV. Trả về các phần tử khác nhau theo điều kiện

```jsx
function getTitle(is_open) {
    if (is_open) {
        return <h1 className="title">Supermarket</h1>
    } else {
        return <h1 className="title">Supermarket (closed)</h1> 
    }
}
```

## V. Thực hiện các thao tác thông thường khác trên đối tượng

Khi bạn sử dụng JSX, nó sẽ được chuyển đổi thành một cuộc gọi đến `React.createElement(...)`.

Điều này có thể dễ hiểu đối với một số người, nhưng bạn nên dành một chút thời gian để tìm hiểu vì bạn cần làm quen với cú pháp JSX trước.

Để giúp bạn hiểu rõ hơn, ví dụ thứ ba có thể (getTitle) được chuyển đổi thành đoạn code sau:

```jsx
function getTitle(is_open) {
  if (is_open) {
    return React.createElement("h1", {
      className: "title"
    }, "Supermarket");
  } else {
    return React.createElement("h1", {
      className: "title"
    }, "Supermarket (closed)");
  }
};
```

Bạn có thể nhận thấy có rất nhiều code trùng lặp trong khối `if` và `else`.

:::tip Tóm lại
 
- Phần tử JSX là một đối tượng.
- Bạn có thể xem phần tử JSX như một đối tượng.
- Bạn có thể gán phần tử JSX cho biến.
- Bạn có thể trả về phần tử JSX từ hàm.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. JSX trong React thực chất là gì?

JSX là một cú pháp mở rộng của JavaScript, khi được biên dịch sẽ trở thành lời gọi React.createElement(...), trả về một đối tượng đại diện cho phần tử giao diện người dùng trong DOM ảo.

### Câu 2. Tại sao React sử dụng DOM ảo với các đối tượng JSX?

DOM ảo giúp React xác định những thay đổi trong giao diện một cách hiệu quả, từ đó cập nhật giao diện thực (DOM thật) một cách tối ưu.

### Câu 3. Điều gì có thể gây ra trùng lặp khi viết JSX theo điều kiện?

Khi bạn viết nhiều khối if/else với phần tử giống nhau chỉ khác nội dung, bạn sẽ lặp lại cấu trúc React.createElement(...), gây dư thừa code.