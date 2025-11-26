---
sidebar_position: 13
---

# Attribute expression

Biểu thức thuộc tính là giá trị của thuộc tính được xác định dựa trên biểu thức (hoặc thường là biến)

![Create-HTML-1](images/jsx.jpg) 

<ToggleTOC />

## I. Ví dụ thực tế

```jsx
const limit = 5;

const element = <input type="number" max={limit} />;
```

Khi chuyển đổi thành `React.createElement()`, code sẽ có dạng:

```jsx
const limit = 5;
const element = React.createElement("input", {
  type: "number",
  max: limit
});
```

Ví dụ này cho thấy các thuộc tính có thể có giá trị chuỗi cũng như giá trị động; ví dụ: thuộc tính max lấy giá trị của biến `limit`.

## II. Dấu ngoặc kép hoặc Biểu thức

Bạn chỉ nên sử dụng một trong hai cách để chỉ định giá trị cho thuộc tính. Bạn có thể sử dụng dấu ngoặc kép cho giá trị thuộc tính HOẶC sử dụng dấu ngoặc nhọn cho biểu thức, nhưng không được sử dụng cả hai cùng lúc.

Vì vậy, ví dụ sau không hợp lệ: `<input max="{limit}" />`, câu lệnh SẼ KHÔNG hoạt động.

Cách làm hợp lệ là: `<input max={limit} />`

Nguyên tắc chung:

- Nếu giá trị là chuỗi ký tự thì đóng gói trong dấu ngoặc kép.

- Nếu giá trị là động (kết quả của một biểu thức) thì đóng gói trong dấu ngoặc nhọn {}.

## III. Số và boolean

Giá trị của các thuộc tính số và boolean nên được truyền dưới dạng biểu thức:

```js
<input max={2} disabled={true} className="textbox" />
```

:::tip Tóm lại
 
- Nếu giá trị của thuộc tính là chuỗi ký tự thì đóng gói trong dấu ngoặc kép.
- Nếu giá trị của thuộc tính là biểu thức thì đóng gói trong dấu ngoặc nhọn {}.
- Giá trị của các thuộc tính số và boolean nên được truyền dưới dạng biểu thức

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Attribute expression trong JSX là gì?

Attribute expression là giá trị của một thuộc tính được xác định bằng biểu thức JavaScript, thường là một biến hoặc phép toán, và được đặt trong dấu ngoặc nhọn {}.

### Câu 2. Có thể dùng cả dấu ngoặc kép và dấu ngoặc nhọn cho cùng một thuộc tính không?

Không. JSX không cho phép kết hợp cả hai

### Câu 3. Nguyên tắc chung khi truyền giá trị cho thuộc tính trong JSX là gì?

Nếu là chuỗi tĩnh → dùng dấu ngoặc kép "..."

Nếu là biểu thức động → dùng dấu ngoặc nhọn `{...}`