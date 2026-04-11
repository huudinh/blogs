---
sidebar_position: 2
---

# Dùng gì để làm role permission

Trong **NestJS**, nếu làm **role & permission** “ngon – sạch – mở rộng tốt” thì thường chia theo **3 level**. 

## I. Level 1 – Chuẩn NestJS (đa số project dùng)

👉 **RBAC (Role-Based Access Control)**

#### Stack nên dùng

* **@nestjs/passport**
* **passport-jwt**
* **@nestjs/jwt**
* **Guards + Decorators**
* **Reflector**

#### Cách làm chuẩn

* `JwtAuthGuard` → xác thực
* `RolesGuard` → check quyền
* `@Roles()` decorator

#### Ví dụ

```ts
// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
```

```ts
// roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role);
  }
}
```

```ts
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Get('admin')
getAdminData() {}
```

**Ưu điểm**

* Dễ code
* Chuẩn NestJS
* Phù hợp 80% project

**Nhược**

* Khó mở rộng khi permission phức tạp

---

## II. Level 2 – RBAC + Permission (xịn hơn)

👉 Role chỉ là nhóm, **permission mới là quyền thật**

#### Cấu trúc DB gợi ý

```txt
users
roles
permissions
role_permissions
user_roles
```

#### Permission dạng string

```ts
'posts.create'
'posts.update'
'users.delete'
```

#### Decorator

```ts
@Permissions('posts.create')
```

#### Guard

```ts
user.permissions.includes(permission)
```

🔥 Cách này rất hợp:

* CMS
* Admin panel
* SaaS

---

## III. Level 3 – PRO MAX (CASL – ABAC)

👉 **CASL** – thư viện permission mạnh nhất cho NestJS

#### Dùng khi nào?

* Permission theo **object**
* Điều kiện phức tạp
  👉 “user chỉ sửa được bài của mình”
  👉 “admin chỉ xem user cùng chi nhánh”

#### Thư viện

```bash
npm i @casl/ability
```

#### Ví dụ

```ts
defineAbility((can, cannot) => {
  can('read', 'Post');
  can('update', 'Post', { authorId: user.id });
});
```

```ts
@CheckAbilities({ action: 'update', subject: 'Post' })
```

**Ưu điểm**

* Rất mạnh
* Chuẩn enterprise
* Viết rule cực rõ

**Nhược**

* Học hơi mệt
* Overkill nếu app nhỏ

---

## IV. Best Practice mình recommend

| Dự án             | Nên dùng          |
| ----------------- | ----------------- |
| Blog / API nhỏ    | RBAC thuần        |
| Admin / CMS       | Role + Permission |
| SaaS / Enterprise | CASL              |

---

## V. Nếu là bạn (dev WordPress + JS + backend nhiều)

👉 **Role + Permission string** là **ngon nhất**

* Dễ map từ WP (`edit_post`, `delete_post`)
* Scale ổn
* Không quá phức tạp như CASL