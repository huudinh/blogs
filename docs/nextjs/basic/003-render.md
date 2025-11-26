---
sidebar_position: 3
---

# CSR and SSR Rendering

React, Angular, Vue là những framework chuyên làm UI cho client. Tuy nhiên Next.js lại hỗ trợ cả client và server render

<!-- ![Create-HTML-1](images/state.png) -->

<ToggleTOC />


## I. Client Side Rendering - CSR

Client component ám chỉ quá trình render giao diện (component) xảy ra tại client (hay còn biết tới là SPA - single page application)

**Quy trình thực hiện**

Client vào trang web, đây là quá trình khởi tạo request đầu tiên lên server

Server nhận yêu cầu, trả về duy nhất file index.html

Client nhận file index.html để render dữ liệu cho người dùng. Kể từ đây, việc 'tương tác giao diện' của người dùng sẽ được xử hoàn toàn 100% ở browser của client

Trong trường hợp client cần hiển thị thông tin động (dynamic), ví dụ như hiển thị table, cần khởi tạo request lên server để lấy dữ liệu

Ở đây, sử dụng hình thức Restful APIs, như vậy vẫn đảm bảo được trải nghiệm của client mà không cần reload website

**Ưu điểm**

Tăng trải nghiệm của người dùng (SPA - single page application), dễ thấy nhất là "ít khi" cần reload lại website. Ví dụ Facebook

Giảm thiểu "gánh nặng cho server", việc tính toán và xử lý giao diện sẽ nằm 100% ở client

Server với cấu hình yếu vẫn hoạt động ok 

**Nhược điểm**

Nếu browser (máy tính, điện thoại...) của client là thiết bị yếu (RAM, CPU..., hoặc slow network), quá trình render "lần đầu" sẽ tốn thời gian.

Việc khởi tạo request đầu tiên lên server (lầy file index.html) về để render giao diện, vì bây giờ, tất cả "giao diện của website" đều phải được load trước

## II. Server Side Rendering - SSR

Server Component, có thể hiểu là SSR (server side rendering), là cách render dữ liệu 100% ở phía server.

**Quy trình**

Client truy cập route "/" => server render dữ liệu tương ứng với route "/" => gửi kết quả cho client

Client truy cập route "/about" => server render dữ liệu tương ứng với route "/about" => gửi kết quả cho client

#### Ưu điểm

Client chỉ "khởi tạo request" và "nhận kết quả" => tốc độ load trang web rất nhanh

#### Nhược điểm

Việc tối ưu hóa UI trên server khá khó code, tốn time và khó maintain (code chay HTML, CSS kết hợp với template engine)

Cần cấu hình server đủ mạnh (RAM, CPU)

## III. Next.js hỗ trợ cả CSR và SSR

**Dùng CSR**

Tốc độ load trang sẽ chậm (nếu thiết bị/network của client yếu)

Đổi lại, code UI "rất sướng" khi sử dụng React/Angular/Vue, đồng thời, chi phí duy trì server nó "rẻ"

**Dùng SSR**

Tốc độ load trang nhanh hơn nhiều so với CSR (kể cả thiết bị/network của client yếu)

Đổi lại, code UI "khổ" vì cần code chay HTML, CSS (với template engine), đồng thời, chi phí server nó "cao hơn CSR"

**Hybrid app**

Next.js là server (backend), nó đảm bảo được tốc độ load trang nhanh

Để khắc phục việc code UI "khổ" tại server, Next.js hõ trợ code "React" ở server => amazing

Cần 1 server ở cấu hình trung bình là đã chạy được Next.js. wow :v

:::tip Tóm lại

=> Nextjs là giải pháp để dung hòa giữa việc sử dụng chỉ mình "CSR" hay "SSR" như cách truyền thống

:::
