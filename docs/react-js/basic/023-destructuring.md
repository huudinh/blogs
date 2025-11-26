---
sidebar_position: 23
---

# Destructuring Props

Props là một đối tượng, vì vậy bạn có thể destructure props.

![Create-HTML-1](images/components.jpg) 

<ToggleTOC />

## I. Ôn tập destructuring

Hãy giả sử chúng ta có đối tượng person sau:

```js
const person = {
    firstName: "Sam",
    lastName: "Doe",
    age: 24
}
```

và bạn muốn tạo 2 biến firstName và lastName:

```js
const firstName = person.firstName;
const lastName = person.lastName;
```

Bạn có thể làm điều đó trong một dòng bằng cú pháp destructuring sau:

```js
const {firstName, lastName} = person;
```

Bạn cũng có thể cung cấp giá trị mặc định cho biến trong trường hợp không có giá trị tương ứng trong đối tượng.

```js
const {firstName, lastName, status = 'single'} = person;
```

Trong trường hợp này, `status` sẽ có giá trị mặc định là `"single"` vì đối tượng `person` không có thuộc tính này.

## II. Destructuring props

Việc sử dụng destructure cho props là không bắt buộc, nhưng đây là một kỹ thuật phổ biến và thường được sử dụng bởi nhiều bài hướng dẫn và các nhà phát triển. Do đó, việc nắm rõ kỹ thuật này là quan trọng.

Vì props là một đối tượng, bạn có thể sử dụng destructuring cho props.

Trước khi sử dụng destructuring:

```jsx
function WelcomeUser(props) {
    const username = props.username;
    const notifications = props.notifications;

    return <div>Welcome {username}! You've got {notifications} unread notifications.</div>;
}
```

Sau khi sử dụng destructuring:

```jsx
function WelcomeUser(props) {
    const {username, notifications} = props;

    return <div>Welcome {username}! You've got {notifications} unread notifications.</div>;
}
```
## III. Destructuring trong đối số

Bạn cũng có thể destructuring biến props trong đối số, thoạt nhìn thì code có vẻ khó đọc nhưng bạn sẽ thấy nó được sử dụng khá nhiều trong thực tế

```jsx
function WelcomeUser({username, notifications}) {
    return <div>Welcome {username}! You've got {notifications} unread notifications.</div>;
}
```

Thay vì viết `WelcomeUser(props)`, bạn ngay lập tức thay thế props bằng `{username, notifications}`, lệnh này trích xuất `props.username` và `props.notifications` và tạo ra 2 biến: `username` và `notifications`.

Bạn không nên lạm dụng kỹ thuật này vì nó có thể làm cho code khó đọc khi số lượng biến tăng lên.


:::tip Tóm lại
 
- `Props` là một đối tượng, vì vậy bạn có thể destructure props.
- Bạn có thể destructure props trong đối số.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Destructuring là gì trong JavaScript?

Destructuring là cú pháp cho phép bạn trích xuất giá trị từ đối tượng hoặc mảng và gán chúng vào các biến riêng biệt một cách ngắn gọn.

### Câu 2. Props trong React là kiểu dữ liệu gì?

Props là một đối tượng chứa các thuộc tính được truyền từ component cha sang component con.

### Câu 3. Ưu điểm của destructuring props là gì?

Giúp code ngắn gọn và dễ đọc hơn.

Tránh lặp lại props nhiều lần.

Phù hợp với các component có ít props.

### Câu 4. Khi nào không nên sử dụng destructuring trong đối số hàm?

Khi số lượng props quá nhiều, destructuring trong đối số có thể làm code khó đọc và khó bảo trì.