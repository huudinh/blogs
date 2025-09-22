---
sidebar_position: 72
---

# Dependencies trong Effect

Dependencies là đối số thứ hai tùy chọn của hàm useEffect trong React, được truyền dưới dạng một mảng

![Create-HTML-1](images/effect.webp) 

<ToggleTOC />

## I. useEffect và Dependencies

Tất cả các cuộc gọi `useEffect` mà chúng ta đã thấy cho đến nay đều chạy sau lần hiển thị đầu tiên của component và sau mỗi lần component hiển thị lại. Nhưng đôi khi bạn không muốn `useEffect` hiển thị lại mỗi lần (đôi khi điều này sẽ tạo ra vòng lặp vô hạn). Đó là lý do tại sao hàm `useEffect` có đối số thứ hai.

```
useEffect(effectCallback, dependencies)
```

Hàm `effectCallback` là hàm được truyền vào làm đối số đầu tiên và đối số `dependencies`.

Nếu không truyền đối số thứ hai, useEffect sẽ chạy sau mỗi lần render. React không mặc định giá trị này là null.

## II. Cách hoạt động của Dependencies

Mảng `dependencies` quyết định khi nào hiệu ứng sẽ được chạy lại. Ví dụ:

```jsx
import {useState, useEffect} from "react";

function App() {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        console.log("effect is running");
    }, [counter]);

    return <button onClick={() => setCounter(prev => prev + 1)}>Click me</button>;
}
```

Chúng ta đã truyền vào `useEffect` đối số thứ hai của `[counter]`. Đó là mảng các phụ thuộc (`dependencies`).

Điều này cho React biết nó chỉ nên gọi lại `useEffect` khi giá trị của `counter` thay đổi. Điều này có nghĩa là nó sẽ gọi lại sau lần đầu tiên component hiển thị và mỗi lần giá trị `counter` thay đổi.

Vì vậy trong ví dụ này, [`counter`] bắt đầu là [`0`] (vì trạng thái counter bắt đầu từ 0).

React sẽ lưu trữ `[0]` và sau đó khi người dùng nhấp vào nút. Giá trị mới của `[counter]` trở thành `[1]`.

Dependency là một mảng vì bạn có thể cung cấp nhiều giá trị trong mảng đó (từ state hoặc props của component).

Điều này cho phép bạn tối ưu hóa code và chỉ chạy khi cần thiết.

## III. Hiệu ứng chỉ chạy 1 lần

Ta cũng có thể truyền mảng rỗng làm phụ thuộc: `[]` và trên thực tế, thực hành này khá phổ biến trong lập trình React.

```jsx
useEffect(() => {
    // hiệu ứng chỉ chạy một lần sau khi component mount
}, []);

```

Khi bạn truyền một mảng rỗng, so sánh giữa lần hiển thị trước và lần hiển thị tiếp theo luôn trả về kết quả giống nhau (vì React so sánh cùng một thực thể của `[]`, không có giá trị nào trong mảng đó có thể thay đổi). Điều này có nghĩa là việc truyền `[]` sẽ chỉ chạy hiệu ứng một lần sau lần hiển thị đầu tiên.

Vì vậy nếu bạn muốn chỉ chạy hiệu ứng một lần duy nhất sau khi component đã được gắn kết, bạn nên truyền một mảng rỗng. Điều này thường hữu ích khi làm việc với các thư viện bên ngoài hoặc gửi cuộc gọi phân tích trong component.

## IV. Ứng dụng thực tế

Trong JavaScript, bạn cần khởi tạo thư viện map một lần

```js
const map = new mapboxgl.Map({
    container: "#map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [10, 20],
    zoom: 13
});
```

Nhưng bạn không cần chạy lại mã lệnh trên mỗi khi trạng thái của component thay đổi! Bạn chỉ cần chạy nó một lần. Đó là lý do tại sao trong React, bạn cần chạy nó bên trong useEffect và sử dụng mảng rỗng làm phụ thuộc.

```jsx
useEffect(() => {
    const map = new mapboxgl.Map({
        container: "#map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [10, 20],
        zoom: 13
    });

    // no need to clean up as the map is destroyed when the DOM element is removed 
}, []);
```

:::caution Tóm lại

