---
sidebar_position: 1
---

# Zustand là gì?

Zustand là một thư viện quản lý state (trạng thái) cho React cực kỳ nhẹ, đơn giản và hiệu quả, rất phù hợp với Next.js và các app như music player.

<!-- ![Create-HTML-1](images/state.png) -->

<ToggleTOC />

---

## 1. Zustand dùng để làm gì?

**Quản lý state dùng chung (global state)** giữa nhiều component

Ví dụ trong app nghe nhạc:

* Bài hát đang phát 🎵
* Play / Pause ⏯
* Next / Previous ⏭
* Volume 🔊
* Progress 📊

👉 Tất cả component đều cần → **Zustand xử lý rất gọn**

---

## 2. Vì sao chọn Zustand (thay vì Context / Redux)?

| Thư viện      | Nhược điểm                  |
| ------------- | --------------------------- |
| React Context | Rerender nhiều, code dài    |
| Redux         | Rất nặng, nhiều boilerplate |
| **Zustand**   | ⭐ Nhẹ (~1kb), học 5 phút    |

---

## 3. Ý tưởng cốt lõi của Zustand (siêu dễ)

* **1 store = 1 object**
* Không cần Provider
* Component chỉ subscribe state cần dùng

---

## 4. Ví dụ nhỏ nhất

```ts
import { create } from "zustand";

const useStore = create((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
}));
```

Dùng ở bất kỳ component nào:

```tsx
const count = useStore((s) => s.count);
const inc = useStore((s) => s.inc);
```

👉 **Không cần Context Provider**

---

## 5. Zustand trong app nghe nhạc của bạn

Thay vì:

* Truyền props lung tung
* Context + useRef phức tạp

Ta có:

```ts
usePlayer.getState().next();
```

Hoặc:

```tsx
const { toggle, volume } = usePlayer();
```

👉 AudioEngine, PlayerBar, SongList **dùng chung state mượt**

---

## 6. Vì sao Zustand hợp Next.js App Router?

* Không bị lỗi **hydration**
* Dùng tốt với `use client`
* Không phụ thuộc lifecycle của React tree
* Hoạt động tốt với SSR / CSR

---

## 7. Zustand KHÔNG làm gì?

❌ Không fetch API
❌ Không xử lý async (trừ khi bạn viết)
❌ Không thay thế backend

👉 Nó **chỉ quản lý state**

---

## 8. Khi nào nên dùng Zustand?

✔ App có nhiều component dùng chung state
✔ Player, modal, auth, theme
✔ Tránh Redux nặng nề
✔ Muốn code gọn & dễ bảo trì

---

## 9. So sánh nhanh (thực tế)

| Tình huống       | Nên dùng        |
| ---------------- | --------------- |
| Counter đơn giản | useState        |
| Form             | react-hook-form |
| Player nhạc 🎧   | **Zustand**     |
| E-commerce cart  | Zustand         |
| App rất lớn      | Redux Toolkit   |

---

👉  Kết luận ngắn gọn

> **Zustand = kho trạng thái dùng chung, gọn nhẹ, không rườm rà, cực hợp Next.js**

## 10. Code lại App nghe nhạc của bạn với Zustand

#### 10.1 Cấu trúc thư mục đề xuất

```css 
src/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ globals.css
│
├─ components/
│  ├─ AudioEngine.tsx
│  └─ AudioPlayer.tsx
│
├─ store/
│  └─ usePlayer.ts
│
├─ public/
│  └─ music/
│     ├─ hen-yeu.mp3
│     └─ bai-2.mp3

```

#### 10.2 Sửa Layout trong app/layout.tsx

```tsx 
import "./globals.css";
import AudioEngine from "@/components/AudioEngine";
import AudioPlayer from "@/components/AudioPlayer";
import CoverBackground from "@/components/CoverBackground";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <CoverBackground />
        {children}
        <AudioEngine />
        <AudioPlayer />
      </body>
    </html>
  );
}
```

#### 10.3 Sửa Page trong app/page.tsx

```tsx 
export default function Home() {
  return (
    <main style={{ padding: 60, paddingBottom: 140 }}>
      <h1 style={{ fontSize: 42 }}>🎧 Nhạc của Định</h1>
      <p style={{ maxWidth: 500, color: "#b3b3b3" }}>
        Chúc bạn nghe nhạc vui vẻ
      </p>
    </main>
  );
}
```

#### 10.4 Sửa globals.css trong app/globals.css

```css 
:root {
  --bg-player: #181818;
  --text-main: #ffffff;
  --text-sub: #b3b3b3;
  --green: #1db954;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  color: var(--text-main);
  font-family: system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

  /* ❌ KHÔNG CÓ ẢNH NỀN Ở BODY */
  background: #000;
}

/* ===== COVER BACKGROUND (NỀN CHÍNH) ===== */
.cover-bg {
  position: fixed;
  inset: 0;
  z-index: -1;

  background-size: cover;
  background-position: center;
  opacity: .3;

  filter: blur(12px) brightness(0.75);
  transform: scale(1.2);
}

/* ===== PLAYER ===== */
.player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90px;

  display: flex;
  align-items: center;
  padding: 0 20px;

  border-top: 1px solid #282828;
  backdrop-filter: blur(12px);
  background: rgba(24, 24, 24, 0.85);
}

/* LEFT */
.player-left {
  width: 30%;
  display: flex;
  align-items: center;
  gap: 12px;
}

.cover {
  width: 56px;
  height: 56px;
  border-radius: 4px;
  object-fit: cover;
}

/* CENTER */
.player-center {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.controls {
  display: flex;
  align-items: center;
  gap: 20px;
}

.controls button {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}

.play {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: white;
  color: black;
}

/* PROGRESS */
.progress {
  width: 100%;
}

.bar {
  height: 4px;
  background: #404040;
  border-radius: 2px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: var(--green);
}

/* RIGHT */
.player-right {
  width: 30%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
}

```

