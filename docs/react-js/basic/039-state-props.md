---
sidebar_position: 39
---

# Thay đổi State với Props

Trong React, Props và State là hai khái niệm cốt lõi để quản lý dữ liệu và điều khiển giao diện. Tuy nhiên, chúng có vai trò khác nhau — và việc “thay đổi State bằng Props” cần được hiểu đúng để tránh sai lầm trong thiết kế component.

![Create-HTML-1](images/state.png)

<ToggleTOC />

## I. Điều khiển giao diện theo Prop

Điều gì sẽ xảy ra nếu chúng ta kết hợp Props và thay đổi trạng thái có điều kiện?

Giả sử chúng ta có một component có thể tăng giá trị của bộ đếm. 

Tuy nhiên, component này có thể được kích hoạt hoặc vô hiệu hóa. 

Khi component bị vô hiệu hóa, bộ đếm sẽ không tăng giá trị.

```jsx
import {useState} from "react";

function Counter(props) {
    const [counter, setCounter] = useState(0);

    function handleIncrementClick() {
        if (props.enabled){
            setCounter(counter + 1);
        }
    }

    return (<>
        <h2>{counter} times clicked</h2>
        <button onClick={handleIncrementClick}>Add 1</button>
    </>);
}

// Sample usages:
const element1 = <Counter enabled={true} />;
const element2 = <Counter enabled={false} />;
```

Kiểm tra giá trị của Prop và thay đổi State

```jsx
if (props.enabled) {
    setCounter(counter + 1);
}
```

## II. Không nên làm

Không nên ghi đè Props trực tiếp — vì Props là bất biến.

Không nên lạm dụng việc copy Props vào State nếu không cần chỉnh sửa nội bộ.

:::tip Tóm lại
 
Props là dữ liệu từ bên ngoài, không thể thay đổi trực tiếp.

State là dữ liệu nội bộ, có thể thay đổi bằng setState.

Dùng Props để khởi tạo hoặc cập nhật State khi cần xử lý nội bộ.

Sử dụng useEffect để đồng bộ State với Props khi Props thay đổi.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Khi nào dùng Props để thay đổi State?

Dùng khi bạn muốn lưu giá trị ban đầu từ Props vào State để có thể thay đổi sau đó.

Dùng khi bạn muốn đồng bộ State với Props mỗi khi Props thay đổi.