---
sidebar_position: 92
---

# Fetch khi thay đổi onChange

Một trường hợp sử dụng phổ biến khác của `fetch` là tải dữ liệu khi người dùng chọn một giá trị từ danh sách thả xuống.

![Create-HTML-1](images/fetch.webp) 

<ToggleTOC />

## I. Fetch nên nằm trong useEffect

Nhớ rằng bạn phải đóng gói `console.log(currency)` bằng `useEffect` với phụ thuộc là `currency`. Điều này cho phép ta chạy một đoạn code mỗi khi giá trị của `currency` thay đổi.

```jsx
import {useState, useEffect} from "react";

function CurrencySelector() {
    const [currency, setCurrency] = useState("");

    useEffect(() => {
        console.log(currency);
    }, [currency]);

    function handleCurrencyChange(event) {
        setCurrency(event.target.value);
    }

    return <>
        <h3>Select currency</h3>
        <select onChange={handleCurrencyChange}>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
        </select>
        <h1>{currency}</h1>
    </>;
}
```

Giả sử bạn muốn tải một số dữ liệu dựa trên loại tiền tệ được chọn; bạn không nên làm điều đó bên trong `handleCurrencyChange` vì vào thời điểm đó, giá trị `currency` chưa được cập nhật thành giá trị mới nhất (trạng thái).

Thay vào đó, cuộc gọi `fetch` nên nằm bên trong:

```jsx
useEffect(() => {
    console.log(currency);
    // fetch call here
}, [currency]);
```

:::tip Tóm lại

- Nếu bạn cần thực hiện một cuộc gọi `fetch` dựa trên một giá trị trạng thái có thể thay đổi thì tốt nhất là nên chạy yêu cầu `fetch` bên trong `useEffect` với phụ thuộc là biến trạng thái đó.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/QePvBp5w4y4?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Tại sao không nên gọi fetch trực tiếp trong handleCurrencyChange?

Vì tại thời điểm đó, state currency chưa được cập nhật thành giá trị mới nhất. Fetch sẽ dùng giá trị cũ, dẫn đến dữ liệu không chính xác.

### Câu 2. Fetch nên được đặt ở đâu để đảm bảo luôn dùng giá trị currency mới nhất?

Fetch nên nằm trong useEffect với dependency [currency], để mỗi khi currency thay đổi thì fetch sẽ chạy với giá trị mới.

### Câu 3. Viết đoạn code useEffect để thực hiện fetch dữ liệu khi currency thay đổi.

```jsx
useEffect(() => {
  if (currency) {
    fetch(`https://api.example.com/data?currency=${currency}`)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }
}, [currency]);

```