---
sidebar_position: 114
---

# Điều hướng cơ bản

Các thành phần chính của React Router là:

- BrowserRouter
- Routes
- Route
- Link

![Create-HTML-1](images/router.jpg) 

<ToggleTOC />

## I. BrowserRouter

Component `<BrowserRouter />` là một router sử dụng HTML5 history API (chủ yếu là phương thức pushState cho phép thay đổi URL của trang mà không kích hoạt hành vi làm mới trình duyệt).

BrowserRouter giữ giao diện người dùng đồng bộ với URL, điều đó có nghĩa là URL sẽ luôn phản ánh đúng route hiện đang được hiển thị.

Có nhiều loại Router khác nhau nhưng bạn sẽ chủ yếu sử dụng BrowserRouter.

Để BrowserRouter hoạt động, bạn cần đóng gói toàn bộ ứng dụng trong component đó:

```jsx
import {BrowserRouter} from "react-router-dom";

function App() {
    return <BrowserRouter>
        <div>The rest of your app goes here</div>
    </BrowserRouter>;
}
```

Việc có component `<BrowserRouter />` đóng gói toàn bộ ứng dụng là rất quan trọng. Trong các phần tiếp theo, bạn sẽ thấy rằng `<Routes />`, `<Route />` và `<Link />` sẽ được đặt bên trong `<BrowserRouter></BrowserRouter>`.

## II. Route

Component `<Route />` sẽ hiển thị một component khi trường thuộc tính path khớp với URL hiện tại trong trình duyệt.

Dưới đây là ví dụ về component `<Route />`:

```jsx
<Route path="/about" element={<About />}></Route>
```

Component `<About />`, được cung cấp cho Route thông qua trường thuộc tính element, chỉ được hiển thị khi URL của trình duyệt khớp với đường dẫn /about.

Hãy xem ví dụ đầy đủ:

```jsx
import {BrowserRouter, Route} from "react-router-dom";

function App() {
    return <BrowserRouter>
        <div>The rest of your app goes here</div>

        {/*We still need to wrap these two Route components with a <Routes />. Keep reading for now.*/}
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
    </BrowserRouter>;
}
```

Khi người dùng điều hướng đến `/`, component `<Home />` sẽ được hiển thị.

Tương tự, khi người dùng điều hướng đến `/about`, component `<About />` sẽ được hiển thị.

Vì vậy, URL trình duyệt sẽ được so sánh với trường thuộc tính path của mỗi component `<Route />`. Dựa trên kết quả so khớp này, các route tương ứng sẽ được xác định và chỉ các component liên quan sẽ được hiển thị.

## III. Routes

Component `<Routes />` sẽ đóng gói nhiều component `<Route />` và chỉ hiển thị `<Route />` khớp với URL hiện tại trong trình duyệt.

```jsx
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
    return <BrowserRouter>
        <div>The rest of your app goes here</div>

        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
        </Routes>
    </BrowserRouter>;
}
```

Điều quan trọng là phần tử `<Routes />` trực tiếp đóng gói các phần tử `<Route />`, tức là `<Route />` phải nằm trực tiếp bên trong trực tiếp` <Routes />`. Điều đó có nghĩa là bạn không nên có thành phần trung gian như `<div>` hoặc các phần tử khác ở giữa` <Routes />` và` <Route />`; nếu không, việc điều hướng có thể không hoạt động chính xác.

### Điều hướng một cách rõ ràng

```jsx
<Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/about" element={<About />}></Route>
</Routes>
```

nói đến việc React Router cho phép bạn định nghĩa các route một cách rõ ràng. Không có điều kiện if.

Bạn định nghĩa các route trong ứng dụng và cung cấp một path cho mỗi route. Và React Router sẽ biết route nào cần hiển thị.

:::tip[Tóm lại]
- Component `<BrowserRouter />` là một router sử dụng HTML5 history API (sử dụng phương thức pushState).
- Bạn phải đóng gói toàn bộ ứng dụng trong component `<BrowserRouter />`.
- Component `<Route />` sẽ hiển thị một component khi trường thuộc tính path khớp với URL hiện tại trên trình duyệt.
- Component `<Routes />` sẽ đóng gói nhiều component `<Route />` và chỉ hiển thị `<Route />` đầu tiên khớp với URL hiện tại trên trình duyệt.
- Component `<Routes />` phải trực tiếp đóng gói các component `<Route />`.
- Điều hướng một cách rõ ràng có nghĩa là định nghĩa các `route` mà không có điều kiện `if`. Bằng cách cung cấp đường path, React Router sẽ biết route nào cần hiển thị.
:::

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. BrowserRouter là gì và tại sao cần dùng nó?

BrowserRouter là một component của React Router sử dụng HTML5 history API để thay đổi URL mà không cần tải lại trang. Nó giữ cho giao diện người dùng đồng bộ với URL. Toàn bộ ứng dụng cần được bọc trong `<BrowserRouter>` để các thành phần như `<Routes>`, `<Route>` và `<Link>` hoạt động chính xác.

### Câu 2. Component `<Route>` hoạt động như thế nào?

Component `<Route>` hiển thị một component khi URL hiện tại khớp với thuộc tính `path`. Ví dụ, `<Route path="/about" element={<About />} />` sẽ hiển thị component `<About />` khi URL là `/about`.

### Câu 3. Sự khác biệt giữa `<Route>` và `<Routes>` là gì?

`<Route>` định nghĩa một route cụ thể với một `path` và `element` (component sẽ hiển thị). `<Routes>` là một component bao bọc, nó nhóm nhiều `<Route>` lại với nhau và chỉ hiển thị route đầu tiên khớp với URL hiện tại. `<Routes>` phải trực tiếp chứa các `<Route>`.

### Câu 4. Điều hướng một cách rõ ràng có nghĩa là gì?

Điều hướng một cách rõ ràng có nghĩa là định nghĩa các route mà không sử dụng điều kiện `if`. Bằng cách cung cấp `path` cho mỗi `<Route>`, React Router sẽ tự động xác định component nào cần hiển thị dựa trên URL hiện tại.
