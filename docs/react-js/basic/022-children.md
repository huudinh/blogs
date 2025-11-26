---
sidebar_position: 22
---

# Props Children

props.children đại diện cho nội dung nằm giữa các thẻ của component.

![Create-HTML-1](images/components.jpg) 

<ToggleTOC />

## I. Props Children là gì?

Trong những bài học trước, chúng ta thấy props được sử dụng để đại diện cho các trường thuộc tính trên component.

Có một loại props đặc biệt dành cho trường thuộc tính con. 

Hãy xem một ví dụ:

```jsx
const element = <HeroTile>Welcome!</HeroTitle>
```

Nội dung nằm giữa các thẻ `<HeroTitle>` và `</HeroTitle>` được gọi là trường thuộc tính con.

Bạn có thể truy cập vào bằng cách sử dụng `props.children`

```jsx
const element = <HeroTitle>Welcome!</HeroTitle>
```

Một ví dụ về `props.children` là chuỗi `"Welcome!"`, nhưng trên thực tế, nó có thể là bất cứ kiểu dữ liệu nào.

## II. Không chỉ là văn bản

`props.children` có thể tham chiếu đến các phần tử hoặc component React khác (hoặc thậm chí là nhiều component)

```jsx
function Navbar(props){
    return <div className="navbar">{props.children}</div>;
}

const element = <Navbar>
    <HeroTitle>Welcome!</HeroTitle>
    <div>Some content</div>
    <p>Another content</p>
</Navbar>;
```
Trong ví dụ này, `props.children` là một mảng chứa 3 mục:

- `<HeroTitle>Welcome!</HeroTitle>`

- `<div>Some content</div>`

- `<p>Another content</p>`

Mặc dù `props.children` là một mảng nhưng kết quả cuối cùng của element là:

```html
<div className="navbar">
    <HeroTitle>Welcome!</HeroTitle>
    <div>Some content</div>
    <p>Another content</p>
</div>;
```

Như bạn thấy, thanh điều hướng bao gồm tất cả các trường thuộc tính con mà nó nhận được.

:::tip Tóm lại
 
- `props.children` đại diện cho nội dung nằm giữa các thẻ của component.
- `props.children` có thể là một mảng hoặc phần tử.
- `props.children` có thể chứa văn bản và/hoặc các phần tử React và/hoặc các component React.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Props Children là gì trong React?

props.children là một props đặc biệt đại diện cho nội dung nằm giữa các thẻ mở và đóng của một component.

### Câu 2. props.children có thể chứa những kiểu dữ liệu nào?

props.children có thể là:

Chuỗi văn bản

Một phần tử React

Một mảng các phần tử

Một component

Bất kỳ kiểu dữ liệu hợp lệ trong JSX

### Câu 3. Tại sao props.children lại hữu ích trong việc xây dựng giao diện?

Vì nó cho phép component bao bọc và hiển thị nội dung con một cách linh hoạt, giúp tái sử dụng component dễ dàng hơn.