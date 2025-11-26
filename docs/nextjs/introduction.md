---
sidebar_position: 1
id: introduction
title: Giới thiệu NextJS
---

## I. NextJS là gì
Next.js là một framework React để xây dựng các ứng dụng web full-stack. Bạn sử dụng Thành phần React để xây dựng giao diện người dùng và Next.js để có các tính năng bổ sung và tối ưu hóa.

Về cơ bản, Next.js cũng tóm tắt và tự động định cấu hình công cụ cần thiết cho React, như đóng gói, biên dịch, v.v. Điều này cho phép bạn tập trung vào việc xây dựng ứng dụng của mình thay vì dành thời gian cho việc cấu hình.

Cho dù bạn là nhà phát triển cá nhân hay thành viên của một nhóm lớn hơn, Next.js có thể giúp bạn xây dựng các ứng dụng React tương tác, năng động và nhanh chóng.

## II. Nhược điểm của React

- React là Thư viện, Không phải là Framework

- React không cung cấp các giải pháp tích hợp cho các khía cạnh quan trọng như tổ chức code, điều hướng trang (routing), quản lý state, v.v. Điều này dẫn đến việc mỗi dự án React có thể có cấu trúc và cách tiếp cận khác nhau.

- Bạn cần chọn và tích hợp các thư viện bổ sung như React Router (cho routing), Redux hoặc Context API (cho quản lý state), và các công cụ khác để hoàn thiện ứng dụng.

## III. Lý do cần NextJS

Next.js ra đời để giải quyết những hạn chế của React, cung cấp một giải pháp toàn diện và thống nhất cho việc phát triển ứng dụng web với React

- Next.js cung cấp một cấu trúc dự án mặc định và hệ thống routing tự động dựa trên cấu trúc thư mục. Điều này giúp các nhà phát triển dễ dàng quản lý và mở rộng dự án mà không cần phải thiết lập cấu trúc từ đầu.

- Next.js có hệ thống routing tích hợp, không cần phải cài đặt thêm thư viện như React Router. Chỉ cần tạo các file trong thư mục pages là bạn đã có các route tương ứng.

- Next.js tích hợp tốt với các giải pháp quản lý state như Redux, Context API, MobX, v.v. Dù không cung cấp một giải pháp quản lý state tích hợp sẵn, nhưng cấu trúc và các công cụ của Next.js giúp dễ dàng tích hợp và sử dụng các giải pháp này.

- Next.js hỗ trợ SSR và SSG, giúp cải thiện hiệu suất và SEO cho ứng dụng. SSR giúp trang web có thể được render trên server trước khi gửi đến client, cải thiện thời gian tải trang và khả năng crawl của các công cụ tìm kiếm.

- Với việc hỗ trợ SSR và các tính năng tối ưu hóa khác, Next.js giúp các trang web được index tốt hơn bởi các công cụ tìm kiếm, cải thiện SEO tổng thể.

## IV. Không nên sử dụng Nextjs cho Backend

- Next.js có hỗ trợ API Routes, nhưng khả năng này khá cơ bản và thường chỉ phù hợp cho các tác vụ đơn giản hoặc xử lý dữ liệu nhẹ

- Với các ứng dụng yêu cầu xử lý backend phức tạp, quản lý database, authentication, etc., việc sử dụng một framework chuyên biệt như Nest.js là hợp lý hơn.

- Nếu Next.js đảm nhận toàn bộ nhiệm vụ backend và được phơi trực tiếp ra internet, có thể dẫn đến các vấn đề bảo mật nếu không được cấu hình và bảo vệ đúng cách.

Sử dụng Next.js cho frontend và một framework khác như Nest.js cho backend có thể giúp dự án của bạn dễ quản lý và bảo mật hơn. Next.js tối ưu hóa cho việc phát triển frontend với các tính năng mạnh mẽ về routing, SSR, SSG, và tối ưu hóa hiệu suất, trong khi Nest.js cung cấp một nền tảng mạnh mẽ và linh hoạt cho việc phát triển backend phức tạp và bảo mật

