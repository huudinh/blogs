---
sidebar_position: 9
---

# Reload dữ liệu và Search

Trong màn hình User Manage, khi người dùng vuốt màn hình xuống thì ứng dụng sẽ load lại dữ liệu mới nhất, đồng thời có thể Search theo tên người dùng và hiển thị Avatar theo giới tính

<iframe width="560" height="315" src="https://www.youtube.com/embed/EtChG6ecPhA?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<ToggleTOC />

## I. Mục tiêu

1. Tạo 1 file chứa phương thức Get API cho màn Login và màn User Manage

2. Trong màn User Manage Lưu danh sách User vào AsyncStorage và cập nhật lại danh sach User trong State

3. Cấu hình FlatList trong User Manage cho người dùng vuốt màn hình sẽ load lại dữ liệu mới nhất

4. Xây dựng tính năng Search bằng cách Filter tên người dùng trong ô tìm kiếm

5. Update lại API để hiển thị Avata theo giới tính

## II. Code Project

```jsx title="1. Tạo file src/components/api.jsx"
import axios from 'axios';

const API_BASE_URL = 'http://10.196.61.148:3000/api';

const http = axios.create({
    baseURL: API_BASE_URL,
})

export const getUser = async () => {
    return await http.get(`/users`)
};

```

```jsx title="2. Sửa file src/screens/login/index.js"
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

```json title="3. Update lại API"
[
  {
    "id": 1,
    "fullName": "Quoc Viet",
    "username": "Viet",
    "password": "1234",   
    "gender": "male",
    "age": 28
  },
  {
    "id": 2,
    "fullName": "Dinh Trieu",
    "username": "dinh",
    "password": "1234",
    "gender": "male",
    "age": 28
  },
  {
    "id": 3,
    "fullName": "Mai Thúy",
    "username": "thuy",
    "password": "1234",
    "gender": "female",
    "age": 28
  },
  {
    "id": 4,
    "fullName": "Thùy Linh",
    "username": "linh",
    "password": "1234",
    "gender": "female",
    "age": 28
  },
  {
    "id": 5,
    "fullName": "Hương Giang",
    "username": "giang",
    "password": "1234",
    "gender": "female",
    "age": 28
  },
  {
    "id": 6,
    "fullName": "Mai Lan",
    "username": "lan",
    "password": "1234",
    "gender": "female",
    "age": 28
  },
  {
    "id": 7,
    "fullName": "Dinh Trieu 5",
    "username": "dinh5",
    "password": "1234",
    "gender": "male",
    "age": 28
  },
  {
    "id": 8,
    "fullName": "Dinh Trieu 6",
    "username": "dinh6",
    "password": "1234",
    "gender": "male",
    "age": 28
  },
  {
    "id": 9,
    "fullName": "Dinh Trieu 7",
    "username": "dinh7",
    "password": "1234",
    "gender": "male",
    "age": 28
  }
]
```

```jsx title="4. Sửa file src/screens/user_manage/index.js"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, FlatList, Image, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { getUser } from '../../components/api';
import AntDesign from '@expo/vector-icons/AntDesign';

const UserManage = () => {
    const [userList, setUserList] = useState([]);
    const [keySearch, setKeySearch] = useState('');

    const handleSearch = (text) => setKeySearch(text);

    // Load danh sách User từ AsyncStorage khi component được mount
    useEffect(() => {
        AsyncStorage.getItem('UserList')
            .then( result => {
                if (result) {
                    setUserList(JSON.parse(result));
                }
            })
    }, []);

    // Hàm load lại dữ liệu từ API
    const getData = () => {
        getUser()
        .then(response => {
            // Lưu danh sách User vào AsyncStorage
            AsyncStorage.setItem('UserList', JSON.stringify(response.data));

            // Cập nhật lại danh sach User trong state
            setUserList(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>User Management</Text>
            </View>
            <View style={styles.search}>
                <View style={styles.searchBox}>
                    <TextInput 
                        style={styles.searchInput} 
                        placeholder='Enter your key Search' 
                        onChangeText={handleSearch} value={keySearch} />
                    <AntDesign 
                        style={styles.searchIcon} 
                        name="search1" size={20} color="black" />
                </View>
            </View>
            <FlatList 
                refreshing={false}
                onRefresh={() => getData()}
                data={userList.filter(
                    user => user.fullName.toLowerCase().search(keySearch.toLowerCase()) > -1
                )}
                keyExtractor={user => user.id.toString()}
                renderItem={({item: user}) => {
                    const gender = user.gender === 'male' ? 'boy' : 'girl';
                    return (
                        <View style={styles.userItem}>
                            <View> 
                                <Image 
                                    style={styles.userImage}
                                    source={{
                                        uri: `https://avatar.iran.liara.run/public/${gender}?username=[${user.id}]`
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
    title: {
        padding: 10,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#192f6a',
    },
    search:{
        padding: 10,
    },
    searchBox: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
    },
    searchIcon: {
        padding: 10,
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

### 1. Mục đích của useEffect khi dùng với AsyncStorage?

Chạy một lần khi component được mount: Khi bạn truyền một mảng rỗng [] vào useEffect, đoạn code bên trong sẽ chỉ chạy một lần sau khi component được render lần đầu. Đây là thời điểm lý tưởng để lấy dữ liệu từ AsyncStorage.

Xử lý bất đồng bộ: useEffect cho phép bạn gọi các hàm async bên trong để xử lý việc lấy dữ liệu mà không làm gián đoạn quá trình render.

Cập nhật state: Sau khi lấy dữ liệu từ AsyncStorage, bạn thường sẽ dùng setState (ví dụ setUsers) để cập nhật danh sách người dùng. Việc này sẽ trigger một lần render lại với dữ liệu mới.

### 2. Trong React Native để làm mới được dữ liệu khi sử dụng với FlatList ta cần làm gì?

Để làm mới dữ liệu trong FlatList của React Native, bạn có thể sử dụng tính năng pull-to-refresh thông qua các props refreshing và onRefresh. Đây là cách phổ biến nhất để cập nhật lại dữ liệu khi người dùng kéo xuống danh sách.

### 3. Cách tìm kiếm người dùng theo tên trong React Native bằng cách sử dụng FlatList?

```jsx title="FlatList kết hợp với filter() và search()"
data={userList.filter(user => 
  user.fullName.toLowerCase().search(keySearch.toLowerCase()) > -1
)}
```

`userList.filter(...)` Lọc danh sách người dùng (userList) để chỉ giữ lại những người có tên phù hợp với từ khóa tìm kiếm (keySearch).

`user.fullName.toLowerCase()` Chuyển tên người dùng sang chữ thường để đảm bảo tìm kiếm không phân biệt chữ hoa/chữ thường.

`keySearch.toLowerCase()` Tương tự, chuyển từ khóa tìm kiếm sang chữ thường.

`.search(...) > -1` search() trả về vị trí đầu tiên của chuỗi con trong chuỗi gốc. Nếu không tìm thấy, nó trả về -1. Vì vậy, điều kiện > -1 nghĩa là chỉ giữ lại những người có tên chứa từ khóa tìm kiếm.

### 4. Có thể dùng cách khác tối ưu hơn việc FlatList kết hợp với filter() và search()?

```jsx title="Có thể dùng includes() thay vì search()"
data={userList.filter(user => 
  user.fullName.toLowerCase().includes(keySearch.toLowerCase())
)}
```

includes() ngắn gọn, dễ đọc hơn và phù hợp với mục đích kiểm tra chuỗi con.