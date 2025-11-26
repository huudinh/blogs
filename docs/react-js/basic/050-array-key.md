---
sidebar_position: 50
---

# Key trong React

Mỗi khi lặp qua map trong JSX, bạn cần cung cấp một key.

![Create-HTML-1](images/components.jpg)

<ToggleTOC />

## I. Key là gì

Mỗi khi sử dụng phương thức `map` trong JSX, bạn cần cung cấp một thuộc tính `key` để tránh gặp cảnh báo (vì lý do hiệu suất)

```jsx
function Grades() {
    const grades = [8, 18, 10, 10];

    return <ul>{
        grades.map((grade, index) => <li key={index}>{grade}</li>)
    }</ul>;
}
```

`key` nên là giá trị đại diện duy nhất cho từng phần tử trong danh sách. Tuy nhiên, trong trường hợp các phần tử không phải là duy nhất, chúng ta có thể sử dụng `index` được cung cấp bởi phương thức `.map` làm `key`.

Chỉ số bắt đầu từ 0 và tăng lên 1 sau mỗi lần lặp.

## II. Key có thể là giá trị của mảng

Nếu mảng chứa các mục duy nhất thì các giá trị của mục sẽ là `key`:

```jsx
function Users() {
    // collection of user ids
    const users = [1, 10, 3, 4, 13];

    return <ul>{
        users.map(user => <li key={user}>{user}</li>)
    }</ul>;
}
```

Vì vậy, việc sử dụng `index` làm key chỉ nên là phương án cuối cùng. Trong các ví dụ trước đây, vì chúng ta chỉ làm việc với mảng chứa chuỗi và mảng số nên việc sử dụng chỉ số làm `key` là tạm thời chấp nhận.

Tuy nhiên, khi tìm hiểu về mảng chứa đối tượng, bạn sẽ được hướng dẫn cách chọn giá trị `key` phù hợp cho từng trường hợp.

## III. Tại sao chúng ta cần key?

Khi một phần tử mảng thay đổi, React cần biết `li` nào cần được cập nhật; do đó, nó yêu cầu cung cấp một `key` duy nhất để chỉ cập nhật phần tử đó mà không xóa tất cả các `li` khác và hiển thị lại.

Cơ chế này cũng áp dụng cho thao tác thêm hoặc xóa phần tử.

```jsx
import {useState} from "react";

function Users() {
    // collection of user ids
    const [users, setUsers] = useState([4, 8, 10, 17, 13]);

    function handleRemoveClick() {
        // remember array immutability ;)
        setUsers(users.slice(1));
    }

    return <>
        <ul>{
            users.map(user => <li key={user}>{user}</li>)
        }</ul>
        <button onClick={handleRemoveClick}>Remove first user</button>
    </>;
}
```

Việc sử dụng `key={user}` với `user` là duy nhất sẽ cho phép React (cụ thể là DOM ảo) hiểu rằng vì các phần tử mới được hiển thị không chứa `<li key="4">`, vì vậy `li` này cần được xóa. Tất cả các `li` khác vẫn được giữ nguyên vẹn.

Nếu không có `key` này, React sẽ phải xóa tất cả các `li` và sau đó thêm chúng lại, điều này sẽ làm ứng dụng chậm đi rất nhiều.

:::tip Tóm lại
 
- Mỗi khi lặp qua `map` trong JSX, bạn cần cung cấp một `key`.
- `key` nên là duy nhất. Với phương án cuối cùng, bạn có thể sử dụng index của lần lặp trong map (đó là đối số thứ hai).
- `key` cho phép React cập nhật DOM một cách hiệu quả với ít thao tác nhất.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Tại sao trong React lại cần có Key?

Trong React, key là một thuộc tính đặc biệt dùng để giúp React xác định chính xác các phần tử trong danh sách khi có sự thay đổi — như thêm, xóa, hoặc sắp xếp lại. Nếu không có key, React sẽ gặp khó khăn trong việc cập nhật giao diện một cách hiệu quả và chính xác.

### Câu 2: Các Key có nhất thiết phải khác nhau?

Có — trong React, các key nhất thiết phải khác nhau trong cùng một danh sách. Đây là yêu cầu quan trọng để React có thể xác định chính xác từng phần tử khi thực hiện cập nhật giao diện.

Khi danh sách thay đổi (thêm, xóa, sắp xếp), React dùng key để biết phần tử nào cần giữ, cập nhật, hay loại bỏ.

Nếu có key trùng nhau, React có thể render sai dữ liệu, hoặc mất trạng thái của component con.

Key giúp React tránh việc re-render toàn bộ danh sách — chỉ cập nhật phần tử thực sự thay đổi.