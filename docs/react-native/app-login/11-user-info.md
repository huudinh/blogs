---
sidebar_position: 11
---

# Xây dựng màn hình UserInfo

Khi click vào Change Profile sẽ xuất hiện modal giúp update lại thông tin của User đó

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/XeEq5iQDEXo?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

<ToggleTOC />

## I. Mục tiêu

1. Thêm Background cho User

2. Hiển thị hình ảnh Profile của User tương ứng

3. Thêm chức năng sửa thông tin cá nhân khi click vào Change Profile

4. Cấu trúc lại Modal để vừa thể hiện được thông báo vừa có thể hiển thị được giao diện update Profile

## II. Code Project

```jsx title="1. Sửa file src/screens/user_info/index.jsx"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import SysModal from '../../components/modal';

const UserInfo = () => {
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState('');

    // State để quản lý modal
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('UserInfo')
            .then(result => {
                if (result){
                    setUserInfo(JSON.parse(result));
                }
            });

    }, [message, modalVisible]);

    // Phương thức Logout
    const handleLogout = () => {
        // Xóa cache
        AsyncStorage.clear();

        // Chuyển đến màn hình Login
        navigation.replace('Login');
    }

    // Sử lý sự kiện Change Profile
    const handleChangeProfile = () => {
        setModalVisible(true);
        setMessage({title:'Update Profile', content: 'update_profile'});
    }

    
    const gender = userInfo.gender === 'male' ? 'boy' : 'girl';
    const id = userInfo.id;
    const photo = `https://avatar.iran.liara.run/public/${gender}?username=[${userInfo.id}]`
    
    return (
        <ImageBackground 
            blurRadius={1}
            style={styles.container}
            source={{
                uri: photo
            }}
        >
            <View style={styles.background}>
                <View style={styles.head}></View>
                <View style={styles.body}>
                    <View style={styles.avatar}>
                        <Image 
                            style={styles.avatarImage}
                            source={{
                                uri: photo
                            }}
                        />
                    </View>
                    <View style={styles.profile}>
                        <Text style={styles.profileName}>{userInfo.fullName}</Text>
                        <Text style={styles.profileAge}>{userInfo.age} year old</Text>
                    </View>
                    <View style={styles.info}>
                        <View style={styles.infoTitle}>
                            <Text style={styles.infoTitleText}>Options</Text>
                        </View>
                        <View style={[styles.infoDetail, styles.infoLine]}>
                            <AntDesign name="lock" size={20} color="black" />
                            <TouchableOpacity
                                style={styles.infoFull}
                                onPress={handleChangeProfile}
                            >
                                <Text>Change profile</Text>
                            </TouchableOpacity>
                            <AntDesign name="right" size={24} color="black" />
                        </View>
                        <View style={styles.infoDetail}>
                            <AntDesign name="logout" size={20} color="black" />
                            <TouchableOpacity 
                                style={styles.infoFull} 
                                onPress={handleLogout}
                            >
                                <Text>Logout</Text>
                            </TouchableOpacity>
                            <AntDesign name="right" size={24} color="black" />
                        </View>
                        <View style={styles.infoTitle}>
                            <Text style={styles.infoTitleText}>User Infomation</Text>
                        </View>
                        <View style={[styles.infoDetail, styles.infoLine]}>
                            <AntDesign name="idcard" size={20} color="black" />
                            <Text>{userInfo.id}</Text>
                        </View>
                        <View style={[styles.infoDetail, styles.infoLine]}>
                            <AntDesign name="user" size={20} color="black" />
                            <Text>{userInfo.username}</Text>
                        </View>
                        
                        <View style={styles.infoDetail}>
                            <AntDesign name="filter" size={20} color="black" />
                            <Text>{userInfo.gender}</Text>
                        </View>
                    </View>
                </View>
                <SysModal 
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    message={message}
                />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: -40,
    },
    background:{
        flex:1,
        backgroundColor: 'rgba(0,0,0,.3)'
    },
    head:{
        flex: 1
    },
    body:{
        flex: 2,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    avatar:{
        position: 'absolute',
        top: -50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: '#fff',
    },
    profile: {
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileName:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#192f6a'
    },
    profileAge:{
        color: '#666'
    },
    info:{
        flex: 1,
        marginTop: 10,
        padding: 10,
    },
    infoTitle: {
        backgroundColor: '#192f6a',
        borderRadius: 10,
    },
    infoTitleText: {
        color: '#fff',
        padding: 10,
        fontWeight: 'bold',
    },
    infoDetail: {
        padding: 10,
        fontWeight: 'bold',
        marginLeft: 5,
        marginRight: 5,
        flexDirection: 'row',
        gap: 20,
    },
    infoLine:{
        borderBottomWidth: 1,
        borderBottomColor: '#192f6a',
    },
    infoFull:{
        flex:1,
    }
});

export default UserInfo;

```

```jsx title="2. Sửa file src/components/modal.js"
import { View, Text, Modal, StyleSheet, TextInput, Button } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import { updateUser } from './api';

