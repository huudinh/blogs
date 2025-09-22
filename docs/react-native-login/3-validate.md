---
sidebar_position: 3
---

# Login Validate 

Áp dụng kiến thức về Hooks UseState() để Validate trường User, Password, hiển thị thông báo lỗi bằng Modal

<ToggleTOC />

## I. Mục tiêu

1. Tái cấu trúc dự án

2. Tạo component MainScreen

3. Tạo component LoginScreen 

  + Tạo Function Handle người dung khi click vào login

  + Handle khi user nhập username và password

  + Validate Login

4. Sử dụng Modal để thông báo cho người dùng 

## II. Code Project

```jsx title="1. Tạo component LoginScreen src/screens/login/index.js"
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import SysModal from '../../components/modal';

const LoginScreen = () => {
    // State để quản lý modal
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState('');

    // State để quản lý việc ẩn/hiện mật khẩu
    const [secure, setSecure] = useState(true);
    const toggleSecure = () => setSecure(!secure);

    // State để quản lý username, password
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    // Handle khi user nhập username và password
    const handleUsernameChange = (text) => setUsername(text);
    const handlePasswordChange = (text) => setPassword(text);

    // Handle người dung khi click vào login
    const handleLogin = () => {
        // Validate
        if(!username || !password) {
            // Alert.alert('Xin hãy nhập đầy đủ thông tin');
            setModalVisible(true);
            setMessage('Xin hãy nhập đầy đủ thông tin');
            return;
        }

        console.log('login button pressed', {
            username, 
            password
        });
    }

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
                        value={username}
                        onChangeText={handleUsernameChange}
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
                            value={password}
                            onChangeText={handlePasswordChange}
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
                        onPress={handleLogin}
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
            <SysModal 
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                message={message}
            />
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

export default LoginScreen;

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

```jsx title="2. Tạo component MainScreen src/screens/main/index.js"
import LoginScreen from '../login';

const MainScreen = () => {
    return <LoginScreen />;
}

export default MainScreen;
```

```jsx title="3. Sửa file index.js"
import { registerRootComponent } from 'expo';

import MainScreen from './src/screens/main';

registerRootComponent(MainScreen);
```

```jsx title="4. Tạo component SysModal src/components/modal.js"
import { View, Text, Modal, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const SysModal = (props) => {
    const { modalVisible, setModalVisible, message } = props;
    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Thông báo</Text>
                        <AntDesign 
                            name="close" size={24} color="black" 
                            onPress={() => setModalVisible(false)}
                        />
                    </View>
                    <View style={styles.body} >
                        <Text>{message}</Text>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        padding: 10,
        margin: 10,
    },
    header: {
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        alignItems: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    body:{
        paddingVertical: 10,
    },
    bodyText: {
        fontSize: 18,
    },
   
});

export default SysModal;
```

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### 1. Tại sao cần tái cấu trúc component trong react native?

Việc tái cấu trúc component trong React Native không chỉ là một bước kỹ thuật mà còn là một chiến lược giúp ứng dụng của bạn trở nên dễ bảo trì, mở rộng và hiệu quả hơn. 

Khi component được chia nhỏ và thiết kế rõ ràng, bạn có thể dùng lại chúng ở nhiều nơi trong app.

Component nhỏ gọn, có chức năng rõ ràng giúp người khác (hoặc chính bạn trong tương lai) dễ đọc và sửa lỗi.

Component được tách biệt giúp React Native dễ dàng xác định khi nào cần render lại.

Khi app phát triển, việc có cấu trúc component rõ ràng giúp bạn dễ dàng thêm tính năng mới mà không phá vỡ những phần đã có.


### 2. Tại sao trong React Native không sử dụng được onClick

Trong React Native, bạn không thể sử dụng onClick như trong React web vì React Native không chạy trên trình duyệt và không sử dụng DOM. Thay vào đó, nó dùng các component gốc của nền tảng di động như View, Text, TouchableOpacity, v.v.

Nếu bạn đang chuyển từ React web sang React Native, việc làm quen với onPress thay vì onClick là một trong những thay đổi quan trọng.

### 3. Tại sao thay vì dùng onChane React Native lại sử dụng onChangeText để nhập liệu

Trong React Native, bạn sẽ thấy rằng thay vì dùng onChange như trong React web, ta thường dùng onChangeText khi làm việc với các component nhập liệu như TextInput. Lý do nằm ở cách React Native thiết kế để phù hợp với môi trường mobile. 

onChangeText là một callback đặc biệt dành riêng cho TextInput, nhận trực tiếp giá trị text mới mỗi khi người dùng gõ.

onChangeText được tối ưu để phản hồi nhanh và mượt mà khi người dùng nhập liệu trên mobile.

React Native vẫn hỗ trợ onChange, nhưng nó trả về một event phức tạp hơn, thường dùng khi bạn cần xử lý sâu hơn (ví dụ: kiểm tra vị trí con trỏ, kiểu nhập liệu...).

### 4. Có phải cài thư viện modal trong React Native

Không cần cài thêm thư viện để sử dụng Modal trong React Native — vì Modal là một component có sẵn trong thư viện react-native. 

```
import { Modal } from 'react-native';
```

Truy cập link để hiểu thêm về cách hoạt động của Modal https://reactnative.dev/docs/modal



