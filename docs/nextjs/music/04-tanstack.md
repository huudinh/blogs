---
sidebar_position: 1
---

# TanStack Query trong Next.js

**TanStack Query** (tên cũ: **React Query**) là một thư viện **quản lý state bất đồng bộ (server state)** cực kỳ mạnh cho các framework frontend (React, Vue, Svelte, Solid…). Nó **không thay thế Redux/Zustand**, mà giải quyết **bài toán fetch – cache – sync – update dữ liệu từ server**.

<ToggleTOC />

---

## 1. TanStack Query là gì?

👉 Hiểu ngắn gọn:

> **TanStack Query = “useState + useEffect + cache + retry + loading + error + refetch” gói gọn trong 1 hook**

#### Trước khi có TanStack Query (cách cũ)

```ts
useEffect(() => {
  setLoading(true);
  fetch('/api/posts')
    .then(res => res.json())
    .then(data => setPosts(data))
    .catch(err => setError(err))
    .finally(() => setLoading(false));
}, []);
```

❌ Vấn đề:

* Viết lặp lại nhiều
* Không cache
* Reload trang là mất dữ liệu
* Không tự refetch
* Không đồng bộ nhiều component dùng chung data

---

#### Với TanStack Query

```ts
const { data, isLoading, error } = useQuery({
  queryKey: ['posts'],
  queryFn: () => fetch('/api/posts').then(res => res.json())
});
```

#### Có sẵn:

Cache thông minh, Loading / error, Retry tự động

Refetch khi: Focus lại tab, Network reconnect

Đồng bộ nhiều component

Pagination, infinite scroll, optimistic update

---

## 2. TanStack Query quản lý **Server State**, không phải UI State

| Loại state       | Ví dụ                    | Dùng gì            |
| ---------------- | ------------------------ | ------------------ |
| UI State         | modal mở/đóng, dark mode | useState, Zustand  |
| Client State     | form input               | React state        |
| **Server State** | API, DB                  | **TanStack Query** |

---

## 3. Cách TanStack Query hoạt động

```
Component
   ↓
useQuery()
   ↓
QueryClient (cache)
   ↓
Fetch API
   ↓
Cache → Component khác dùng chung
```

➡️ Chỉ **1 request**, nhiều component dùng chung data

---

## 4. Khi nào dùng TanStack Query trong Next.js?

| Trường hợp                    | Có nên dùng              |
| ----------------------------- | ------------------------ |
| Client Component fetch API    | ✅ RẤT NÊN                |
| Dashboard, admin, realtime    | ✅                        |
| Dữ liệu thay đổi thường xuyên | ✅                        |
| SEO tĩnh, blog                | ❌ (dùng SSR/SSG tốt hơn) |

---


## 5. Setup QueryClient (App Router)

#### Cài đặt

```bash
npm install @tanstack/react-query
```

#### `app/providers.tsx`

```tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

#### `app/layout.tsx`

```tsx
import Providers from './providers';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

---

## 6. Fetch dữ liệu trong Client Component

```tsx
'use client';

import { useQuery } from '@tanstack/react-query';

export default function Albums() {
  const { data, isLoading } = useQuery({
    queryKey: ['albums'],
    queryFn: async () => {
      const res = await fetch('/api/albums');
      if (!res.ok) throw new Error('Fetch failed');
      return res.json();
    }
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <ul>
      {data.map(album => (
        <li key={album.id}>{album.title}</li>
      ))}
    </ul>
  );
}
```

---

## 7. Mutation (POST / PUT / DELETE)

#### Ví dụ thêm album

```tsx
const mutation = useMutation({
  mutationFn: (newAlbum) =>
    fetch('/api/albums', {
      method: 'POST',
      body: JSON.stringify(newAlbum),
    }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['albums'] });
  }
});
```

👉 **invalidateQueries** = refresh lại data liên quan

---

## 8. Kết hợp TanStack Query + Server Components (Nâng cao)

