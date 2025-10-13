---
sidebar_position: 80
---

# Khôi phục State từ localStorage

Có nghĩa là giá trị khởi tạo mà ta cung cấp cho `useState` sẽ đến từ localStorage.

Điều này cho phép bạn lưu trữ thiết lập cho chế độ tối, nếu người dùng chọn chế độ tối và quay trở lại trang web trong tương lai, trang sẽ vẫn ở chế độ tối vì chúng ta đã lưu trữ giá trị đó trong localStorage.

![Create-HTML-1](images/localStorage.png) 

<ToggleTOC />

Chúng ta sẽ cùng tìm hiểu cách đọc giá trị được lưu trữ trong localStorage, cách làm có chút khác biệt tùy thuộc vào kiểu dữ liệu được lưu trữ.


## I. Chuỗi

Đọc chuỗi từ localStorage là lựa chọn đơn giản nhất vì localStorage lưu trữ mọi thứ dưới dạng chuỗi.

```js
localStorage.getItem("key-here");
```

## II. Số

Bởi vì localStorage luôn trả về chuỗi, chúng ta cần chuyển đổi chuỗi thành số một cách thủ công:

```js
let value = localStorage.getItem("key-here");
value = Number.parseInt(value, 10); // convert to number
```

Bạn cũng có thể sử dụng `Number.parseFloat (value, 10)` nếu muốn hiển thị phần thập phân (ví dụ: 12.5).

Số 10 chính là đối số thứ hai, gọi là cơ số.

## III. Boolean

Giá trị `boolean` có thể là `true` hoặc `false`. Khi được lưu vào localStorage, chúng sẽ là `"true"` hoặc `"false"` (vì chúng được chuyển đổi thành chuỗi).

Cách chuyển đổi chuỗi trở lại thành `boolean` đơn giản nhất là so sánh mục trong localStorage với chuỗi `"true"`; 

```js
"true" === "true" // true (means original value was true)
"false" === "true" // false (means original value was false)
```

Dưới đây là cách viết khi đọc từ localStorage:

```js
const value = localStorage.getItem("key-here") === "true";
```

Bằng cách so sánh với chuỗi `"true"`, bạn đang chuyển đổi giá trị từ chuỗi thành kiểu `boolean`.

## IV. Giá trị mặc định

Khi bạn đọc một khóa chưa được lưu trữ trong localStorage, kết quả sẽ trả về giá trị `null`.

Bạn có thể đặt giá trị mặc định cho biến theo nhiều cách như câu lệnh if, toán tử ba ngôi hoặc toán tử 3 ngôi (??). 

Dưới đây là một số ví dụ gán giá trị mặc định là mảng rỗng:

```js
// using an if condition
let value = []; // default value
if (localStorage.getItem("key-here")) {
    value = localStorage.getItem("key-here");
}

// OR: using the ternary operator
const value = localStorage.getItem("key-here") !== null ? localStorage.getItem("key-here") : [];

// OR: using the nullish coalescing operator
const value = localStorage.getItem("key-here") ?? [];
```

Chúng ta cần đặt giá trị mặc định cho mảng nếu mong đợi localStorage trả về mảng. Điều này đảm bảo rằng việc gọi `.map()` hoặc các phương thức mảng khác sẽ không gây lỗi nếu `localStorage.getItem()` trả về `null`.

:::tip Tóm lại
- Đọc chuỗi từ localStorage là lựa chọn đơn giản nhất vì localStorage lưu trữ mọi thứ dưới dạng chuỗi
- Đối với số, chúng ta cần chuyển đổi từ chuỗi sang số bằng cách sử dụng `Number.parseInt ("string", 10)`
- Đối với giá trị `boolean`, chúng ta cần so sánh với chuỗi `"true"` để  chuyển đổi thành giá trị boolean tương ứng.
:::

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Khôi phục trạng thái từ localStorage nghĩa là gì??

Nghĩa là giá trị khởi tạo mà chúng ta cung cấp cho useState (hoặc biến trạng thái khác) sẽ được lấy từ dữ liệu đã lưu trong localStorage. Điều này cho phép lưu và khôi phục thiết lập (ví dụ: chế độ tối) khi người dùng quay lại trang.

### Câu 2. Khi lưu số trong localStorage, làm sao để đọc lại dưới dạng số?

Cần chuyển đổi chuỗi sang số bằng Number.parseInt() hoặc Number.parseFloat().

### Câu 3. Làm sao để đọc giá trị boolean từ localStorage?

```js title="So sánh trực tiếp với chuỗi "true":"
const isDarkMode = localStorage.getItem("dark-mode") === "true";
```

### Câu 4. Tại sao cần gán giá trị mặc định khi đọc mảng từ localStorage?

Để tránh lỗi khi gọi các phương thức mảng như .map() hoặc .filter() nếu getItem() trả về null.

### Câu 5. Sự khác biệt giữa Number.parseInt() và Number.parseFloat() là gì?

Number.parseInt() chuyển đổi chuỗi thành số nguyên.

Number.parseFloat() chuyển đổi chuỗi thành số thực, giữ lại phần thập phân.

### Câu 6. Lợi ích của việc khôi phục trạng thái từ localStorage trong ứng dụng React là gì?

Giúp ứng dụng ghi nhớ lựa chọn của người dùng (như chế độ tối/sáng, ngôn ngữ, thiết lập cá nhân) ngay cả khi người dùng reload trang hoặc quay lại sau này.