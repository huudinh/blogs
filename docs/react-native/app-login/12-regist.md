---
sidebar_position: 12
---

# Xây dựng màn hình Regist

Xây dựng chức năng Đăng ký thành viên

<ToggleTOC />

## I. Mục tiêu

1. Tạo hàm addUser thêm user vào API

2. Ở Màn hình Login khi click vào SignUp sẽ chuyển sang màn hình RegistScreen

3. Clone màn hình Login thành màn hình RegistScreen

4. Khai báo lại màn hình RegistScreen trong main.js

## II. Code Project

```jsx title="1. Sửa màn hình Login src/screens/login/index.js"
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import SysModal from '../../components/modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getUser } from '../../components/api';

const LoginScreen = () => {
    const navigation = useNavigation();

    // State để quản lý modal
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState({});

    // State để quản lý việc ẩn/hiện mật khẩu
    const [secure, setSecure] = useState(true);
    const toggleSecure = () => setSecure(!secure);

    // State để quản lý username, password
    const [formData, setFormData] = useState({
      username: "",
      password: ""
    });
    
    // Handle khi user nhập username và password
    const handleChange = (fieldName) => (text) => {
      setFormData(prev => ({ ...prev, [fieldName]: text }));
    };

    // Handle người dung khi click vào register
    const { username, password } = formData;

    // Đọc dữ liệu từ API
    const [data, setData] = useState(null);

    useEffect(() => {
      getUser()
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
            setMessage({title:'Lỗi nhập liệu', content: 'Xin hãy nhập đầy đủ thông tin'});
            return;
        }

        // Kiểm tra xem data có dữ liệu không
        if (!data || data.length === 0) {
          setModalVisible(true);
          setMessage({title: 'Thông báo', content: 'Lỗi kết nối Database'});
          return;
        }

        // Kiểm tra xem user có tồn tại trong data không
        const user = data.find(
          u => u.username === username && u.password === password
        );

        if (user) {
          // Lưu thông tin User vào AsyncStorage
          AsyncStorage.setItem('UserInfo', JSON.stringify(user));

          // Lưu danh sách User vào AsyncStorage
          AsyncStorage.setItem('UserList', JSON.stringify(data));

          // Chuyển hướng sang trang chủ
          navigation.navigate('Home');
          
        } else {
          setModalVisible(true);
          setMessage({title: 'Lỗi đăng nhập', content: 'Sai tên đăng nhập hoặc mật khẩu.'});
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
                          value={formData.username}
                          onChangeText={handleChange('username')}
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
                            value={formData.password}
                            onChangeText={handleChange('password')}
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
                <TouchableOpacity
                  onPress={() => navigation.navigate('Regist')}
                >
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

```jsx title="2. Thêm màn hình Regist src/screens/regist/index.js"
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import SysModal from '../../components/modal';
import { useNavigation } from '@react-navigation/native';
import { addUser } from '../../components/api';

const RegistScreen = () => {
    const navigation = useNavigation();

    // State để quản lý modal
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState({});

    // State để quản lý việc ẩn/hiện mật khẩu
    const [secure, setSecure] = useState(true);
    const toggleSecure = () => setSecure(!secure);

    // State để quản lý username, password...
    const [formData, setFormData] = useState({
      username: "",
      fullName: "",
      gender: "",
      age: "",
      password: ""
    });

    // Hàm xử lý khi thay đổi nội dung input
    const handleChange = (fieldName) => (text) => {
      setFormData(prev => ({ ...prev, [fieldName]: text }));
    };

    // Handle người dung khi click vào register
    const { username, fullName, password } = formData;


    // Hàm xử lý đăng ký
    const handleRegister = () => {
        // Validate
        if(!username || !fullName || !password) {
            setModalVisible(true);
            setMessage({title:'Lỗi nhập liệu', content: 'Xin hãy nhập đầy đủ thông tin'});
            return;
        }

        // Gọi API thêm user
        addUser(formData)
          .then(response => {
            // Chuyển hướng sang trang Login
            navigation.navigate('Login');
          })
          .catch(error => {
            console.error('Error adding user:', error);
            setModalVisible(true);
            setMessage({title:'Lỗi', content: 'Đăng ký thất bại!'});
          });
    }

    return (
        <View style={styles.container}>
        <View style={styles.border}>
            <View style={styles.main}>
            <View style={styles.header}>
                <Text style={styles.title}>Register</Text>
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
                          value={formData.username}
                          onChangeText={handleChange('username')}
                        />
                    </View>
                </View>
                <View style={styles.inputBox}>
                    <Text>Full Name</Text>
                    <View style={styles.inputRow}>
                        <AntDesign name="user" size={24} color="black" />
                        <TextInput 
                          style={styles.inputText} 
                          placeholder='Type your full name'
                          value={formData.fullName}
                          onChangeText={handleChange('fullName')}
                        />
                    </View>
                </View>
                <View style={styles.inputBox}>
                    <Text>Password</Text>
                    <View style={styles.inputRow}>
                        <AntDesign name="lock" size={24} color="black" />
                        <TextInput 
                            name="password"
                            style={styles.inputText} 
                            placeholder='Type your password'
                            secureTextEntry={secure}
                            value={formData.password}
                            onChangeText={handleChange('password')}
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
                        onPress={handleRegister}
                    >
                    <LinearGradient
                        colors={['#4c669f', '#3b5998', '#192f6a']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.loginGradient}
                    >
                        <Text style={styles.loginText}>Register</Text>
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
                <Text style={styles.footerText}>Or Login Using</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text>Login</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
        </View>
    );
}

export default RegistScreen;

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

```jsx title="3. Sửa màn hình Main src/main/index.js"
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../login';
import HomeScreen from '../home';
import RegistScreen from '../regist';

const Stack = createNativeStackNavigator();

const MainScreen = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Regist' component={RegistScreen} />
                <Stack.Screen name='Home' component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainScreen;

```

```jsx title="4. Sửa API src/components/api.jsx"
import axios from 'axios';

const API_BASE_URL = 'http://10.196.61.148:3000/api';

const http = axios.create({
    baseURL: API_BASE_URL,
})

// Đọc User
export const getUser = async () => {
    return await http.get(`/users`)
};

// Xóa User
export const deleteUser = async (userId) => {
    return await http.delete(`/users`, {
        data: { id: userId }
    });
};

// Cập nhật User
export const updateUser = async (updatedData) => {
  return await http.put(`/users`, updatedData);
};

// Thêm User
export const addUser = async (newUserData) => {
    return await http.post(`/users`, newUserData);
};

```

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### 1. Tại sao TextInput không có name?

Trong React Native, TextInput không có prop name như trong HTML vì React Native không sử dụng DOM như các ứng dụng web. Đây là một sự khác biệt quan trọng giữa React (web) và React Native.

### 2. Cách để thay đổi nội dung trong TextInput?

TextInput trong React Native không hỗ trợ prop name mặc định như HTML. Nếu bạn dùng name để xác định trường nào đang thay đổi (ví dụ: dùng chung handleChange cho nhiều input), bạn cần xử lý thủ công:

```jsx
const handleChange = (fieldName) => (text) => {
  setFormData(prev => ({ ...prev, [fieldName]: text }));
};

// Sử dụng:
<TextInput
  value={formData.username}
  onChangeText={handleChange('username')}
/>
```

### 3. Logic thêm User mới
- Xây dựng hàm Thêm User vào API
- Tạo State để quản lý thông tin user
- Tiến hành Validate dữ liệu
- Gọi API thêm user và nếu thành công chuyển sang màn Login để đăng nhập
