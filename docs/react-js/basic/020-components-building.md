---
sidebar_position: 20
---

# Xây dựng Components

Định nghĩa một component trong mỗi file riêng biệt để dễ gỡ lỗi code hơn

![Create-HTML-1](images/components.jpg) 

<ToggleTOC />

## I. Quy ước

Một file chỉ chứa 1 Component

Một ứng dụng được xây dựng bằng React sẽ có nhiều component.

Quy ước là định nghĩa một component trong mỗi file riêng biệt để sau này dễ dàng tìm thấy nó.

Tên file phải khớp với tên Component, ví dụ:

- file: Footer.js cho Component Footer

- file: AppNavbar.js cho Component AppNavbar

## II. File index.js

Ứng dụng sẽ có một file `index.js` là điểm mà quá trình chạy ứng dụng bắt đầu (đôi khi được gọi là `app.js`).

Vì vậy, bạn sẽ định nghĩa các component trong những file khác và sau đó sử dụng chúng trong index.js.

## III. Xây dựng component Footer

Hãy xem một ví dụ bằng cách sử dụng hai file: `Footer.js` và `index.js`:

File `Footer.js` định nghĩa component Footer:

```jsx
//Footer.js
export default function Footer() {
    return (
        <>
             <h3>Footer</h3>
             <p>All rights reserved</p>
        </>
    );
}
```

Để ý file này sử dụng default export để khai báo component Footer.

Điều này là bắt buộc để có thể sử dụng component Footer trong các file khác.

```jsx
//index.js
import {createRoot} from "react-dom/client";
import Footer from "./Footer.js";

function App() {
    return (<>
         <Footer />
         <Footer />
    </>);
}

const root = document.querySelector("#root");

createRoot(root).render(<App />);
```

Để ý component Footer đã được thêm vào file `index.js` từ `./Footer.js` để file có thể sử dụng component.

Điều đó là vì `<Footer />` được chuyển đổi thành: `React.createElement(Footer, {})` vì vậy để component hoạt động, hàm `Footer` phải có phạm vi hoạt động trong file `index.js`, tức là nó phải được thêm vào file.

Ngoài ra, đoạn code hiển thị `Footer` hai lần bằng cách sử dụng component hai lần trong component App.

## III. Luôn đặt tên cho các component

Mặc dù bạn có thể xuất một function component mà không cần đặt tên (hàm ẩn danh), bạn vẫn nên đặt tên các thành phần được xuất. Điều này sẽ giúp dễ dàng gỡ lỗi code vì bạn sẽ thấy tên component khi có lỗi xảy ra bên trong nó, thay vì chỉ thấy lỗi trong hàm ẩn danh.

```jsx
//Footer.js
// this is NOT recommended 
export default function () {
    return (
         <h3>Footer</h3>
    );
}
```

:::tip Tóm lại
 
- Định nghĩa một component trong mỗi file riêng biệt để dễ gỡ lỗi code hơn.
- Tên file cần khớp với tên Component.
- Để sử dụng một Component đã được định nghĩa, bạn cần xuất nó ra.
- Để sử dụng một Component được định nghĩa trong file khác, bạn cần thêm nó vào file hiện tại.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Tại sao nên định nghĩa mỗi component trong một file riêng biệt?

Việc định nghĩa mỗi component trong một file riêng biệt giúp dễ dàng quản lý và gỡ lỗi code, đồng thời giúp tìm kiếm và tái sử dụng component thuận tiện hơn.

### Câu 2. Tên file chứa component nên được đặt như thế nào?

Tên file nên khớp với tên của component. Ví dụ:

Component Footer nên được đặt trong file Footer.js

Component AppNavbar nên được đặt trong file AppNavbar.js

### Câu 3. Vai trò của file index.js trong ứng dụng React là gì?

File index.js là điểm khởi đầu của ứng dụng React, nơi khởi tạo và render component gốc (thường là App) vào DOM.

### Câu 4. Tại sao cần sử dụng export default khi định nghĩa component?

Sử dụng export default cho phép component được import và sử dụng trong các file khác. Đây là cách phổ biến để chia sẻ component trong React.

### Câu 5. Có thể xuất một component mà không đặt tên không?

Có thể, nhưng không nên. Việc đặt tên cho component giúp dễ dàng xác định lỗi khi debug, vì tên component sẽ hiển thị trong thông báo lỗi thay vì chỉ là “hàm ẩn danh”.