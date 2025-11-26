---
sidebar_position: 55
---

# Thay đổi nội dung Input

Để thay đổi nội dung của một `<input>` trong React, bạn cần sử dụng state để kiểm soát giá trị của input — đây chính là cách tạo một controlled component. Mỗi khi người dùng gõ vào input, bạn sẽ cập nhật state, và giá trị hiển thị trong input sẽ phản ánh đúng state đó.

![Create-HTML-1](images/components.jpg) 

<ToggleTOC />

## I. Xây dựng hàm

```jsx
function handleAddressChange(event) {
    //...
}

<input type="text" name="address" onChange={handleAddressChange} />
```

Hàm `handleAddressChange` sẽ được gọi mỗi khi người dùng nhập một ký tự mới, xóa một ký tự hoặc thực hiện bất kỳ chỉnh sửa nào trên ô văn bản. Hàm sẽ được kích hoạt mỗi khi giá trị của trường nhập liệu thay đổi.

## II. Đối số event

Hàm được truyền vào `onChange` sẽ nhận đối số là một `event`, tương tự như khi làm việc với DOM.

Tuy nhiên, `event` này về mặt kỹ thuật là sự kiện tổng hợp (synthetic event)

Bạn có thể đọc giá trị được viết bởi người dùng bằng cách truy cập vào: `event.target.value`:

```jsx
function handleAddressChange(event) {
    console.log(event.target.value);
}

<input type="text" name="address" onChange={handleAddressChange} />
```

Trong ví dụ này, `event.target` tham chiếu đến phần tử (trong ví dụ này là `<input />`). Vì đó là một trường nhập liệu, bạn đọc nội dung bên trong nó bằng cách truy cập trường thuộc tính `.value`.

## III. Target vs currentTarget

Nếu bạn đã từng viết code JavaScript thuần túy, bạn có thể đã quen việc sử dụng `currentTarget` thay cho `target` (vì `currentTarget` luôn tham chiếu đến phần tử mà bạn gọi `addEventListener` trong khi `target` sẽ phụ thuộc vào vị trí chính xác mà người dùng nhấp chuột).

Khi sử dụng `onChange` của React, không có sự khác biệt giữa `target` và `currentTarget` vì chỉ có một phần tử duy nhất mà không có phần tử con. Do đó, cả hai giá trị sẽ trỏ đến cùng một phần tử.

Bạn sẽ thấy nhiều nhà phát triển sử dụng `target` và đó cũng là một thực hành mà bạn nên làm theo.

## IV. Hàm nội tuyến

Các hàm inline (nội tuyến) thường được sử dụng với biểu mẫu vì bạn thường cần có một trình xử lý sự kiện nhỏ, ví dụ:

```jsx
<input type="text" name="address" onChange={event => console.log(event.target.value)} />
```

:::tip Tóm lại
 
- `onChange` trên trường nhập liệu sẽ được kích hoạt mỗi khi người dùng thay đổi nội dung của trường nhập liệu.
- Bạn có thể đọc văn bản do người dùng nhập bằng `event.target.value`.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Thay đổi nội dung của ô `<input> `trong React?

Để thay đổi nội dung của ô `<input>` trong React, bạn cần sử dụng state để kiểm soát giá trị của input. Đây là cách tạo một controlled component, nơi React là nguồn dữ liệu duy nhất cho giá trị hiển thị.

### Câu 2: Cách hoạt động của input?

Tạo state để lưu giá trị input bằng useState

Gắn giá trị input với state qua thuộc tính value

Cập nhật state khi người dùng gõ bằng sự kiện onChange