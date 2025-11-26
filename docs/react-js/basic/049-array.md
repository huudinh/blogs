---
sidebar_position: 49
---

# Array trong JSX

Trong JSX (cú pháp mở rộng của JavaScript dùng trong React), bạn có thể sử dụng mảng để hiển thị danh sách các phần tử một cách linh hoạt và hiệu quả.

![Create-HTML-1](images/components.jpg)

<ToggleTOC />

## I. Mảng phải là bất biến trong React

Khi làm việc với mảng, bạn thường sẽ cần lặp qua các phần tử, chúng ta lựa chọn hiển thị chúng theo chỉ số. Tuy nhiên, cách làm này không thực sự hiệu quả!

Giả sử chúng ta có mảng `grades` và chúng ta muốn tạo một thẻ `u`l và một thẻ `li` cho mỗi điểm số:

```jsx
function Grades(){
    const grades = [8, 18, 10, 7, 14];

    // this will generate a warning (keep reading)
    return <ul>
        { grades.map(grade => <li>{grade}</li>) }
    </ul>;
}
```

Component trên sẽ hiển thị:

```jsx
<ul>
    <li>8</li>
    <li>18</li>
    <li>10</li>
    <li>7</li>
    <li>14</li>
</ul>
```

Cú pháp trên hoạt động vì chúng ta sử dụng trả về ngầm định bên trong `callback` của `map`. 

## II. Viết nhiều dòng code trong callback

Nếu bạn muốn viết nhiều dòng code trong hàm callback thì bắt buộc phải sử dụng từ khóa return

```jsx
function Grades(){
    const grades = [8, 18, 10, 7, 14];

    // this will generate a warning (keep reading)
    return <ul>
        {
            grades.map(grade => {
                return <li>{grade}</li>
            })
        }
    </ul>;
}
```

Bạn cũng có thể lưu kết quả của `map` vào biến, sau đó tham chiếu đến nó trong `JSX`:

:::tip Tóm lại
 
- `.map` có thể được sử dụng trong JSX để lặp qua mảng.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Tại sao mảng phải là bất biến trong React?

React sử dụng toán tử so sánh === để kiểm tra xem state hoặc props có thay đổi hay không. Nếu bạn thay đổi nội dung của mảng mà không tạo ra mảng mới, React sẽ không nhận ra sự thay đổi vì tham chiếu vẫn giống nhau.

### Câu 2: Tại sao phải sử dụng callback để render danh sách trong jsx?

JSX không cho phép bạn dùng for hoặc while như trong JavaScript thông thường. Thay vào đó, bạn cần dùng các biểu thức JavaScript bên trong {}—và .map() là cách phổ biến nhất để lặp qua mảng và render phần tử.

Callback giúp bạn kiểm soát từng phần tử

Callback giúp code ngắn gọn, dễ hiểu và dễ bảo trì. Khi bạn tách logic render ra thành hàm riêng, nó còn giúp tái sử dụng và test dễ hơn.

React cần biết chính xác từng phần tử trong danh sách để cập nhật UI hiệu quả. Callback trong .map() giúp bạn gắn key cho từng phần tử—đây là điều kiện bắt buộc để React hoạt động đúng.