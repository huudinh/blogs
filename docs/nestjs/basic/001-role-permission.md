---
sidebar_position: 1
---

# Quản lý Role & Permission trong NestJS

Trong **NestJS**, việc quản lý **Role (Vai trò)** và **Permission (Quyền hạn)** thường được xây dựng dựa trên cơ chế:

- **RBAC** (Role-Based Access Control)
- **CBAC** (Claims-Based Access Control)

Dưới đây là các khái niệm cơ bản và cách triển khai.


<ToggleTOC />

---

## 1. Phân biệt Role và Permission

#### Role (Vai trò)
Là một **nhóm các quyền hạn** được gán cho người dùng.  
**Ví dụ:**  
- Admin  
- User  
- Editor  

#### Permission (Quyền hạn)
Là khả năng thực hiện **một hành động cụ thể trên một tài nguyên**.  
**Ví dụ:**  
- `create_post`  
- `delete_user`  
- `view_reports`  

---

## 2. Các thành phần cốt lõi trong NestJS

Để triển khai hệ thống Role & Permission, NestJS sử dụng **3 thành phần chính**:


#### A. Decorators (Đánh dấu quyền)

Dùng để gán yêu cầu về **Role** hoặc **Permission** trực tiếp lên các hàm trong `Controller`.

- **Custom Decorators**:  
  Bạn có thể tạo các decorator như:
  - `@Roles('admin')`
  - `@CheckPermissions(Permission.Read)`

Decorator sẽ gắn **metadata** cho endpoint.

#### B. Guards (Lớp bảo vệ)

Đây là nơi thực hiện **logic kiểm tra quyền**. Guard sẽ:

- Đọc metadata (Role / Permission) từ Decorator bằng **Reflector**
- Lấy thông tin người dùng từ `Request`  
  (thường được gắn sau khi đi qua **Auth Guard**)
- So sánh quyền của người dùng với quyền yêu cầu:
  - Khớp → `true` (cho phép)
  - Không khớp → `false` (chặn)


#### C. Reflector

`Reflector` là một **helper class** của NestJS, dùng để:

- Truy xuất metadata đã được gắn qua Decorator
- Hoạt động trong quá trình **runtime**

## 3. Quy trình hoạt động (Workflow)

1. **Xác thực (Authentication)**  
   Người dùng đăng nhập, server trả về **JWT** chứa thông tin `Role` / `Permission`.

2. **Gán quyền (Metadata)**  
   Controller sử dụng Decorator để quy định:
   > “Hàm này chỉ dành cho Admin”

3. **Kiểm tra (Guard)**  
   Khi có request:
   - Guard được kích hoạt
   - Dùng `Reflector` để lấy Role/Permission yêu cầu
   - So sánh với Role trong JWT của người dùng
   - Quyết định cho phép hoặc chặn truy cập


## 4. Thư viện hỗ trợ phổ biến (2026)

Thay vì tự viết logic phức tạp, bạn có thể sử dụng các thư viện sau:

#### 🔹 CASL
- Thư viện phổ biến nhất cho **Fine-grained Authorization**
- Hỗ trợ điều kiện động  
  Ví dụ:
  > “Chỉ được sửa bài viết nếu mình là tác giả”

#### 🔹 AccessControl
- Quản lý Role & Permission theo **cấu trúc cây**
- Đơn giản, dễ dùng cho hệ thống RBAC truyền thống

---