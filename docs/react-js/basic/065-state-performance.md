---
sidebar_position: 65
---

# Cải thiện hiệu suất của ứng dụng

Cập nhật state trong React là hành vi bất đồng bộ, tức là state không nhất thiết phải được cập nhật ngay lập tức.


![Create-HTML-1](images/components.jpg) 

<ToggleTOC />


## I. Hiệu suất khi sử dụng React

Hành vi Update state được thiết kế bất đồng bộ nhằm giúp cải thiện hiệu suất của ứng dụng React.

Khi bạn cập nhật trạng thái trong React, điều này yêu cầu phải hiển thị lại component (và có thể cả các component khác), đó có thể là một hoạt động tốn kém. Đó là lý do tại sao React gom nhóm nhiều cập nhật trạng thái lại với nhau và kết hợp chúng thành một lần render để làm cho ứng dụng phản hồi nhanh hơn và giảm công việc mà trình duyệt phải thực hiện.

## II. Gom nhóm các cập nhật trạng thái

```jsx
import React, {useState} from "react";

function App() {    
    const [date, setDate] = useState(new Date());
    const [counter, setCounter] = useState(0);

    console.log("rendered"); //allows us to visualize re-renders

    function handleButtonClick() {
        setDate(new Date());
        setCounter(counter + 1);
    }

    return <button onClick={handleButtonClick}>Click me</button>
}
```

Hàm `setDate()` thiết lập ngày hiện tại bằng cách gọi `new Date()`.

Có hai cập nhật trạng thái. Tuy nhiên, component chỉ hiển thị lại một lần.

Điều này là do React gom nhóm (kết hợp) hai thay đổi trạng thái này và thực hiện chúng cùng một lúc. Điều này giúp ứng dụng phản hồi nhanh hơn đối với tương tác của người dùng.

Bạn không cần phải biết cụ thể về cách/khi nào gom nhóm xảy ra vì đó là một tính năng của React. Tuy nhiên, hành vi này có thể tạo ra một số vấn đề trong ứng dụng khi quá trình cập nhật trở nên phức tạp hơn. 

Kể từ React 18, React hiện gom nhóm các cập nhật trạng thái ngay cả khi chúng nằm trong một trình xử lý sự kiện hoặc callback của promise.

:::tip Tóm lại

- Cập nhật trạng thái trong React là hành vi bất đồng bộ.
- Một số thay đổi trạng thái xảy ra liên tiếp có thể được gom nhóm nhằm cải thiện hiệu suất.

:::


<iframe width="560" height="315" src="https://www.youtube.com/embed/f1PW5Y7_30E?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Có bao nhiêu cập nhật trạng thái xảy ra khi nhấp vào nút?

Số lần cập nhật trạng thái (state updates) khi nhấp vào nút trong React phụ thuộc vào cách bạn viết mã và các hàm được gọi trong sự kiện onClick. Dưới đây là một số tình huống phổ biến:

Khi nhấp vào nút, chỉ một lần cập nhật trạng thái xảy ra. React sẽ re-render component một lần.

```jsx
const [count, setCount] = useState(0);

<button onClick={() => setCount(count + 1)}>Tăng</button>
```

Trong React (đặc biệt là với useState trong function component), các cập nhật trạng thái đồng bộ sẽ được gộp lại (batched). Vì vậy, dù gọi setCount hai lần, React có thể chỉ re-render một lần với giá trị cuối cùng.
```jsx
const [count, setCount] = useState(0);

<button onClick={() => {
  setCount(count + 1);
  setCount(count + 2);
}}>Tăng</button>

```

React sẽ thực hiện hai lần cập nhật riêng biệt, vì bạn dùng hàm callback. Kết quả là count tăng lên 2.

```jsx
<button onClick={() => {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
}}>Tăng</button>

```

### Câu 2: Component này sẽ được hiển thị lại bao nhiêu lần khi nhấp vào nút?

Số lần component được hiển thị lại (re-render) khi nhấp vào nút phụ thuộc vào cách bạn cập nhật trạng thái trong React.

Dù gọi setState nhiều lần, thường chỉ có 1 lần re-render nhờ React batching. 

Nhưng nếu gọi setState ngoài sự kiện React, có thể gây nhiều lần re-render.