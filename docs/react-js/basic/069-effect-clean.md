---
sidebar_position: 69
---

# Clean Effect 

Một số phương thức trong JavaScript yêu cầu việc dọn dẹp. Hãy cùng tìm hiểu lý do tại sao.

![Create-HTML-1](images/effect.webp) 

<ToggleTOC />


## I. Tại sao cần dọn dẹp?

Khi bạn tạo một bộ đếm thời gian bằng cách sử dụng `setTimeout`, bạn đang trì hoãn việc chạy một đoạn code trong tương lai

```js
setTimeout(() => {
    console.log("This will run in 1 second");
}, 1000);
```

Nếu đoạn code này được đóng gói trong một hàm và hàm đó có thể được gọi nhiều lần, bạn có thể gặp phải tình trạng rò rỉ bộ nhớ. Điều này có nghĩa là bạn đang tăng dần bộ nhớ của ứng dụng vì bạn liên tục lên lịch cho một bộ đếm thời gian mới mỗi khi hàm được gọi.

Một ví dụ cụ thể hơn là khi bạn chạy code này bên trong một component React

```jsx
import {useEffect} from "react";

function App() {
    useEffect(() => {
        setTimeout(() => {
            console.log("This will run in 1 second");
        }, 1000);
    });

    return <h1>App</h1>;
}
```

Mỗi khi component App được hiển thị lại, nó sẽ lên lịch cho việc tạo một bộ đếm thời gian mới mà không dọn dẹp bộ đếm thời gian trước đó.

Đây là một ví dụ về hiệu ứng yêu cầu dọn dẹp để tránh rò rỉ bộ nhớ.

Ví dụ này chỉ hiển thị một `setTimeout` nhưng hãy nghĩ đến trường hợp mà bạn đang thiết lập một kết nối tới API trò chuyện bằng cách sử dụng `WebSockets` mà không đóng kết nối trước đó. Đó là một ví dụ khác về rò rỉ bộ nhớ và cũng là một ví dụ về hiệu ứng yêu cầu dọn dẹp.

## II. Cách dọn dẹp useEffect

Để dọn dẹp một hiệu ứng, bạn phải trả về một hàm (dọn dẹp) từ bên trong cuộc gọi useEffect. 

Chúng ta sẽ bắt đầu với ví dụ đơn giản nhất:

```jsx
import {useEffect, useState} from "react";

function App() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log("effect running");
    return () => {
      console.log("effect cleaning up");
    }
  })

  return (
    <>
      <h2>{counter}</h2>
      <button onClick={() => setCounter(prevCounter => prevCounter + 1)}>Add</button>
    </>
  );
}
```

Vào lần đầu tiên component được hiển thị, chúng ta chỉ thấy `console.log: "effect running"`.

Sau đó, mỗi khi component được hiển thị lại vì trạng thái của nó thay đổi (khi ta nhấp vào nút), nó bắt đầu bằng cách dọn dẹp component (chúng ta thấy "effect cleaning up") và sau đó là "effect running".

Kết luận là `return () => { console.log("effect running"); }` sẽ chạy mỗi khi component bị xóa (còn gọi là hủy gắn kết).

Lưu ý rằng component được gỡ bỏ và sau đó được chèn lại vì nó đang được hiển thị lại do có thay đổi trạng thái.

## III. Chế độ nghiêm ngặt (Strict mode)

Khi chạy đoạn code trên trong chế độ nghiêm ngặt trên môi trường phát triển, bạn sẽ thấy thông báo sau trên bảng điều khiển:

```bash
effect running
effect cleaning up
effect running
```

Điều này là do React đang thêm component vào DOM, xóa nó, sau đó thêm lại. Điều này nghe có vẻ mâu thuẫn, nhưng nó giúp bạn phát hiện các lỗi rò rỉ bộ nhớ. Nếu bạn quên dọn dẹp hiệu ứng, bạn sẽ thấy một số hành vi bất thường trong ứng dụng (chỉ khi chạy ở chế độ nghiêm ngặt trên máy cục bộ).

Hành vi này cho phép giải thuật `reconciliation` của React dừng quá trình hiển thị ngay giữa chừng mà không làm hỏng giao diện người dùng. Điều này là nền tảng để triển khai các tính năng xử lý đồng thời trong React 18 (một trong số đó vẫn đang được phát triển).

Khi bạn chạy code trong môi trường sản xuất (sử dụng React sản xuất), các hiệu ứng chỉ chạy một lần và bạn sẽ không gặp phải hành vi này. Vì vậy, đây chỉ là một hành vi cục bộ nhằm giúp bạn tìm ra các lỗi.

:::tip Tóm lại

- Một số phương thức JavaScript yêu cầu dọn dẹp để tránh rò rỉ bộ nhớ (ví dụ: setTimeout, setInterval).
- Để dọn dẹp một hiệu ứng, bạn phải trả về một hàm từ bên trong cuộc gọi `useEffect`.
- React sẽ gọi hàm đó mỗi khi component được kích hoạt lại hoặc bị xóa khỏi DOM.
- Nếu bạn quên dọn dẹp hiệu ứng, bạn sẽ thấy một số hành vi bất thường trong ứng dụng (chỉ khi chạy ở chế độ nghiêm ngặt trên máy cục bộ).

