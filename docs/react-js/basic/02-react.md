---
sidebar_position: 2
---

# React là gì

React là một thư viện JavaScript được xây dựng và chủ yếu được duy trì bởi Facebook (Meta).

![Create-HTML-1](images/react.jpg) 

<ToggleTOC />

## I. Giới thiệu về React

Được sử dụng để xây dựng Giao diện người dùng.

Tập trung vào việc xây dựng lớp giao diện của ứng dụng. Điều này có nghĩa là React chỉ chịu trách nhiệm cho việc hiển thị Giao diện Người dùng (văn bản, hộp văn bản, nút, v.v.) cũng như cập nhật giao diện người dùng mỗi khi có thay đổi.

Giả sử bạn đang xây dựng một trang web thương mại điện tử và muốn theo dõi số lượng sản phẩm trong giỏ hàng khi người dùng thêm và xóa sản phẩm. React giúp bạn dễ dàng chỉ định việc hiển thị số lượng sản phẩm trong giỏ hàng: `{items.length}`.

React sẽ hiển thị số lượng sản phẩm trong giỏ hàng và cập nhật số lượng mỗi khi có thay đổi.

React cũng cho phép tái sử dụng logic này trong phần khác của giao diện người dùng. Ví dụ, trên trang thanh toán, bạn có thể sử dụng lại logic tương tự mà không cần viết lại code.

Khi học React (hoặc bất kỳ thư viện frontend nào khác), mọi thứ có thể trở nên rất phức tạp hoặc yêu cầu tính kỹ thuật cao. Điều này hoàn toàn bình thường vì những thư viện đó chỉ phát huy vai trò hữu ích khi bạn xây dựng ứng dụng web kích thước trung bình hoặc lớn cùng với một số thành viên trong nhóm. Vì vậy, hãy ghi nhớ điều đó trong quá trình học và nhớ rằng mục tiêu cuối cùng là viết code dễ bảo trì và hiệu quả.

## II. React KHÔNG phải là framework

React là thư viện, không phải là framework.

Sự khác biệt giữa thư viện và framework là thư viện chỉ hỗ trợ trong một khía cạnh cụ thể. Trong khi đó, framework hỗ trợ trong nhiều khía cạnh. Hãy xem một ví dụ:

- React là thư viện vì nó chỉ tập trung vào phần giao diện người dùng.

- Angular, ngược lại, là framework vì nó quản lý các khía cạnh khác của ứng dụng bên cạnh giao diện người dùng (xử lý Dependency Injection, đóng gói CSS, v.v.)

## III. React không tập trung vào việc thiết kế giao diện người dùng 

Bản thân React không phải là một Thư viện Giao diện người dùng vì React không cung cấp các nút hoặc thẻ được thiết kế đẹp mắt.

React giúp bạn quản lý giao diện người dùng phức tạp nhưng không đi kèm với hệ thống thiết kế.

Việc làm cho giao diện trở nên đẹp mắt và thân thiện với người dùng là nhiệm vụ của bạn, bạn có thể lựa chọn sử dụng thư viện thiết kế hoặc CSS cho mục đích đó.

## IV. Web Components

Bạn có thể sử dụng Web Components để phát triển Ứng dụng Web; bạn không nhất thiết phải sử dụng React.

Bạn cũng có thể sử dụng React để bổ sung cho Web Components và ngược lại.

Ưu điểm chính của Web Components là khả năng hoạt động trên mọi nền tảng. Và ưu điểm của React là thời gian phát triển nhanh hơn Web Components. Điều này là do Web Components là công nghệ web tiêu chuẩn (được định nghĩa và triển khai bởi trình duyệt), trong khi React là một thư viện không được chuẩn hóa.

:::tip Tóm lại
 
- React là một thư viện JavaScript được sử dụng để xây dựng Giao diện người dùng.
- React chỉ chịu trách nhiệm cho lớp Giao diện.
- React không phải là framework.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. React là gì?

React là một thư viện JavaScript được phát triển và duy trì bởi Facebook (nay là Meta), dùng để xây dựng giao diện người dùng (UI) cho các ứng dụng web.

### Câu 2. React tập trung vào phần nào của ứng dụng?

React chỉ tập trung vào lớp giao diện người dùng — tức là phần hiển thị như văn bản, nút, hộp nhập liệu,... và tự động cập nhật giao diện mỗi khi dữ liệu thay đổi.

### Câu 3. React có thể tái sử dụng logic giao diện không?

Có. React cho phép tái sử dụng logic hiển thị ở nhiều nơi trong giao diện. Ví dụ: logic hiển thị số lượng sản phẩm trong giỏ hàng có thể được dùng lại ở trang thanh toán mà không cần viết lại.

### Câu 4. React là thư viện hay framework?

React là thư viện, không phải framework.

Thư viện: hỗ trợ một khía cạnh cụ thể (giao diện người dùng).

Framework: hỗ trợ toàn diện nhiều khía cạnh (ví dụ: Angular hỗ trợ DI, routing, CSS,...).

### Câu 5. React có phải là thư viện giao diện người dùng không?

Không hoàn toàn. React không cung cấp các thành phần giao diện được thiết kế sẵn như nút, bảng,... mà chỉ giúp bạn quản lý giao diện phức tạp. Việc thiết kế đẹp mắt là trách nhiệm của bạn, có thể dùng thêm CSS hoặc thư viện UI khác.

### Câu 6. Có bắt buộc phải dùng React để phát triển ứng dụng web không?

Không. Bạn có thể dùng Web Components — một công nghệ web tiêu chuẩn — để phát triển ứng dụng web. Tuy nhiên, React thường giúp tăng tốc quá trình phát triển nhờ cú pháp linh hoạt và khả năng tái sử dụng cao.