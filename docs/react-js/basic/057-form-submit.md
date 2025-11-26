---
sidebar_position: 57
---

# Form Submit

Trong các dự án thực tế, `form` có thể có nhiều hơn một trường dữ liệu và chúng ta thường gặp các phần tử `<select />` hoặc `<textarea />`.

Quá trình làm cho những phần tử đó trở thành controlled component tương tự như với `<input />`.

![Create-HTML-1](images/components.jpg) 

<ToggleTOC />

## I. Select

```jsx
import {useState} from "react";

function App() {
    const [country, setCountry] = useState("");

    return <select value={country} onChange={e => setCountry(e.target.value)}>
        <option>Country</option>
        <option value="netherlands">Netherlands</option>
        <option value="belgium">Belgium</option>
        <option value="france">France</option>
    </select>
}
```

`event` được đổi tên thành `e` để cho ngắn gọn.

## II. Textarea

```jsx
import {useState} from "react";

function App() {
    const [comment, setComment] = useState("");

    return <textarea value={comment} onChange={e => setComment(e.target.value)} />
}
```

## III. Nhiều giá trị đầu vào

Khi làm việc với nhiều giá trị đầu vào và giả sử không có quá trình kiểm tra tính hợp lệ của dữ liệu đầu vào (chúng ta chưa học về chủ đề này), bạn nên sử dụng hàm nội tuyến vì mục đích của `onChange` chỉ là thiết lập `state`.

Chúng ta sử dụng một biến `state` khác nhau cho mỗi trường nhập liệu:

```jsx
import {useState} from "react";

function Form() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    return <form>
        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
        <input type="text" name="address" value={address} onChange={e => setAddress(e.target.value)} />
    </form>
}
```

## IV. Gửi Form

Phần tử Form trong React hoạt động tương tự như trong các ứng dụng không sử dụng React, tức là khi bạn `submit` form, nó sẽ gửi dữ liệu đến trang hiện tại và dẫn đến việc tải lại trang.

Cách thực hiện cũng tương tự trong React, chúng ta cần gọi `event.preventDefault()` trong sự kiện `submit`:

```jsx
function App() {

    function handleFormSubmit(event) {
        event.preventDefault();
    }

    return <form onSubmit={handleFormSubmit}>
        <input type="text" name="name" />
        <input type="submit" value="Add" />
    </form>;
}
```

:::tip Tóm lại

- Bạn có thể làm cho `<select />` và `<textarea />` trở thành controlled component giống như bạn làm với `<input />`.
- Mỗi `input` cần một biến `state` riêng của nó.
- Bạn có thể ngăn chặn việc gửi biểu mẫu bằng cách sử dụng trình xử lý `onSubmit` trên `<form />`, sau đó gọi `event.preventDefault()`.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Submit form trong react diễn ra như thế nào?

Việc submit form trong React diễn ra theo cách có kiểm soát, nghĩa là bạn sẽ xử lý sự kiện onSubmit bằng JavaScript thay vì để trình duyệt tự reload trang như trong HTML truyền thống. Đây là cách React giúp bạn kiểm soát dữ liệu và hành vi của form.

### Câu 2: Quy trình submit form trong React?

Tạo state để lưu dữ liệu nhập vào: Dùng useState để lưu giá trị từ các input.

Gắn sự kiện onChange cho các input: Để cập nhật state mỗi khi người dùng nhập dữ liệu.

Gắn sự kiện onSubmit cho form: Dùng một hàm xử lý để kiểm tra, gửi dữ liệu, hoặc gọi API.

Ngăn hành vi mặc định của form: Dùng e.preventDefault() để tránh reload trang.