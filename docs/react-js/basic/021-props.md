---
sidebar_position: 21
---

# Props 

Props là một đối tượng được truyền làm đối số đầu tiên của Component.

![Create-HTML-1](images/components.jpg) 

<ToggleTOC />

## I. Xây dựng component GreetUser

Giả sử chúng ta có một component tên là `<GreetUser>` hiển thị: Welcome Sam hoặc Welcome Alex.

Chúng ta cần làm cho component hiển thị Welcome và sau đó là tên người dùng.

Hãy bắt đầu bằng phiên bản hiển thị thủ công của component này

```jsx
//GreetUser.js
export default function GreetUser() {
    return <div>Welcome USER</div>;
}
```

Component `<GreetUser />` sẽ hiển thị Welcome USER.

## II. Props

Thay vì hiển thị `<GreetUser />`, chúng ta có thể hiển thị `<GreetUser user="Sam" />`.

`user="Sam"` là thuộc tính `user` với giá trị `Sam` được thêm vào component `GreetUser`.

Bây giờ chúng ta có thể đọc `user="Sam"` này như một đối tượng: `{user: "Sam"}`.

Chúng ta gọi đối tượng đó là props (viết tắt của properties - trường thuộc tính).

```jsx
//GreetUser.js
export default function GreetUser(props) {
    console.log(props); // {user: "Sam"}
    return <div>Welcome USER</div>;
}
```

Trường thuộc tính được truyền bây giờ nằm bên trong đối tượng mà hàm `GreetUser` nhận làm đối số đầu tiên.

Vì vậy, chúng ta có thể sử dụng biểu thức để hiển thị tên người dùng (có thể đọc là `props.user`):

```jsx
//GreetUser.js
export default function GreetUser(props) {
    return <div>Welcome {props.user}</div>;
}
```

- `<GreetUser user="Sam"/>` sẽ hiển thị `<div>Welcome Sam</div>`

- `<GreetUser user="Alex"/>` sẽ hiển thị `<div>Welcome Alex</div>`

Điều này làm cho component linh hoạt hơn và có thể tái sử dụng!

## III. React.createElement

Code JSX sau:

```jsx
<GreetUser user="Sam" id="2" />
```

được chuyển đổi thành:

```jsx
React.createElement(GreetUser, {user: "Sam", id: "2"});
```

Để ý các thuộc tính JSX trên Component được chuyển đổi thành props là đối số thứ hai của `React.createElement`.

### Truyền hàm qua props trong React

Truyền hàm qua props là cách bạn gửi một hàm (function) từ component cha xuống component con thông qua props, để con gọi lại hàm đó khi cần, thường dùng trong các tương tác như click, thay đổi, submit, v.v.

Component con không nên tự thay đổi state – thay vào đó, nó gọi hàm từ cha, để cha quyết định thay đổi gì.

```jsx
// ✅ Component Con
function ClickButton({ onClick }) {
  return <button onClick={onClick}>Click me</button>;
}

// ✅ Component Cha
function App() {
  const handleClick = () => {
    alert("Con đã gọi Cha!");
  };

  return <ClickButton onClick={handleClick} />;
}
```

| Thành phần                              | Vai trò                                     |
| --------------------------------------- | ------------------------------------------- |
| `handleClick`                           | Là một hàm định nghĩa trong **cha** (`App`) |
| `<ClickButton onClick={handleClick} />` | Truyền hàm xuống con qua prop `onClick`     |
| `onClick={onClick}` trong con           | Khi click, hàm cha được gọi                 |

:::tip Tóm lại
 
- Props là viết tắt của properties - thuộc tính.
- Props là một đối tượng được truyền làm đối số đầu tiên của Component.
- Các thuộc tính trên component được chuyển đổi thành một đối tượng gọi là Props.
- Props làm cho component linh hoạt hơn và dễ dàng tái sử dụng.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Props Children là gì trong React?

props.children là một props đặc biệt đại diện cho nội dung nằm giữa các thẻ mở và đóng của một component.

### Câu 2. props.children có thể chứa những kiểu dữ liệu nào?

props.children có thể là:

Chuỗi văn bản

Một phần tử React

Một mảng các phần tử

Một component

Bất kỳ kiểu dữ liệu hợp lệ trong JSX

### Câu 3. Tại sao props.children lại hữu ích trong việc xây dựng giao diện?

Vì nó cho phép component bao bọc và hiển thị nội dung con một cách linh hoạt, giúp tái sử dụng component dễ dàng hơn.