---
sidebar_position: 19
---

# Cách hoạt động của component

Component React là một hàm trả về Phần tử React

![Create-HTML-1](images/components.jpg) 

<ToggleTOC />

## I. Cách nhận biết Component

Cách React nhận biết rằng đó là component chứ không phải phần tử:

1. React kiểm tra ký tự đầu tiên của component, `F` (từ `Footer`).

2. Ký tự có viết hoa không? Nếu có thì đó là một component.

3. Ký tự có viết thường không? Nếu có thì đó là một phần tử.

Theo tài liệu React: Phần đầu tiên của thẻ JSX xác định kiểu của phần tử React. Kiểu viết hoa cho biết thẻ JSX đang tham chiếu đến component React.

Vì React coi các component bắt đầu bằng chữ thường như thẻ DOM thông thường, `<footer>` sẽ KHÔNG hoạt động trong trường hợp này; nó sẽ hiển thị phần tử HTML5 `<footer>` chứ không phải component Footer mà bạn định nghĩa.

## II. Phần tử và component

Vậy sự khác biệt giữa phần tử và component trong React là gì?

Component React là một hàm trả về phần tử React.

## III. Kết hợp các component

Dưới đây là cấu trúc tổng quan của ứng dụng:

```jsx
<App>
    <Navbar>
        <Logo />
        <Title>Supermarket</Title>
    </Navbar>
    <BrowserRouter>
        {/*...*/}
    </BrowserRouter>
    <Footer>
    </Footer>
</App>
```

Như bạn thấy, đoạn code là sự kết hợp của nhiều component.

## IV. Thẻ tự đóng

Tương tự như phần tử, bạn có thể sử dụng cú pháp tự đóng cho những component không có bất kỳ phần tử con nào. Vì vậy thay vì viết `<Logo></Logo>`, bạn có thể viết: `<Logo />`.

## V. Chuyển đổi JSX sang React.createElement

Khi bạn sử dụng JSX để viết code, trình biên dịch sẽ chuyển đổi code thành cuộc gọi `React.createElement`.

Hãy xem ví dụ code JSX được chuyển đổi thành cuộc gọi` React.createElement` cho Component:

```jsx
const element = <Footer />;
```

sẽ được chuyển đổi thành:

```jsx
const element = React.createElement(Footer, {});
```

Câu lệnh này truyền một tham chiếu đến hàm Footer, `React.createElement` sẽ  sử dụng tham chiếu này để gọi hàm. 

Để ý câu lệnh chỉ truyền tên hàm Footer (không có dấu ngoặc đơn) mà không gọi hàm (với dấu ngoặc đơn); lý do là để cho React biết chúng ta đang tham chiếu đến hàm nào. Và sau đó React sẽ tự động gọi hàm khi cần thiết.

## VI. Vòng lặp vô hạn

Khi bạn mới bắt đầu học React, bạn rất dễ gặp phải vòng lặp vô hạn; ví dụ, đoạn code sau sẽ tạo ra một vòng lặp vô hạn làm cho trình duyệt bị treo. Trong hầu hết các trường hợp, React sẽ cảnh báo cho bạn nếu bạn sắp tạo ra một vòng lặp vô hạn.

```jsx
function Button() {
    // Be careful: this is an infinite loop
    return <Button></Button>;
}
```

Điều này vì JSX `<Button></Button>` sẽ được chuyển đổi thành cuộc gọi `React.createElement(Button)`, cuộc gọi này sẽ gọi lại hàm `Button`. Vì vậy, hàm `Button` liên tục gọi lại chính nó.

Trong trường hợp này, chúng ta cần muốn trả về `<button></button>` (viết thường), đó là phần tử HTML `button` thay vì component `Button`.

:::tip Tóm lại
 
- Phần đầu tiên của thẻ JSX xác định kiểu của phần tử React.
- Kiểu viết hoa cho biết thẻ JSX đang đề cập đến component React.
- Component React là một hàm trả về Phần tử React.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. React phân biệt component và phần tử như thế nào?

React dựa vào ký tự đầu tiên của tên trong JSX:

Nếu viết hoa (ví dụ: Footer), đó là một component

Nếu viết thường (ví dụ: footer), đó là một phần tử HTML

### Câu 2. Điều gì xảy ra nếu bạn viết `<footer>` thay vì `<Footer>` trong JSX?

React sẽ hiểu `<footer>` là phần tử HTML5 thông thường, không phải component Footer bạn định nghĩa.

### Câu 3. Khi nào nên dùng thẻ tự đóng trong JSX?

Khi component không có phần tử con, bạn nên dùng cú pháp tự đóng, ví dụ: `<Logo />` thay vì `<Logo></Logo>`

### Câu 4. Tại sao không gọi hàm Footer() trực tiếp trong JSX?

Vì React cần tham chiếu đến hàm Footer, không gọi trực tiếp. React sẽ tự gọi hàm khi cần render component.