#### Flow chuẩn trong Next.js App Router

* **Server Component**: SEO, dữ liệu tĩnh
* **Client Component + TanStack Query**: tương tác, realtime

```tsx
// Server Component
import AlbumClient from './AlbumClient';

export default async function Page() {
  const albums = await getAlbums(); // fetch trực tiếp DB

  return <AlbumClient initialData={albums} />;
}
```

```tsx
'use client';

useQuery({
  queryKey: ['albums'],
  queryFn: fetchAlbums,
  initialData
});
```

➡️ Vừa SEO tốt, vừa cache client

---

## 9. So sánh nhanh

| Thư viện           | Dùng để               |
| ------------------ | --------------------- |
| Redux              | Client State          |
| Zustand            | UI / local state      |
| **TanStack Query** | **Server state**      |
| SWR                | Nhẹ hơn, ít tính năng |


#### Khi KHÔNG nên dùng TanStack Query

* Trang tĩnh hoàn toàn (blog)
* Dữ liệu chỉ fetch 1 lần
* Không cần cache/refetch

---

:::tip Tóm lại
 
- Next.js lo SEO, routing, SSR
- TanStack Query lo fetch, cache, sync dữ liệu

:::


## 10. Code lại App nghe nhạc của bạn với TanStack Query

Ở đây mình sẽ bỏ kho lưu trữ nhạc thay vì đó sẽ lấy từ API https://huudinh.io.vn/wp-json/album-manager/v1/albums

### 10.1 Cấu trúc thư mục đề xuất Music_v4

```css 
music-player/
├─ app/
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ providers.tsx
│  └─ page.tsx
│
├─ components/
│  ├─ AlbumGrid.tsx
│  ├─ AudioEngine.tsx
│  ├─ AudioProgress.tsx
│  ├─ Player.tsx
│  └─ Playlist.tsx
│
├─ store/
│  └─ playerStore.ts
│
├─ utils/
│  └─ formatTime.ts
│
├─ public/
│  ├─ assets/
│  ├─ manifest.json
│  └─ sw.js
│
└─ next.config.js

```

### 10.2 Tạo file store/playerStore.ts

```tsx 
// store/playerStore.ts
import { create } from "zustand";

export interface Song {
    id: number;
    title: string;
    artist: string;
    src: string;
    cover: string;
}

interface PlayerState {
    playlist: Song[];
    currentIndex: number;
    isPlaying: boolean;

    // Actions
    setPlaylist: (list: Song[]) => void;
    setSong: (index: number) => void;
    play: () => void;
    pause: () => void;
    togglePlay: () => void;
    next: () => void;
    prev: () => void;

    // Getters (tiện ích để lấy dữ liệu hiện tại)
    currentSong: Song | null;
    hasSongs: boolean;
    isFirstSong: boolean;
    isLastSong: boolean;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
    playlist: [],
    currentIndex: 0,
    isPlaying: false,

    // Đặt playlist mới và bắt đầu từ bài đầu
    setPlaylist: (list) =>
        set({
            playlist: list,
            currentIndex: 0,
            isPlaying: list.length > 0, // Tự động phát nếu có bài
        }),

    // Chuyển đến bài hát theo index
    setSong: (index) =>
        set({
            currentIndex: index,
            isPlaying: true,
        }),

    play: () => set({ isPlaying: true }),
    pause: () => set({ isPlaying: false }),

    togglePlay: () =>
        set((state) => ({
            isPlaying: !state.isPlaying,
        })),

    next: () => {
        const { playlist, currentIndex } = get();
        if (playlist.length === 0) return;

        const nextIndex = (currentIndex + 1) % playlist.length;
        set({
            currentIndex: nextIndex,
            isPlaying: true,
        });
    },

    prev: () => {
        const { playlist, currentIndex } = get();
        if (playlist.length === 0) return;

        const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        set({
            currentIndex: prevIndex,
            isPlaying: true,
        });
    },

    // === GETTERS (rất hữu ích cho component) ===
    get currentSong() {
        const { playlist, currentIndex } = get();
        return playlist.length > 0 ? playlist[currentIndex] : null;
    },

    get hasSongs() {
        return get().playlist.length > 0;
    },

    get isFirstSong() {
        return get().currentIndex === 0;
    },

    get isLastSong() {
        const { playlist, currentIndex } = get();
        return playlist.length > 0 && currentIndex === playlist.length - 1;
    },
}));
```

