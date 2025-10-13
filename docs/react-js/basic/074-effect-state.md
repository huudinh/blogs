---
sidebar_position: 74
---

# Có nên update State trong Effect

Nhìn chung, bạn được khuyến khích không nên cập nhật state từ bên trong `useEffect`. 

![Create-HTML-1](images/effect.webp) 

<ToggleTOC />

## I. Lỗi phổ biến

Việc cập nhật State trong Effect có thể cần thiết trong một số tình huống. Trong trường hợp đó, bạn nên tránh mắc phải những lỗi phổ biến nhất mà các lập trình thường gặp phải.

```jsx
import {useState, useEffect} from "react";

// THIS IS INCORRECT
function App() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // this will end up creating an infinite loop
        setCount(previousCount => previousCount + 1);
    });
}
```

Đoạn code trên không chính xác vì nó tạo ra một vòng lặp vô hạn. 

## II. Tại sao có một vòng lặp vô hạn?

- Khi bạn gọi `setCount()` với một giá trị mới, nó sẽ dẫn đến việc hiển thị lại component.
- Điều này dẫn đến việc gọi lại component App.
- Do đó, effect sẽ chạy lại. Kết quả là `setCount()` được gọi lại và cứ tiếp tục như vậy.

## III. Cách khắc phục 

Phụ thuộc vào mục đích xây dựng component, phương pháp sẽ liên quan đến việc truyền một phụ thuộc cho hiệu ứng, từ đó giới hạn hiệu ứng chỉ chạy trong một số điều kiện cụ thể hoặc chỉ chạy một lần.

Nếu trạng thái mới có thể được tính toán từ trạng thái hiện tại thì bạn không cần biến trạng thái mới. 

## IV. Bài toán thực tế

Giả sử bạn có một trạng thái lưu trữ danh sách chương. Nếu bạn chỉ muốn hiển thị các chương đã hoàn thành (chương có isCompleted === true) thì bạn không cần tạo một biến trạng thái mới để lưu trữ danh sách này. Bạn chỉ cần tạo một biến được tính toán từ biến trạng thái ban đầu. Dưới đây là cách thực hiện:

```jsx
import {useState} from "react";

const exampleData = [{
  id: 1,
  title: "Strings",
  isCompleted: true
}, {
  id: 2,
  title: "Numbers",
  isCompleted: false
}];

function App() {
  const [chapters, setChapters] = useState(exampleData);

  const completedChapters = chapters.filter(chapter => chapter.isCompleted);

  return <ul>
    {completedChapters.map(chapter => <li key={chapter.id}>{chapter.title}</li>)}
  </ul>;
}
```

:::tip Tóm lại

- Nói chung, tốt nhất là bạn nên tránh thiết lập trạng thái bên trong `useEffect`.
- Gọi `setState` bên trong `useEffect` có thể dẫn đến một vòng lặp vô hạn. Bạn phải truyền một phụ thuộc cho `useEffect`.

:::

<iframe width="560" height="315" src="https://www.youtube.com/embed/Z8jiQbFcrKo?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. Có nên cập nhật state bên trong useEffect không?

Nhìn chung, bạn được khuyến khích không nên cập nhật state từ bên trong useEffect. Việc này có thể dẫn đến những lỗi không mong muốn, đặc biệt là vòng lặp vô hạn.

### Câu 2. Lỗi phổ biến nhất khi cập nhật state trong useEffect là gì?

Lỗi phổ biến nhất là tạo ra một vòng lặp vô hạn. Điều này xảy ra khi bạn gọi setCount() (hoặc bất kỳ hàm cập nhật state nào) bên trong useEffect mà không có một dependency array phù hợp. Khi setCount() được gọi, nó sẽ render lại component, dẫn đến việc useEffect chạy lại, gọi lại setCount(), và cứ thế tiếp diễn.

### Câu 3. Tại sao việc gọi setCount() trong useEffect mà không có dependency array lại tạo ra vòng lặp vô hạn?

Khi setCount() được gọi với một giá trị mới, nó sẽ khiến component hiển thị lại. Việc này dẫn đến việc component App được gọi lại, và do đó, effect cũng sẽ chạy lại. Kết quả là setCount() được gọi lại và cứ tiếp tục như vậy, tạo thành một vòng lặp vô hạn.

### Câu 4. Làm thế nào để khắc phục lỗi vòng lặp vô hạn khi cần cập nhật state trong useEffect?

Cách khắc phục phụ thuộc vào mục đích của component. Phương pháp chính là truyền một mảng phụ thuộc (dependency array) cho useEffect. Điều này sẽ giới hạn effect chỉ chạy trong một số điều kiện cụ thể (khi các giá trị trong mảng phụ thuộc thay đổi) hoặc chỉ chạy một lần (nếu mảng phụ thuộc rỗng - []).

### Câu 5. Nếu trạng thái mới có thể được tính toán từ trạng thái hiện tại, có cần tạo biến trạng thái mới không?

Không, nếu trạng thái mới có thể được tính toán từ trạng thái hiện tại, bạn không cần tạo một biến trạng thái mới. Thay vào đó, bạn chỉ cần tạo một biến được tính toán trực tiếp từ biến trạng thái ban đầu. Điều này giúp tránh việc cập nhật state không cần thiết trong useEffect và giữ cho code đơn giản hơn.

### Câu 6. Việc truyền một mảng phụ thuộc (dependency array) cho useEffect có ý nghĩa gì?

Việc truyền một mảng phụ thuộc cho useEffect có nghĩa là bạn đang chỉ định các giá trị mà khi chúng thay đổi, useEffect sẽ được thực thi lại. Nếu mảng phụ thuộc rỗng ([]), effect sẽ chỉ chạy một lần sau lần render đầu tiên của component. Nếu mảng phụ thuộc chứa các biến, effect sẽ chạy lại mỗi khi bất kỳ biến nào trong mảng đó thay đổi giá trị. Điều này giúp kiểm soát chặt chẽ việc thực thi của effect và ngăn chặn các vấn đề như vòng lặp vô hạn.