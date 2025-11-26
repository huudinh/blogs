---
slug: landmark-one-main
title: Trang web không có điểm mốc chính thì có sao không
authors: [DinhTrieu]
tags: [blog]
---

Điểm mốc chính giúp người dùng trình đọc màn hình dễ dàng thao tác trên trang web. 


<!-- truncate -->

Dưới đây là **tài liệu chi tiết** về chủ đề **“Landmark One Main (ID quy tắc: landmark-one-main)”** — được biên soạn dựa trên quy tắc của **axe-core 4.11**, hướng dẫn của **Deque Systems**, và mở rộng thêm về **tầm quan trọng trong SEO (bộ máy tìm kiếm)**

---

## I. Landmark One Main là gì?

**Landmark One Main** là một quy tắc kiểm tra khả năng truy cập (Accessibility Rule) đảm bảo rằng **mỗi trang web chỉ có một vùng nội dung chính duy nhất (main landmark)** — giúp người dùng, đặc biệt là **người khiếm thị hoặc sử dụng trình đọc màn hình**, có thể **xác định nhanh khu vực nội dung chính** trong trang web.

Một trang web được coi là tuân thủ quy tắc này khi:

* Có đúng **một phần tử `<main>`** hoặc **một phần tử có `role="main"`**.
* Các phần tử `iframe` bên trong (nếu có) **không chứa nhiều hơn một vùng chính**.
* Tất cả nội dung đều nằm trong các **vùng mốc (landmark regions)** được xác định bằng **HTML5 semantic elements** hoặc **ARIA roles**.

---

## II. Tầm quan trọng của quy tắc “Landmark One Main”

#### 1. Đối với người dùng và khả năng truy cập (Accessibility)

* **Người dùng trình đọc màn hình (screen reader)** có thể dễ dàng **chuyển đến nội dung chính** bằng phím tắt (ví dụ: JAWS, NVDA, VoiceOver).
* Giúp **phân tách rõ ràng các khu vực trong trang web** như: tiêu đề, điều hướng, nội dung chính và chân trang.
* **Giảm nhầm lẫn** khi có nhiều khối nội dung phụ (ví dụ sidebar, banner, popup, v.v.).
* Tăng **hiệu quả điều hướng** và **trải nghiệm người dùng tổng thể**, đặc biệt với người khuyết tật về thị giác.

#### 2. Đối với SEO (Tối ưu hóa công cụ tìm kiếm)

Việc tuân thủ quy tắc này có **tác động tích cực gián tiếp** đến thứ hạng và khả năng hiểu nội dung của website:

| Lợi ích                                     | Tác động SEO                                                                |
| ------------------------------------------- | --------------------------------------------------------------------------- |
| **Cấu trúc HTML ngữ nghĩa (semantic HTML)** | Giúp Googlebot hiểu rõ phần nào là nội dung chính của trang.                |
| **Tăng khả năng lập chỉ mục (indexing)**    | Google ưu tiên nội dung trong `<main>` khi xác định chủ đề chính của trang. |
| **Giảm tỷ lệ bỏ trang (bounce rate)**       | Người dùng truy cập dễ dàng tìm thấy nội dung trọng tâm.                    |
| **Tuân thủ chuẩn WCAG & Core Web Vitals**   | Là yếu tố gián tiếp giúp cải thiện “Experience signals” trong xếp hạng.     |


:::tip Tóm lại

  Quy tắc `landmark-one-main` không chỉ giúp **trang web dễ truy cập hơn**, mà còn **giúp công cụ tìm kiếm hiểu chính xác nội dung cốt lõi của trang** — một yếu tố cực kỳ quan trọng trong SEO kỹ thuật (Technical SEO).

:::

## III. Cách triển khai đúng quy tắc Landmark One Main

#### 1. Sử dụng đúng phần tử HTML5 và ARIA Roles