### 10.3 Tạo file components/AudioEngine.tsx

```tsx 
"use client";

import { useEffect, useRef } from "react";
import { usePlayerStore } from "../store/playerStore";

export default function AudioEngine() {
    const audioRef = useRef<HTMLAudioElement>(null);

    // Lấy dữ liệu từ store
    const { playlist, currentIndex, isPlaying, next } = usePlayerStore();

    // Lấy bài hát hiện tại (an toàn hơn)
    const currentSong = playlist[currentIndex];

    // 1. Phát / tạm dừng theo trạng thái isPlaying
    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current
                .play()
                .catch((e) => console.warn("Play bị chặn (có thể do chưa interact):", e));
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    // 2. Cập nhật src khi chuyển bài + tự động play nếu đang ở trạng thái phát
    useEffect(() => {
        if (!audioRef.current || !currentSong) return;

        audioRef.current.src = currentSong.src;

        // Chỉ tự động play khi người dùng đang ở trạng thái phát (tránh play tự động khi mới load trang)
        if (isPlaying) {
            audioRef.current
                .play()
                .catch((e) => console.warn("Auto play failed:", e));
        }
    }, [currentIndex, currentSong, isPlaying]);

    // 3. TỰ ĐỘNG CHUYỂN BÀI TIẾP THEO KHI BÀI HIỆN TẠI KẾT THÚC
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnded = () => {
            next(); // Gọi hàm next từ store → chuyển bài và tự động play bài kế
        };

        audio.addEventListener("ended", handleEnded);

        // Cleanup listener khi component unmount
        return () => {
            audio.removeEventListener("ended", handleEnded);
        };
    }, [next]);

    return (
        <audio
            ref={audioRef}
            preload="metadata" // Load metadata nhanh để progress bar chính xác, nhưng không load full file ngay
        />
    );
}

```

### 10.4 Tạo file components/AudioProgress.tsx

```tsx
"use client";

import { useEffect, useState } from "react";
import { formatTime } from "../utils/formatTime";

export default function AudioProgress() {
    const audio = document.querySelector("audio") as HTMLAudioElement;

    const [time, setTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (!audio) return;

        const update = () => setTime(audio.currentTime);
        const meta = () => setDuration(audio.duration);

        audio.addEventListener("timeupdate", update);
        audio.addEventListener("loadedmetadata", meta);

        return () => {
            audio.removeEventListener("timeupdate", update);
            audio.removeEventListener("loadedmetadata", meta);
        };
    }, [audio]);

    return (
        <div className="progress">
            <span>{formatTime(time)}</span>

            <div
                className="bar"
                onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    audio.currentTime =
                        ((e.clientX - rect.left) / rect.width) * duration;
                }}
            >
                <div
                    className="fill"
                    style={{ width: `${(time / duration) * 100 || 0}%` }}
                />
            </div>

            <span>{formatTime(duration)}</span>
        </div>
    );
}


```

### 10.5 Tạo file components/Player.tsx

