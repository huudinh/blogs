---
sidebar_position: 1
---

# Cài đặt React Native

<ToggleTOC />

:::tip My tip
Đây không chỉ là một bộ câu hỏi phỏng vấn React Native mà là một hành trình thực chiến qua ứng dụng Login, nơi mỗi dòng code đều phản ánh tư duy của một lập trình viên chuyên nghiệp.
:::


## I. Chuẩn bị

1. Đăng ký tài khoản expo https://expo.dev

2. Cài đặt Android Studio https://developer.android.com/

3. **Cài đặt Node.js và npm**: Cài đặt Node.js và npm (Node Package Manager). Bạn có thể tải chúng từ [trang web chính thức của Node.js](https://nodejs.org/).

## II. Tạo dự án Login

1. **Tạo dự án mới**: Mở terminal và chạy lệnh sau để tạo một dự án Expo mới:
   ```bash
   npx create-expo-app@latest Login --template
   ```

2. **Di chuyển vào thư mục dự án**: Sau khi dự án được tạo, di chuyển vào thư mục dự án:
   ```bash
   cd Login
   ```

3. **Chạy ứng dụng**: Chạy ứng dụng trên thiết bị giả lập hoặc thiết bị thật:
   ```bash
   npm start
   ```

4. **Chỉnh sửa mã nguồn**: Mở tệp `App.js` trong thư mục dự án và thay đổi nội dung để hiển thị "App Login":
   ```jsx
   import React from 'react';
   import { Text, View } from 'react-native';

   const App: React.FC = () => {
     return (
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <Text>Hello World</Text>
       </View>
     );
   };

   export default App;
   ```

## III. Build file APK với Expo

1. **Cài đặt EAS CLI**: Đảm bảo rằng bạn đã cài đặt EAS CLI. Nếu chưa, bạn có thể cài đặt bằng cách chạy lệnh sau:
   ```bash
   npm install -g eas-cli
   ```

2. **Đăng nhập vào tài khoản Expo**: Đăng nhập vào tài khoản Expo của bạn bằng cách chạy lệnh sau:
   ```bash
   eas login
   ```

3. **Cấu hình dự án**: Đảm bảo rằng bạn đã cấu hình dự án của mình để sử dụng EAS. Bạn cần tạo tệp `eas.json` trong thư mục gốc của dự án với nội dung như sau:
   ```json
   {
     "build": {
       "preview": {
         "android": {
           "buildType": "apk"
         }
       }
     }
   }
   ```

4. **Chạy lệnh build**: Sau khi đã cấu hình xong, bạn có thể chạy lệnh build:
   ```bash
   eas build -p android --profile preview
   ```

:::danger Take care
📲 Đừng quên **like, share và để lại comment** trên kênh TikTok [@thaygiaofrontend](https://www.tiktok.com/@thaygiaofrontend) để cùng nhau trao đổi, làm rõ những thắc mắc và nâng tầm kiến thức lập trình Frontend mỗi ngày!
:::