## V. Có nên chọn NextJS

Sự khác biệt căn bản nhất giữa React và Next.js nằm ở định nghĩa: một bên là thư viện (library), một bên là một framework hoàn chỉnh. Hãy tưởng tượng bạn đang ở trong một nhà máy; thư viện giống như một công cụ chuyên dụng cho một công đoạn duy nhất, trong khi framework là cả một dây chuyền sản xuất được thiết lập sẵn.

ReactJS là một thư viện, với vai trò duy nhất và chuyên biệt là xây dựng các thành phần giao diện người dùng (UI components). Khi chỉ sử dụng React, bạn sẽ phải tự mình lắp ráp các công cụ khác như routing, bundling (với Webpack), và nhiều thứ khác để tạo thành một bộ khung hoàn chỉnh cho dự án. Điều này tạo ra một "chi phí thiết lập" ban đầu và "gánh nặng quyết định" không nhỏ, khi bạn phải tự lựa chọn và cấu hình từng công cụ.

Ngược lại, Next.js là một framework có định hướng sẵn (opinionated). Nó cung cấp cho bạn nguyên một bộ khung, một dây chuyền sản xuất đã được tích hợp sẵn mọi thứ cần thiết. Nó kết hợp React với các công cụ quan trọng khác thành một quy trình thống nhất, giúp bạn bắt đầu dự án nhanh chóng mà không cần phải tự cấu hình từ đầu.

"...thư viện thì nó sẽ phục vụ cho một cái mục đích nào đó thôi, nhưng một framework thì nó sẽ có nguyên một cái bộ khung, một dây chuyền hoàn chỉnh để bạn làm việc."

## VI. Bạn có cần SEO không

Mặc dù Next.js có rất nhiều tính năng, yếu tố quan trọng nhất và thường mang tính quyết định khi lựa chọn nó chính là nhu cầu về Tối ưu hóa Công cụ Tìm kiếm (SEO).

Next.js được xây dựng với các tính năng cốt lõi như Server-Side Rendering (SSR - Kết xuất phía máy chủ) và Static Site Generation (SSG - Tạo trang tĩnh). 

Những tính năng này giúp các công cụ tìm kiếm có thể đọc và lập chỉ mục nội dung HTML đầy đủ ngay từ lần tải đầu tiên, mang lại khả năng SEO vượt trội ngay từ đầu. Điều này làm cho Next.js trở thành lựa chọn lý tưởng cho các trang marketing, blog, hay trang thương mại điện tử.

Trong khi đó, ReactJS mặc định hoạt động theo cơ chế Client-Side Rendering (Kết xuất phía máy khách), tức là nội dung được tạo ra trên trình duyệt của người dùng. Mô hình này vốn không thân thiện với SEO. Để một ứng dụng React thuần có thể được SEO, bạn cần phải thực hiện thêm nhiều công việc và tích hợp các công cụ bổ sung, điều này khá phức tạp.

Vì vậy, lựa chọn thực tế thường rất rõ ràng:

• Sử dụng ReactJS cho các ứng dụng nội bộ, trang quản trị (admin dashboards), hoặc các ứng dụng yêu cầu đăng nhập, nơi SEO hoàn toàn không phải là một yêu cầu.

• Sử dụng Next.js cho bất kỳ trang web công khai nào mà việc được tìm thấy trên Google và các công cụ tìm kiếm khác là yếu tố sống còn.

:::tip Tip
📲 Đừng quên **like, share và để lại comment** trên kênh TikTok [@thaygiaofrontend](https://www.tiktok.com/@thaygiaofrontend) để cùng nhau trao đổi, làm rõ những thắc mắc và nâng tầm kiến thức lập trình Frontend mỗi ngày!
:::