```tsx
"use client";

import { useEffect } from "react"; // ← Thêm import này nếu chưa có
import { usePlayerStore } from "../store/playerStore";
import AudioProgress from "./AudioProgress";

export default function Player() {
    const {
        playlist,
        currentIndex,
        isPlaying,
        togglePlay,
        next,
        prev,
    } = usePlayerStore();

    const song = playlist[currentIndex];

    // ← THÊM ĐOẠN NÀY: Cập nhật title tab browser
    useEffect(() => {
        if (song) {
            const status = isPlaying ? "▶" : "⏸";
            document.title = `${status} ${song.title} - ${song.artist} | Nhạc của Định`;
        } else {
            document.title = "Nhạc của Định"; // Title mặc định khi không phát nhạc
        }
    }, [song, isPlaying]); // Chạy lại khi đổi bài hoặc play/pause

    if (!song) return null; // Giữ nguyên để ẩn player nếu chưa chọn bài

    return (
        <div className="player">
            {/* LEFT */}
            <div className="player-left">
                <img src={song.cover} />
                <div className="meta">
                    <div className="title">{song.title}</div>
                    <div className="artist">{song.artist}</div>
                </div>
            </div>
            {/* CENTER */}
            <div className="player-center">
                <div className="controls">
                    <button onClick={prev}>⏮</button>
                    <button className="play" onClick={togglePlay}>
                        {isPlaying ? "⏸" : "▶"}
                    </button>
                    <button onClick={next}>⏭</button> {/* Nếu bạn đã thêm nút next */}
                </div>
                <AudioProgress />
            </div>
            {/* RIGHT */}
            <div className="player-right">
                <a href={song.src} download>Tải nhạc (^_^)!</a>
            </div>
        </div>
    );
}

```

### 10.6 Tạo file components/AlbumGrid.tsx

```tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { usePlayerStore } from "../store/playerStore";
import Playlist from "./Playlist";

// Định nghĩa interface
export interface Song {
    id: number;
    title: string;
    artist: string;
    src: string;
    cover: string;
}

export interface Album {
    id: number;
    title: string;
    artist: string;
    cover: string;
    songs: Song[];
}

// Hàm fetch albums từ API
const fetchAlbums = async (): Promise<Album[]> => {
    const response = await fetch("https://huudinh.io.vn/wp-json/album-manager/v1/albums", {
        // Cache revalidate 10 phút (Next.js fetch cache)
        next: { revalidate: 600 },
    });

    if (!response.ok) {
        throw new Error("Không thể tải danh sách album");
    }

    return response.json();
};

export default function AlbumGrid() {
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
    const setPlaylist = usePlayerStore((s) => s.setPlaylist);

    const {
        data: albums = [],
        isLoading,
        isError,
        error,
    } = useQuery<Album[], Error>({
        queryKey: ["albums"],
        queryFn: fetchAlbums,
        staleTime: 1000 * 60 * 10, // Dữ liệu còn "tươi" trong 10 phút
        gcTime: 1000 * 60 * 30,    // ← ĐÃ SỬA: cacheTime → gcTime (30 phút trước khi bị garbage collected)
    });

    const openAlbum = (album: Album) => {
        setPlaylist(album.songs);
        setSelectedAlbum(album);
    };

    const closeAlbum = () => {
        setSelectedAlbum(null);
    };

    // Xem chi tiết album
    if (selectedAlbum) {
        return (
            <>
                <div className="album-header">
                    <button className="back-btn" onClick={closeAlbum}>
                        Albums
                    </button>
                    <div className="album-info">
                        <img src={selectedAlbum.cover} alt={selectedAlbum.title} />
                        <div>
                            <h2>{selectedAlbum.title}</h2>
                            <p>{selectedAlbum.artist}</p>
                        </div>
                    </div>
                </div>
                <Playlist />
            </>
        );
    }

    if (isLoading) {
        return <div className="text-center py-10">Đang tải album...</div>;
    }

    if (isError) {
        return (
            <div className="text-center py-10 text-red-500">
                Lỗi tải dữ liệu: {error?.message || "Không xác định"}
            </div>
        );
    }

    if (albums.length === 0) {
        return <div className="text-center py-10">Không có album nào</div>;
    }

    return (
        <div className="album-grid">
            {albums.map((a) => (
                // <div key={a.id} className="album-card" onClick={() => openAlbum(a)}>
                //     <img src={a.cover} alt={a.title} />
                //     <div className="album-title">{a.title}</div>
                //     <small className="album-artist">{a.artist}</small>
                // </div>
                <div key={a.id} className="album-card" onClick={() => openAlbum(a)}>
                    <div className="album-cover">
                        <img src={a.cover} alt={a.title} />
                        <div className="album-play-button">▶</div>
                    </div>
                    <div className="album-info-card">
                        <div className="album-title">{a.title}</div>
                        <div className="album-artist">{a.artist}</div>
                    </div>
                </div>
            ))}
        </div>

    );
}

```

