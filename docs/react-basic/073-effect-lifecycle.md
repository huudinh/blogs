---
sidebar_position: 73
---

# Vòng đời Component qua useEffect

Hook useEffect trong React cho phép bạn xử lý các hiệu ứng phụ (side effects) như gọi API, tương tác với DOM, hoặc đăng ký sự kiện. Nó hoạt động tương tự như các phương thức vòng đời trong component dạng class, nhưng được sử dụng trong component hàm.

![Create-HTML-1](images/effect.webp) 

<ToggleTOC />

:::tip Lifecycle
- Sau lần đầu tiên component được gắn kết (thêm vào DOM)
- Sau mỗi lần component được hiển thị lại
- Sau khi component bị hủy gắn kết (xóa khỏi DOM)
- Sau mỗi lần hiển thị lại, khi một biến trạng thái thay đổi
:::

## I. Chạy một lần sau khi component được gắn kết (mounted)

Để chạy một hiệu ứng một lần sau khi component được gắn kết (thêm vào DOM), bạn cần gọi `useEffect` với mảng rỗng làm danh sách phụ thuộc.

```jsx
import {useEffect} from "react";

function App() {
    useEffect(() => {
        console.log("Once after component mounted")
    }, []);
}
```

Tương đương với componentDidMount trong class component.

Thường dùng để khởi tạo plugin phụ thuộc vào DOM (ví dụ: bản đồ, thư viện UI).

## II. Chạy một lần sau khi gắn kết + một lần trước khi hủy gắn kết (unmounted)

Bạn sẽ thực hiện tương tự như trên nhưng bổ sung thêm hàm dọn dẹp. Vì vậy, chúng ta sẽ trả về một hàm từ `useEffect`:

```jsx
import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log("Component đã gắn kết");

    return () => {
      console.log("Component chuẩn bị bị hủy gắn kết");
    };
  }, []);
}
```

Tương đương với `componentDidMount` và `componentWillUnmount`.

Dùng để khởi tạo và dọn dẹp các plugin hoặc hiệu ứng phụ như `setTimeout`, `setInterval`, hoặc đăng ký sự kiện.

## III. Chạy sau mỗi lần render

Bạn có thể chạy hiệu ứng sau mỗi lần hiển thị lại cũng như sau lần hiển thị đầu tiên (khi component được gắn kết):

```jsx
import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log("Chạy sau mỗi lần render");
  });
}
```

Tương đương với `componentDidUpdate` + `componentDidMount`.

Dùng để cập nhật giao diện hoặc thực hiện các hành động sau mỗi lần `render`.

## IV. Chạy khi giá trị cụ thể thay đổi

Đôi khi bạn muốn chạy hiệu ứng chỉ khi một biến trạng thái cụ thể hoặc props thay đổi (hoặc cả hai). Điều này có thể được thực hiện bằng cách truyền giá trị đó vào danh sách phụ thuộc:

```jsx
import { useEffect, useState } from "react";

function App(props) {
  const [first, setFirst] = useState(0);

  useEffect(() => {
    console.log("Chạy khi first hoặc props.user thay đổi");
  }, [first, props.user]);
}

```

Đoạn code trên sẽ yêu cầu React chỉ gọi hiệu ứng này lại khi ít nhất một trong hai giá trị thay đổi: `first` hoặc `props.user`.

>Lưu ý rằng hiệu ứng cũng sẽ chạy lần đầu tiên sau khi component được hiển thị.

Nếu bạn đã học về lớp trong React, điều này tương tự như `componentDidUpdate` nhưng thêm một điều kiện if để kiểm tra giá trị trước đó của trạng thái `first` và `prop user`.

## V. Sử dụng nhiều hiệu ứng trong một component

Bạn có thể có nhiều hiệu ứng trong cùng một component và mỗi hiệu ứng có thể có phụ thuộc khác nhau. Chỉ cần nhớ tuân thủ các quy tắc sử dụng hook và đặt tất cả hook ở đầu hàm và không bao giờ đóng gói chúng bằng điều kiện if.

```jsx
useEffect(() => {
  console.log("Chạy khi A thay đổi");
}, [A]);

useEffect(() => {
  console.log("Chạy khi B thay đổi");
}, [B]);
```

## VI. Lưu ý về việc sử dụng useEffect

Theo tài liệu chính thức: Hook là các hàm cho phép bạn "kết nối vào" trạng thái và các tính năng vòng đời của React từ các component hàm.

