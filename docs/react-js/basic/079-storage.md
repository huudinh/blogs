---
sidebar_position: 79
---

# LocalStorage 

LocalStorage là một API Web cho phép chúng ta lưu trữ các cặp khóa-giá trị trong trình duyệt.

![Create-HTML-1](images/localStorage.png) 

<ToggleTOC />

## I. localStorage có thể làm gì

API `localStorage` là đồng bộ, điều này có thể làm chậm ứng dụng. 

Do đó, chúng ta nên sử dụng `localStorage` một cách cẩn thận và chỉ sử dụng bên trong `useEffect`.

API localStorage chỉ có thể lưu trữ chuỗi. Vì vậy, khóa và giá trị sẽ là chuỗi.

Đây là lý do tại sao chúng ta sẽ tìm hiểu cách lưu trữ chuỗi, số và giá trị boolean. 

Chúng ta sẽ tìm hiểu cách lưu trạng thái vào localStorage. 

Dữ liệu bị giới hạn khoảng 5MB. 

## II. Lưu trữ chuỗi

Lưu trữ chuỗi rất đơn giản vì API localStorage lưu trữ khóa và giá trị dưới dạng chuỗi. Dưới đây là một ví dụ:

```js
let name = "Sam"

// Key is "name", value is the variable name (which has the value "Sam")
localStorage.setItem("name", name);
```

Sau đó, bạn có thể đọc giá trị bằng cách sử dụng phương phức `localStorage.getItem("name")` và nó sẽ trả về chuỗi "Sam".

## III. Lưu trữ số

Các số sẽ được lưu trữ dưới dạng chuỗi, tức là bạn cần chuyển đổi nó thành kiểu dữ liệu số để sử dụng.

```js
const age = 20

localStorage.setItem("age", age);
```

Sau này, khi bạn muốn đọc giá trị từ localStorage, bạn sẽ nhận được một chuỗi, điều đó có nghĩa bạn phải chuyển đổi nó thành số:

```js
let age = localStorage.getItem("age");
console.log(age); // "20" (string)
age = Number.parseInt(age, 10); // 20 (number)
```

## III. Lưu trữ giá trị boolean

Điều tương tự áp dụng cho giá trị boolean vì giá trị boolean `true` hoặc `false` sẽ được lưu trữ dưới dạng chuỗi tương ứng, `"true"` hoặc `"false"`.

```js
localStorage.setItem("isVerified", true); // thực tế lưu là "true"
```

Khi bạn đọc giá trị, giá trị trả về sẽ là `"true"`, do đó cách đơn giản nhất để chuyển đổi chuỗi trở lại thành giá trị boolean là so sánh với chuỗi `"true"`:

```js
const isVerified = localStorage.getItem("isVerified") === "true";
```

Với dòng code trên, `isVerified` chỉ có giá trị true khi `"true" === "true"`. Vì vậy, nếu localStorage chứa `"false"`, kết quả của `"false" === "true"` sẽ là `false`, tức là `isVerified` sẽ là `false`.

## IV. Lưu trữ trạng thái

Để lưu trữ trạng thái vào localStorage, bạn phải sử dụng API localStorage bên trong cuộc gọi `useEffect`:

```jsx
import {useState, useEffect} from "react";

function App() {
    const [random, setRandom] = useState(Math.random());

    useEffect(() => {
        // every time the value of random changes, save it to localStorage:
        localStorage.setItem("random", random);
    }, [random]);

    return <button onClick={() => setRandom(Math.random())}>Re-render</button>;
}
```

Mỗi khi trạng thái `random` thay đổi, hiệu ứng sẽ chạy, từ đó lưu giá trị mới vào localStorage với khóa là `random`. 

:::tip Tóm lại

- API localStorage nên được sử dụng một cách cẩn thận và chỉ sử dụng trong `useEffect`.
- API localStorage chỉ có thể lưu trữ chuỗi. Vì vậy, khóa và giá trị sẽ là chuỗi.
- `localStorage.setItem("key", "value")` là cú pháp lưu một cặp khóa/giá trị vào localStorage.

:::

<iframe width="560" height="315" src="https://www.youtube.com/embed/0QqEffxTOMo?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. localStorage lưu dữ liệu ở định dạng nào

Tất cả khóa và giá trị đều được lưu dưới dạng chuỗi (string)

### Câu 2. Khi nào không nên dùng localStorage?

Khi cần lưu dữ liệu quá lớn, hoặc khi phải đọc/ghi liên tục với tần suất cao (có thể làm chậm hiệu suất).

### Câu 3. Ưu điểm của localStorage là gì?

Dễ dùng, dữ liệu bền vững (không mất khi reload trang), hỗ trợ trên hầu hết các trình duyệt.

### Câu 4. Nhược điểm của localStorage là gì?

Chỉ lưu được chuỗi, dung lượng giới hạn, đồng bộ (có thể làm chậm ứng dụng nếu dùng quá nhiều).

### Câu 5. Dung lượng tối đa mà localStorage có thể lưu trữ là bao nhiêu?

Khoảng 5MB cho mỗi domain (tùy vào trình duyệt).