### 10.7 Tạo file components/Playlist.tsx

```tsx
"use client";

import { useEffect, useRef } from "react";
import { usePlayerStore } from "../store/playerStore";

export default function Playlist() {
    const { playlist, currentIndex, setSong } = usePlayerStore();
    const activeRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        activeRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }, [currentIndex]);

    return (
        <div className="playlist">
            {playlist.map((s, i) => (
                <div
                    key={s.id}
                    ref={i === currentIndex ? activeRef : null}
                    className={`item ${i === currentIndex ? "active" : ""}`}
                    onClick={() => setSong(i)}
                >
                    <img src={s.cover} alt={s.title} />
                    <div>
                        <div className="title">{s.title}</div>
                        <small className="artist">{s.artist}</small>
                    </div>
                </div>
            ))}
        </div>
    );
}


```

### 10.8 Tạo file utils/formatTime.ts

```tsx
export function formatTime(time: number) {
    if (!time) return "00:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}
```

### 10.9 Tạo file app/page.tsx

```tsx
import AlbumGrid from "../components/AlbumGrid";
import Player from "../components/Player";
import AudioEngine from "../components/AudioEngine";

export default function Page() {
  return (
    <>
      <AlbumGrid />
      <Player />
      <AudioEngine />
    </>
  );
}

```

### 10.10 Tạo file app/layout.tsx

```tsx
import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers"; // Đường dẫn đến file providers.tsx trên

export const metadata: Metadata = {
  title: "Nhạc của Định",
  description: "Ứng dụng nghe nhạc PWA cá nhân",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Nhạc của Định",
  },
  // Các meta khác cho PWA (Next.js sẽ tự generate link manifest nếu có file manifest.ts)
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        {/* Apple touch icon (Next.js tự generate nếu có file icons, nhưng giữ thủ công nếu cần) */}
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

```

### 10.10 Tạo file app/providers.tsx

```tsx
// app/providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
// Tùy chọn: import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 1000 * 60 * 5, // 5 phút (tùy chỉnh theo nhu cầu)
                        retry: 1,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* <ReactQueryDevtools initialIsOpen={false} /> */} {/* Bỏ comment để debug */}
        </QueryClientProvider>
    );
}
```

### 10.11 Tạo file app/globals.css

