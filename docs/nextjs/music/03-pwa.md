---
sidebar_position: 1
---

# PWA trong Next.js

Trong **Next.js**, PWA (Progressive Web App) là cách biến ứng dụng web thành một ứng dụng giống native app: có thể cài đặt lên màn hình chính, hoạt động offline, gửi thông báo đẩy, và cập nhật tức thì mà không cần qua App Store/Google Play. 

<ToggleTOC />

---

## 1. PWA trong Next.js là gì?
- **PWA (Progressive Web App)**: ứng dụng web hiện đại, kết hợp trải nghiệm web và app native.  
- **Next.js**: framework React mạnh mẽ, hỗ trợ server-side rendering, static site generation, và tối ưu hiệu suất.  
- Khi kết hợp, **Next.js có thể triển khai PWA** bằng cách thêm **Web App Manifest** và **Service Worker** để:  
  - Cho phép người dùng **cài đặt ứng dụng từ trình duyệt**.  
  - **Cache dữ liệu** để chạy offline.  
  - **Push notification** và trải nghiệm giống app native.  

## 2. Các bước triển khai PWA trong Next.js
**Tạo Web App Manifest**  
   - File `manifest.json` định nghĩa tên ứng dụng, icon, màu sắc, màn hình splash.  
   - Next.js hỗ trợ manifest thông qua App Router.  

**Cấu hình Service Worker**  
   - Dùng thư viện như `next-pwa` để dễ dàng tạo service worker.  
   - Service worker quản lý cache, offline mode, và background sync.  

**Đảm bảo HTTPS**  
   - PWA yêu cầu chạy trên HTTPS để bảo mật.  

**Tích hợp vào Next.js**  
   - Cài đặt plugin `next-pwa`, hoặc có thể thêm thủ công service worker.  
   - Thêm cấu hình trong `next.config.js`.  
   - Build và deploy như ứng dụng Next.js bình thường.  

## 3. Ưu điểm khi dùng PWA với Next.js

- **Một codebase, nhiều nền tảng**: web + PWA, không cần app riêng.  
- **Cập nhật tức thì**: không phải chờ duyệt trên App Store.  
- **Trải nghiệm native-like**: cài đặt, offline, push notification.  
- **SEO tốt**: Next.js vốn mạnh về SEO, PWA vẫn giữ ưu thế này.  

## 4. Hạn chế
- **Không truy cập sâu phần cứng** như NFC, Bluetooth (so với native app).  
- **Hiệu năng**: với ứng dụng phức tạp (game 3D, AR/VR), PWA chưa bằng native.  
- **Hỗ trợ trình duyệt**: iOS Safari vẫn hạn chế một số tính năng PWA.  

---

## 5. So sánh Next.js PWA vs App Native

| Tiêu chí              | Next.js PWA | Native App |
|-----------------------|-------------|------------|
| **Cài đặt**           | Từ trình duyệt | Qua App Store/Google Play |
| **Chi phí phát triển**| Thấp hơn | Cao hơn |
| **Khả năng offline**  | Có, nhờ Service Worker | Mạnh mẽ hơn |
| **Push Notification** | Có, nhưng hạn chế trên iOS | Đầy đủ |
| **SEO**               | Tốt | Không có |
| **Tính năng phần cứng**| Hạn chế | Đầy đủ |

---

:::tip Tóm lại
 
**PWA trong Next.js là cách mở rộng ứng dụng web thành app-like**, giúp doanh nghiệp tiết kiệm chi phí, tăng khả năng tiếp cận, và mang lại trải nghiệm tốt cho người dùng mà không cần phát triển app native riêng.  

:::


## 6. Code lại App nghe nhạc của bạn với PWA

### 6.1 Cấu trúc thư mục đề xuất Music_v3

