---
sidebar_position: 4
---

# Server/Client component

Việc chia tách Server Component và Client Component giúp tối ưu hóa hiệu suất, tăng cường khả năng tương tác và cung cấp một trải nghiệm người dùng mạnh mẽ hơn

<!-- ![Create-HTML-1](images/state.png) -->

<ToggleTOC />


## I. Server component

Server Component có thể được hiểu là một loại component mới, được render ở phía server trước khi được gửi về phía client (trình duyệt). Điều này giúp giảm gánh nặng cho trình duyệt web và nâng cao bảo mật.

- Dễ dàng hơn trong quá trình phát triển khi ta có thể kết nối trực tiếp với các nguồn phía server như là cơ sở dữ liệu (database) hay các service nội bộ.

- Mang lại hiệu năng tốt hơn nhờ giảm độ trễ khi giao tiếp giữa client và server.

- Giảm nhẹ kích cỡ của mã nguồn. Các thư viện chỉ sử dụng ở phía server sẽ không cần phải truyền tải về client.

- Tự động chia mã nguồn thành các phần nhỏ, sau đó clients chỉ cần load những phần cần thiết giúp tối ưu hiệu năng hơn.

## II. Client Component

Client Component là một loại component được render trên phía client (trình duyệt). Điều này giúp tạo ra các ứng dụng có khả năng tương tác cao.

Client Component cho phép bạn thêm các tính năng tương tác phía client vào ứng dụng của mình. Trong Next.js, chúng được tiền render trên server và được hydrate trên client. Bạn có thể coi Client Component như cách các component trong Router Pages đã hoạt động.

Ví dụ, bạn có thể lấy dữ liệu và render các bài đăng của người dùng trên server (sử dụng Server Components), sau đó render nút tương tác LikeButton cho mỗi bài đăng trên client (sử dụng Client Components).

Sau khi Server Components được render, một định dạng dữ liệu đặc biệt gọi là React Server Component Payload (RSC) được gửi đến client. Payload RSC bao gồm:

- Kết quả đã render của Server Components.
- Các placeholder cho nơi Client Components nên được render và tham chiếu đến các tệp JavaScript của chúng.
- React sử dụng thông tin này để hợp nhất Server và Client Components và cập nhật DOM trên client.

## III. Khi nào nên sử dụng

**Server Component:** Nên sử dụng mặc định trừ khi bạn cần sử dụng các hook như useState, xử lý các sự kiện click hoặc các sự kiện khác hoặc cần truy cập vào các API cụ thể của trình duyệt. Server Component cho phép bạn tận dụng cơ sở hạ tầng máy chủ để tăng tốc ứng dụng React của bạn. Với Server Component, bạn có thể truy vấn trực tiếp cơ sở dữ liệu của mình để lấy dữ liệu để render và layout, tiết kiệm các chuyến đi từ client.

**Client Component:** Trong Next.js, các component client được hydrate và gửi đến phía client, nơi chúng được sử dụng bởi React. Hầu hết việc render tĩnh được thực hiện ở phía máy chủ, nhưng nếu component client có một số tương tác thì các phần tương tác sẽ được render ở client. Đối với các ứng dụng đòi hỏi tương tác cao, ví dụ như ứng dụng đòi hỏi đăng nhập, cập nhật thời gian thực hoặc thay đổi động nội dung, Client Component sẽ phù hợp.

## IV. Tại sao lại chia tách Server/Client Component 

Việc chia tách Server Component và Client Component giúp tối ưu hóa hiệu suất, tăng cường khả năng tương tác và cung cấp một trải nghiệm người dùng mạnh mẽ hơn

Server Component: Được render trên máy chủ và giúp giảm lượng mã JavaScript được gửi đến client, từ đó cải thiện hiệu suất của website. Bằng cách di chuyển việc render và lấy dữ liệu lên server, bạn có thể giảm lượng mã gửi đến client, điều này có thể cải thiện hiệu suất của ứng dụng của bạn. Tuy nhiên, để làm cho giao diện người dùng tương tác, bạn cần cập nhật DOM trên client. Do đó, mã bạn viết cho server và client không phải lúc nào cũng giống nhau.

Client Component: Được hydrate và gửi đến phía client, nơi chúng được sử dụng bởi React. Hầu hết việc render tĩnh được thực hiện ở phía máy chủ, nhưng nếu component client có một số tương tác thì các phần tương tác sẽ được render ở client

:::tip Tóm lại

Việc chọn nơi đặt ranh giới mạng trong cây component của bạn là do bạn quyết định. Ví dụ, bạn có thể lấy dữ liệu và render các bài đăng của người dùng trên server (sử dụng Server Components), sau đó render nút tương tác LikeButton cho mỗi bài đăng trên client (sử dụng Client Components).

:::