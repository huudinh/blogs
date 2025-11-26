---
sidebar_position: 12
---

# API Routes

API Routes trong **Next.js** là cách để bạn xây dựng **API backend ngay bên trong ứng dụng Next.js** mà không cần server riêng. Nó cho phép bạn viết các endpoint (RESTful hoặc custom) trực tiếp trong thư mục `pages/api/`.

<ToggleTOC />

---

## I. RESTful API là gì?

**RESTful API** là một tiêu chuẩn thiết kế API dựa trên HTTP, trong đó:

* **Mỗi URL đại diện cho một tài nguyên (resource)**
  Ví dụ: `/api/posts`, `/api/users`, `/api/products/12`

* **Mỗi method HTTP thể hiện hành động lên tài nguyên**

  | Method | Ý nghĩa          | Ví dụ                 |
  | ------ | ---------------- | --------------------- |
  | GET    | Lấy dữ liệu      | GET `/api/posts`      |
  | POST   | Tạo mới          | POST `/api/posts`     |
  | PUT    | Cập nhật toàn bộ | PUT `/api/posts/3`    |
  | PATCH  | Cập nhật 1 phần  | PATCH `/api/posts/3`  |
  | DELETE | Xóa              | DELETE `/api/posts/3` |

* **Không lưu trạng thái (stateless)**
  Server không nhớ người dùng là ai → mọi request gửi lên phải đủ thông tin.

* **Trả về JSON chuẩn hóa**
  Ví dụ:

  ```json
  {
    "status": "success",
    "data": {...}
  }
  ```

---

## II. Tại sao RESTful API quan trọng?

* Code rõ ràng và thống nhất
* Dễ scale, dễ mở rộng hệ thống
* Frontend (React, Next.js) → Backend (API) tách biệt hoàn toàn
* Tương thích với mobile app, web app, desktop app

---

## III. Áp dụng RESTful API trong Next.js

Next.js App Router (từ v13) hỗ trợ API dạng:

```
src/app/api/posts/route.ts           → /api/posts
src/app/api/posts/[id]/route.ts      → /api/posts/:id
```

Và mỗi file `route.ts` **tự động tương ứng với REST method**:

```ts
export async function GET() {}
export async function POST() {}
export async function PUT() {}
export async function DELETE() {}
export async function PATCH() {}
```

→ Next.js **mặc định đã hỗ trợ RESTful architecture**.

---

## IV. Ví dụ RESTful API chuẩn trong Next.js

#### 1. GET all posts → /api/posts

`src/app/api/posts/route.ts`

```ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { id: 1, title: "Hello" },
    { id: 2, title: "World" }
  ]);
}
```

---

#### 2. POST create new post → /api/posts

```ts
export async function POST(req: Request) {
  const data = await req.json();
  return NextResponse.json({
    message: "Created",
    data
  });
}
```

---

#### 3. GET, PUT, DELETE by ID → /api/posts/[id]

`src/app/api/posts/[id]/route.ts`

```ts
export async function GET(req, context) {
  const { id } = await context.params;
  return NextResponse.json({ id, title: "Post " + id });
}

export async function PUT(req, context) {
  const { id } = await context.params;
  const body = await req.json();
  return NextResponse.json({ message: "Updated", id, body });
}

export async function DELETE(req, context) {
  const { id } = await context.params;
  return NextResponse.json({ message: "Deleted", id });
}
```

---

#### 4. Quy tắc để gọi là RESTful API chuẩn

**✓ Đặt tên URL theo danh từ (resource)**

Không dùng động từ:

```
Sai:    /api/getPosts
Đúng:   /api/posts
```

#### ✓ Dùng HTTP method đúng nghĩa

```
GET     /api/posts          → Lấy danh sách
POST    /api/posts          → Tạo mới
GET     /api/posts/3        → Lấy post 3
PUT     /api/posts/3        → Cập nhật post 3
DELETE  /api/posts/3        → Xóa post 3
```

#### ✓ Trả JSON đúng format

```
{
  "success": true,
  "data": {...}
}
```

#### ✓ Stateless (không lưu trạng thái)

Không session, không ghi nhớ user → mọi request phải tự chứa auth/token.

---

## V. RESTful API so với API Routes cũ

| API Routes (pages/api)     | App Router API (route.ts) |
| -------------------------- | ------------------------- |
| Dùng handler default       | Dùng function theo method |
| Định nghĩa thủ công        | Next.js tự map REST       |
| Không hỗ trợ Streaming tốt | Hỗ trợ tốt RSC + Edge     |

---

:::tip Tóm lại

* RESTful API = quy tắc xây dựng API rõ ràng theo chuẩn HTTP
* Next.js App Router hỗ trợ RESTful API **mặc định**
* Chỉ cần tổ chức đúng route + method là bạn đã RESTful
:::


---

## IX. Thực hành

Tạo RESTful API hoàn chỉnh CRUD chạy với JSON file.

### 1. Cấu trúc thư mục chuẩn

```html title="Lên cấu trúc thư mục API"
project/
 ├── data/
 │    └── posts.json
 └── src/
      └── app/
           └── api/
                └── posts/
                     ├── route.ts        <-- CRUD cho GET/POST
                     └── [id]/
                          └── route.ts    <-- CRUD cho GET/PUT/DELETE


```

