---
sidebar_position: 16
---

# Thẻ tự đóng

Sử dụng cú pháp thẻ tự đóng cho các phần tử tự đóng trong JSX

![Create-HTML-1](images/jsx.jpg) 

<ToggleTOC />

## I. Thẻ tự đóng là gì?

HTML có một số thẻ tự đóng, đó là các thẻ HTML không thể chứa phần tử con; do đó, chúng không cần thẻ đóng.

Một ví dụ về thẻ tự đóng là thẻ `img` vì `<img />` không thể chứa phần tử con.

## II. Thẻ tự đóng trong HTML

Dưới đây là các thẻ tự đóng phổ biến nhất trong HTML:

- `img`

- `br` (ngắt dòng)

- `hr` (đường kẻ ngang)

- `input`

Trong HTML, bạn có thể viết các phần tử này dưới dạng phần tử tự đóng hoặc phần tử thông thường, ví dụ:

```html
<br>
<br />
```

Cả hai cách đều hợp lệ trong HTML5.

## III. Thẻ tự đóng trong JSX

Trong JSX, bạn không thể mở một phần tử mà không đóng nó, do đó, bạn nên sử dụng cú pháp thẻ tự đóng:

```jsx
const image = <img src="image.png" />
```

:::tip Tóm lại
 
- Sử dụng cú pháp thẻ tự đóng cho các phần tử tự đóng trong JSX.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Thẻ tự đóng là gì trong HTML?

Thẻ tự đóng là thẻ HTML không thể chứa phần tử con, vì vậy không cần thẻ đóng. 

Ví dụ: `<img />`, `<br />`,` <hr />`, `<input />`.

### Câu 2. Trong HTML5, có thể viết thẻ tự đóng theo những cách nào?

Có thể viết dưới dạng:

`<br>` (không có dấu /)

`<br />` (có dấu /) Cả hai đều hợp lệ trong HTML5.

### Câu 3. Trong JSX, có thể viết thẻ tự đóng như HTML không?

Không. Trong JSX, bắt buộc phải đóng thẻ

### Câu 4. Điều gì xảy ra nếu không đóng thẻ tự đóng trong JSX?

JSX sẽ báo lỗi cú pháp vì không cho phép mở thẻ mà không đóng.