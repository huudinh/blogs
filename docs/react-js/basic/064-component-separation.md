---
sidebar_position: 64
---

# Phân chia component

Khi xây dựng ứng dụng với React, bạn có thể gặp các component lớn chứa hàng trăm dòng code. Các component cần được tái cấu trúc và chia nhỏ thành các component nhỏ hơn.

![Create-HTML-1](images/components.jpg) 

<ToggleTOC />

## I. Lợi ích


Phân chia một component thành các component nhỏ hơn mang lại một số lợi ích như:

- Tái sử dụng code: Bạn có thể tái sử dụng các component nhỏ ở bất kỳ đâu trong ứng dụng nếu cần thiết.
- Cô lập lỗi: Nếu bạn phát hiện lỗi trong phần nào đó của giao diện người dùng, bạn có thể cô lập nó trong 1 hoặc 2 component nhỏ thay vì component lớn.

```jsx
import React from "react";

function App() {
    return <>
        <form>{/* form to add a product */}</form>
        <ul>{/* list of products */}</ul>
    </>
}
```

Đoạn code trên có thể được tái cấu trúc thành:

```jsx
import React from "react";

function App() {
    return <>
        <AddProductForm />
        <ProductsList />
    </>
}
```

Chúng ta đã trừu tượng hóa form, tầm khoảng 10 dòng code, thành component `<AddProductForm>`. Chúng ta cũng trừu tượng hóa danh sách sản phẩm trong `<ul>`, khoảng 5 dòng code, thành component `<ProductsList />`.

Điều này giúp ta hiểu rõ hoạt động của ứng dụng vì tên component mô tả chức năng của component.

Ngoài ra, chúng ta cũng có thể tái sử dụng các component này ở nơi khác trong ứng dụng.

Bạn có thể hiểu trừu tượng như quá trình tạo ra một component từ một số phần của ứng dụng.

Dù vậy, bạn không nên vội vàng tạo component từ mọi thứ. 

## II. Khi nào nên phân chia component?

Việc phân chia một component thành các component con không phải là một quy trình cụ thể và chính xác. Những lời khuyên dưới đây chỉ mang tính chất chủ quan và không phải là bộ quy tắc mà chỉ đưa ra một số gợi ý. Không có một phương pháp chung áp dụng cho mọi trường hợp.

Bạn nên tuân thủ phương pháp Work In Progress khi xây dựng ứng dụng

1. Bạn bắt đầu xây dựng một component
2. Sau đó bạn nhận ra rằng component cần được tái cấu trúc
3. Bạn tiến hành tái cấu trúc
4. Đánh giá xem component đã hoạt động đủ tốt chưa và tiếp tục làm việc

Trong viễn cảnh lý tưởng, bạn sẽ có một bản đồ (hoặc cây) component trong ứng dụng; tuy nhiên, điều này không thực tế và gần như bất khả thi (do nhu cầu kinh doanh luôn thay đổi). Đó là lý do tại sao bạn cần tư duy về cấu trúc component (nhưng đừng tốn quá nhiều thời gian) và liên tục tái cấu trúc khi cần thiết.

Điều quan trọng là bạn hiểu rằng việc tái cấu trúc sẽ trở nên cần thiết vào một số thời điểm và dành thời gian để làm điều đó.

## III. Những yếu tố bạn cần xem xét

#### 1. Cần tái sử dụng code

Khi bạn nhận thấy một phần của giao diện người dùng (một số phần tử React trong JSX, ví dụ như danh sách ul và các phần tử con) cần được tái sử dụng ở một nơi khác, bạn có thể tạo một component từ phần đó của giao diện người dùng.

Ví dụ, khi xây dựng ứng dụng siêu thị, bạn có thể cần hiển thị Product trong nhiều giao diện khác nhau; khi đó bạn nên tạo component `<Product />` để có thể tái sử dụng.

#### 2. Component trở nên "quá phức tạp"

Khi component trở nên quá phức tạp, bạn nên phân chia thành các component nhỏ hơn.

Không có ngưỡng cụ thể để xác định khi nào một component trở nên "quá phức tạp"; đây cũng là một kiểu phân loại mang tính chủ quan.

Một số yếu tố giúp xác định component phức tạp là:

- Số dòng code (Ví dụ: hơn 200 dòng code - các nhóm đối tượng khác nhau sẽ có ý kiến khác nhau về con số này)
- Khó theo dõi: không rõ component đang làm gì và mất nhiều thời gian để hiểu cách nó hoạt động
- Vấn đề hiệu suất: Component được hiển thị lại quá nhiều lần làm trang tải chậm hoặc giật lag

