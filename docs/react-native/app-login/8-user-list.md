---
sidebar_position: 8
---

# Hiển thị danh sách User

Sau khi người dùng login thành công lưu lại danh sách người dùng đòng thời hiển thị danh sách các User trong màn hình User Manage

<iframe width="560" height="315" src="https://www.youtube.com/embed/jZkaOWdvAE8?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<ToggleTOC />

## I. Mục tiêu

1. Lưu danh sách User vào AsyncStorage

2. Sử dụng FlatList hiển thị danh sách User từ AsyncStorage

3. Sử dụng component Images Hiển thị Avatar tự động theo API https://avatar-placeholder.iran.liara.run/

## II. Code Project

```jsx title="1. Sửa file src/screens/login/index.js"
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

          // Lưu danh sách User vào AsyncStorage
          AsyncStorage.setItem('UserList', JSON.stringify(data));

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

```jsx title="2. Sửa file src/screens/user_manage/index.js"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useEffect, useState } from 'react';

const UserManage = () => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('UserList')
            .then( result => {
                if (result) {
                    setUserList(JSON.parse(result));
                }
            })
    }, []);

    return (
        <View style={styles.container}>
            <Text>User Management</Text>
            <FlatList 
                data={userList}
                keyExtractor={user => user.id.toString()}
                renderItem={({item: user}) => {
                    return (
                        <View style={styles.userItem}>
                            <View> 
                                <Image 
                                    style={styles.userImage}
                                    source={{
                                        uri: `https://avatar.iran.liara.run/public/${user.id}`
                                    }} 
                                />
                            </View>
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>{user.fullName} </Text>
                                <Text>Age: {user.age} </Text>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    userItem: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    userImage: {
        width: 80,
        height: 80,
    },
    userInfo: {
        padding: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#192f6a',
        marginBottom: 5,
    }

});

export default UserManage;
```


## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### 1. Tại sao trong React Native ta nên dùng FlatList thay vì View để hiện thị danh sách?

Trong React Native, bạn nên dùng FlatList thay vì View để hiển thị danh sách vì FlatList được thiết kế chuyên biệt cho việc xử lý danh sách lớn một cách hiệu quả, trong khi View chỉ là một container đơn giản

### 2. Sự vượt trội của FlatList so với View?

FlatList chỉ render những item đang hiển thị trên màn hình, giúp tiết kiệm bộ nhớ và tăng tốc độ.

View khi dùng với .map() sẽ render toàn bộ danh sách một lúc — dễ gây giật lag nếu danh sách dài.

FlatList tích hợp sẵn cuộn danh sách, load thêm khi cuộn đến cuối, và kéo để làm mới (pull-to-refresh).

View không có các tính năng này — bạn phải tự xử lý bằng ScrollView hoặc viết thêm logic.

Chỉ cần truyền data và renderItem là FlatList sẽ tự động hiển thị danh sách.

Có thể dùng keyExtractor, ItemSeparatorComponent, ListHeaderComponent, ListFooterComponent… để tùy chỉnh dễ dàng.

FlatList được tối ưu cho cả Android và iOS, hỗ trợ hiển thị nhiều cột, cuộn ngang, và tự động cập nhật khi dữ liệu thay đổi.

FlatList là một wrapper của VirtualizedList, nghĩa là nó tự động xử lý việc render ảo (virtual rendering) — cực kỳ quan trọng với danh sách lớn

### 3. Có thể thêm ảnh bằng thẻ img trong React Native không?

Không thể sử dụng thẻ `<img>` trong React Native như trong HTML hoặc React web. React Native không chạy trên trình duyệt, nên nó không hỗ trợ các thẻ HTML như `<img>`, `<div>`, hay `<span>`. Thay vào đó, React Native cung cấp các component riêng biệt được tối ưu cho thiết bị di động.

### 4. Cách thêm hình ảnh trong React Native?

```jsx title='1 Thêm trực tiếp trong code'
import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/myImage.png')} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

```

```jsx title='2. Thêm từ Internet'
<Image
  source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
  style={{ width: 100, height: 100 }}
/>
```

```jsx title='3. Thêm từ camera hoặc thư viện ảnh'
// Cài đặt react-native-image-picker

<Image
  source={{ uri: response.assets[0].uri }}
  style={{ width: 200, height: 200 }}
/>

```