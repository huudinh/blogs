---
sidebar_position: 80
---

# Object trong LocalStorage 

API localStorage chỉ hỗ trợ lưu trữ chuỗi dưới dạng khóa và giá trị, vì vậy, nếu bạn muốn lưu trữ `arrays` hoặc `objects`, bạn cần chuyển đổi chúng thành chuỗi.

![Create-HTML-1](images/localStorage.png) 

<ToggleTOC />

## I. Chuyển đổi đối tượng thành chuỗi

Bạn có thể làm điều này bằng cách sử dụng hàm `JSON.stringify()`.

```js
const person = {
    id: 1,
    name: "Sam"
};

JSON.stringify(person); // '{"id":1,"name":"Sam"}'
```

## II. Lưu đối tượng vào localStorage

Sau khi chuyển đổi mảng hoặc đối tượng thành chuỗi, bạn có thể lưu nó trong localStorage:

```js
const person = {
    id: 1,
    name: "Sam"
};

localStorage.setItem("person", JSON.stringify(person));
```

## III. Khôi phục đối tượng từ localStorage

Nếu bạn muốn khôi phục đối tượng đó từ localStorage, bạn cần chuyển đổi nó từ chuỗi thành đối tượng/mảng bằng cách sử dụng `JSON.parse()`:

```js
let person = localStorage.getItem("person");
person = JSON.parse(person);
console.log(person); // {id: 1, name: "Sam"}
```

:::tip Tóm lại
- Cả mảng và đối tượng đều được coi là đối tượng trong JavaScript.
- Trước khi lưu trữ mảng/đối tượng vào localStorage, bạn cần chuyển đổi chúng thành chuỗi.
- `JSON.stringify(object)` sẽ chuyển đổi một đối tượng/mảng thành chuỗi.
:::

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Tại sao cần phải chuyển đổi object hoặc array thành chuỗi khi lưu vào LocalStorage?

Vì LocalStorage chỉ chấp nhận giá trị là chuỗi, nên ta cần chuyển đổi object hoặc array thành chuỗi bằng JSON.stringify() trước khi lưu.

### Câu 2. Hàm nào được sử dụng để chuyển đổi object thành chuỗi trước khi lưu vào LocalStorage?

Hàm JSON.stringify() được dùng để chuyển đổi object hoặc array thành chuỗi JSON.

### Câu 3. Làm sao để khôi phục lại object từ LocalStorage sau khi đã lưu?

Dùng localStorage.getItem() để lấy chuỗi và JSON.parse() để chuyển ngược lại thành object.

### Câu 4. Nếu bạn quên dùng JSON.parse() sau khi lấy dữ liệu từ LocalStorage thì điều gì xảy ra?

Dữ liệu vẫn sẽ ở dạng chuỗi JSON, không thể truy cập trực tiếp các thuộc tính của object

### Câu 5. Sự khác biệt giữa JSON.stringify() và JSON.parse() là gì?

JSON.stringify() chuyển đổi object/array → chuỗi JSON.

JSON.parse() chuyển đổi chuỗi JSON → object/array.

### Câu 6. Làm sao để kiểm tra dữ liệu trong LocalStorage bằng trình duyệt?

Mở DevTools → tab Application → mục LocalStorage → chọn domain hiện tại, bạn sẽ thấy danh sách key – value được lưu.