```css 
music-player/
├─ app/
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
│
├─ components/
│  ├─ AlbumGrid.tsx
│  ├─ AudioEngine.tsx
│  ├─ AudioProgress.tsx
│  ├─ Player.tsx
│  └─ Playlist.tsx
│
├─ data/
│  └─ albums.ts
│
├─ store/
│  └─ playerStore.ts
│
├─ utils/
│  └─ formatTime.ts
│
├─ public/
│  ├─ images/
│  ├─ music/
│  ├─ manifest.json
│  └─ sw.js
│
└─ package.json

```

### 6.2 Tạo file data/albums.ts

```tsx 
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

export const albums: Album[] = [
    {
        id: 1,
        title: "Album Hen Yeu",
        artist: "Định",
        cover: "/images/hen-yeu.jpg",
        songs: [
            {
                id: 1,
                title: "Hen Yeu",
                artist: "Định",
                src: "/music/hen-yeu.mp3",
                cover: "/images/hen-yeu.jpg",
            },
            {
                id: 2,
                title: "Mot Phut",
                artist: "Định",
                src: "/music/mot-phut.mp3",
                cover: "/images/mot-phut.jpg",
            },
            {
                id: 3,
                title: "Roi Xa",
                artist: "Định",
                src: "/music/roi-xa.mp3",
                cover: "/images/roi-xa.jpg",
            },
        ],
    },
    {
        id: 2,
        title: "Album Mot Phut",
        artist: "Định",
        cover: "/images/mot-phut.jpg",
        songs: [
            {
                id: 1,
                title: "Hen Yeu",
                artist: "Định",
                src: "/music/hen-yeu.mp3",
                cover: "/images/hen-yeu.jpg",
            },
            {
                id: 2,
                title: "Mot Phut",
                artist: "Định",
                src: "/music/mot-phut.mp3",
                cover: "/images/mot-phut.jpg",
            },
            {
                id: 3,
                title: "Roi Xa",
                artist: "Định",
                src: "/music/roi-xa.mp3",
                cover: "/images/roi-xa.jpg",
            },
        ],
    },
];

```

### 6.3 Tạo file store/playerStore.ts

```tsx 
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

    setPlaylist: (list: Song[]) => void;
    setSong: (index: number) => void;

    play: () => void;
    pause: () => void;
    togglePlay: () => void;

    next: () => void;
    prev: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
    playlist: [],
    currentIndex: 0,
    isPlaying: false,

    setPlaylist: (list) =>
        set({
            playlist: list,
            currentIndex: 0,
            isPlaying: false,
        }),

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
        const { currentIndex, playlist } = get();
        set({
            currentIndex: (currentIndex + 1) % playlist.length,
            isPlaying: true,
        });
    },

    prev: () => {
        const { currentIndex, playlist } = get();
        set({
            currentIndex:
                (currentIndex - 1 + playlist.length) % playlist.length,
            isPlaying: true,
        });
    },
}));

```

### 6.4 Tạo file components/AudioEngine.tsx

```tsx 
"use client";

import { useEffect, useRef } from "react";
import { usePlayerStore } from "../store/playerStore";

export default function AudioEngine() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const { playlist, currentIndex, isPlaying } = usePlayerStore();

    useEffect(() => {
        if (!audioRef.current) return;
        isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }, [isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = playlist[currentIndex]?.src || "";
            audioRef.current.play();
        }
    }, [currentIndex]);

    return <audio ref={audioRef} />;
}


```

### 6.5 Tạo file components/AudioProgress.tsx

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

### 6.6 Tạo file components/Player.tsx

```tsx
"use client";

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
    if (!song) return null;

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
                    <button onClick={next}>⏭</button>
                </div>

                <AudioProgress />
            </div>

            {/* RIGHT */}
            <div className="player-right">
                <a href={song.src} download>⬇</a>
            </div>
        </div>
    );
}


```

### 6.7 Tạo file components/AlbumGrid.tsx

