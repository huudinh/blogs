---
sidebar_position: 99
---

# Custom hooks với State

Hook tùy chỉnh có thể chứa các cuộc gọi `useEffect`, tương tự như thế, nó cũng có thể chứa các cuộc gọi `useState`. Vì vậy, bạn có thể tạo các biến `state` bên trong `hook` tùy chỉnh để tối ưu hóa và tái sử dụng logic chung một cách linh hoạt.

![Create-HTML-1](images/custom-hooks.png) 

<ToggleTOC />

## I. Sử dụng State thông thường

Đối với ứng dụng web mua sắm, chúng ta cần có một bộ đếm để theo dõi số lượng sản phẩm mà người dùng thêm vào giỏ hàng. Bộ đếm này không thể nhỏ hơn 0 vì bạn không thể đặt -1 sản phẩm. Bộ đếm sẽ trông như sau:

```jsx
import {useState} from "react";

function App() {
    const [counter, setCounter] = useState(0);

    function handleIncrementClick() {
        setCounter(prevCounter => prevCounter + 1);
    }

    function handleDecrementClick() {
        setCounter(prevCounter => {
            // only decrement if it's bigger than 0
            if (prevCounter > 0) {
                return prevCounter - 1;
            }
            // don't let it go below 0
            return 0;
        });
    }
}
```

## II. Tối ưu hóa logic thành hook tùy chỉnh

Vì chúng ta dự định tái sử dụng logic trên, chúng ta có thể tối ưu hóa nó thành một `hook` tùy chỉnh tên là `useProductCounter`.

```jsx
// useProductCounter.js
import {useState} from "react";

export default function useProductCounter() {
    const [counter, setCounter] = useState(0);

    function increment() {
        setCounter(prevCounter => prevCounter + 1);
    }

    function decrement() {
        setCounter(prevCounter => {
            if (prevCounter > 0) {
                return prevCounter - 1;
            }
            return 0;
        });
    }

    return ; /* we need to return the counter and the two functions */
}
```

Chúng ta di chuyển khai báo `useState` và hai hàm và đặt chúng vào `hook` tùy chỉnh mới. Chúng ta cũng đổi tên `handleIncrementClick` thành `increment` vì đây là một hàm tăng giá trị có thể tái sử dụng và nó không nhất thiết phải được gọi khi nhấp chuột. Tương tự với hàm `handleDecrementClick`, giờ được gọi là `decrement`.

Bây giờ hook tùy chỉnh này cần trả về trạng thái `counter` cùng với các hàm `increment` và `decrement` để có thể sử dụng chúng bên ngoài component.


## III. Sử dụng Array destructuring

Phương pháp đầu tiên là tiếp tục trả về mảng như ta đã học, nhưng lần này mảng sẽ có ba phần tử:

```jsx
return [counter, increment, decrement];
```

Sau đó, bên trong component, bạn sẽ sử dụng array destructuring:

```jsx
const [counter, increment, decrement] = useProductCounter();
```

Cách này hoạt động vì chúng ta trả về một mảng gồm 3 phần tử; phần tử đầu tương ứng với count, phần tử thứ hai tương ứng với hàm increment và phần tử thứ ba tương ứng với hàm decrement.

Tuy nhiên, khi bạn có nhiều hơn 2 phần tử thì phương pháp tiếp theo sẽ làm cho mã nguồn dễ đọc hơn.

## IV. Sử dụng Object destructuring

Phương pháp thứ hai là trả về một đối tượng chứa `count` và hai hàm:

```jsx
return {counter, increment, decrement};
```

Đây là cách sử dụng cú pháp rút gọn đối tượng ES2015. Nó tương đương với code dưới đây, nhưng ngắn hơn:

```jsx
return {
    counter: counter,
    increment: increment,
    decrement: decrement
};
```

Nhưng vì các khóa và giá trị có cùng tên, bạn chỉ cần viết là `return {counter, increment, decrement}`.

Với phương pháp này, bạn có thể sử dụng Object destructuring trong component App, tương tự như array destructuring nhưng cho đối tượng:

