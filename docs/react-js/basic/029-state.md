---
sidebar_position: 29
---

# State

Là trạng thái đề cập đến bất kỳ biến nào được định nghĩa bên trong Component với mục đích cập nhật sau này.

![Create-HTML-1](images/state.png)

<ToggleTOC />

## I. Ứng dụng State

Ví dụ: khi tạo component `<Stopwatch />`, chúng ta cần theo dõi số giây đã trôi qua. Số giây đã trôi qua không thể là prop vì hai lý do sau:

- Thuộc tính nên được lưu giữ bên trong component `<Stopwatch />` thay vì được truyền từ bên ngoài vào
- Thuộc tính cần được cập nhật/thay đổi! Prop được xem như dữ liệu đầu vào không thay đổi và không thể thay đổi giá trị của chúng trong quá trình chạy.

Nếu bạn đang thắc mắc về ý nghĩa của câu nói "thuộc tính nên được lưu trữ bên trong component thay vì được truyền từ bên ngoài", hãy nhớ rằng prop được truyền từ bên ngoài vào, ví dụ:

```jsx
<Stopwatch theme="dark" />
```

Theme là prop vì nó được truyền từ bên ngoài vào.

Theme không thể được thay đổi từ bên trong component Stopwatch, nó phải được thay đổi từ bên ngoài. Khi nó được thay đổi từ bên ngoài, nó sẽ được xử lý lại bởi component.

Đây là lý do tại sao theme là một prop. Chúng ta không có ý định cập nhật nó từ bên trong Stopwatch.

Trong khi đó, số giây đã trôi qua là một trạng thái vì chúng ta có ý định bắt đầu/ngừng đếm thời gian từ bên trong component `<Stopwatch />`.

## II. Điều gì xảy ra khi State thay đổi

Khi state được cập nhật, ReactDOM sẽ tự động hiển thị lại Component một cách hiệu quả trên DOM. 

Hãy xem một ví dụ khác.

Giả sử bạn đang tạo component `<Item />` chứa một bộ đếm.

Người dùng có thể tăng/giảm bộ đếm bằng cách nhấn các nút + và - để chọn số lượng sản phẩm.

`counter` là một biến trạng thái sẽ được cập nhật khi người dùng nhấp vào các nút + và -.

Khi người dùng nhấp vào các nút này, `counter` sẽ được cập nhật tự động trên giao diện người dùng.

Vì vậy, `0 item(s)` sẽ hiển thị thành `1 item(s)` khi người dùng nhấp vào nút `+`.

:::tip Tóm lại
 
- Trạng thái đề cập đến bất kỳ biến nào được định nghĩa bên trong Component với mục đích cập nhật sau này.
- Biến trạng thái có thể được cập nhật từ bên trong component.
- Khi một biến trạng thái được cập nhật, component sẽ tự động hiển thị lại.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: State là gì?

State là các biến đặc biệt được React quản lý bên trong một component, cho phép component đó lưu trữ dữ liệu động và tự động cập nhật giao diện khi giá trị thay đổi.

### Câu 2: State khác gì với các biến trong JavaScript

| Tiêu chí                           | **State trong React**                                | **Biến trong JavaScript**                     |
| ---------------------------------- | ---------------------------------------------------- | --------------------------------------------- |
| **Quản lý bởi React?**             | ✅ Có                                                 | ❌ Không                                       |
| **Lưu lại giữa các lần render?**   | ✅ Có                                                 | ❌ Không (biến thường bị reset mỗi lần render) |
| **Làm component tự render lại?**   | ✅ Có                                                 | ❌ Không                                       |
| **Dùng để hiển thị dữ liệu động?** | ✅ Rất phù hợp                                        | ❌ Không nên                                   |
| **Cập nhật qua đâu?**              | `useState`, `setState`                               | Gán trực tiếp (`=`, `++`, v.v.)               |
| **Nằm ở đâu?**                     | Trong component, được quản lý bằng hook (`useState`) | Trong function / block JS bình thường         |


### Câu 3: Mối quan hệ giữa Props và State

| Tiêu chí                        | **Props**                                           | **State**                                            |
| ------------------------------- | --------------------------------------------------- | ---------------------------------------------------- |
| **Nguồn dữ liệu**               | Được truyền **từ component cha**                    | Được **khởi tạo bên trong component**                |
| **Thay đổi ở đâu?**             | ✅ **Từ bên ngoài** (cha truyền vào)                 | ✅ **Từ bên trong** (component tự cập nhật)           |
| **Component có thể chỉnh sửa?** | ❌ Không được phép sửa props                         | ✅ Có thể sửa state qua `setState` / `setX`           |
| **Kích hoạt render lại?**       | ✅ Có, khi props thay đổi                            | ✅ Có, khi state thay đổi                             |
| **Mục đích**                    | Dùng để **truyền dữ liệu và cấu hình từ ngoài vào** | Dùng để **quản lý dữ liệu động bên trong** component |
| **Ví dụ**                       | `<Counter theme="dark" />`                          | `const [count, setCount] = useState(0)`              |
