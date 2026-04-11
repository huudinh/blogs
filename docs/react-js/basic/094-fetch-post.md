---
sidebar_position: 94
---

# Post dữ liệu

Các cuộc gọi fetch mà ta đã thực hiện trong các chương trước là `fetch GET`. Ngược lại, POST thường được sử dụng để gửi thông tin cùng với yêu cầu fetch.

![Create-HTML-1](images/fetch.webp) 

<ToggleTOC />

## I. Get method

#### Cách viết tắt của fetch GET

```jsx
fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => response.json())
  .then(data => {
      console.log(data);
  });
```

#### Cách viết khác của fetch GET

```jsx
fetch("https://jsonplaceholder.typicode.com/users", {
    method: "GET" // this is a default
})
  .then(response => response.json())
  .then(data => {
      console.log(data);
  });
```

## II. Post method

#### Cách viết tắt của fetch POST

```jsx
fetch("https://jsonplaceholder.typicode.com/users", {
  method: "POST" 
})
  .then(response => response.json())
  .then(data => {
      console.log(data);
  });
```

Điều này cho phép chúng ta thực hiện một yêu cầu POST.

#### Cách viết khác của fetch POST

Trong hầu hết các trường hợp, bạn sẽ cần gửi một số dữ liệu cùng với yêu cầu

Một khuyến nghị dành cho bạn là khi làm việc với các API trả về dữ liệu dưới định dạng JSON, hãy luôn chỉ định header sau: Content-Type: "application/json".

Nó giống như việc bạn đang thông báo cho API rằng: Tôi đang gửi cho bạn một số dữ liệu dưới định dạng JSON.

Dưới đây là cú pháp của fetch POST:

```jsx
fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({grade: 50})
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);
  });
```

## III. Dự án thực hành

<iframe height="300"  scrolling="no" title="Untitled" src="https://codepen.io/DinhTrieu/embed/VYjXZQy?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/DinhTrieu/pen/VYjXZQy">
  Untitled</a> by Dinh (<a href="https://codepen.io/DinhTrieu">@DinhTrieu</a>)
  on <a href="https://codepen.io">CodePen</a>.
      </iframe>

Dữ liệu bên trong body sẽ được lấy từ một biến trạng thái

```jsx
function App() {
  const [number, setNumber] = useState(0);

  function handleFormSubmit(event) {
      event.preventDefault();

      fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          headers: {
              "Content-Type": "application/json; charset=UTF-8"
          },
          body: JSON.stringify({
            userId: number,
            title: 'foo',
            body: 'bar',
          })
      })
      .then(response => response.json())
      .then(data => {
          console.log("Number added");
          console.log(data);
      });
  }

  return <form onSubmit={handleFormSubmit}>
      <input type="number" value={number} name="grade" onChange={event => setNumber(event.target.value)} placeholder="Enter the number" />
      <input type="submit" />
      </form>
  ;
}

export default App
```

Để ý `userId: number` đang gửi một biến trạng thái tên là number, biến này được thiết lập trong trình xử lý `onChange` bằng cách gọi `setNumber(event.target.value)`.

:::tip[Tóm lại]

- fetch POST được sử dụng để gửi dữ liệu đến một API.
- fetch POST tương tự như fetch GET, ngoại trừ việc bạn phải chỉ định đối số thứ hai của hàm fetch().
- Bạn cần chỉ định method: "POST" và thường phải gửi body: `JSON.stringify(dataObjectHere)`.
- Đặt header "Content-Type": "application/json".
- fetch POST thường được đặt trong hàm `handleFormSubmit`, trong đó bạn gửi một trong các biến `state` trong `body`.

:::

<iframe width="560" height="315" src="https://www.youtube.com/embed/rPrYXF84g3s?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Sự khác biệt chính giữa fetch GET và fetch POST là gì?

fetch GET dùng để lấy dữ liệu từ server, còn fetch POST thường dùng để gửi dữ liệu kèm theo yêu cầu đến server.

### Câu 2. Khi sử dụng fetch POST, tại sao cần thêm header "Content-Type": "application/json"?

Header này thông báo cho server rằng dữ liệu trong body được gửi dưới định dạng JSON, giúp server hiểu và xử lý đúng dữ liệu.

### Câu 3. Làm thế nào để gửi dữ liệu trong body khi dùng fetch POST?

Dữ liệu được gửi bằng cách thêm thuộc tính body và sử dụng JSON.stringify()