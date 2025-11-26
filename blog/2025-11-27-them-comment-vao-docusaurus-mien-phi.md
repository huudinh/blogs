---
slug: them-comment-vao-docusaurus-mien-phi
title: Thêm comment vào Docusaurus miễn phí
authors: [DinhTrieu]
tags: [blog]
---

Trong Docusaurus (một framework để tạo tài liệu và blog), việc **thêm comment** không có sẵn mặc định. Bạn cần tích hợp dịch vụ bình luận bên ngoài. Có vài cách phổ biến:

<!-- truncate -->

---

### I. **Cài đặt Giscus (GitHub Discussions)**
- Giscus là một plugin miễn phí, sử dụng GitHub Discussions để lưu bình luận.
- Cách làm:

- Tạo repo GitHub và bật Discussions.
- Cài package:  
  ```bash
  npm install @giscus/react
  ```
- Thêm component Giscus vào file `src/theme/BlogPostPage.js` hoặc `src/theme/DocItem.js`.
- Ví dụ:
  ```jsx
  import Giscus from '@giscus/react';

  export default function CommentSection() {
    return (
      <Giscus
        repo="username/repo"
        repoId="..."
        category="General"
        categoryId="..."
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="light"
        lang="vi"
      />
    );
  }
  ```
### II. Các bước bật Discussions trên GitHub

Bạn cần bật **GitHub Discussions** trực tiếp trong repository của mình trên GitHub. Đây là cách làm:

1. **Vào repository của bạn**  
   - Truy cập repo trên GitHub (ví dụ: `https://github.com/username/repo`).

2. **Mở phần Settings**  
   - Ở thanh menu trên repo, chọn **Settings**.

3. **Tìm mục “Features”**  
   - Trong trang Settings, kéo xuống phần **Features**.  
   - Bạn sẽ thấy tùy chọn **Discussions**.

4. **Bật Discussions**  
   - Tick chọn **Enable discussions for this repository**.  
   - Sau khi bật, tab **Discussions** sẽ xuất hiện ở thanh menu repo (bên cạnh Code, Issues, Pull requests…).

5. **Tạo category**  
   - Vào tab **Discussions** vừa xuất hiện.  
   - Nhấn **New category** để tạo các nhóm chủ đề (ví dụ: “General”, “Q&A”, “Ideas”).  
   - Mỗi category sẽ có một `categoryId` mà bạn cần khi tích hợp với Giscus.

6. **Lưu ý**
    - Bạn cần quyền **Admin** hoặc **Owner** của repo để bật Discussions.  
    - Repo phải **public** nếu bạn muốn người ngoài tham gia bình luận (Giscus yêu cầu repo public).  
    - Nếu repo private, chỉ thành viên có quyền mới xem và tham gia Discussions.

### III Cách lấy `repoId` và `categoryId`

#### 1. Lấy `repoId`
- `repoId` là ID nội bộ của repository trên GitHub.
- Cách nhanh nhất:
  Vào trang [Giscus App](https://giscus.app) và kết nối repo của bạn.
  Khi chọn repo, Giscus sẽ tự động hiển thị `repoId`.
- Nếu muốn tự lấy:
  Mở repo trên GitHub.
  Vào **Settings → General → About → GraphQL Explorer** (hoặc dùng [GitHub GraphQL Explorer](https://docs.github.com/en/graphql/overview/explorer)).
  Chạy query:
    ```graphql
    {
      repository(owner: "username", name: "repo") {
        id
      }
    }
    ```
  Kết quả trả về chính là `repoId`.

#### 2. Lấy `categoryId`
- `categoryId` là ID của **category** trong Discussions (ví dụ: “General”, “Q&A”).
- Cách làm:
  Vào tab **Discussions** trong repo.
  Tạo một category mới (ví dụ: “Comments”).
  Dùng GraphQL Explorer để lấy ID:
     ```graphql
     {
       repository(owner: "username", name: "repo") {
         discussionCategories(first: 10) {
           nodes {
             id
             name
           }
         }
       }
     }
     ```
  Kết quả sẽ trả về danh sách category cùng với `id` (chính là `categoryId`).

### IV. Tích hợp vào Docusaurus
Sau khi có `repoId` và `categoryId`, bạn thêm vào component Giscus:

```jsx
<Giscus
  repo="username/repo"
  repoId="MDEwOlJlcG9zaXRvcnkxMjM0NTY3OA=="
  category="General"
  categoryId="DIC_kwDOA1q4LM4B-abc"
  mapping="pathname"
  reactionsEnabled="1"
  emitMetadata="0"
  inputPosition="bottom"
  theme="light"
  lang="vi"
/>
```

### V. Hiển thị ở cả blog và doc

Để hiển thị **comment (Giscus)** ở cả **blog post** và **docs page** trong Docusaurus, bạn cần tuỳ chỉnh theme component cho cả hai loại trang.  

#### 1. Override component cho Blog
- Tạo file `src/theme/BlogPostPage.js` (nếu chưa có).
- Thêm Giscus vào cuối nội dung blog:

```jsx
import React from 'react';
import BlogPostPage from '@theme-original/BlogPostPage';
import Giscus from '@giscus/react';

export default function BlogPostPageWrapper(props) {
  return (
    <>
      <BlogPostPage {...props} />
      <Giscus
        repo="username/repo"
        repoId="MDEwOlJlcG9zaXRvcnkxMjM0NTY3OA=="
        category="General"
        categoryId="DIC_kwDOA1q4LM4B-abc"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="light"
        lang="vi"
      />
    </>
  );
}
```

#### 2. Override component cho Docs
- Tạo file `src/theme/DocItem.js`.
- Thêm Giscus vào cuối nội dung docs:

```jsx
import React from 'react';
import DocItem from '@theme-original/DocItem';
import Giscus from '@giscus/react';

export default function DocItemWrapper(props) {
  return (
    <>
      <DocItem {...props} />
      <Giscus
        repo="username/repo"
        repoId="MDEwOlJlcG9zaXRvcnkxMjM0NTY3OA=="
        category="General"
        categoryId="DIC_kwDOA1q4LM4B-abc"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="light"
        lang="vi"
      />
    </>
  );
}
```

#### 3. Tái sử dụng cấu hình
Để tránh lặp lại, bạn có thể tạo một component riêng `src/components/CommentSection.js`:

```jsx
import React from 'react';
import Giscus from '@giscus/react';

export default function CommentSection() {
  return (
    <Giscus
      repo="username/repo"
      repoId="..."
      category="General"
      categoryId="..."
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme="light"
      lang="vi"
    />
  );
}
```

Sau đó import `CommentSection` vào cả `BlogPostPage.js` và `DocItem.js`.

#### Kết quả
- Khi người dùng mở **blog post**, phần bình luận sẽ hiển thị ngay dưới bài viết.  
- Khi người dùng mở **docs page**, phần bình luận cũng xuất hiện dưới nội dung tài liệu.  
- Tất cả bình luận được lưu trong **GitHub Discussions** của repo bạn đã cấu hình.

---