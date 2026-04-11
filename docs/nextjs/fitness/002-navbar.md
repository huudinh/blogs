---
sidebar_position: 2
---

# Navbar

Tiến hành tạo thanh menu cho website. Cài đặt extension Tailwind CSS IntelliSense để gợi ý class Tailwind.



<ToggleTOC />

## Tạo file constants.ts

```jsx title="Tạo file src/lib/constants.ts"
export const navItems = [
    {
        name: "Home",
        href: "#"
    },
    {
        name: "Programs",
        href: "#"
    },
    {
        name: "About",
        href: "#"
    },
    {
        name: "Pricing",
        href: "#"
    },
    {
        name: "Contact",
        href: "#"
    }
]
```

## Tạo components Navbar.tsx 

```jsx title="Sửa file src/components/Navbar.tsx"
import { navItems } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div>
                        <h1 className="text-2xl font-black font-heading text-primary">FitPro</h1>
                    </div>

                    {/* Destop navigation */}
                    <div className="hidden md:block">
                        <div className="flex items-baseline space-x-8">
                            {navItems.map((item) => (
                                <Link className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-300" key={item.name} href={item.href}>
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Button className="font-semibold">Join Now</Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
```

## Sửa trang Home

```jsx title="Sửa file src/app/page.tsx"
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
    </main>
  );
}
```
