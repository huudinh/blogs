---
sidebar_position: 17
---

# JSX Fragments

Bạn có thể đóng gói nhiều phần tử bằng React.Fragment

![Create-HTML-1](images/jsx.jpg) 

<ToggleTOC />

## I. Phần tử trả về của JSX

Khi trả về các phần tử trong JSX, bạn chỉ có thể trả về một phần tử mỗi lần.

Phần tử đó có thể có phần tử con, nhưng bạn cần đảm bảo chỉ trả về một phần tử mỗi lần, nếu không, bạn sẽ gặp lỗi cú pháp.

Điều đó bởi vì mỗi Phần tử là một đối tượng và bạn không thể trả về hai hoặc nhiều đối tượng liền kề nhau.

## II. Fragment là gì?

React giúp giải quyết vấn đề này bằng cách yêu cầu trả về một Fragment đóng gói các phần tử cần trả về.

Vì vậy, nếu bạn muốn trả về HTML dưới đây từ một hàm

```html
<h1>Grocery delivered to your door</h1>
<h2>Free delivery</h2>
<p>Get started now!</p>
```

Bạn sẽ phải sử dụng một Fragment đóng gói 3 phần tử này

```jsx
function getHeroBanner() {
    return (
        <>
            <h1>Grocery delivered to your door</h1>
            <h2>Free delivery</h2>
            <p>Get started now!</p>
        </>
    );
}
```

Trong ví dụ trên, chúng ta sử dụng cú pháp mở `<>` và đóng fragment `</>` để đóng gói các phần tử.

Fragment là một biểu diễn nội bộ trong React cho phép bạn đóng gói nhiều phần tử.

Bạn có thể chọn trả về một `<div>`; tuy nhiên, `<div>` vẫn được hiển thị trong HTML cuối cùng, trong khi thẻ fragment sẽ biến mất (nhưng nội dung của fragment sẽ được hiển thị).

Giả sử bạn có 100 component React. Khi đó, việc đóng gói mỗi component bằng một `<div>` sẽ làm cho mọi thứ chậm hơn khi kích thước của DOM tăng lên.

Vì vậy, bạn nên sử dụng `<>` khi cần thiết.

## III. Cú pháp gốc

Cú pháp ngắn gọn cho React.Fragment (`<>` và `</>`) vừa được đề cập ở trên.

Bạn có thể thấy ở đâu đó sử dụng cú pháp gốc dài hơn với React.Fragment

```jsx
function getHeroBanner() {
    return (
        <React.Fragment>
            <h1>Grocery delivered to your door</h1>
            <h2>Free delivery</h2>
            <p>Get started now!</p>
        </React.Fragment>
    );
}
```

Về bản chất, cả hai cú pháp cung cấp chức năng tương tự nhau.

:::tip Tóm lại
 
- Bạn chỉ có thể trả về 1 phần tử trong JSX.
- Bạn có thể đóng gói nhiều phần tử bằng React.Fragment.
- Cú pháp ngắn gọn là `<>` được đóng bằng `</>`.
- Cú pháp gốc là: `<React.Fragment>` và `</React.Fragment>`

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Trong JSX, tại sao không thể trả về nhiều phần tử liền kề nhau?

Vì mỗi phần tử JSX là một đối tượng, và bạn chỉ có thể trả về một đối tượng duy nhất từ một hàm. Trả về nhiều phần tử liền kề sẽ gây lỗi cú pháp.

### Câu 2. Fragment trong React là gì?

Fragment là một cách để đóng gói nhiều phần tử JSX mà không tạo thêm phần tử DOM dư thừa. Nó giúp trả về một nhóm phần tử mà không cần dùng thẻ như `<div>`.

### Câu 3. Sự khác biệt giữa Fragment và thẻ `<div>` là gì?

`<div>` sẽ xuất hiện trong DOM, có thể làm tăng kích thước DOM không cần thiết.

Fragment không hiển thị trong DOM, chỉ đóng vai trò bao bọc các phần tử JSX.

### Câu 4. Khi nào nên sử dụng Fragment thay vì `<div>`?

Khi bạn cần đóng gói nhiều phần tử JSX mà không muốn thêm phần tử DOM dư thừa, đặc biệt trong các ứng dụng có nhiều component để tránh làm chậm hiệu suất.