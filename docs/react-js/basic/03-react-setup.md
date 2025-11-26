---
sidebar_position: 3
---

# Cài đặt React

Cài đặt react: npm install react

![Create-HTML-1](images/react.jpg) 

<ToggleTOC />

## I. Cài đặt từ gói NPM

Để cài đặt gói react vào dự án, bạn cần cài đặt bằng trình quản lý gói (npm hoặc yarn).

Chúng ta sẽ sử dụng Trình quản lý Gói Node (npm) trong suốt khóa học này.

```bash
npm install react
```
Trong khóa học này, tất cả các gói bạn cần đã được cài đặt sẵn, vì vậy bạn chỉ cần import (thêm) gói vào file JavaScript.

## II. Thêm React vào file JavaScript

React không phải là một phần của trình duyệt, vì vậy bạn phải thêm React vào các file JavaScript cần sử dụng. Mỗi file JavaScript là một mô-đun độc lập, đó là các biến và hàm và việc import trong một file/mô-đun không ảnh hưởng đến các file/mô-đun khác.

Dưới đây là cách thêm React (sau khi đã cài đặt React):

```jsx
import React from "react";
```

Đây được gọi là default import vì dạng này tuân theo cú pháp sau: import Something from "package-name".

Đây được gọi là bare import vì bạn không thêm vào từ đường dẫn file. 

Ví dụ thêm từ đường dẫn file: import Something from "./file". Thêm từ đường dẫn file luôn bắt đầu bằng `./.`

Bạn có thể sử dụng các trình biên dịch code trực tuyến như CodeSandbox, Codepen và StackBlitz.

## III. Đối tượng React

Khi bạn thêm React vào file JavaScript, bạn nhận được một đối tượng React chứa các phương thức và thuộc tính.

Chúng ta sẽ tìm hiểu về các phương thức một cách từng bước. Hãy bắt đầu với một trong các thuộc tính, đó là phiên bản.

React cung cấp phiên bản hiện tại bằng thuộc tính version; sau đây là cách bạn đọc phiên bản, giả định rằng bạn đã thêm React

```jsx
console.log(React.version); //"18.1.0"
```

Khi thêm vào file, React có kích thước là 6KB.

:::tip Tóm lại
 
- Cài đặt react: `npm install react`
- Thêm React vào các file cần thiết: `import React from "react"`
- Cách lấy phiên bản React hiện tại: `React.version`
- Khi thêm vào file, React có kích thước là 6KB.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Tại sao phải import React vào file JavaScript?

React không phải là một phần của trình duyệt, nên bạn cần import nó vào từng file JavaScript nơi bạn muốn sử dụng React. Mỗi file là một mô-đun độc lập, nên việc import trong một file không ảnh hưởng đến các file khác.

### Câu 2. Cách import React vào file JavaScript như thế nào?

Bạn sử dụng cú pháp import mặc định (default import): import React from "react";

Đây là dạng bare import vì không có đường dẫn file. Nếu import từ file cục bộ, bạn cần dùng đường dẫn bắt đầu bằng ./, ví dụ: import Something from "./file";

### Câu 3. Khi import React, bạn nhận được gì?

Bạn nhận được một đối tượng React chứa các phương thức và thuộc tính.