```jsx
const {counter, increment, decrement} = useProductCounter();
```

Sự khác biệt duy nhất là chúng ta thay đổi `[]` từ mảng thành `{}` vì `useProductCounter()` hiện trả về một đối tượng.

Phương pháp này được khuyên dùng khi bạn có nhiều hơn 2 phần tử được trả về bởi hook tùy chỉnh vì thứ tự không quan trọng nếu bạn sử dụng các tên khóa giống nhau. Ví dụ dưới đây vẫn hợp lệ vì chúng ta có tên các khóa giống nhau và thứ tự không quan trọng, điều này giúp cho code ít bị lỗi hơn:

```jsx
const {increment, decrement, counter} = useProductCounter();
```

## V. Cập nhật trình lắng nghe sự kiện

Bây giờ `hook` tùy chỉnh đang trả về các hàm `increment` và `decrement`, chúng ta cần cập nhật các trình xử lý `onClick` trong JSX để sử dụng các hàm `increment` và `decrement` mới:

```jsx
function App() {
    const {counter, increment, decrement} = useProductCounter();

     return <>
        <h2>{counter}</h2>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
    </>;
}
```

Để ý là component App trở nên nhỏ gọn hơn rất nhiều vì hầu hết các chức năng của nó đã được tái cấu trúc vào hook tùy chỉnh `useProductCounter`.

## VI. Lưu ý 

Các cuộc gọi `useState` bên trong `hook` tùy chỉnh không được chia sẻ với các component khác nằm bên ngoài `hook` đó. Điều này có nghĩa là mỗi khi bạn sử dụng một `hook` tùy chỉnh, các cuộc gọi `state` bên trong nó được cô lập và không liên kết với các vị trí khác mà bạn sử dụng hook tùy chỉnh này.

Điều này cho phép bạn tái sử dụng chức năng trong toàn bộ ứng dụng.

Bạn không cần phải vội vàng tái cấu trúc logic chung ngay từ đầu. Bạn có thể làm điều đó dần dần khi cảm thấy cần thiết. Ví dụ, khi bạn nhận thấy một logic cụ thể trong ứng dụng được lặp lại nhiều lần.

:::tip[Tóm lại]

- `Hook` tùy chỉnh có thể chứa các cuộc gọi `useState`.
- `Hook` tùy chỉnh có thể trả về một mảng dữ liệu (ví dụ: biến `state` và các hàm cập nhật biến `state`)
- `Hook` tùy chỉnh có thể trả về một đối tượng dữ liệu
- Bạn nên trả về một đối tượng thay vì mảng khi có nhiều hơn hai mục được trả về.

:::

<iframe width="560" height="315" src="https://www.youtube.com/embed/qeJ-OlsrQ1o?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Custom hook trong React có thể chứa useState không?

Có. Custom hook có thể chứa cả useState và useEffect. Điều này cho phép bạn tạo biến state bên trong hook để tái sử dụng logic chung một cách linh hoạt.

### Câu 2. Tại sao nên chuyển logic bộ đếm sản phẩm thành một custom hook?

Vì logic này có thể được dùng lại ở nhiều component khác nhau. Việc đưa vào custom hook giúp mã nguồn gọn gàng hơn, dễ bảo trì và tái sử dụng.

### Câu 3. Khi nào nên dùng array destructuring để trả về giá trị từ custom hook?

Khi số lượng giá trị trả về ít (thường là 2), array destructuring giúp code ngắn gọn.

### Câu 4. Khi nào nên dùng object destructuring để trả về giá trị từ custom hook?

Khi có nhiều hơn 2 giá trị cần trả về. Object destructuring giúp code dễ đọc hơn, không phụ thuộc vào thứ tự phần tử, và giảm nguy cơ lỗi.

### Câu 5. State bên trong custom hook có được chia sẻ giữa các component khác nhau không?

Không. Mỗi lần gọi custom hook sẽ tạo ra một state riêng biệt, độc lập với các component khác. Điều này đảm bảo tính cô lập và tránh xung đột dữ liệu.