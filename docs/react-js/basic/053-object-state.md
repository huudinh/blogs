---
sidebar_position: 53
---

# Khai báo State là Object

Chúng ta sẽ làm việc với trạng thái đại diện cho đối tượng. Đừng quên rằng khi bạn muốn thay đổi một đối tượng trong JavaScript, bạn cần thực hiện sao cho không làm thay đổi đối tượng ban đầu!

![Create-HTML-1](images/components.jpg)

<ToggleTOC />

## I. Khởi tạo một trạng thái mới

Khi khởi tạo một trạng thái mới, chúng ta cần cung cấp một giá trị mặc định. 

Dạng phổ biến nhất mà bạn thường thấy là đặt giá trị mặc định là một đối tượng rỗng

```jsx
import {useState} from "react";

function App() {
    const [data, setData] = useState({});
}
```

Bạn cũng có thể đặt giá trị mặc định là bất kỳ đối tượng nào khác

```jsx
{
    darkMode: false
}
```

<iframe height="300" scrolling="no" title="Khai báo State là Object" src="https://codepen.io/DinhTrieu/embed/OPMvdZe?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/DinhTrieu/pen/OPMvdZe">
  Khai báo State là Object</a> by Dinh (<a href="https://codepen.io/DinhTrieu">@DinhTrieu</a>)
  on <a href="https://codepen.io">CodePen</a>.
      </iframe>

## II. Đảo ngược giá trị boolean

Đây là một mẹo nhanh khá hữu ích. Nếu bạn muốn đảo ngược giá trị `boolean` (từ `false` thành `true` và từ `true` thành `false`), bạn có thể sử dụng toán tử logic `not: !` (còn được gọi là toán tử Phủ định).

Cách thực hiện như sau:

```jsx
const booleanValue1 = true;
const inverted1 = !booleanValue1; // false

const booleanValue2 = false;
const inverted2 = !booleanValue2; // true
```

## III. Lặp qua đối tượng trong JSX

Đôi khi chúng ta có thể cần lặp qua đối tượng. Tuy nhiên, thao tác này không phổ biến như việc lặp qua mảng. Cách thực hiện như sau:

<iframe height="300" scrolling="no" title="Untitled" src="https://codepen.io/DinhTrieu/embed/vELRPZY?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/DinhTrieu/pen/vELRPZY">
  Untitled</a> by Dinh (<a href="https://codepen.io/DinhTrieu">@DinhTrieu</a>)
  on <a href="https://codepen.io">CodePen</a>.
      </iframe>

```jsx
function App() {
    const settings = {
        title: "Blog",
        theme: "dark"
    }

    return <ul>{
        Object.entries(settings).map(item => {
            return <li key={item[0]}>{item[0]} with value {item[1]}</li>
        })
    }</ul>;
}
```

JSX kết quả sẽ là:

```jsx
<ul>
    <li key="title">title with value Blog</li>
    <li key="theme">theme with value dark</li>
</ul>
```

Đoạn code trên hoạt động vì `Object.entries(settings)` trả về mảng sau:

```jsx
[
    ["title", "Blog"],
    ["theme", "dark"],
]
```

:::tip Tóm lại
 
- Hãy nhớ duy trì tính bất biến của đối tượng khi làm việc với trạng thái đại diện cho đối tượng.
- Bạn có thể đảo ngược giá trị boolean bằng cách đặt toán tử logic not trước giá trị.
- !true cho kết quả false và !false cho kết quả true.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Có thể khai báo State là Object không?

Trong React, bạn hoàn toàn có thể khai báo state là một object để lưu trữ nhiều giá trị liên quan trong cùng một biến. Đây là cách phổ biến khi bạn có nhiều trường dữ liệu

### Câu 2: Ưu điểm khi dùng object?

Gọn gàng khi quản lý nhiều trường dữ liệu

Dễ dàng truyền toàn bộ state vào API hoặc component khác

Dễ mở rộng khi thêm nhiều field