const SysModal = (props) => {
    const { modalVisible, setModalVisible, message } = props;
    const [userInfo, setUserInfo] = useState({
        fullName: '',
        gender: '',
        age: '',
    });

    useEffect(() => {
        AsyncStorage.getItem('UserInfo')
            .then(result => {
                if (result){
                    setUserInfo(JSON.parse(result));
                }
            });

    }, []);

    const handleSave = () => {
        console.log('Profile updated:', userInfo);
        setModalVisible(false);

        // Lưu thông tin vào Storage
        AsyncStorage.setItem('UserInfo', JSON.stringify(userInfo));

        // Lưu thông tin vào API
        updateUser(userInfo)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const renderBody = () => {
        if (message.content === 'update_profile') {
            return (
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Tên"
                        value={userInfo.fullName}
                        onChangeText={(text) => setUserInfo({ ...userInfo, fullName: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Tuổi"
                        keyboardType="numeric"
                        value={String(userInfo.age)}
                        onChangeText={(text) => setUserInfo({ ...userInfo, age: text })}
                    />
                    <RNPickerSelect
                        value={String(userInfo.gender)} // giá trị mặc định từ state
                        onValueChange={(value) => setUserInfo({ ...userInfo, gender: value })}
                        items={[
                            { label: 'Nam', value: 'male' },
                            { label: 'Nữ', value: 'female' },
                        ]}
                        placeholder={{ label: 'Chọn giới tính', value: null }}
                    />
                    <Button title="Lưu thay đổi" onPress={handleSave} />
                </View>
            );
        } else {
            return (
                <Text style={styles.bodyText}>{message.content}</Text>
            );
        }
    };


    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.container}>
                    <View style={styles.modalBox}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>{message.title}</Text>
                            <AntDesign 
                                name="close" size={14} color="black" 
                                onPress={() => setModalVisible(false)}
                            />
                        </View>
                        <View style={styles.body} >
                             {renderBody()}
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.3)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalBox: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 10,
        padding: 20,
        marginTop:'-30%',
    },
    header: {
        flexDirection: 'row',
        paddingBottom: 10,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    body:{
        paddingVertical: 20,
    },
    bodyText: {
        fontSize: 16,
        color: '#666',
    },
    form: {
        gap: 10,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderRadius: 6,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 16,
    },
   
});

export default SysModal;

```

```jsx title="3. Sửa file src/screens/login/index.js"
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

```jsx title="4. Sửa file src/screens/user_manage/index.js"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { deleteUser, getUser } from '../../components/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import SysModal from '../../components/modal';
import Loading from '../../components/Loading';

const UserManage = () => {
    const [userList, setUserList] = useState([]);
    const [keySearch, setKeySearch] = useState('');

    // State để quản lý modal
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = (text) => setKeySearch(text);

    // Load danh sách User từ AsyncStorage khi component được mount
    useEffect(() => {
        AsyncStorage.getItem('UserList')
            .then( result => {
                if (result) {
                    setUserList(JSON.parse(result));
                }
            })
    }, [message, modalVisible]);

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

    // Xóa User theo ID
    const handlerDelete = (id) => {
        try {
            setIsLoading(true);
            setTimeout(()=>{
                deleteUser(id)
                .then(res => {
                    setModalVisible(true);
                    setIsLoading(false);
                    setMessage({title:'Thông báo', content: 'Bạn đã xóa thành công User'});
                    getData();
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
            }, 3000);
        } catch (error) {
            setIsLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <SysModal 
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                message={message}
            />
            <Loading visible={isLoading} />
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
                            <View>
                                <TouchableOpacity 
                                    onPress={() => handlerDelete(user.id)}
                                    style={styles.delete}>
                                    <AntDesign name="delete" size={20} color="white" />
                                </TouchableOpacity>
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
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#192f6a',
        marginBottom: 5,
    },
    delete: {
        backgroundColor: '#c00',
        borderRadius: 5,
        width:30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default UserManage;

```

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### 1. Thêm Background trong React Native thế nào?

Để thêm background trong React Native, cách phổ biến nhất là sử dụng component ImageBackground. Nó cho phép bạn đặt hình nền và chồng các thành phần khác lên trên.

`ImageBackground` cần có width và height hoặc flex: 1 để hiển thị đúng.

Bạn có thể dùng ảnh từ URL hoặc từ local file (`require()`).

Nếu muốn dùng màu nền thay vì ảnh, chỉ cần dùng `style={{ backgroundColor: 'green' }}` trong `View`.


### 2. Cách áp dụng nhiều style (giống như nhiều class) trong React Native thế nào?

Trong React Native, bạn không dùng "class" như trong HTML/CSS, mà dùng style với StyleSheet. Nếu bạn muốn áp dụng nhiều style (giống như nhiều class) cho một component như `<View>`, bạn chỉ cần truyền một mảng các style vào prop style.

```jsx
<View style={[styles.infoDetail, styles.shadow]}>
  <AntDesign name="filter" size={20} color="black" />
  <Text>{userInfo.gender}</Text>
</View>
```

### 3. Tại sao TextInput luôn luôn là string

Bản chất của TextInput là nhập văn bản nên React Native cần value là chuỗi để hiển thị đúng

### 4. Cách tạo select trong React Native

Cài thư viện react-native-picker-select

```bash
npm install prop-types
npm install react-native-picker-select
```

Cách hiển thị Select trong component

```jsx
<RNPickerSelect
    value={String(userInfo.gender)} // giá trị mặc định từ state
    onValueChange={(value) => setUserInfo({ ...userInfo, gender: value })}
    items={[
        { label: 'Nam', value: 'male' },
        { label: 'Nữ', value: 'female' },
    ]}
    placeholder={{ label: 'Chọn giới tính', value: null }}
/>
```

### 5. Các bước để sửa thông tin cá nhân khi click vào Change Profile?

- Tạo State để quản lý modal
- Sử lý sự kiện Change Profile
- Nhúng SysModal thêm modal vào UI
- Thêm trường hợp giao diện Update cho Modal
- Truyền thông tin User cần update cho Modal
- Lưu thông tin update vào Storage để cập nhật giao diện
- Lưu thông tin update vào API
