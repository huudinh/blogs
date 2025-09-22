---
sidebar_position: 4
---

# Backend với NextJS

Bạn có thể tạo API đơn giản cho ứng dụng với các chức năng CRUD bằng NextJS và Typescript

<ToggleTOC />

## I. Mục tiêu

1. Khởi tạo ứng dụng login-api

2. Cài đặt Backend API http://localhost:3000/api/users

3. Khai báo Type User

4. Làm data mẫu

5. Xây dựng phương thức CRUD cho API

## II. Code Project

```ts title="1. Tạo file src/type/backend.d.ts"
interface User {
    id: number;
    fullName: string;
    username: string;
    password: string;
    age: number;
};
```

```js title="2. Tạo file data.json"
[
  {
    "id": 1,
    "fullName": "Quoc Viet",
    "username": "Viet",
    "password": "1234",
    "age": 28
  },
  {
    "id": 2,
    "fullName": "Dinh Trieu",
    "username": "dinh",
    "password": "1234",
    "age": 28
  }
]

```

```jsx title="3. Tạo file src/pages/api/users.ts"
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data.json');

const readData = () => {
  const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(jsonData);
};

const writeData = (data: User) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id, fullName, username, password, age } = req.body;

  let users = readData();

  switch (method) {
    case 'GET':
      if (req.query.id) {
        // Trả về user cụ thể dựa trên ID
        const userId = parseInt(req.query.id as string, 10);
        const user = users.find((user: User) => user.id === userId);
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } else {
        // Trả về danh sách user
        res.status(200).json(users);
      }      
      break;
    case 'POST':
      // Thêm một user mới
      const maxId = users.reduce((max:number, user:User) => (user.id > max ? user.id : max), 0);
      const newUser = { id: maxId + 1, fullName, username, password, age };
      users.push(newUser);
      writeData(users);
      res.status(201).json(newUser);
      break;
    case 'PUT':
      // Sửa một user
      const userIndex = users.findIndex((user: User) => user.id === id);
      if (userIndex !== -1) {
        users[userIndex] = { id, fullName, username, password, age };
        writeData(users);
        res.status(200).json(users[userIndex]);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
      break;
    case 'DELETE':
      // Xóa một user
      const updatedUsers = users.filter((user: User) => user.id !== id);
      if (updatedUsers.length !== users.length) {
        users = updatedUsers;
        writeData(users);
        res.status(200).json({ message: 'User deleted' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}
```

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### 1. Làm thế nào để khởi tạo ứng dụng NextJS

Tạo ứng dụng nextjs `npx create-next-app@latest`

Chạy ứng dụng `npm run dev`

### 2. Có nên sử dụng nextjs làm backend?

Sử dụng Next.js làm backend là một lựa chọn ngày càng phổ biến — đặc biệt nếu bạn đã dùng React ở frontend. Nhưng có nên hay không thì còn tùy vào mục tiêu dự án của bạn.

### 3. Trường hợp nào không nên sử dụng nextjs làm backend?

Không phù hợp cho các hệ thống backend phức tạp

Khó mở rộng nếu backend phát triển mạnh

Không có middleware mạnh như Express/NestJS