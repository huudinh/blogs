---
sidebar_position: 2
---

# Màn hình Login

Styling giao diện login, với hai trường Login, Password. Có nút đăng nhập, đăng ký...

<iframe width="560" height="315" src="https://www.youtube.com/embed/n9iHv84kPQk?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<ToggleTOC />

## I. Mục tiêu

1. Học cách dàn Layout cơ bản

2. Style giao diện Login

3. Thêm Icon vào React Native

4. Tạo màu nền cho nút Login 

5. Áp dụng State để xem mật khẩu đã chính xác chưa


## II. Code Project

```jsx title="Sửa file App.js"
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

export default function App() {
  const [secure, setSecure] = useState(true);

  const toggleSecure = () => setSecure(!secure);

  return (
    <View style={styles.container}>
      <View style={styles.border}>
        <View style={styles.main}>
          <View style={styles.header}>
            <Text style={styles.title}>Login</Text>
          </View>
          <View style={styles.body}>
            <View style={styles.bodyTop}>
              <View style={styles.inputBox}>
                <Text>Username</Text>
                <View style={styles.inputRow}>
                    <AntDesign name="user" size={24} color="black" />
                    <TextInput 
                      style={styles.inputText} 
                      placeholder='Type your username'
                    />
                </View>
              </View>
              <View style={styles.inputBox}>
                <Text>Password</Text>
                <View style={styles.inputRow}>
                    <AntDesign name="lock" size={24} color="black" />
                    <TextInput 
                      style={styles.inputText} 
                      placeholder='Type your password'
                      secureTextEntry={secure}
                    />
                    <TouchableOpacity onPress={toggleSecure}>
                      <Text>{secure ? '👁️‍🗨️' : '👁️'}</Text>
                    </TouchableOpacity>
                </View>
              </View >
              <View style={styles.loginBox}>
                <TouchableOpacity 
                  style={styles.loginTouch} 
                  activeOpacity={0.5}
                >
                  <LinearGradient
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.loginGradient}
                  >
                    <Text style={styles.loginText}>Login</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Or Sign Up Using</Text>
            <TouchableOpacity>
              <Text>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498D8',
  },
  border:{
    backgroundColor: '#fff',
    margin: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  main: {
    marginVertical: 40,
    flex: 1,
    width: '100%',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 6,
  },
  bodyTop: {
    margin: 30,
  },
  inputBox: {
    marginVertical: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  loginBox: {
    alignItems: 'center',
    marginVertical: 20,
  },
  loginTouch: {
    width: '100%',
  },
  loginGradient:{
    padding: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  loginText: {
    color: '#fff', 
    fontWeight: 'bold',
  },
  inputText:{
    flex: 1,
  },
  bodyBottom: {
    flex: 6,
  },
  footer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    padding: 20,
    color: '#777',
  },
});
```

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### 1. Cách giàn Layout cơ bản trong React Native?

Trong React Native, cách giàn layout cơ bản nhất là sử dụng Flexbox, một hệ thống bố cục mạnh mẽ giúp bạn kiểm soát cách các thành phần hiển thị trên màn hình — từ căn giữa, chia cột, chia hàng, đến co giãn theo kích thước màn hình.

flexDirection mặc định là column, khác với CSS web. Bạn có thể lồng nhiều View để tạo layout phức tạp hơn. Dùng flex: 1 để phần tử chiếm toàn bộ không gian khả dụng.

### 2. SecureTextEntry trong reactnative là gì

Trong React Native, thuộc tính secureTextEntry được sử dụng trong thành phần `<TextInput>` để ẩn nội dung người dùng nhập vào — thường dùng cho các trường mật khẩu hoặc thông tin nhạy cảm.

Khi `secureTextEntry={true}`, văn bản nhập vào sẽ được hiển thị dưới dạng dấu chấm hoặc dấu sao (tùy hệ điều hành).

### 3. Thêm Icon vào React Native như thế nào

Sử dụng Expo Vector Icons https://icons.expo.fyi/Index

Expo đã tích hợp sẵn @expo/vector-icons, bạn không cần phải cài đặt thêm.

### 4. Tao màu nền gradian trong React Native như thế nào

Để tạo màu nền gradient trong React Native, bạn sẽ cần dùng thư viện hỗ trợ vì React Native không hỗ trợ gradient trực tiếp. Thư viện phổ biến nhất là react-native-linear-gradient hoặc nếu bạn dùng Expo thì có thể dùng expo-linear-gradient.

```
npx expo install expo-linear-gradient
```