#### 10.5 Tạo file store/usePlayer.ts

```ts
import { create } from "zustand";

export interface Song {
    title: string;
    artist: string;
    src: string;
    cover: string;
}

interface PlayerState {
    playlist: Song[];
    index: number;
    isPlaying: boolean;
    volume: number;
    progress: number;

    toggle: () => void;
    next: () => void;
    prev: () => void;
    setVolume: (v: number) => void;
    setProgress: (p: number) => void;
}

export const usePlayer = create<PlayerState>((set, get) => ({
    playlist: [
        {
            id: 1,
            title: "Hen Yeu",
            artist: "Định",
            src: "/music/hen-yeu.mp3",
            cover: "/images/hen-yeu.jpg"
        },
        {
            id: 2,
            title: "Mot Phut",
            artist: "Định",
            src: "/music/mot-phut.mp3",
            cover: "/images/mot-phut.jpg"
        },
        {
            id: 3,
            title: "Roi Xa",
            artist: "Định",
            src: "/music/roi-xa.mp3",
            cover: "/images/roi-xa.jpg"
        },
    ],
    index: 0,
    isPlaying: false,
    volume: 0.8,
    progress: 0,

    toggle: () =>
        set((s) => ({ isPlaying: !s.isPlaying })),

    next: () =>
        set((s) => ({
            index: (s.index + 1) % s.playlist.length,
            isPlaying: true,
        })),

    prev: () =>
        set((s) => ({
            index:
                s.index === 0
                    ? s.playlist.length - 1
                    : s.index - 1,
            isPlaying: true,
        })),

    setVolume: (v) => set({ volume: v }),
    setProgress: (p) => set({ progress: p }),
}));

```

#### 10.6 Tạo file components/AudioEngine.tsx

```tsx
"use client";

import { useEffect, useRef } from "react";
import { usePlayer } from "@/store/usePlayer";

export default function AudioEngine() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const {
        playlist,
        index,
        isPlaying,
        volume,
        setProgress,
        next,
    } = usePlayer();

    useEffect(() => {
        if (!audioRef.current) return;
        isPlaying
            ? audioRef.current.play()
            : audioRef.current.pause();
    }, [isPlaying, index]);

    useEffect(() => {
        if (audioRef.current)
            audioRef.current.volume = volume;
    }, [volume]);

    return (
        <audio
            ref={audioRef}
            src={playlist[index]?.src}
            onTimeUpdate={(e) => {
                const a = e.currentTarget;
                setProgress(
                    (a.currentTime / a.duration) * 100 || 0
                );
            }}
            onEnded={next}
        />
    );
}

```

#### 10.7 Tạo file components/AudioPlayer.tsx

```tsx
"use client";

import { usePlayer } from "@/store/usePlayer";

export default function AudioPlayer() {
    const {
        playlist,
        index,
        isPlaying,
        toggle,
        next,
        prev,
        volume,
        setVolume,
        progress,
    } = usePlayer();

    const song = playlist[index];
    if (!song) return null;

    return (
        <div className="player">
            <div className="player-left">
                <img
                    src={song.cover}
                    alt={song.title}
                    className="cover"
                />
                <div>
                    <div>{song.title}</div>
                    <div style={{ fontSize: 12, color: "#b3b3b3" }}>
                        {song.artist}
                    </div>
                </div>
            </div>

            <div className="player-center">
                <div className="controls">
                    <button onClick={prev}>⏮</button>
                    <button className="play" onClick={toggle}>
                        {isPlaying ? "⏸" : "▶"}
                    </button>
                    <button onClick={next}>⏭</button>
                </div>

                <div className="progress">
                    <div className="bar">
                        <div
                            className="bar-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="player-right">
                🔊
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(e) =>
                        setVolume(Number(e.target.value))
                    }
                />
            </div>
        </div>
    );
}

```

#### 10.8 Tạo file components/CoverBackground.tsx

```tsx
"use client";

import { usePlayer } from "@/store/usePlayer";

export default function CoverBackground() {
    const { playlist, index } = usePlayer();
    const song = playlist[index];

    if (!song) return null;

    return (
        <div
            className="cover-bg"
            style={{
                backgroundImage: `url(${song.cover})`,
            }}
        />
    );
}

```

Link sau khi deploy: https://nhacdinh.vercel.app/

## 11. Nâng cấp tiếp theo (rất đáng làm)

* ⏱ Hiển thị thời gian mm:ss
* 📊 Click / drag seek bar
* 📂 Trang playlist (chọn bài để phát)
* 🌐 PWA nghe offline
