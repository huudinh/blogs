---
sidebar_position: 9
---

# Giới thiệu về JSX

JSX có cú pháp giống HTML nhưng không phải là HTML

![Create-HTML-1](images/jsx.jpg) 

<ToggleTOC />

## I. JSX

Khi làm việc với React, bạn cần sử dụng `React.createElement` để biểu diễn giao diện người dùng. Tuy nhiên, cú pháp của nó khá dài. Cú pháp sẽ trở nên càng dài và nhàm chán hơn khi bạn bắt đầu phát triển giao diện người dùng phức tạp hơn.

React sử dụng một cú pháp đặc biệt được gọi là JSX để giải quyết vấn đề đó. Cú pháp JSX trông có vẻ giống HTML, nhưng nó KHÔNG PHẢI LÀ HTML.

Hãy xem một ví dụ:

```jsx
import React from "react";

const title = <h1>Hello World</h1>
```

Mặc dù trông giống HTML nhưng nó không phải là HTML.

Đoạn code trên được biên dịch thành:

```jsx
import React from "react";

const title = 
    React.createElement(
        "h1", 
        {}, 
        "Hello World"
    );
```

Cách nào nào dễ đọc hơn?

Cách đầu tiên vì tại đó bạn đang diễn đạt rõ ràng rằng bạn cần tạo phần tử `h1` chứa văn bản `Hello World`.

## II. JSX là cú pháp rút gọn cho React.createElement

JSX cung cấp cú pháp rút gọn (code dễ đọc/viết hơn) cho hàm `React.createElement`.

Thay vì viết `React.createElement` mỗi khi cần tạo phần tử, bạn chỉ cần viết phần tử trong JSX.

Hãy luôn nhớ rằng JSX mà bạn viết sẽ được chuyển đổi thành `React.createElement`. Vì vậy, JSX được tạo ra để giúp bạn mô tả giao diện người dùng một cách dễ dàng hơn.


## III. JSX KHÔNG PHẢI là một phần của trình duyệt

Trình duyệt không hiểu được JSX vì đó là một cú pháp được tạo bởi React.

Bạn sẽ cần một công cụ (như babel) để chuyển đổi code JSX thành JavaScript thông thường (sẽ chứa các cuộc gọi `React.createElement`).

## IV. JSX không yêu cầu phải thêm vào React

Trước React 17, bạn phải thêm React vào file JavaScript để code JSX hoạt động trong mọi file mà bạn sử dụng JSX.

Điều này không còn cần thiết nữa.

Nếu bạn nâng cấp mã nguồn từ React 16 lên phiên bản mới hơn, bạn có thể giữ lại câu lệnh `import React`; chúng sẽ không gây ra bất kỳ vấn đề gì.

## V. JSX với ReactDOM

Dưới đây là một ví dụ sử dụng JSX với ReactDOM:

```jsx
<div id="root"></div>

import React from "react";
import {createRoot} from "react-dom/client";

const root = document.querySelector("#root");

createRoot(root).render(<h1>Hello World</h1>);
```

Đoạn code này sẽ hiển thị `<h1>Hello World</h1>` trong phần tử #root.

### Tóm lại

- JSX là cú pháp đặc biệt cho React giúp bạn dễ dàng biểu diễn giao diện người dùng
- JSX có cú pháp giống HTML nhưng không phải là HTML
- Code JSX bạn viết được chuyển đổi thành `React.createElement`
- JSX không phải là một phần của trình duyệt. Bạn cần một công cụ để chuyển đổi code thành JavaScript hợp lệ.

:::tip Tóm lại
 
- Thuộc tính trong JSX được truyền làm đối số thứ hai của `React.createElement(...)`
- `<div className="active"></div>` là cách bạn gán lớp active cho phần tử này.
- Code JSX bạn viết được chuyển đổi thành React.createElement
- Khi thiết lập giá trị cho thuộc tính là chuỗi, chúng ta cần đóng gói giá trị đó trong dấu ngoặc kép.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. JSX là gì và tại sao nó được sử dụng trong React?

JSX là một cú pháp đặc biệt được React giới thiệu để mô tả giao diện người dùng một cách dễ đọc và dễ viết hơn. Thay vì sử dụng cú pháp dài dòng của React.createElement, bạn có thể viết phần tử giống như HTML. Tuy nhiên, JSX không phải là HTML.

### Câu 2. JSX có giống HTML không?

JSX có cú pháp trông giống HTML, nhưng nó không phải là HTML.

### Câu 3. JSX có phải là cú pháp thay thế cho React.createElement không?

Đúng vậy. JSX là cú pháp rút gọn cho React.createElement. Thay vì viết lời gọi hàm thủ công, bạn chỉ cần viết phần tử JSX và nó sẽ được chuyển đổi tự động trong quá trình biên dịch.

### Câu 4. Trình duyệt có hiểu được JSX không?

Không. Trình duyệt không hiểu JSX vì đây là cú pháp do React tạo ra. Bạn cần sử dụng công cụ như Babel để chuyển đổi JSX thành JavaScript thông thường trước khi trình duyệt có thể chạy được.