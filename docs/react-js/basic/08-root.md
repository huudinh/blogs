---
sidebar_position: 8
---

# Phần tử Root

Ứng dụng được xây dựng bằng React có một phần tử root duy nhất (Trường hợp sử dụng phổ biến nhất)

![Create-HTML-1](images/root.jpg) 

<ToggleTOC />


## I. Phần tử Root

Phần tử root, còn được gọi là container.

Phần tử root mà bạn truyền cho ReactDOM sẽ được React quản lý hoàn toàn. Vì vậy, bạn không nên viết bất kỳ code JavaScript nào để thay đổi nội dung của nó.

Vì vậy, nếu bạn có:

```jsx
<div id="react-root"></div>

import React from "react";
import {createRoot} from "react-dom/client";

const root = document.querySelector("#react-root");

createRoot(root)
    .render(
        React.createElement("h1", {}, "Hello World")
    );
```

Bạn không nên làm bất cứ điều gì với biến root và `<div id="react-root">...</div>` vì ReactDOM sẽ quản lý nó.

Chúng được quản lý bởi ReactDOM vì sau này bạn sẽ hiển thị những thứ phức tạp hơn phần tử có thể được cập nhật trong tương lai. Và ReactDOM sẽ chịu trách nhiệm cho việc cập nhật này.

## II. Ứng dụng được xây dựng bằng React

Ứng dụng được xây dựng bằng React thường có một phần tử root duy nhất, giống như chúng ta sẽ thấy trong suốt khóa học này.

Toàn bộ ứng dụng được hiển thị bên trong phần tử root đó.

## III. Tích hợp React vào Ứng dụng

Trang web có thể được xây dựng bằng một công nghệ khác ngoài React và sau đó tích hợp React để làm cho một phần cụ thể của trang web có khả năng tương tác với người dùng.

Ví dụ, bạn có trang web Siêu thị được xây dựng bằng Ruby on Rails hoặc Laravel và nếu bạn muốn làm cho tính năng giỏ hàng có thể tương tác với người dùng, bạn có thể sử dụng React để làm điều đó.

Trong trường hợp đó, logic của giỏ hàng sẽ nằm trong phần tử root `<div id="react-cart"></div>`.

Và ứng dụng có thể chứa nhiều hơn một phần tử root trong tương lai.

:::tip Tóm lại
 
- ReactDOM quản lý hoàn toàn phần tử root
- Bạn không nên trực tiếp thay đổi/cập nhật nội dung của phần tử root
- Ứng dụng được xây dựng bằng React có một phần tử root duy nhất (Trường hợp sử dụng phổ biến nhất)
- Ứng dụng có thể tích hợp React để làm cho tính năng tương tác có nhiều hơn một phần tử root.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Phần tử root trong React là gì?

Phần tử root (còn gọi là container) là phần tử HTML mà React sẽ quản lý toàn bộ nội dung bên trong. Đây là nơi ReactDOM gắn kết giao diện người dùng được tạo bằng React vào DOM của trình duyệt.

### Câu 2. Tại sao không nên thay đổi nội dung phần tử root bằng JavaScript?

Vì ReactDOM sẽ quản lý toàn bộ nội dung bên trong phần tử root. Nếu bạn thay đổi nội dung bằng JavaScript bên ngoài React, điều đó có thể gây ra xung đột hoặc làm sai lệch trạng thái giao diện do React kiểm soát.

### Câu 3. Một ứng dụng React có bao nhiêu phần tử root?

Thông thường, một ứng dụng React có một phần tử root duy nhất. Toàn bộ giao diện người dùng sẽ được hiển thị bên trong phần tử này. Tuy nhiên, trong một số trường hợp tích hợp, ứng dụng có thể có nhiều phần tử root.

### Câu 4. Có thể tích hợp React vào một phần của trang web không?

Có. Bạn có thể tích hợp React vào một phần cụ thể của trang web được xây dựng bằng công nghệ khác (như Laravel, Ruby on Rails). Ví dụ: bạn có thể dùng React để xử lý logic giỏ hàng trong phần tử <div id="react-cart"></div>.