#### 3. Chương trình có thể được phát triển thêm

Khi bạn chắc chắn rằng một phần của giao diện người dùng sẽ trở nên phức tạp hơn theo thời gian thì bạn nên phân chia component thành các component nhỏ hơn. Ví dụ, ứng dụng có danh sách đơn hàng hiện tại chỉ hiển thị mã vận đơn và tên đơn hàng. Tuy nhiên, bạn chắc chắn rằng nhóm dev đang lên kế hoạch thêm một số tính năng, ví dụ như theo dõi/hủy/chỉnh sửa đơn hàng.

Hãy nhớ rằng nhu cầu kinh doanh sẽ thay đổi liên tục và bất kỳ phần nào của ứng dụng cũng có thể trở nên phức tạp hơn theo thời gian; đây là lý do tại sao chúng ta chỉ tái cấu trúc một phần nhất định của giao diện người dùng nếu chắc chắn 99% rằng nó sẽ được phát triển thêm trong tương lai.

Khi tái cấu trúc, bạn có thể tạo các stateless component cho một phần của giao diện người dùng không phụ thuộc vào trạng thái, điều này hoàn toàn hợp lý.

Ví dụ, nếu bạn có phần chân trang tĩnh, bạn vẫn nên tạo một component cho chân trang.

Các yếu tố cần xem xét khi muốn phân chia component thành các component nhỏ hơn:

1 Cần tái sử dụng code

2 Component trở nên "quá phức tạp"

## IV. Ví dụ về Ứng dụng đặt phòng

- Liệt kê các phòng
- Bạn nhấp vào một phòng để chọn phòng và sau đó đặt phòng bằng cách nhấp vào nút Book
- Hiện tại, chúng ta chỉ có thông tin về vị trí của phòng, nhưng có khả năng sẽ bổ sung thêm tính năng cung cấp hình ảnh, mô tả phòng và nhiều tính năng khác.

Với yêu cầu trên, chúng ta có thể dự đoán cấu trúc component sau:

```
. 
└── <RoomBooking />
    ├── <RoomList />
    │   ├── <Room />
    │   ├── <Room />
    │   └── <Room />
    └── <BookRoom />
```

Mặc dù chỉ có thông tin về vị trí của phòng, ta vẫn quyết định tạo component `<Room />` vì ta dự đoán rằng ứng dụng sẽ được phát triển thêm tính năng. Nếu bạn không thể dự đoán được điều đó, bạn vẫn có thể tái cấu trúc component sau này.

Các component trên có thể thay đổi đáng kể nếu bạn có nhiều thông tin hơn; đây là lý do tại sao bạn nên tuân thủ phương pháp Work In Progress. 

Hãy dành thời gian để tái cấu trúc component khi dự án đưa ra những yêu cầu mới.

:::tip Tóm lại

- Việc phân chia component cho phép tái sử dụng code và cô lập lỗi.
- Hãy tuân theo phương pháp Work In Progress khi xây dựng ứng dụng.
- Hãy định hình cấu trúc component dựa trên nhu cầu hiện tại của dự án.
- Hãy nhớ rằng cấu trúc component sẽ thay đổi trong tương lai. Dành thời gian để tái cấu trúc component khi cần thiết.

:::


<iframe width="560" height="315" src="https://www.youtube.com/embed/qdYAwHS0ebI?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Tại sao cần phân chia Components?

Phân chia Components trong React không chỉ là một thói quen tốt—mà là chiến lược sống còn để xây dựng ứng dụng web hiện đại, dễ bảo trì và mở rộng.

- Tái sử dụng (Reusability)
- Dễ quản lý và bảo trì
- Tách biệt logic và giao diện
- Tối ưu hiệu năng
- Hợp tác nhóm hiệu quả
- Dễ dàng kiểm thử

### Câu 2: Khi nào nên phân chia Components?

Việc phân chia Components trong React nên được thực hiện bất cứ khi nào bạn muốn tăng tính tổ chức, khả năng tái sử dụng, và hiệu suất của ứng dụng.

- Khi một phần giao diện có thể tái sử dụng
- Khi một phần giao diện có logic riêng biệt
- Khi component trở nên quá dài hoặc phức tạp
- Khi cần kiểm thử (test) độc lập
- Khi bạn muốn tách biệt giao diện và logic
- Khi làm việc nhóm