### 2. Tạo file JSON (data/posts.json)

```jsx title="Tạo file tại thư mục /data/posts.json"
[
  { "id": 1, "title": "Hello World", "body": "This is a JSON file post" },
  { "id": 2, "title": "Next.js API", "body": "CRUD example using file" }
]
```

### 3. GET tất cả + tạo mới

```jsx title="Tạo file /api/posts/route.ts"
import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

const filePath = path.join(process.cwd(), "data/posts.json");

async function getPosts() {
  const data = await fs.readFile(filePath, "utf8");
  return JSON.parse(data);
}

async function savePosts(posts: any[]) {
  await fs.writeFile(filePath, JSON.stringify(posts, null, 2), "utf8");
}

// GET /api/posts → lấy toàn bộ bài viết
export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts);
}

// POST /api/posts → thêm bài viết
export async function POST(req: Request) {
  const body = await req.json();
  const posts = await getPosts();

  const newPost = {
    id: posts.length ? posts[posts.length - 1].id + 1 : 1,
    title: body.title,
    body: body.body,
  };

  posts.push(newPost);
  await savePosts(posts);

  return NextResponse.json(newPost, { status: 201 });
}
```

### 4. GET 1 post – UPDATE – DELETE

✔ GET 1 bài viết
✔ PUT để update
✔ DELETE để xóa

```jsx title="Tạo file src/app/api/posts/[id]/route.ts"
// Import NextResponse để trả JSON trong API route
import { NextResponse } from "next/server";

// Import thư viện Node.js để đọc / ghi file
import fs from "fs";
import path from "path";

// Tạo đường dẫn tuyệt đối đến file JSON (database)
const DB_PATH = path.join(process.cwd(), "data/posts.json");


// Hàm đọc JSON từ file (Sync cho đơn giản và an toàn)
function readDB() {
  const text = fs.readFileSync(DB_PATH, "utf8"); // Đọc file dạng text
  return JSON.parse(text); // Chuyển text → object / array
}


// Hàm ghi dữ liệu vào JSON
function writeDB(data: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2)); // Ghi với format đẹp
}


// Chuẩn hóa ID: chỉ chấp nhận số nguyên dương
function normalizeId(id: any): number | null {
  const n = Number(id);
  return Number.isInteger(n) && n > 0 ? n : null;
}


/* ============================
   GET /api/posts/:id
   Lấy 1 bài viết theo ID
=============================== */
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> } // ⬅ params là Promise!
) {
  const { id: rawId } = await context.params; // ⬅ Lấy ID từ URL (bắt buộc phải await)
  const id = normalizeId(rawId); // Chuẩn hóa ID

  // Nếu ID không hợp lệ → trả lỗi 400
  if (id === null) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  const posts = readDB(); // Đọc database
  const post = posts.find((p: any) => p.id === id); // Tìm bài viết theo ID

  // Không có bài viết → trả lỗi 404
  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post); // Trả về bài viết
}


/* ============================
   PUT /api/posts/:id
   Update bài viết theo ID
=============================== */
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: rawId } = await context.params; // Lấy ID từ URL
  const id = normalizeId(rawId); // Kiểm tra ID

  // ID sai → báo lỗi
  if (id === null) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  const body = await req.json(); // Lấy dữ liệu từ client gửi lên
  const posts = readDB(); // Đọc danh sách posts

  const index = posts.findIndex((p: any) => p.id === id); // Tìm bài theo index

  // Nếu không thấy → lỗi 404
  if (index === -1) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  // Gộp dữ liệu mới và cũ
  posts[index] = { ...posts[index], ...body };
  writeDB(posts); // Ghi lại database

  return NextResponse.json(posts[index]); // Trả post sau khi update
}


/* ============================
   DELETE /api/posts/:id
   Xóa bài viết theo ID
=============================== */
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: rawId } = await context.params; // Lấy ID
  const id = normalizeId(rawId); // Validate

  // ID không hợp lệ
  if (id === null) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  const posts = readDB(); // Đọc DB
  const exists = posts.some((p: any) => p.id === id); // Kiểm tra tồn tại

  // Không có bài → báo lỗi
  if (!exists) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  // Lọc bỏ bài viết cần xóa
  const newData = posts.filter((p: any) => p.id !== id);
  writeDB(newData); // Ghi lại database

  return NextResponse.json({ message: "Deleted successfully" });
}

```

### 5. Cách gọi API từ component (Server hoặc Client)

#### Lấy toàn bộ post

```jsx
const res = await fetch("http://localhost:3000/api/posts", {
  cache: "no-store",
});
const posts = await res.json();
```

#### Thêm bài viết

```jsx
await fetch("/api/posts", {
  method: "POST",
  body: JSON.stringify({
    title: "New Post",
    body: "Content here...",
  }),
});

```

#### Update bài viết

```jsx
await fetch("/api/posts/3", {
  method: "PUT",
  body: JSON.stringify({
    title: "Updated title",
  }),
});

```

#### Xóa bài viết

```jsx
await fetch("/api/posts/3", { method: "DELETE" });
```