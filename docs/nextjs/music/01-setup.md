---
sidebar_position: 1
---

# Code với ChatGPT

Tạo ứng dụng nghe nhạc bằng nextjs với ChatGPT

Dưới đây là **hướng dẫn tạo một ứng dụng nghe nhạc cơ bản bằng Next.js (App Router)** – phù hợp để bạn mở rộng thành sản phẩm hoàn chỉnh sau này 🎧
(Mình làm theo hướng **đơn giản → nâng cao**, code sạch, dễ mở rộng)

<ToggleTOC />

---

## 01. Công nghệ sử dụng

* **Next.js 14+ (App Router)**
* **React**
* **HTML5 Audio API**
* **Tailwind CSS** (tuỳ chọn nhưng nên dùng)
* **Context / Zustand** (quản lý player global)
* **Static mp3** hoặc API nhạc


## 02. Khởi tạo project

```bash
npx create-next-app@latest music-player
cd music-player
npm run dev
```

Chọn:

* App Router ✅
* TypeScript ✅ (khuyến nghị)
* Tailwind CSS ✅


## 03. Cấu trúc thư mục đề xuất Music_v1

```
music-player/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── MusicPlayer.tsx
│   ├── SongList.tsx
│   └── PlayerControls.tsx
│
├── context/
│   └── PlayerContext.tsx
│
├── data/
│   └── songs.ts
│
└── public/
    └── music/
        ├── song1.mp3
        ├── song2.mp3
```


## 04. Dữ liệu bài hát (`data/songs.ts`)

```ts
export const songs = [
    {
        id: 1,
        title: "Hen Yeu",
        artist: "Unknown",
        src: "/music/hen-yeu.mp3",
        cover: "/images/hen-yeu.jpg"
    },
    {
        id: 2,
        title: "Mot Phut",
        artist: "Unknown",
        src: "/music/mot-phut.mp3",
        cover: "/images/mot-phut.jpg"
    },
    {
        id: 3,
        title: "Roi Xa",
        artist: "Unknown",
        src: "/music/roi-xa.mp3",
        cover: "/images/roi-xa.jpg"
    },
];
```


## 05. Player Context (quản lý nhạc toàn app)

```tsx title="Tạo file context/PlayerContext.tsx"
"use client";

import { createContext, useContext, useRef, useState } from "react";
import { songs } from "@/data/songs";

const PlayerContext = createContext<any>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSong = (song: any) => {
    setCurrentSong(song);
    setTimeout(() => {
      audioRef.current?.play();
      setIsPlaying(true);
    }, 100);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <PlayerContext.Provider value={{
      audioRef,
      currentSong,
      playSong,
      togglePlay,
      isPlaying
    }}>
      {children}
      <audio ref={audioRef} src={currentSong.src} />
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
```

## 06. Gắn Provider vào layout

```tsx title="Sửa file app/layout.tsx"
import "./globals.css";
import { PlayerProvider } from "@/context/PlayerContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <PlayerProvider>
          {children}
        </PlayerProvider>
      </body>
    </html>
  );
}
```


## 07. Danh sách bài hát

```tsx title="Tạo file components/SongList.tsx"
"use client";

import { songs } from "@/data/songs";
import { usePlayer } from "@/context/PlayerContext";

export default function SongList() {
  const { playSong } = usePlayer();

  return (
    <div className="space-y-3">
      {songs.map(song => (
        <div
          key={song.id}
          className="p-3 border rounded cursor-pointer hover:bg-gray-100"
          onClick={() => playSong(song)}
        >
          🎵 {song.title} - {song.artist}
        </div>
      ))}
    </div>
  );
}
```


## 08. Thanh điều khiển nhạc

```tsx title="Tạo file components/MusicPlayer.tsx"
"use client";

import { usePlayer } from "@/context/PlayerContext";

export default function MusicPlayer() {
  const { currentSong, togglePlay, isPlaying } = usePlayer();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 flex justify-between">
      <div>
        <strong>{currentSong.title}</strong>
        <p className="text-sm">{currentSong.artist}</p>
      </div>

      <button
        onClick={togglePlay}
        className="px-4 py-2 bg-white text-black rounded"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}
```


## 09. Trang chính

```tsx title="Sửa file app/page.tsx"
import SongList from "@/components/SongList";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  return (
    <main className="p-6 pb-24">
      <h1 className="text-2xl font-bold mb-4">🎧 Music Player</h1>
      <SongList />
      <MusicPlayer />
    </main>
  );
}
```

## 10. Deploy

**Bước 1. Đẩy code lên github**

Tạo repository trên github và push code lên github, ở đây mình đặt tên repository là music


```bash title="Vào Terminal của ứng dụng gõ lệnh sau"
echo "# music" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/huudinh/music.git
git push -u origin main
```

**Bước 2. Deploy lên vercel**

Tạo tài khoản tại vercel.com bằng tài khoản github

Import Git Repository "music"

Trong màn hình New Project chọn Deploy

Màn hình Congratulations! bạn đã hoàn thành chọn Goto Dashboard xuất hiện màn hình quản lý ứng dụng

Click Visit để xem trực tiếp ứng dụng đã Deploy

**Bước 3. Update code Vercel**

Để update code trên Vercel ta chỉ cần push code lên git

```bash title="Gõ lệnh sau, code sẽ được tự động đồng bộ lên Vercel"
  git add .
  git commit -m "update code"
  git push
```

Link sau khi deploy: https://nhacdinh.vercel.app/

## 11. Nâng cấp tiếp theo (rất đáng làm)

* ⏭ Next / Previous bài hát
* 📊 Thanh tiến trình (seek)
* 🔊 Volume control
* 🎨 UI giống Spotify
* 🌐 Lấy nhạc từ API (SoundCloud, Firebase, S3)
* 📱 PWA nghe offline
* 💾 Lưu bài đang nghe (localStorage)

---