- Cách gọi `useEffect` là: `useEffect(effectCallback, dependencies)`
- Theo mặc định, đối số `dependencies` có giá trị là `null`, điều này có nghĩa là nó sẽ chạy lại trên mỗi cập nhật.
- Tham số `dependencies` nhận một mảng giá trị mà React sẽ so sánh giữa lần hiển thị trước và lần hiển thị tiếp theo. Chỉ khi những giá trị này thay đổi thì React mới gọi lại hiệu ứng.
- Nếu bạn truyền một mảng rỗng `[]` làm phụ thuộc thì hiệu ứng sẽ chỉ được gọi một lần.

:::

<iframe width="560" height="315" src="https://www.youtube.com/embed/mbm4qnbSAjA?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## FAQ - Câu hỏi thường gặp khi phỏng vấn
---

### 1. Dependencies trong useEffect là gì?

Dependencies là đối số thứ hai tùy chọn của hàm useEffect trong React, được truyền dưới dạng một mảng. Nó đóng vai trò quan trọng trong việc kiểm soát tần suất hàm hiệu ứng (effectCallback) được chạy lại. Mặc định, nếu không truyền đối số này (tức là nó là null), hiệu ứng sẽ chạy sau mỗi lần component được hiển thị ban đầu và sau mỗi lần component hiển thị lại.

### 2. Dependencies hoạt động như thế nào để kiểm soát việc chạy lại hiệu ứng?

Dependencies hoạt động bằng cách cho phép React so sánh các giá trị trong mảng phụ thuộc giữa lần hiển thị trước và lần hiển thị hiện tại của component. Nếu bất kỳ giá trị nào trong mảng dependencies thay đổi, React sẽ gọi lại hàm hiệu ứng. Nếu tất cả các giá trị vẫn giữ nguyên, hàm hiệu ứng sẽ không được gọi lại, giúp tối ưu hóa hiệu suất và tránh các vòng lặp vô hạn không mong muốn.

### 3. Tại sao chúng ta cần sử dụng dependencies?

Việc sử dụng dependencies là cần thiết để kiểm soát khi nào một hiệu ứng nên được thực thi. Nếu không có dependencies, useEffect sẽ chạy sau mỗi lần component render, điều này có thể dẫn đến các vấn đề về hiệu suất hoặc hành vi không mong muốn, đặc biệt khi các hiệu ứng thực hiện các thao tác tốn kém hoặc gây ra các vòng lặp vô hạn. Nó cho phép bạn tối ưu hóa code và chỉ chạy hiệu ứng khi cần thiết.

### 4. Có thể truyền nhiều giá trị vào mảng dependencies không?

Có, bạn có thể cung cấp nhiều giá trị trong mảng dependencies. Các giá trị này có thể đến từ state hoặc props của component. Khi có nhiều giá trị, React sẽ kiểm tra sự thay đổi của từng giá trị trong mảng. Nếu bất kỳ giá trị nào thay đổi, hiệu ứng sẽ được chạy lại.

### 5. Điều gì xảy ra khi truyền một mảng rỗng làm dependencies?

Khi bạn truyền một mảng rỗng [] làm đối số dependencies, hiệu ứng sẽ chỉ chạy một lần duy nhất sau lần hiển thị đầu tiên của component. Điều này là do React so sánh cùng một thực thể của mảng rỗng, và không có giá trị nào bên trong mảng đó có thể thay đổi, dẫn đến kết quả so sánh luôn giống nhau.

### 6. Khi nào nên sử dụng mảng rỗng làm dependencies?

Việc truyền một mảng rỗng [] rất hữu ích khi bạn muốn chạy hiệu ứng chỉ một lần sau khi component đã được gắn kết vào DOM. Điều này thường được áp dụng trong các trường hợp như:

Khởi tạo các thư viện bên ngoài (ví dụ: thư viện bản đồ, biểu đồ).
Gửi các cuộc gọi phân tích (analytics) khi component được tải lần đầu.
Thiết lập các sự kiện chỉ cần lắng nghe một lần.

### 7. Sự khác biệt giữa không truyền dependencies và truyền mảng rỗng là gì?

Không truyền dependencies (mặc định là null): Hiệu ứng sẽ chạy sau mỗi lần hiển thị ban đầu và sau mỗi lần component hiển thị lại (render). Điều này có thể dẫn đến vòng lặp vô hạn nếu hiệu ứng gây ra một cập nhật trạng thái mới.
Truyền mảng rỗng []: Hiệu ứng chỉ chạy một lần duy nhất sau lần hiển thị đầu tiên của component.