Hook `useEffect` "kết nối vào" vòng đời của component (khi nó được gắn kết, hủy gắn kết, v.v.).

Hook `useState` kết nối vào các tính năng state của React và cho phép bạn thiết lập state.

Kể từ React 18, hook `useEffect` chỉ được coi là phương án cuối cùng mà bạn có thể xem xét. Bạn không nên lạm dụng nó quá mức. Ngoài ra, hook này chủ yếu được sử dụng để đồng bộ với API bên ngoài. Vì vậy, bạn không nên sử dụng `useEffect` thường xuyên.

:::caution Bạn có thể chạy hiệu ứng
- Một lần sau khi component được gắn kết
- Một lần sau khi component được gắn kết + một lần trước khi hủy gắn kết
- Sau mỗi lần hiển thị lại
- Trên các lần hiển thị lại cụ thể

:::

<iframe width="560" height="315" src="https://www.youtube.com/embed/xrd5M1DuvbI?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### 1. useEffect là gì và vai trò của nó trong function component là gì?

useEffect là một Hook trong React cho phép bạn quản lý các tác vụ phụ (side effects) trong component hàm. Các tác vụ phụ này bao gồm việc gọi API, tương tác với DOM, hoặc đăng ký và hủy đăng ký sự kiện. Về cơ bản, nó cung cấp các chức năng tương tự như các phương thức vòng đời (componentDidMount, componentDidUpdate, componentWillUnmount) trong các class component, nhưng được thiết kế để sử dụng trong môi trường hàm, giúp việc quản lý logic vòng đời trở nên đơn giản và dễ đọc hơn.

### 2. Làm thế nào để chạy một hiệu ứng chỉ một lần sau khi component được gắn kết (mounted)?

Để chạy một hiệu ứng chỉ một lần sau khi component được gắn kết vào DOM, bạn cần truyền một mảng rỗng [] làm danh sách phụ thuộc cho useEffect.

### 3. Làm thế nào để thực hiện hành động dọn dẹp khi component bị hủy gắn kết (unmounted)?

Để thực hiện hành động dọn dẹp khi component bị hủy gắn kết, bạn có thể trả về một hàm từ bên trong useEffect. Hàm này sẽ được gọi ngay trước khi component bị xóa khỏi DOM.

### 4. Khi nào useEffect chạy nếu không có danh sách phụ thuộc được cung cấp?

Nếu bạn không truyền bất kỳ danh sách phụ thuộc nào (mảng thứ hai) cho useEffect, hiệu ứng sẽ chạy sau mỗi lần component được hiển thị lại, cũng như sau lần hiển thị đầu tiên (khi component được gắn kết).

### 5. Làm thế nào để chỉ chạy useEffect khi một giá trị cụ thể (state hoặc props) thay đổi?

Bạn có thể kiểm soát việc useEffect chạy lại khi nào bằng cách truyền các giá trị mà bạn muốn theo dõi vào mảng phụ thuộc. Hiệu ứng sẽ chỉ chạy lại nếu ít nhất một trong các giá trị trong mảng phụ thuộc thay đổi. 

### 6. Có thể sử dụng nhiều useEffect trong một component không?

Có, bạn hoàn toàn có thể sử dụng nhiều hook useEffect trong cùng một component. Mỗi useEffect có thể có danh sách phụ thuộc riêng, cho phép bạn tách biệt logic và quản lý các hiệu ứng phụ một cách độc lập. Quan trọng là phải tuân thủ các quy tắc của Hooks: tất cả các Hooks phải được gọi ở đầu hàm component và không được gói trong các câu lệnh điều kiện như if.

### 7. Cần lưu ý gì về việc sử dụng useEffect trong React 18 trở lên?

Kể từ React 18, useEffect được coi là một phương án cuối cùng và không nên bị lạm dụng. Chức năng chính của nó là để đồng bộ hóa với các API bên ngoài hoặc các hệ thống không phải React. Điều này ngụ ý rằng bạn không nên sử dụng useEffect một cách thường xuyên cho mọi tác vụ nhỏ. Thay vào đó, hãy tìm kiếm các giải pháp khác, tối ưu hơn nếu có thể, để quản lý state và logic trong component của bạn.

React 19 bổ sung hook use() cho phép bạn await Promise trực tiếp trong component mà không cần useEffect, useState, hay xử lý trạng thái tải thủ công