---
sidebar_position: 111
---

# Xuất nhiều component

Trong React, bạn có thể xuất nhiều component từ một file duy nhất. Điều này rất hữu ích khi bạn có nhiều component liên quan đến nhau và muốn nhóm chúng lại với nhau.

![Create-HTML-1](images/react.jpg) 

<ToggleTOC />

## I. Nhiều hơn 1 component từ cùng một file

Bạn có thể xuất nhiều hơn 1 component từ cùng một file. Dưới đây là một ví dụ

```jsx
// Button.js
import clsx from "clsx";

function ButtonPrimary(props) {
    const {children, className, ...rest} = props;
    const classes = clsx("btn-primary", className);
    return <button className={classes} {...rest}>{children}</button>;
}

function ButtonSecondary(props) {
    const {children, className, ...rest} = props;
    const classes = clsx("btn-secondary", className);
    return <button className={classes} {...rest}>{children}</button>;
}

export {ButtonPrimary, ButtonSecondary};
```

## II. Thêm nhiều component

Ở trên chúng ta đã xuất hai component: `ButtonPrimary` và `ButtonSecondary`.

Đây là named export chứ không phải default export. Dưới đây là cách bạn thêm chúng từ một file khác:

```jsx
import {ButtonPrimary, ButtonSecondary} from "./Button.js";
```

:::tip[Tóm lại]

Nhìn chung, bạn thường sẽ xuất một (default) component trong mỗi file. Tuy nhiên, khi một file xuất nhiều component liên quan chặt chẽ đến nhau, việc xuất nhiều (named) component là chấp nhận được.

:::

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Trong React, có thể xuất nhiều component từ một file duy nhất không?

Có, bạn có thể xuất nhiều component từ một file duy nhất. Điều này rất hữu ích khi bạn có nhiều component liên quan đến nhau và muốn nhóm chúng lại với nhau.

### Câu 2. Khi xuất nhiều component từ một file, nên sử dụng default export hay named export?

Nên sử dụng named export khi xuất nhiều component từ một file. Điều này giúp dễ dàng quản lý và tái sử dụng các component.

### Câu 3. Tại sao việc xuất nhiều component từ một file lại hữu ích?

Vì nó giúp nhóm các component liên quan lại với nhau, dễ quản lý, tái sử dụng và giảm số lượng file nhỏ lẻ trong dự án.

### Câu 4. Khi nào thì nên xuất nhiều component từ một file?

Khi các component có liên quan chặt chẽ đến nhau và thường được sử dụng cùng nhau, việc xuất nhiều component từ một file sẽ giúp tổ chức code gọn gàng và dễ quản lý hơn.