Một trang web tiêu chuẩn nên có cấu trúc ngữ nghĩa như sau:

```html
<header role="banner">
   <h1>Company Name</h1>
</header>

<nav role="navigation">
   <ul>
      <li><a href="#">Trang chủ</a></li>
      <li><a href="#">Sản phẩm</a></li>
      <li><a href="#">Liên hệ</a></li>
   </ul>
</nav>

<main role="main">
   <article>
      <h2>Nội dung chính của trang</h2>
      <p>Đây là nơi hiển thị nội dung trọng tâm mà người dùng cần đọc.</p>
   </article>
</main>

<footer role="contentinfo">
   <p>Bản quyền © 2025 Công ty ABC</p>
</footer>
```

:::tip Lưu ý

* Chỉ **một `<main>` hoặc `role="main"`** được phép tồn tại trên mỗi trang.
* Không đặt `<main>` bên trong `<header>`, `<nav>`, `<footer>`, hoặc các phần tử lặp lại khác.
* Trong mỗi **iframe**, cũng chỉ nên có **một vùng mốc chính** (hoặc không có).

:::

## IV. Cấu trúc vùng mốc (Landmark Regions)

| Khu vực        | Thẻ HTML5  | Vai trò ARIA tương ứng | Chức năng                                   |
| -------------- | ---------- | ---------------------- | ------------------------------------------- |
| Tiêu đề        | `<header>` | `role="banner"`        | Giới thiệu hoặc nhận diện trang             |
| Điều hướng     | `<nav>`    | `role="navigation"`    | Cung cấp các liên kết điều hướng            |
| Nội dung chính | `<main>`   | `role="main"`          | Nội dung trung tâm của trang                |
| Thanh bên      | `<aside>`  | `role="complementary"` | Nội dung phụ trợ, ví dụ: liên kết liên quan |
| Chân trang     | `<footer>` | `role="contentinfo"`   | Thông tin bản quyền hoặc liên hệ            |

> 💡 **Best Practice:**
> Sử dụng **cả HTML5 element và ARIA role** đồng thời giúp **tương thích tối đa** với cả trình duyệt cũ và công nghệ trợ năng mới.

---

## V. Cách kiểm tra & khắc phục lỗi “landmark-one-main”

#### 1. Dùng công cụ tự động

* **axe DevTools Pro** (plugin cho Chrome, Firefox)
* **Lighthouse (trong Chrome DevTools)**
* **WAVE Accessibility Tool**

Nếu có lỗi, bạn sẽ thấy cảnh báo như:

> ⚠️ “Document must have one main landmark”
> hoặc
> “Multiple `<main>` elements found on the same page.”

#### 2. Cách khắc phục

* Giữ lại **duy nhất một `<main>`** cho nội dung chính.
* Gỡ bỏ hoặc đổi các `<main>` phụ thành `<div>` hoặc `<section>`.
* Kiểm tra trong **iframe**, đảm bảo không chứa nhiều vùng `role="main"`.

Ví dụ lỗi:

```html
<main>...</main>
<main>...</main> <!-- ❌ Lỗi: Nhiều vùng main -->
```

Cách sửa:

```html
<main>...</main>
<section>...</section> <!-- ✅ Không vi phạm landmark-one-main -->
```

---

## VI. Kết luận

Quy tắc **Landmark One Main (landmark-one-main)** là một trong những **yếu tố nền tảng của khả năng truy cập web hiện đại**.
Việc tuân thủ quy tắc này mang lại **ba lợi ích đồng thời**:

✅ **Tăng khả năng truy cập** cho người khuyết tật và người dùng công nghệ hỗ trợ.

📈 **Cải thiện SEO kỹ thuật**, giúp công cụ tìm kiếm hiểu rõ nội dung trọng tâm của trang.

💼 **Tuân thủ tiêu chuẩn WCAG & Deque Best Practices**, nâng cao tính chuyên nghiệp và độ tin cậy của website.