```css
:root {
  --bg-main: #0f0f0f;
  --bg-card: #181818;
  --bg-hover: #242424;
  --bg-player: rgba(24, 24, 24, 0.92);

  --text-main: #ffffff;
  --text-sub: #b3b3b3;
  --green: #1db954;

  --radius: 14px;
  --shadow: 0 16px 40px rgba(0, 0, 0, 0.65);
}

/* RESET */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  background: radial-gradient(900px 400px at top,
      rgba(29, 185, 84, 0.08),
      transparent 60%),
    var(--bg-main);
  color: var(--text-main);
  font-family: system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  padding-bottom: 110px;
}

a {
  color: #a7a7a7;
  font-size: 13px;
  text-decoration: none;
}

a:hover {
  color: #eee;
  transition: all 0.3s ease;
}

/* ================= ALBUM GRID ================= */
.album-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 24px;
  padding: 20px 24px 120px;
  /* Đảm bảo không bị player che */
}

.album-card {
  background: var(--bg-card);
  border-radius: var(--radius);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: fit-content;
  /* Quan trọng: không để card kéo dài vô tận */
}

.album-card:hover {
  background: var(--bg-hover);
  transform: translateY(-8px);
  box-shadow: var(--shadow);
}

/* Container cho ảnh – giữ tỷ lệ vuông */
.album-cover {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  /* Giữ ảnh vuông */
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

.album-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.album-card:hover .album-cover img {
  transform: scale(1.08);
}

/* Thông tin bên dưới */
.album-info-card {
  padding: 16px 8px 8px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.album-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-main);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.album-artist {
  font-size: 13px;
  color: var(--text-sub);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Nút Play hover nổi (giống Spotify) */
.album-play-button {
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 48px;
  height: 48px;
  background: var(--green);
  color: #000;
  font-size: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(29, 185, 84, 0.6);
  opacity: 0;
  transform: translateY(16px);
  transition: all 0.3s ease;
}

.album-card:hover .album-play-button {
  opacity: 1;
  transform: translateY(0);
}

/* ================= RESPONSIVE ALBUM GRID ================= */
@media (max-width: 1024px) {
  .album-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .album-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 18px;
    padding: 16px 20px 120px;
  }

  .album-title {
    font-size: 14px;
  }

  .album-artist {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .album-grid {
    grid-template-columns: repeat(2, 1fr);
    /* Cố định 2 cột đều nhau */
    gap: 16px;
    padding: 12px 16px 120px;
  }

  .album-info-card {
    padding: 12px 6px 6px;
  }

  .album-play-button {
    width: 40px;
    height: 40px;
    font-size: 20px;
    bottom: 8px;
    right: 8px;
  }
}

/* ================= PLAYLIST ================= */

.playlist {
  padding: 20px 24px;
  max-height: calc(100vh - 160px);
  overflow-y: auto;
}

.item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s;
}

.item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.item.active {
  background: linear-gradient(90deg,
      rgba(29, 185, 84, 0.25),
      transparent);
}

.item img {
  width: 46px;
  height: 46px;
  border-radius: 8px;
  object-fit: cover;
}

.title {
  font-size: 14px;
  font-weight: 600;
}

.artist {
  font-size: 12px;
  color: var(--text-sub);
}

.item.active .title {
  color: var(--green);
}

/* ================= PLAYER ================= */
.player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90px;
  background: linear-gradient(135deg, rgba(24, 24, 24, 0.95), #181818);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-top: 1px solid #282828;
  z-index: 100;
  gap: 16px;
}

/* Ba phần chính: left - center - right */
.player-left,
.player-center,
.player-right {
  display: flex;
  align-items: center;
  min-width: 0;
  /* Quan trọng: cho phép text truncate */
}

/* Phần trái: ảnh + thông tin bài hát */
.player-left {
  flex: 1;
  gap: 12px;
  overflow: hidden;
  /* Tránh tràn */
}

.player-left img {
  width: 52px;
  height: 52px;
  border-radius: 6px;
  flex-shrink: 0;
}

.player-left .meta {
  overflow: hidden;
}

.player-left .title {
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.player-left .artist {
  font-size: 12px;
  color: var(--text-sub);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Phần giữa: nút điều khiển */
.player-center {
  flex: 2;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.controls button {
  background: none;
  border: none;
  color: var(--text-sub);
  font-size: 18px;
  opacity: 0.8;
  transition: all 0.2s;
  padding: 8px;
}

.controls button:hover,
.controls button:active {
  opacity: 1;
  color: var(--text-main);
  transform: scale(1.1);
}

.controls .play {
  background: #fff;
  color: #000;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
}

.progress {
  width: 100%;
  max-width: 500px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: var(--text-sub);
}

.bar {
  flex: 1;
  height: 4px;
  background: #404040;
  border-radius: 999px;
  overflow: hidden;
}

.fill {
  height: 100%;
  background: var(--green);
  width: 0%;
  /* JS sẽ update */
  transition: width 0.2s ease;
}

/* Phần phải: các nút phụ (like, volume, etc.) */
.player-right {
  justify-content: flex-end;
  gap: 16px;
}

.player-right button {
  background: none;
  border: none;
  color: var(--text-sub);
  font-size: 18px;
  opacity: 0.8;
  transition: all 0.2s;
}

.player-right button:hover {
  opacity: 1;
  color: var(--text-main);
}

/* ================= RESPONSIVE PLAYER ================= */
/* Tablet và nhỏ hơn (dưới 768px) */
@media (max-width: 768px) {
  .player {
    height: 80px;
    padding: 0 12px;
    gap: 12px;
  }

  .player-left img {
    width: 46px;
    height: 46px;
  }

  .controls {
    gap: 16px;
  }

  .controls .play {
    width: 36px;
    height: 36px;
    font-size: 18px;
  }

  /* Ẩn progress bar trên tablet nhỏ để bớt chật */
  .progress {
    display: none;
  }
}

/* Mobile nhỏ (dưới 480px) */
@media (max-width: 480px) {
  .player {
    height: 72px;
    padding: 0 8px;
  }

  .player-left {
    flex: 1.2;
  }

  .player-left img {
    width: 40px;
    height: 40px;
  }

  .player-left .title {
    font-size: 13px;
  }

  .player-left .artist {
    font-size: 11px;
  }

  /* Giữ lại các nút chính: prev, play, next */
  .controls {
    gap: 14px;
  }

  .controls button:not(.play) {
    font-size: 16px;
  }

  .controls .play {
    width: 32px;
    height: 32px;
    font-size: 16px;
  }

  /* Ẩn hoàn toàn player-right trên mobile rất nhỏ nếu cần */
  /* .player-right { display: none; } */
}

/* Mobile siêu nhỏ (dưới 360px) */
@media (max-width: 360px) {
  .player-left .artist {
    display: none;
    /* Ẩn tên artist để ưu tiên tên bài hát */
  }

  .controls button:not(.play) {
    display: none;
    /* Chỉ giữ nút Play để tối ưu không gian */
  }
}

/* ================= ALBUM DETAIL HEADER ================= */
.album-header {
  padding: 20px 24px;
  /* Tăng padding để thoáng hơn */
  position: relative;
}

.album-header::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(29, 185, 84, 0.15) 0%, transparent 50%);
  pointer-events: none;
  border-radius: var(--radius) var(--radius) 0 0;
  z-index: -1;
}

.back-btn {
  background: none;
  border: none;
  color: var(--text-sub);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  transition: all 0.2s ease;
  padding: 8px 0;
}

.back-btn:hover {
  color: var(--text-main);
  transform: translateX(-6px);
}

.back-btn::before {
  content: "←";
  font-size: 18px;
}

/* Phần thông tin album chính */
.album-info {
  display: flex;
  align-items: flex-end;
  gap: 28px;
  min-height: 240px;
  /* Đảm bảo chiều cao tối thiểu */
}

.album-info img {
  width: 200px;
  height: 200px;
  border-radius: var(--radius);
  object-fit: cover;
  box-shadow: var(--shadow);
  flex-shrink: 0;
}

.album-info>div {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 8px;
}

.album-info h2 {
  font-size: 36px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 8px 0;
  word-break: break-word;
}

.album-info p {
  font-size: 16px;
  color: var(--text-sub);
  margin: 0;
  font-weight: 500;
}

/* Responsive cho mobile (dưới 640px) */
@media (max-width: 640px) {
  .album-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    min-height: auto;
  }

  .album-info img {
    width: 160px;
    height: 160px;
  }

  .album-info h2 {
    font-size: 28px;
  }

  .album-info p {
    font-size: 15px;
  }

  .album-header {
    padding: 16px 20px 0;
  }

  .back-btn {
    margin-bottom: 20px;
  }
}

/* Responsive nhỏ hơn (dưới 420px) */
@media (max-width: 420px) {
  .album-info img {
    width: 140px;
    height: 140px;
  }

  .album-info h2 {
    font-size: 24px;
  }
}

/* ================= CUSTOM SCROLLBAR ================= */
/* Cho WebKit browsers (Chrome, Safari, Edge mới) */
::-webkit-scrollbar {
  width: 8px;
  /* Thanh cuộn dọc */
  height: 8px;
  /* Thanh cuộn ngang (nếu có) */
}

::-webkit-scrollbar-track {
  background: transparent;
  /* Nền track trong suốt */
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  /* Màu xám nhẹ, trong suốt */
  border-radius: 10px;
  transition: background 0.2s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
  /* Sáng hơn khi hover */
}

/* Khi hover vào khu vực có scroll – làm thumb nổi bật hơn */
.playlist:hover::-webkit-scrollbar-thumb,
.album-grid:hover::-webkit-scrollbar-thumb,
body:hover::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.25);
}

/* Đặc biệt cho phần playlist – đảm bảo luôn thấy nhẹ nhẹ */
.playlist::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.18);
}

.playlist:hover::-webkit-scrollbar-thumb {
  background: var(--green);
  /* Khi hover playlist → thumb xanh Spotify nổi bật */
  opacity: 0.7;
}

/* Firefox hỗ trợ scrollbar styling hạn chế hơn, nhưng vẫn đẹp */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

.playlist {
  scrollbar-color: rgba(255, 255, 255, 0.18) transparent;
}

.playlist:hover {
  scrollbar-color: var(--green) transparent;
}
```

