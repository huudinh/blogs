---
sidebar_position: 1
id: introduction
title: NestJS là gì
---

**NestJS** là **framework backend (server-side)** chạy trên **Node.js**, dùng **TypeScript**.

---

## I. NestJS dùng để làm gì


#### Hiểu đơn giản:

> **NestJS = Laravel của thế giới Node.js**

#### NestJS dùng để

* Xây dựng **API** (REST / GraphQL)
* Backend cho:

  * Web (React / Next.js)
  * Mobile app
  * Admin / CMS
* Microservices, WebSocket, Cron, Queue…

---

## II. NestJS KHÔNG phải React / Next.js

| Thằng       | Vai trò                    | Chạy ở đâu             |
| ----------- | -------------------------- | ---------------------- |
| **NestJS**  | Backend                    | Server                 |
| **ReactJS** | Frontend UI                | Browser                |
| **NextJS**  | Frontend framework (React) | Browser + Server (SSR) |

**NestJS không render UI**, không làm giao diện.

---

## III. NestJS liên quan gì tới ReactJS / NextJS?

**Quan hệ chuẩn là:**

```
React / NextJS  ← gọi API →  NestJS  ←→ Database
```

#### Ví dụ thực tế

* **NextJS**:

  * Hiển thị giao diện
  * Gọi API: `/api/posts`
* **NestJS**:

  * Xử lý logic
  * Check auth / role / permission
  * Trả JSON về cho NextJS

---

## IV. Khi nào cần NestJS + React / NextJS?

#### KHÔNG cần NestJS khi:

* Website đơn giản
* CRUD nhẹ
* NextJS API Routes làm được hết

#### NÊN dùng NestJS khi:

* App lớn
* Nhiều role / permission
* Nhiều service
* Muốn:

  * Code **rõ ràng**
  * Chia module
  * Test dễ
  * Scale team

---

## V. So sánh nhanh NestJS vs NextJS API

| Tiêu chí     | NestJS        | NextJS API          |
| ------------ | ------------- | ------------------- |
| Mục đích     | Backend thuần | API nhẹ             |
| Kiến trúc    | Rất rõ ràng   | Nhanh nhưng dễ loạn |
| Guard / Auth | Rất mạnh      | Tự build            |
| Scale team   | Rất tốt       | Khó                 |
| Microservice | Có            | Không               |

**App nhỏ → NextJS API**

**App nghiêm túc → NestJS**

---

## VI. Vì sao nhiều team thích NestJS?

* Viết **TypeScript chuẩn**
* **Dependency Injection** (giống Angular, Laravel)
* Có sẵn:

  * Guard
  * Middleware
  * Pipe
  * Interceptor
* Dễ maintain khi code lớn

---

## VII. Sơ đồ tư duy nhanh

```
Frontend
  ├── ReactJS
  ├── NextJS
  ↓ (fetch / axios)
Backend
  ├── NestJS
  ├── Express / Fastify
  ↓
Database
```

---

## VIII. Nếu bạn đang làm WordPress / JS

NestJS rất hợp để:

* Làm **API riêng**
* Thay thế dần WP REST
* Build:

  * Admin panel
  * Mobile app
  * Headless CMS

---

:::tip Tip
📲 Đừng quên **like, share và để lại comment** trên kênh TikTok [@thaygiaofrontend](https://www.tiktok.com/@thaygiaofrontend) để cùng nhau trao đổi, làm rõ những thắc mắc và nâng tầm kiến thức lập trình Frontend mỗi ngày!
:::
