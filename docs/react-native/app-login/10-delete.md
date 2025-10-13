---
sidebar_position: 10
---

# Xóa người dùng và Loading

Trong màn User Manage xây dựng hàm xóa User theo Id. Thêm Modal thông báo xóa thành công đông thời load lại dữ liệu mới nhất khi đóng modal.

<iframe width="560" height="315" src="https://www.youtube.com/embed/XeEq5iQDEXo?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<ToggleTOC />

## I. Mục tiêu

1. Thêm phương thức xóa User vào api

2. Trong màn User Manage xây dựng hàm xóa User theo Id

3. Thêm Modal thông báo xóa thành công đông thời load lại dữ liệu mới nhất khi đóng modal

4. Khi xóa người dùng sẽ hiển thị Loading

## II. Code Project

```jsx title="1. Tạo file src/components/Loading.jsx"
import { View, Modal, StyleSheet, ActivityIndicator } from 'react-native';

const Loading = ({ visible }) => {
    return (
        <Modal visible={visible} transparent={true}>
            <View style={styles.loading}>
                <View style={styles.loadingBg}>
                    <ActivityIndicator color={'#2e86c1'} size='large' />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingBg: {
        backgroundColor: '#fff',
        padding: 10,
        width: 100,
        height: 100,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Loading;

```

```jsx title="2. Sửa file src/components/api.js"
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

```

```jsx title="3. Sửa file src/components/modal.js"
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
                    <View style={styles.modalBox}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Thông báo</Text>
                            <AntDesign 
                                name="close" size={14} color="black" 
                                onPress={() => setModalVisible(false)}
                            />
                        </View>
                        <View style={styles.body} >
                            <Text style={styles.bodyText}>{message}</Text>
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
   
});

export default SysModal;

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
    const [message, setMessage] = useState('');
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

    // Xóa User theo ID
    const handlerDelete = (id) => {
        try {
            setIsLoading(true);
            setTimeout(()=>{
                deleteUser(id)
                .then(res => {
                    setModalVisible(true);
                    setIsLoading(false);
                    setMessage('Bạn đã xóa thành công User.');
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

### 1. Để xóa người dùng bạn cần thực hiện các bước nào?

- Gọi hàm xóa User theo ID

- Tạo nút xóa trên giao diện

- Hiển thị Loading khi đang xóa

- Gọi API xóa và xử lý kết quả

- Cập nhật giao diện sau khi xóa


### 2. Tại sao cần tạo component Loading?

- Khi xóa người dùng, ứng dụng sẽ gửi request đến server → cần một khoảng thời gian để nhận phản hồi. Nếu không có Loading, người dùng sẽ không biết ứng dụng đang xử lý hay bị treo. Loading giúp họ thấy rõ hệ thống đang bận và cần chờ.

- Khi Loading hiển thị, người dùng sẽ không tiếp tục bấm xóa nhiều lần, giảm nguy cơ gửi nhiều request trùng nhau. Điều này giúp giữ dữ liệu nhất quán và giảm tải cho server.

- Việc tạo một component Loading riêng (Loading.jsx) giúp bạn có thể sử dụng nó không chỉ trong xóa user mà còn trong các thao tác khác (ví dụ: lưu dữ liệu, upload file…). 

- Tiết kiệm thời gian và code ngắn gọn, chỉ cần truyền props visible={true/false} để điều khiển hiển thị.

### 3. ActivityIndicator là gì?

ActivityIndicator là một component có sẵn của React Native dùng để hiển thị biểu tượng tải (loading spinner).

Nó thường được dùng khi ứng dụng đang xử lý dữ liệu (gọi API, tải file, xử lý tác vụ nặng…) để thông báo cho người dùng rằng hệ thống đang bận.

Hoạt động được trên cả Android và iOS.