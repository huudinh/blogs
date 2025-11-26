---
sidebar_position: 62
---

# Tái cấu trúc component

Việc tái cấu trúc component là một bước quan trọng trong phát triển ứng dụng React để cải thiện khả năng tái sử dụng, dễ bảo trì và mở rộng.

![Create-HTML-1](images/components.jpg) 

<ToggleTOC />

## I. Xác định component muốn tách

Bây giờ chúng ta đã biết cách truyền hàm dưới dạng props trong React, hãy xem xét component React sau:

```jsx
// index.js
import {useState} from "react";

function App() {
    const [name, setName] = useState("");

    function handleNameChange(event) {
        setName(event.target.value);
    }

    return <div>
        <h2>Hello {name}</h2>
        <form>
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" value={name} onChange={handleNameChange} />
        </form>
    </div>
}
```

Chúng ta muốn tái cấu trúc component thành:

```jsx
// index.js
import {useState} from "react";
import NameForm from "./NameForm.js";

function App() {
    const [name, setName] = useState("");

    function handleNameChange(event) {
        setName(event.target.value);
    }

    return <div>
        <h2>Hello {name}</h2>
        <NameForm />
    </div>
}
```

Để ý đoạn code đã tái cấu trúc component `<form>` thành component `NameForm`.

Lưu ý rằng đoạn code này sẽ không hoạt động vì chúng ta cần truyền các sự kiện `name` và `onChange` cho component `NameForm`. 

## II. Thiết lập các props cho component vừa tách

Component `NameForm` cần hiển thị một hộp văn bản và cập nhật giá trị của nó mỗi khi có thay đổi; do đó, nó cần thiết lập các prop `value` và `onChange`.

Để làm điều đó, chúng ta bắt đầu bằng cách truyền chúng từ component `App` xuống:

```jsx
// index.js
import NameForm from "./NameForm.js";

function App() {
    const [name, setName] = useState("");

    function handleNameChange(event) {
        setName(event.target.value);
    }

    return <div>
        <h2>Hello {name}</h2>
        <NameForm name={name} onNameChange={handleNameChange} />
    </div>
}
```

## III. Một số điều cần lưu ý

- `name={name}` truyền biến trạng thái `name` xuống
- `onNameChange={handleNameChange}` truyền hàm `handleNameChange` 
- `onNameChange` tuân theo quy ước đặt tên 
- Để ý trạng thái được tạo và duy trì trong component cha.
- Component `App` là stateful component vì nó quản lý trạng thái.

## IV. Cấu trúc componnent con

Trong component NameForm, chúng ta có thể sử dụng 2 prop "value" và "onChange":

```jsx
//NameForm.js
export default function NameForm(props) {

    return <form>
        <label htmlFor="name">Name: </label>
        <input 
            type="text" 
            id="name" 
            value={props.name} 
            onChange={props.onNameChange} />
    </form>
}
```
- Component này là `stateless` vì nó KHÔNG quản lý trạng thái. Mặc dù có một hộp văn bản, component này có một trình xử lý onChange gọi `props.onNameChange` thuộc về component cha của nó.
- Component cha xử lý trạng thái.
- `value={name}` đã thay đổi thành `value={props.name}` vì name không còn là trạng thái nội bộ nữa mà là một prop nhận được từ component cha.
- Cách làm tương tự áp dụng cho `onChange`.

## V. Lifting state up

App là stateful component và NameForm là stateless component không?

Vì vậy, trạng thái chỉ được quản lý trong component cha App.

Đây là ví dụ cơ bản nhất về lifting state up (nâng trạng thái của component con lên thành trạng thái của component cha)

:::tip Tóm lại

- Khi tái cấu trúc một biểu mẫu thành component con, biểu mẫu có thể trở thành stateless component và trạng thái sẽ được quản lý bởi component cha.
- Để làm được điều đó, bạn phải truyền `value` và `onChange` từ component cha xuống component con và sau đó sử dụng chúng như `props.value` và `props.onChange`.

:::

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZxgbmG04tRA?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Tại sao cần Tái cấu trúc component?

- Component nhỏ, rõ chức năng có thể dùng lại ở nhiều nơi.
- Giảm lặp code, tiết kiệm thời gian phát triển.
- Code được tổ chức tốt giúp dev mới dễ tiếp cận.
- Khi cần sửa lỗi hoặc thêm tính năng, bạn không phải “đào mỏ” trong một component khổng lồ.
- Component nhỏ dễ kiểm soát việc render lại.
- Giảm số lượng re-render không cần thiết, cải thiện tốc độ.
- Khi app phát triển, cấu trúc rõ ràng giúp thêm tính năng mà không phá vỡ hệ thống cũ.
- Dễ tích hợp với các thư viện quản lý state như Redux, Zustand, hoặc React Query.