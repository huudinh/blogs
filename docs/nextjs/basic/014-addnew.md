---
sidebar_position: 14
---

# Thêm mới bài viết

Tạo thêm logic thêm mới bài viết vào API `http://10.196.61.148:3000/api/posts`.

<ToggleTOC />

---

## I. Mục tiêu

1. Thêm mới dữ liệu từ UI người dùng vào API

2. Hiển thị thông báo khi thêm mới thành công

## II. Code Project

```tsx title="Sửa file src/app/dashboard/create-post/page.tsx"

```

### 2. Sửa layout Dashboard

```tsx title="Sửa file src/app/dashboard/layout.tsx"

```

### 3. Sửa layout Home

```tsx title="Sửa file src/app/layout.tsx"

```

### 4. Sửa trang bài viết chi tiết

```tsx title="Sửa file src/app/dashboard/[id]/page.tsx"

```

### 5. Sửa Style

```scss title="Sửa file src/styles/app.module.scss"

```
## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### 1. Tại sao cần sử dụng message.success và message.error?

message.success("..."): hiển thị thông báo thành công.

message.error("..."): hiển thị thông báo lỗi nếu API trả về lỗi hoặc không kết nối được.

### 2. Tại sao cần sử dụng form.resetFields()

form.resetFields(): xóa dữ liệu trong form sau khi thêm thành công.