---
sidebar_position: 90
---

# Fetch API với onClick

Một trường hợp sử dụng phổ biến của `fetch` là tải dữ liệu khi người dùng nhấp chuột vào nút.

![Create-HTML-1](images/fetch.webp) 

<ToggleTOC />

## I. Xây dựng hàm xử lý onClick

Bạn có thể làm điều đó bằng cách viết code `fetch` bên trong hàm `handleButtonClick`

```jsx
function App() {
    const [isLoading, setIsLoading] = useState(false);

    function handleButtonClick() {
        setIsLoading(true);
        // fetch("...") as usual
    }

    return <button onClick={handleButtonClick}>Load data</button>;
}
```

Vì vậy, nếu bạn muốn thực hiện yêu cầu `fetch` trên sự kiện `onClick`, bạn cần đặt cuộc gọi `fetch` bên trong hàm `handleButtonClick` thay vì trong `useEffect`.

Lưu ý rằng chúng ta thiết lập giá trị mặc định của `isLoading` là `false` vì nó chỉ bắt đầu tải khi người dùng nhấp vào nút. Chúng ta bắt đầu hiển thị trình tải bên trong `handleButtonClick` bằng `setIsLoading(true)`.

## II. Vô hiệu hóa nút trong quá trình tải

Bạn có thể vô hiệu hóa nút trong quá trình tải bằng cách sử dụng biến trạng thái `isLoading`.

```jsx
<button disabled={isLoading}>Click me</button>
```

Điều này giúp tránh việc người dùng liên tục nhấp vào nút một khi đã bắt đầu yêu cầu `fetch`.

:::tip[Tóm lại]

- Bạn có thể tải dữ liệu khi nhấp vào nút bằng cách đặt cuộc gọi fetch trong hàm xử lý onClick.
- Bạn có thể vô hiệu hóa nút trong quá trình tải với `<button disabled={isLoading}>Nhấn vào đây</button>`.

:::

<iframe width="560" height="315" src="https://www.youtube.com/embed/4Q4r2mEAtKI?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Tại sao không nên đặt fetch trong useEffect nếu muốn thực hiện khi nhấp nút?

Vì useEffect chạy khi component render, còn yêu cầu fetch chỉ nên bắt đầu khi người dùng nhấp nút. Do đó, ta cần đặt fetch trong hàm xử lý sự kiện onClick.

### Câu 2. Tại sao vẫn cần .catch() ngay cả khi đã dùng .finally()?

Vì .finally() không xử lý lỗi. Nếu không có `.catch()`, lỗi từ Promise sẽ làm hỏng toàn bộ component.

### Câu 3. Khi nào ta gọi setIsLoading(true)?

Ngay trong hàm handleButtonClick, trước khi thực hiện fetch, để hiển thị trạng thái đang tải.

### Câu 4. Làm thế nào để ngăn người dùng nhấp nút nhiều lần khi dữ liệu đang tải?

Gán thuộc tính `disabled={isLoading}` cho nút. Khi isLoading là true, nút sẽ bị vô hiệu hóa.