### 10.13 Tạo file public/manifest.json

```tsx
{
    "name": "Nhạc Định",
    "short_name": "Nhạc Định",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#121212",
    "theme_color": "#121212",
    "icons": [
        {
            "src": "/assets/icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/assets/icon-512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ]
}

```

### 10.14 Tạo file public/sw.js

```tsx
const CACHE_NAME = "music-app-v1";
const BASE_PATH = "/mp3";

/**
 * Install: cache các file CỐT LÕI (KHÔNG cache nhạc)
 */
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) =>
            cache.addAll([
                `${BASE_PATH}/`,
                `${BASE_PATH}/index.html`,
                `${BASE_PATH}/manifest.json`,
            ])
        )
    );
    self.skipWaiting();
});

/**
 * Activate: dọn cache cũ
 */
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

/**
 * Fetch:
 * - Nhạc (/mp3/*.mp3) → cache runtime
 * - Ảnh → cache runtime
 * - File khác → network-first
 */
self.addEventListener("fetch", (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // ⚠️ chỉ xử lý request cùng origin
    if (url.origin !== self.location.origin) return;

    // 🎵 AUDIO FILE
    if (url.pathname.startsWith(`${BASE_PATH}/`) && url.pathname.endsWith(".mp3")) {
        event.respondWith(cacheFirst(request));
        return;
    }

    // 🖼 IMAGE
    if (request.destination === "image") {
        event.respondWith(cacheFirst(request));
        return;
    }

    // 🌐 MẶC ĐỊNH
    event.respondWith(networkFirst(request));
});

/* =========================
   STRATEGIES
========================= */

async function cacheFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);

    if (cached) return cached;

    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
}

async function networkFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    try {
        const response = await fetch(request);
        cache.put(request, response.clone());
        return response;
    } catch {
        return cache.match(request);
    }
}


```

### 10.15 Sửa file next.config.js

```tsx
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    distDir: "build",
    output: "export",
    // basePath: "/mp3",
    // assetPrefix: "/mp3",
};

export default nextConfig;
```

Source code: https://github.com/huudinh/music/tree/music_v4

Ứng dụng nghe nhạc:https://nhacdinh.vercel.app/

