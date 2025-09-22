---
sidebar_position: 6
---

# Xây dựng chức năng Logout

Ta cần lưu dữ liệu đăng nhập vào biến toàn cục và khi Logout thì ta xóa dữ liệu đăng nhập đi và chuyển hướng đến màn hìn Login

<ToggleTOC />

## I. Mục tiêu

1. Lưu dữ liệu đăng nhập với AsyncStorage

2. Chuyển màn hình với ReactNavigation

3. Xây dựng tính Logout trong màn hình Home

## II. Code Project

```jsx title="1. Tạo file src/screens/home/index.js"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('UserInfo')
            .then(result => {
                if (result){
                    setUserInfo(JSON.parse(result));
                }
            });

    }, []);

    const handleLogout = () => {
        // Xóa cache
        AsyncStorage.clear();

        // Chuyển đến màn hình Login
        navigation.replace('Login');
    }

    return (
        <View style={styles.container}>
            <View style={styles.border}>
                <View style={styles.profile}>
                    <View>
                        <Text>ID: {userInfo.id}</Text>
                    </View>
                    <View>
                        <Text>Full Name: {userInfo.fullName}</Text>
                    </View>
                    <View>
                        <Text>Age: {userInfo.age}</Text>
                    </View>
                </View>
                <View style={styles.logoutBox}>
                    <TouchableOpacity 
                        style={styles.logout} 
                        onPress={handleLogout}
                    >
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498D8',
    },
    border: {
        backgroundColor: '#fff',
        margin: 10,
        flex: 1,
        borderRadius: 30,
        padding: 15,
    },
    profile: {
        padding: 20,
        marginVertical: 20,
        backgroundColor: '#eee',
        borderRadius: 20,

    },
    logoutBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    logout: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ff5757',
        borderRadius: 10,
    }
});

export default HomeScreen;
```

```jsx title="2. Sửa file src/screens/main/index.js"
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../login';
import HomeScreen from '../home';

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
                <Stack.Screen name='Home' component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainScreen;

```

```jsx title="3. Sửa file src/screens/login/index.js"
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import SysModal from '../../components/modal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation();

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

        // Kiểm tra xem data có dữ liệu không
        if (!data || data.length === 0) {
          setModalVisible(true);
          setMessage('Lỗi kết nối Database');
          return;
        }

        // Kiểm tra xem user có tồn tại trong data không
        const user = data.find(
          u => u.username === username && u.password === password
        );

        if (user) {
          // Lưu thông tin User vào AsyncStorage
          AsyncStorage.setItem('UserInfo', JSON.stringify(user));

          // Chuyển hướng sang trang chủ
          navigation.navigate('Home');
          
        } else {
          setModalVisible(true);
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

### 1. AsyncStorage là gì

AsyncStorage là một thư viện lưu trữ dữ liệu cục bộ trong React Native, cho phép bạn lưu trữ dữ liệu dưới dạng cặp khóa–giá trị một cách bất đồng bộ trên thiết bị của người dùng. Nó giống như localStorage trong trình duyệt, nhưng được thiết kế riêng cho môi trường di động.

Tài liệu: https://www.npmjs.com/package/@react-native-async-storage/async-storage

```
npm install @react-native-async-storage/async-storage
# hoặc
yarn add @react-native-async-storage/async-storage
```

Import thư viện

```jsx
import AsyncStorage from '@react-native-async-storage/async-storage';

```

### 2. Cách sử dụng AsyncStorage 

**Lưu dữ liệu**

```jsx
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async () => {
  try {
    await AsyncStorage.setItem('username', 'trieu');
  } catch (e) {
    console.error('Lỗi khi lưu dữ liệu:', e);
  }
};

```

**Đọc dữ liệu**

```jsx
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('username');
    if (value !== null) {
      console.log('Username:', value);
    }
  } catch (e) {
    console.error('Lỗi khi đọc dữ liệu:', e);
  }
};
```

**Xóa dữ liệu**

```jsx
await AsyncStorage.removeItem('username');
```

### 3. ReactNavigation là gì?

React Navigation là một thư viện điều hướng phổ biến nhất trong React Native, giúp bạn dễ dàng quản lý các màn hình và luồng chuyển đổi trong ứng dụng di động. Nó hỗ trợ các kiểu điều hướng như stack, tab, drawer, và thậm chí cả deep linking.

Tài liệu: https://reactnavigation.org/

```
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
```

Import thư viện

```jsx
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
```

Khai báo màn hình

```jsx
const MainScreen = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Home' component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
```

### 4. Cách chuyển hướng màn hình trong React Native?

```jsx
import { useNavigation } from '@react-navigation/native';

const navigation = useNavigation();
navigation.navigate('Home');
```

### 5. navigation.navigate() khác gì navigation.replace()

**navigation.navigate()** 

Thêm màn hình mới vào stack: Màn hình hiện tại vẫn nằm trong lịch sử điều hướng.

Cho phép quay lại: Người dùng có thể nhấn nút "Back" để quay lại màn hình trước đó.

Dùng khi bạn muốn chuyển đến màn hình khác nhưng vẫn giữ lại khả năng quay lại.

**navigation.replace()**

Thay thế màn hình hiện tại: Màn hình hiện tại bị loại khỏi stack.

Không thể quay lại: Người dùng không thể quay lại màn hình trước đó bằng nút "Back".

Dùng khi bạn muốn reset luồng điều hướng, ví dụ như sau khi đăng xuất hoặc đăng nhập thành công.