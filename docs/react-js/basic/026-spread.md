---
sidebar_position: 26
---

# Toán tử spread "..."

Toán tử spread (...) là một cú pháp cực kỳ hữu ích được giới thiệu từ ES6

![Create-HTML-1](images/state.png)

<ToggleTOC />

## I. Toán tử spread

```js
const person = {
    id: 1,
    name: "Sam"
};

const details = {
    age: 23,
    loggedIn: true
};

const person_details = {...person, ...details};
/*
{
    id: 1,
    name: "Sam",
    age: 23,
    loggedIn: true
}
*/
```

...person truyền tất cả các thuộc tính và giá trị của đối tượng vào person_details mới và tương tự cho ...details.

Hãy xem một ví dụ khác về toán tử spread

```js
const person = {
    id: 1,
    name: "Sam",
    age: 23,
}
```

Giả sử bạn muốn tạo một đối tượng mới chứa tất cả các thuộc tính và giá trị ngoại trừ id, bạn có thể làm điều đó bằng cách sử dụng toán tử ... và cú pháp destructuring

```js
const {id, ...rest} = person;
console.log(id); //1
console.log(rest); //{name: "Sam", age: 23}
```

Chúng ta destructure id từ `person` (tương đương với `person.id`), và sau đó, chúng ta yêu cầu tất cả các thuộc tính và giá trị khác được lưu trong một đối tượng mới tên là rest.

Do đó, bạn sẽ có một đối tượng mới chứa tất cả các thuộc tính và giá trị khác (không có id vì nó đã được destructure).

Trong ví dụ này, `...` được gọi là trường thuộc tính rest vì bạn đang trích xuất tất cả các trường thuộc tính còn lại (rest).

## II. Spread attribute trong JSX

Việc sử dụng cú pháp này trong JSX đôi khi có khá nhiều công dụng hữu ích. Ví dụ, bạn có một Component nhận nhiều props và bạn muốn lấy ra children, sau đó destructure tất cả các props còn lại vào một biến mới và truyền chúng vào một phần tử

```jsx
function Navbar(props) {
    const {children, ...rest} = props;
    return <h1 {...rest}>{children}</h1>;
}
```

Chúng ta bắt đầu bằng cách destructure children từ props, sau đó chúng ta tạo một đối tượng mới gọi là rest chứa tất cả các props khác.

Và cuối cùng, chúng ta sử dụng cú pháp spread để truyền đối tượng này vào `<h1>`, theo đó truyền toàn bộ props vào phần tử `<h1>`.

Ví dụ, nếu bạn sử dụng Navbar như sau: `<Navbar tabIndex="2" className="navbar">Hello World</Navbar>`, bạn sẽ nhận được biến `children = "Hello World"` và biến `rest` với đối tượng sau:

```jsx
{
    tabIndex: "2",
    className: "navbar"
}
```

và sau đó Component sẽ trả về phần tử React sau:

```jsx
<h1 tabIndex="2" className="navbar">Hello World</h1>
```

Giả sử chúng ta thêm một thuộc tính mới, ví dụ: `disabled={true}`, khi đó code vẫn hoạt động và vẫn áp dụng thuộc tính `disabled` cho h1 mà không cần cập nhật Component.

## III. Khi nào nên sử dụng Spread

Mặc dù việc truyền thuộc tính theo cú pháp spread khá hữu ích nhưng nó có thể dẫn đến việc truyền các props không cần thiết cho những component không quan tâm đến chúng.

Trường hợp sử dụng phổ biến nhất của Spread Attributes là xây dựng UI và muốn tùy chỉnh phần tử được hiển thị.

:::tip Tóm lại
 
- Truyền thuộc tính theo cú pháp spread trong JSX cho phép bạn lấy tất cả các props (hoặc một phần của props) và truyền chúng vào phần tử được hiển thị mà không cần viết từng props một cách riêng biệt.

- Truyền thuộc tính theo cú pháp spread thường được sử dụng khi xây dựng UI.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Toán tử Spread là gì?

Toán tử spread (...) trong JavaScript là một cú pháp cực kỳ hữu ích được giới thiệu từ ES6, dùng để "giải nén" các phần tử của một mảng, object, hoặc iterable khác vào một vị trí mà nhiều phần tử hoặc giá trị được mong đợi.

### Câu 2: Ứng dụng phổ biến của Spread?

- Sao chép mảng hoặc object

- Gộp mảng

- Truyền đối số cho hàm

- Sao chép và cập nhật object

### Câu 3: Cách phân biệt với Rest Parameter?

- Spread: Giải nén phần tử ra ngoài.

- Rest (...): Gom các phần tử còn lại vào một mảng.

```jsx
function demo(...args) {
  console.log(args); // [1, 2, 3]
}
demo(1, 2, 3);
```