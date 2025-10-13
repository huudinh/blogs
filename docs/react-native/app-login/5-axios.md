---
sidebar_position: 5
---

# Request API bằng Axios

Việc sử dụng Axios để request API trong React Native là một lựa chọn phổ biến và cực kỳ hữu ích, đặc biệt khi bạn muốn xây dựng ứng dụng có khả năng tương tác với server hoặc dịch vụ bên ngoài

<ToggleTOC />

## I. Mục tiêu

1. Hiểu các dùng Axios để đọc API

2. Đọc danh sách người dùng từ API

3. Kiểm tra xem user có tồn tại trong API không

## II. Code Project

```jsx title="Sửa file src/screens/login/index.js"
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import SysModal from '../../components/modal';
import axios from 'axios';

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

    // Đọc dữ liệu từ API
    const [data, setData] = useState(null);

    useEffect(() => {
      axios.get('http://10.196.61.148:3000/api/users')
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);

    // Handle người dung khi click vào login
    const handleLogin = () => {
        // Validate
        if(!username || !password) {
            setModalVisible(true);
            setMessage('Xin hãy nhập đầy đủ thông tin');
            return;
        }

        // Kiểm tra xem user có tồn tại trong data không
        const user = data.find(
          u => u.username === username && u.password === password
        );
        setModalVisible(true);

        if (user) {
          setMessage(`Chào ${user.fullName}, bạn đã đăng nhập thành công!`);
        } else {
          setMessage('Sai tên đăng nhập hoặc mật khẩu.');
        }
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

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### 1. Cách dùng Axios để đọc API trong React Native

Cài đặt thư viện `npm install axios`

Code đọc API

```jsx
  import axios from 'axios';

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);
```

### 2. React Native có thể truy cập localhost của máy tính không

Trong React Native thường là do React Native không thể truy cập localhost của máy tính như trình duyệt web có thể. Đây là một vấn đề phổ biến khi phát triển ứng dụng di động.

Thay vì dùng localhost, hãy dùng địa chỉ IP nội bộ của máy tính đang chạy server. Ví dụ:

```jsx
axios.get('http://192.168.1.100:3000/api/users')

```

Để tìm địa chỉ IP của máy tính:

Trên macOS: System Preferences > Network

Trên Windows: Chạy ipconfig trong Command Prompt

### 3. array.find(...) có phải là phương thức của React Native không?

Không phải đâu — array.find(...) không phải là phương thức của React Native, mà là của JavaScript.

.find() là một phương thức của mảng (Array method) trong JavaScript, dùng để tìm phần tử đầu tiên trong mảng thỏa mãn một điều kiện nào đó.

```
array.find(callback)
```
`array`: là mảng bạn muốn tìm kiếm.

`callback`: là một hàm kiểm tra từng phần tử trong mảng. Nếu hàm này trả về true, `.find()` sẽ trả về phần tử đó ngay lập tức và dừng lại.

Nếu không có phần tử nào thỏa mãn, nó sẽ trả về `undefined`.

.find() chỉ trả về một phần tử duy nhất — phần tử đầu tiên thỏa mãn điều kiện.

Nếu bạn muốn tìm tất cả các phần tử thỏa mãn, hãy dùng .filter() thay vì .find()