```tsx
"use client";

import { useState } from "react";
import { albums, Album } from "../data/albums";
import { usePlayerStore } from "../store/playerStore";
import Playlist from "./Playlist";

export default function AlbumGrid() {
    const [album, setAlbum] = useState<Album | null>(null);
    const setPlaylist = usePlayerStore((s) => s.setPlaylist);

    const openAlbum = (a: Album) => {
        setPlaylist(a.songs); // ✅ chỉ gọi khi click
        setAlbum(a);
    };

    if (album) {
        return (
            <>
                <div className="album-header">
                    <button className="back-btn" onClick={() => setAlbum(null)}>← Albums</button>
                </div>
                <Playlist />
            </>
        );
    }

    return (
        <div className="album-grid">
            {albums.map((a) => (
                <div key={a.id} className="album-card" onClick={() => openAlbum(a)}>
                    <img src={a.cover} />
                    <div>{a.title}</div>
                    <small>{a.artist}</small>
                </div>
            ))}
        </div>
    );
}

```

### 6.8 Tạo file components/Playlist.tsx

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

### 6.9 Tạo file utils/formatTime.ts

```tsx
export function formatTime(time: number) {
    if (!time) return "00:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}

```

### 6.10 Tạo file app/page.tsx

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

### 6.11 Tạo file app/layout.tsx

```tsx
import "./globals.css";

export const metadata = {
  title: "Nhạc của Định",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}


```

### 6.12 Tạo file app/globals.css

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

/* ================= ALBUM GRID ================= */

.album-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 22px;
  padding: 28px;
}

.album-card {
  background: linear-gradient(180deg,
      rgba(255, 255, 255, 0.04),
      rgba(0, 0, 0, 0.4)),
    var(--bg-card);
  border-radius: var(--radius);
  padding: 16px;
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}

.album-card:hover {
  background: var(--bg-hover);
  transform: translateY(-6px) scale(1.02);
}

.album-card img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 10px;
}

.album-card h4 {
  margin: 12px 0 4px;
  font-size: 15px;
}

.album-card small {
  font-size: 13px;
  color: var(--text-sub);
}

.album-header {
  padding: 12px 16px;
}

.back-btn {
  background: none;
  border: none;
  color: #b3b3b3;
  font-size: 14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.back-btn:hover {
  color: #ffffff;
  transform: translateX(-4px);
}

.player-right a {
  color: #fff;
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
  background: #181818;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  padding: 0 20px;
  border-top: 1px solid #282828;
}

.player-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.player-left img {
  width: 56px;
  height: 56px;
  border-radius: 6px;
}

.meta .title {
  font-size: 14px;
  font-weight: 600;
}

.meta .artist {
  font-size: 12px;
  color: #b3b3b3;
}

.player-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.controls {
  display: flex;
  gap: 16px;
}

.controls button {
  background: none;
  border: none;
  color: #fff;
  font-size: 18px;
}

.controls .play {
  background: #fff;
  color: #000;
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.progress {
  width: 100%;
  max-width: 480px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: #b3b3b3;
}

.bar {
  flex: 1;
  height: 4px;
  background: #404040;
  border-radius: 999px;
}

.fill {
  height: 100%;
  background: #1db954;
}

.player-right {
  text-align: right;
}

```

### 6.13 Tạo file public/manifest.json

```tsx
{
    "name": "Nhạc của Định",
    "short_name": "Nhạc Định",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#121212",
    "theme_color": "#121212",
    "icons": [
        {
            "src": "/icons/icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/icons/icon-512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ]
}

```

### 6.14 Tạo file public/sw.js

```tsx
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open("music-cache").then((cache) =>
            cache.addAll([
                "/",
                "/music/hen-yeu.mp3",
                "/music/mot-phut.mp3",
                "/music/roi-xa.mp3",
                "/images/hen-yeu.jpg",
                "/images/mot-phut.jpg",
                "/images/roi-xa.jpg",
            ])
        )
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});


```

### 6.15 Sửa file next.config.js

```tsx

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
};

module.exports = nextConfig;

```

Source code: https://github.com/huudinh/music/tree/music_v3/public/music

Ứng dụng nghe nhạc:https://nhacdinh.vercel.app/

