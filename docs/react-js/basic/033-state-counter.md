---
sidebar_position: 33
---

# Áp dụng State

Áp dụng state cho chức năng counter

![Create-HTML-1](images/state.png)

<ToggleTOC />

## I. Phân tích component Counter

```jsx
import {useState} from "react";
import {createRoot} from "react-dom/client";

function Counter() {
    const [count, setCount] = useState(0);
    console.log("value of count is: ", count);

    return (<>
        <div>{count} times clicked!</div>
        <button onClick={() => setCount(count + 1)}>Add 1</button>
    </>);
}

createRoot(document.querySelector("#root")).render(<Counter />);
```

Lần đầu tiên Component này hiển thị, chúng ta nhận được console log sau:

```jsx
console.log("value of count is: ", count); // value of count is: 0
```

Sau đó, khi người dùng nhấp chuột vào nút, chúng ta đặt giá trị mới của count thành count + 1, vì vậy 0 + 1 = 1

Vì chúng ta đã gọi `setCount`, React biết rằng trạng thái của Component này đã thay đổi, điều đó có nghĩa là nó cần phải hiển thị lại, vì vậy toàn bộ hàm Counter được gọi lại, nhưng lần này trạng thái seconds đã được tạo nên nó sẽ không được đặt thành 0 nữa.

React sẽ KHÔNG sử dụng lại giá trị khởi tạo vì trạng thái đã tồn tại.

Vì vậy lần này, const [count, setCount] = useState(0); sẽ cung cấp trạng thái count có giá trị là 1.

Tại sao? Bởi vì chúng ta đã gọi setCount(1) trước đó.

Vì vậy đây là console log được in ra khi React hiển thị lại Component này:

```jsx
console.log("value of count is: ", count); // value of count is: 1
```

Sau đó, khi người dùng nhấp chuột vào nút, chúng ta đặt giá trị mới của count thành count + 1, vì vậy 1 + 1 = 2

<iframe height="300" scrolling="no" title="Counter" src="https://codepen.io/DinhTrieu/embed/xbZjeKe?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/DinhTrieu/pen/xbZjeKe">
  Counter</a> by Dinh (<a href="https://codepen.io/DinhTrieu">@DinhTrieu</a>)
  on <a href="https://codepen.io">CodePen</a>.
      </iframe>

## II. Cập nhật trạng thái

Tại sao chúng ta cần sử dụng một phương thức riêng biệt để cập nhật trạng thái?

Nói ngắn gọn, React không thể biết khi nào bạn thay đổi giá trị của `count`, vì vậy chúng ta cần sử dụng phương thức được cung cấp là `setCount`.

Phương thức này kết nối vào nội bộ của React và thông báo rằng chúng ta đang thay đổi giá trị của một trạng thái đó là lý do tại sao useState được coi là hook.

Điều này thường có nghĩa là Component phải hiển thị lại, tức là nó phải được vẽ lại trên màn hình, quá trình này được xử lý bởi ReactDOM.

## III. Lợi ích đem lại

Đôi khi chúng ta gặp khó khăn trong việc hình dung ra ý nghĩa tổng quan của một vấn đề, vì vậy hãy dừng lại một chút và xem lại lý do tại sao chúng ta lựa chọn sử dụng React và những lợi ích mà nó mang lại.

Lợi ích của việc sử dụng React ở đây là chúng ta return `<div>{count} times clicked!</div>` và chúng ta KHÔNG cần phải lo lắng về việc cập nhật.

Chúng ta gọi `setCount()` và React sẽ quan tâm đến giá trị `{count}` trong `<div>{count} times clicked!</div>`.

Thông thường, với Vanilla JavaScript (JavaScript không sử dụng bất kỳ thư viện nào), bạn phải cập nhật thủ công DOM mỗi khi một biến thay đổi và code có thể trở nên lộn xộn khi yêu cầu trở nên phức tạp hơn.

:::tip Tóm lại
 
- Khi bạn thay đổi State, React sẽ gọi lại Component để hiển thị lại
- Giá trị khởi tạo được truyền vào `useState(initialValue)` chỉ được sử dụng vào lần đầu tiên mà Component hiển thị.
- useState là một Hook trong React kết nối vào nội bộ của React và thông báo rằng một biến trạng thái đã thay đổi.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Tai sao nên áp dụng state trong ReactJS?

Áp dụng state trong ReactJS mang lại nhiều lợi ích vượt trội so với cách quản lý dữ liệu trong JavaScript thuần, đặc biệt khi xây dựng giao diện người dùng phức tạp và có tính tương tác cao.

### Câu 2: Lợi ích khi áp dụng state trong reactjs so với js?

Tự động cập nhật giao diện khi dữ liệu thay đổi

State giúp bạn lưu trữ và xử lý dữ liệu riêng cho từng component, tránh việc dùng biến toàn cục hoặc thao tác DOM không kiểm soát.

Component có state riêng biệt → dễ tái sử dụng, dễ test, dễ mở rộng mà không ảnh hưởng đến phần khác của ứng dụng.

State hoạt động mượt mà với các hook như useEffect, useReducer, useContext... giúp bạn xử lý logic phức tạp như fetch API, debounce, animation, v.v.