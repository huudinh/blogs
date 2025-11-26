---
sidebar_position: 24
---

# Pure function (Hàm thuần túy)

React yêu cầu các component là thuần túy để có thể cập nhật DOM một cách hiệu quả chỉ khi cần thiết.

![Create-HTML-1](images/components.jpg) 

<ToggleTOC />

## I. Props là thuộc tính chỉ đọc

Để giúp React đạt được hiệu suất tối ưu, điều quan trọng là tuân theo một trong những quy tắc quan trọng nhất của React, đó là:

Tất cả các component React không bao giờ thay đổi các props của chúng.

Điều này có nghĩa là bạn không nên thay đổi giá trị của prop bên trong component, hãy xem một ví dụ:

```jsx
function Notifications(props) {
    // ❌ 
    props.data.count = props.data.count - 1;
    return <h3>You have {props.data.count} unread notifications.</h3>;
}

const notifications = {
    count: 3
};

const element = <Notifications data={notifications} />;
console.log(notifications); // {count: 2}
```

Để ý việc sử dụng phần tử `<Notifications  data={notifications}/>` có tác dụng phụ là thay đổi giá trị của props (notifications.count).

Thay vào đó, code nên được viết như sau:

```jsx
function Notifications(props) {
    // ☑️ 
    const value = props.data.count - 1;
    return <h3>You have {value} unread notifications.</h3>;
}

const notifications = {
    count: 3
};

const element = <Notifications data={notifications} />;
console.log(notifications); // {count: 3}
```

Vì vậy, bạn nên coi props là thuộc tính chỉ đọc.

## II. Cùng đầu vào, cùng đầu ra

Để duy trì triết lý cùng đầu vào, cùng đầu ra, component không nên sửa đổi bất kỳ biến nào bên ngoài React. Ví dụ, đây không phải là hàm thuần túy và cần được tránh:

```jsx
let count = 0;

function Counter () {
  // ❌ không thuần túy- không dùng
  count = count + 1;

  return <p>{count}</p>;
}
```

Sau này, chúng ta sẽ học cách sử dụng `state` và `effects` (nếu cần thiết) để làm cho các component linh hoạt hơn trong khi vẫn duy trì tính thuần túy.

## II. Tại sao cần tuân thủ quy tắc của React

React không cho phép các component thay đổi props vì khi các hàm là thuần túy, điều đó có nghĩa là từ cùng một đầu vào (props), chúng sẽ luôn cho ra cùng một kết quả (đầu ra).

Điều này cho phép React nhanh chóng xác định các component nào cần được hiển thị lại khi một prop cụ thể được cập nhật. Quá trình này diễn ra như một phần của Virtual DOM. Điều này trở nên rất quan trọng khi ứng dụng chứa hàng trăm, thậm chí hàng nghìn component cần được hiển thị lại.

:::tip Tóm lại
 
- Tất cả các component React không bao giờ thay đổi các props của chúng.
- React yêu cầu các component là thuần túy để có thể cập nhật DOM một cách hiệu quả chỉ khi cần thiết.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Hàm thuần túy (pure function) trong React là gì?

Hàm thuần túy là hàm mà với cùng một đầu vào (props), luôn trả về cùng một đầu ra (JSX) mà không gây ra tác dụng phụ (side effects).

### Câu 2. Tại sao React yêu cầu component phải là hàm thuần túy?

Vì điều này giúp React dễ dàng xác định component nào cần được cập nhật, từ đó tối ưu hiệu suất khi cập nhật Virtual DOM.

### Câu 3. Props trong React có thể thay đổi bên trong component không?

Không. Props là thuộc tính chỉ đọc và không được phép thay đổi bên trong component.

### Câu 4. Làm thế nào để giữ component thuần túy nhưng vẫn có thể thay đổi giá trị hiển thị?

Sử dụng state (useState) và effect (useEffect) để quản lý dữ liệu thay đổi thay vì thay đổi biến hoặc props trực tiếp.

### Câu 5. Lợi ích của việc giữ component thuần túy là gì?

Dễ dự đoán hành vi component

Tối ưu hiệu suất với Virtual DOM

Dễ kiểm thử và bảo trì

### Câu 6. React xác định component nào cần re-render dựa trên điều gì?

Dựa trên sự thay đổi của props và state. Nếu component là thuần túy, React có thể dễ dàng so sánh props cũ và mới để quyết định có cần re-render hay không.