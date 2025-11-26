---
sidebar_position: 6
---

# React DOM

ReactDOM là sự kết hợp giữa React và DOM

![Create-HTML-1](images/dom.jpg) 

<ToggleTOC />

## I. React DOM

React tạo ra phiên bản ảo (Virtual DOM) của Giao diện người dùng (User Interface - UI). ReactDOM là thư viện giúp cập nhật DOM một cách hiệu quả dựa trên Virtual DOM.

Virtual DOM được sử dụng để xác định các phần của UI cần được cập nhật và sau đó tập hợp những thay đổi này lại. ReactDOM nhận các hướng dẫn đó từ React và sau đó cập nhật DOM một cách hiệu quả.

## II. Tại sao React DOM là một thư viện độc lập?

Vài năm trước đây, React và ReactDOM là hai phần của cùng một thư viện tên là React. Sau đó, chúng đã được tách ra thành hai thư viện độc lập là React và ReactDOM để tạo điều kiện cho việc phát triển React Native.

React Native là sự kết hợp giữa React và ứng dụng native. React là thư viện cho phép bạn viết UI có thể tái sử dụng và:
    
- ReactDOM làm cho UI đó hiển thị trên trình duyệt.

- React Native làm cho UI đó hiển thị trên ứng dụng native.

Điều quan trọng cần ghi nhớ là thư viện React không liên quan gì đến trình duyệt web:

- ReactDOM làm cho React có thể hoạt động và tương tác với trình duyệt web (ví dụ: Firefox, Chrome, Safari, Edge, v.v.).

- React Native làm cho React có thể hoạt động và tương tác với ứng dụng native (ví dụ: native android, native iOS).

## III. Reconciliation

React tạo ra phiên bản ảo của UI trong bộ nhớ, sau đó ReactDOM nhận và đồng bộ hóa UI (và các thay đổi trong đó) vào DOM. Quá trình này được gọi là reconciliation.

Điều này giúp bạn làm việc với React một cách thuận tiện và tự động.

:::tip Tóm lại
 
- ReactDOM là sự kết hợp giữa React và DOM.
- ReactDOM khác biệt với React vì bạn có thể viết React cho các ứng dụng native.
- Reconciliation là quá trình đồng bộ hóa DOM ảo với DOM thực.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1. ReactDOM là gì?

ReactDOM là thư viện giúp React hiển thị giao diện người dùng (UI) trên trình duyệt web. Nó nhận các thay đổi từ Virtual DOM do React tạo ra và cập nhật DOM thực một cách hiệu quả.

### Câu 2. Virtual DOM có vai trò gì trong React?

Virtual DOM là phiên bản ảo của giao diện người dùng được lưu trong bộ nhớ. React sử dụng nó để xác định những phần nào của UI cần được cập nhật, sau đó ReactDOM sẽ thực hiện việc cập nhật DOM thực dựa trên những thay đổi đó.

### Câu 3. Tại sao ReactDOM là một thư viện độc lập?

Ban đầu, React và ReactDOM nằm chung trong một thư viện. Sau này, chúng được tách ra để hỗ trợ phát triển React Native. Việc tách này giúp React có thể hoạt động trên nhiều nền tảng:

ReactDOM: hiển thị UI trên trình duyệt web.

React Native: hiển thị UI trên ứng dụng native như Android và iOS.

### Câu 4. React có liên quan trực tiếp đến trình duyệt web không?

Không. React không liên quan trực tiếp đến trình duyệt web. Nó chỉ là thư viện để xây dựng UI. Chính ReactDOM mới là phần giúp React tương tác với trình duyệt như Chrome, Firefox, Safari, v.v.

### Câu 5. Reconciliation trong React là gì?

Reconciliation là quá trình đồng bộ hóa giữa Virtual DOM và DOM thực. React tạo ra phiên bản UI trong bộ nhớ, sau đó ReactDOM sẽ cập nhật giao diện thật trên trình duyệt dựa trên những thay đổi đó. Quá trình này giúp React hoạt động hiệu quả và tự động.