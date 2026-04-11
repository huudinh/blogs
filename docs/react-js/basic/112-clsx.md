---
sidebar_position: 112
---

# Thư viện clsx

clsx là một thư viện JavaScript nhỏ gọn (chỉ ~239 byte) dùng để kết hợp và xử lý chuỗi className trong React một cách linh hoạt, đặc biệt khi bạn cần gán class có điều kiện. Nó thường được dùng thay thế cho thư viện classnames vì nhanh hơn và nhẹ hơn.

![Create-HTML-1](images/react.jpg) 

<ToggleTOC />

## I. Cài đặt

Để cài đặt clsx, chạy lệnh:

```bash
npm install clsx
```

Gói `clsx` có kích thước khoảng 300 byte (nhỏ hơn 1KB), vì vậy bạn không cần lo lắng về kích thước của gói khi thêm vào dự án.

## II. Thêm clsx vào file

Bạn có thể sử dụng `clsx` trong bất kỳ bài tập React nào bằng cách nhập lệnh import vì gói đã được cài đặt sẵn.

Để thêm clsx, bạn phải thêm clsx từ tên gói:

```
import clsx from "clsx";
```

## III. Sử dụng clsx

Sau khi đã thêm `clsx`, hãy xem cách thư viện giúp đơn giản hóa việc sử dụng lớp có điều kiện:

```jsx
import clsx from "clsx";

const result = clsx({
    "link": true,
    "link-primary": true
});

console.log(result); //"link link-primary"
```

Chúng ta đã truyền cho clsx một đối tượng chứa:

Khóa `link` với giá trị `true`

Khóa `link-primary` với giá trị `true`, kết quả trả về một chuỗi chứa cả hai lớp được phân tách bằng dấu cách.

Hãy xem một ví dụ khác:

```jsx
import clsx from "clsx";

const result = clsx({
    "link": true,
    "link-primary": false
});

console.log(result); //"link"
```

Đây về cơ bản cùng một cách làm như ví dụ trước. Tuy nhiên, lần này chúng ta chỉ định rằng `link-primary` là `false`, vì vậy chuỗi kết quả sẽ không bao gồm `link-primary`.

Thay vì thiết lập giá trị cố định là `true` hoặc `false`, điều gì sẽ xảy ra nếu chúng ta thay thế chúng bằng một biến hoặc kết quả của một biểu thức? 

```jsx
import clsx from "clsx";

function MyComponent(props) {
    const className = clsx({
        "title": props.loggedIn
    });

    return <h1 className={className}></h1>
}

const example1 = <MyComponent loggedIn={true} />; // className="title"
const example2 = <MyComponent loggedIn={false} />; // className=""
```

Trong đoạn code trên, `props.loggedIn` là một giá trị `boolean`. Chúng ta sử dụng giá trị `boolean` đó để thêm/xóa lớp title theo điều kiện:

- khi `props.loggedIn` là `true`, `clsx` nhận `{"title": true}` và trả về chuỗi `title`.

- Ngược lại, khi `props.loggedIn` là `false`, `clsx` nhận `{"title": false}` và trả về chuỗi rỗng `""`.

Vì vậy, `clsx` cho phép ta sử dụng các lớp có điều kiện mà không cần viết điều kiện if

Bạn cũng có thể kết hợp những khái niệm này theo cách sao cho luôn có một lớp cố định mà không bị ảnh hưởng bởi điều kiện, trong khi vẫn có thể áp dụng một lớp khác theo điều kiện:

```jsx
import clsx from "clsx";

function MyComponent(props) {
    const className = clsx({
        "text": true, // this class is always added
        "title": props.loggedIn
    });

    return <h1 className={className}></h1>
}

const example1 = <MyComponent loggedIn={true} />; // className="text title"
const example2 = <MyComponent loggedIn={false} />; // className="text"
```

Để ý là lớp `text` sẽ luôn được thêm vào, không phụ thuộc vào bất kỳ điều kiện nào, trong khi lớp `title` chỉ được thêm vào dựa trên điều kiện, tùy thuộc vào giá trị `boolean` của `props.loggedIn`.

## IV. Áp dụng thực tế tạo Component Button

<iframe src="https://codesandbox.io/embed/6v7qd7?view=preview&module=%2Fsrc%2FButton.js"
     title="Button CLSX"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

```jsx
// Button.js
import clsx from "clsx";
import "./styles.css";

function ButtonPrimary(props) {
  const {children, className, ...rest} = props;
  const classes = clsx("btn", "btn-primary", className);
  return <button className={classes} {...rest}>{children}</button>;
}

function ButtonSecondary(props) {
  const {children, className, ...rest} = props;
  const classes = clsx("btn", "btn-secondary", className);
  return <button className={classes} {...rest}>{children}</button>;
}

function ButtonDanger(props) {
  const {children, className, ...rest} = props;
  const classes = clsx("btn", "btn-danger", className);
  return <button className={classes} {...rest}>{children}</button>;
}

export {ButtonPrimary, ButtonSecondary, ButtonDanger};

```

`clsx("btn", className)` sẽ luôn thêm class mặc định (btn) và kết hợp với class tùy chỉnh nếu có.

ButtonDanger minh họa thêm một component mới, giúp bạn thấy cách mở rộng dễ dàng.

Khi import, ta dùng cú pháp named import với {} để lấy đúng tên component đã export.

:::tip[Tóm lại]

- `clsx` là một tiện ích nhỏ được dùng để xây dựng chuỗi `className` theo điều kiện.
- `clsx({"your-class-name": booleanValue})` là cú pháp chung cho clsx.

:::


## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. clsx là gì?

clsx là một thư viện JavaScript nhỏ gọn (chỉ ~239 byte) dùng để kết hợp và xử lý chuỗi className trong React một cách linh hoạt, đặc biệt khi bạn cần gán class có điều kiện. Nó thường được dùng thay thế cho thư viện classnames vì nhanh hơn và nhẹ hơn.

### Câu 2. Ưu điểm của clsx là gì?

Ưu điểm của clsx là: 
- Nhỏ gọn
- Nhanh
- Dễ sử dụng
- Linh hoạt
- Dễ dàng quản lý và tái sử dụng các component.

### Câu 3. Làm thế nào để luôn có một class cố định, đồng thời thêm class khác theo điều kiện?

Ta truyền giá trị true cho class cố định và dùng boolean cho class điều kiện.

### Câu 4. clsx có thể dùng với các thư viện UI khác không?

Có, clsx có thể dùng với các thư viện UI khác như Tailwind CSS, Bootstrap, Material UI, v.v.
