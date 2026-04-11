---
sidebar_position: 3
---

# Programs Section

Tiến hành tạo Programs Section cho website.


<ToggleTOC />

## Cài đặt Card UI  

Card UI là thư viện UI hiệu quả cho React.

```jsx
npx shadcn@latest add card
```

## Sửa file constants.ts

```jsx title="Sửa file src/lib/constants.ts"
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
];

export const programs = [
    {
        title: "Strength Training",
        description:
            "Build muscle and increase your power with our comprehensive strength training programs.",
        image: "/strength.jpg",
    },
    {
        title: "Yoga & Flexibility",
        description:
            "Improve your flexibility, balance, and mindfulness through guided yoga sessions.",
        image: "/yoga.jpg",
    },
    {
        title: "Cardio Workouts",
        description:
            "Boost your cardiovascular health with high-energy cardio training sessions.",
        image: "/cardio.jpg",
    },
    {
        title: "Nutrition Guidance",
        description:
            "Get personalized nutrition plans to fuel your body and achieve your fitness goals.",
        image: "/nutrition.jpg",
    },
];
```

## Tạo components Programs.tsx 

```jsx title="Tạo file src/components/Programs.tsx"
import { programs } from "@/lib/constants";
import * as motion from "motion/react-client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

export default function Programs() {
    return (
        <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="text-4xl mb:text-5xl font-black font-heading mb-4 text-foreground">Our Programs</motion.h2>
                    <motion.p initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto">Choose a program that fits your goals and lifestyle.</motion.p>
                </div>
                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {programs.map((programs, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                ease: "easeOut",
                                delay: index * 0.2
                            }}
                            whileHover={{ scale: 1.02 }}
                            key={programs.title}
                            className="group cursor-pointer"
                        >
                            <Card className="p-0 transition-shadow duration-300 hover:shadow-2xl">
                                <div className="relative overflow-hidden rounded-t-lg w-full h-60 md:h-56 lg:h-40">
                                    <Image
                                        src={programs.image}
                                        fill
                                        alt={programs.title}
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>

                                <CardContent className="p-6 pt-0">
                                    <motion.h3
                                        initial={{ opacity: 0, y: 8 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            ease: "easeOut",
                                            delay: index * 0.2
                                        }}
                                        viewport={{ once: true }}
                                        className="text-xl font-bold font-heading mb-3 text-foreground group-hover:text-primary transition-colors">{programs.title}</motion.h3>
                                    <motion.p
                                        initial={{ opacity: 0, y: 6 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            ease: "easeOut",
                                            delay: index * 0.3
                                        }}
                                        viewport={{ once: true }}
                                        className="text-muted-foreground mb-4 leading-relaxed">{programs.description}
                                    </motion.p>
                                    <div>
                                        <Button variant="outline" className="w-full transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">View Details</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
```

## Sửa trang Home

```jsx title="Sửa file src/app/page.tsx"
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Programs from "@/components/Programs";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Programs />
    </main>
  );
}
```
