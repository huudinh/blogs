---
sidebar_position: 1
---

# Cài đặt

Các bước sử dụng NextJS để làm website fitness. Ở đây chúng ta sẽ sử dụng NextJS 16 kết hợp với Tailwind CSS và shadcn/ui. Ngoài ra chúng ta sẽ sử dung thư viện hiệu ứng motion.


<ToggleTOC />

## I. Tạo ứng dụng

```bash
npx create-next-app@latest .
```
hoặc

```bash
npx create-next-app --ts
```

Chọn cài đặt mặc định, create-next-app sẽ cài đặt các phụ thuộc cần thiết.

Chạy dự án gõ lệnh

```bash
npm run dev
```

## II. Cài đặt shadcn/ui 

Khai báo UI

```bash
npx shadcn@latest init
```

Cấu hình Tailwind CSS  

```bash
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Cài đặt các component 

```bash
npx shadcn@latest add button
```


## III. Sửa trang Home

```jsx title="Sửa file src/app/page.tsx"
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Button>Test</Button>
    </div>
  );
}

```

## IV. Đẩy dự án lên github

Vào https://github.com/new đặt tên cho repository là fitness

Chú ý không tạo bất cứ file nào

Sau đó gõ code sau để đẩy code lên git

```bash
echo "# fitness" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/huudinh/fitness.git
git push -u origin main
```