:::

<iframe width="560" height="315" src="https://www.youtube.com/embed/pTHJ9SdKZHw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Tại sao việc dọn dẹp (cleanup) trong React lại cần thiết?

Một số phương thức trong JavaScript, như setTimeout hoặc setInterval, trì hoãn việc thực thi code trong tương lai. Nếu các phương thức này được sử dụng trong các component React mà không được dọn dẹp, chúng có thể dẫn đến rò rỉ bộ nhớ. Điều này xảy ra khi component được hiển thị lại nhiều lần, mỗi lần tạo một bộ đếm thời gian hoặc kết nối mới (ví dụ: với WebSockets) mà không hủy bỏ cái cũ, làm tăng dần lượng bộ nhớ mà ứng dụng sử dụng.

### Câu 2: Rò rỉ bộ nhớ trong React biểu hiện như thế nào?

Rò rỉ bộ nhớ trong React xảy ra khi các hiệu ứng không được dọn dẹp đúng cách. Ví dụ, nếu bạn sử dụng setTimeout trong useEffect mà không có hàm dọn dẹp, mỗi khi component render lại, một setTimeout mới sẽ được lên lịch mà không hủy bỏ cái trước đó. Tương tự, nếu bạn thiết lập kết nối WebSocket mà không đóng nó khi component unmount hoặc render lại, bạn sẽ tạo ra nhiều kết nối không cần thiết, gây rò rỉ bộ nhớ.

### Câu 3: Làm thế nào để dọn dẹp một hiệu ứng trong useEffect?

Để dọn dẹp một hiệu ứng trong useEffect, bạn phải trả về một hàm từ bên trong useEffect. Hàm được trả về này chính là hàm dọn dẹp. React sẽ gọi hàm này mỗi khi component được kích hoạt lại (re-render) hoặc bị xóa khỏi DOM (unmount). Điều này đảm bảo rằng các tài nguyên không còn cần thiết, như bộ đếm thời gian hoặc kết nối, được giải phóng, ngăn chặn rò rỉ bộ nhớ.

### Câu 4: Chế độ nghiêm ngặt (Strict mode) của React ảnh hưởng đến việc dọn dẹp useEffect như thế nào?

Trong môi trường phát triển, khi chạy ứng dụng ở Chế độ nghiêm ngặt (Strict mode), React sẽ cố ý chạy hàm dọn dẹp và sau đó chạy lại hiệu ứng một lần nữa (tức là "mount", "unmount", sau đó "re-mount" component). Điều này giúp các nhà phát triển dễ dàng phát hiện các lỗi rò rỉ bộ nhớ nếu họ quên dọn dẹp hiệu ứng. Nếu bạn không thấy hành vi này trong chế độ nghiêm ngặt, có nghĩa là bạn đã dọn dẹp hiệu ứng đúng cách. Hành vi này chỉ xảy ra trong môi trường phát triển và không ảnh hưởng đến môi trường sản xuất.

### Câu 5: Mục đích của việc "unmount" và "re-mount" component trong Chế độ nghiêm ngặt là gì?

Hành vi "unmount" và "re-mount" component trong Chế độ nghiêm ngặt của React có mục đích chính là giúp phát hiện các lỗi rò rỉ bộ nhớ sớm trong quá trình phát triển. Nếu một hiệu ứng không được dọn dẹp đúng cách, hành vi này sẽ làm lộ ra các vấn đề tiềm ẩn, chẳng hạn như bộ đếm thời gian tiếp tục chạy hoặc kết nối vẫn còn hoạt động ngay cả khi component đã bị gỡ bỏ. Điều này cũng là nền tảng cho việc triển khai các tính năng xử lý đồng thời trong React 18, cho phép React dừng quá trình hiển thị giữa chừng mà không làm hỏng giao diện người dùng.

### Câu 6: Hành vi dọn dẹp trong môi trường sản xuất (production) có khác với môi trường phát triển không?

Có, hành vi dọn dẹp khác nhau giữa môi trường phát triển và môi trường sản xuất. Trong môi trường sản xuất (khi sử dụng React bản build sản xuất), các hiệu ứng chỉ chạy một lần và bạn sẽ không gặp phải hành vi "unmount" và "re-mount" component như trong Chế độ nghiêm ngặt của môi trường phát triển. Chế độ nghiêm ngặt chỉ là một công cụ cục bộ để giúp phát hiện lỗi rò rỉ bộ nhớ trong quá trình phát triển.

### Câu 7: Những loại phương thức JavaScript nào thường yêu cầu dọn dẹp trong useEffect để tránh rò rỉ bộ nhớ?

Bộ đếm thời gian: setTimeout và setInterval.

Kết nối mạng: Ví dụ như kết nối WebSockets, Server-Sent Events, hoặc đăng ký các sự kiện mạng khác.

Đăng ký sự kiện: Đăng ký các sự kiện DOM (ví dụ: addEventListener) hoặc các thư viện sự kiện toàn cục.

Tạo đối tượng có vòng đời: Các đối tượng cần được hủy hoặc giải phóng tài nguyên khi không còn sử dụng.