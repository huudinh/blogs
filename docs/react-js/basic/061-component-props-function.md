---
sidebar_position: 61
---

# Truyền Function vào Props

Chúng ta đã xem ví dụ về props chứa giá trị boolean, chuỗi, số, mảng và đối tượng. Ngoài ra, props cũng có thể chứa hàm.

![Create-HTML-1](images/components.jpg) 

<ToggleTOC />

## I. Props có thể chứa hàm

Dưới đây là một ví dụ Props là 1 hàm  (để thuận tiện, cả hai component được định nghĩa trong cùng một file):

```jsx
function App() {
    function handleWelcome() {
        console.log("Hello World");
    }

    return <StoreFront onWelcome={handleWelcome} />;
}

function StoreFront(props) {
    props.onWelcome();

    return <div>Store renders here</div>;
}
```

Cùng phân tích các bước:

1. Chúng ta định nghĩa phương thức `handleWelcome` trong component cha tên là `App`.
2. Sau đó, chúng ta hiển thị component `StoreFront` và truyền một `prop` có tên là `onWelcome`.
3. Prop `onWelcome` là một hàm (tham chiếu đến hàm `handleWelcome`)
4. Từ bên trong component `StoreFront`, chúng ta có thể gọi hàm đó bằng` props.onWelcome()`.

Hello World sẽ được in ra màn hình.

Tuy nhiên, ví dụ này chưa có giá trị sử dụng thực tế và có vẻ phức tạp hơn mức cần thiết. Tại sao không định nghĩa hàm đó trong StoreFront? Hãy tạm thời bỏ qua câu hỏi này và tập trung vào cách thực hiện, các bước tiếp theo sẽ giải thích lý do và ý nghĩa của việc này.

## II. Quy ước đặt tên

Khi truyền hàm, bạn cần tuân theo quy ước đặt tên sau:

1. Các hàm vẫn được gọi bằng cách sử dụng `handleSubjectEvent`. (Ví dụ trên đã được đơn giản hóa và không có `Event` nên ta đã bỏ qua nó)

2. Đối với `props` là hàm, bắt đầu chúng với `onSubjectEvent`. Điều này giúp phân biệt dễ dàng giữ các phần tử `props` là hàm.

### Ví dụ:

```jsx
function App() {
    function handleStoreOpen() {

    }

    function handleItemClick() {

    }

    return <StoreFront onStoreOpen={handleStoreOpen} onItemClick={handleItemClick} />
}
```

Để ý `onStoreOpen` là một prop truyền một hàm và tương tự cho onItemClick.

:::tip Tóm lại

- Props có thể chứa hàm.
- Component có thể truyền hàm cho component con thông qua prop.
- Quy ước đặt tên: `onSubjectEvent={handleSubjectEvent}`

:::

<iframe width="560" height="315" src="https://www.youtube.com/embed/gQc_kVyZ-wo?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Props có thể chứa hàm không tại sao?

Props trong React chỉ đơn giản là các giá trị JavaScript được truyền từ component cha xuống component con. Mà trong JavaScript, hàm cũng là một giá trị, giống như chuỗi, số, mảng hay object. Vì vậy, bạn có thể truyền một hàm như một prop mà không gặp vấn đề gì.

### Câu 2: Lợi ích của việc truyền hàm qua props?

Giao tiếp từ con lên cha: Component con có thể gọi hàm được truyền từ cha để gửi dữ liệu ngược lại hoặc kích hoạt một hành động.

Tái sử dụng logic: Component cha có thể định nghĩa logic xử lý và truyền xuống nhiều component con khác nhau.

Tách biệt giao diện và logic: Component con chỉ lo hiển thị và gọi hàm, còn logic xử lý nằm ở component cha.

