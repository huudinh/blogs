---
sidebar_position: 7
---

# Xây dựng Bottom Tabs

Sử dụng Bottom Tabs Navigator hiển thị thanh tab ở phía dưới màn hình, cho phép người dùng chuyển đổi giữa các màn hình khác nhau trong ứng dụng. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/FdkMv3DUcHo?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<ToggleTOC />

## I. Mục tiêu

1. Tạo 3 màn hình User Info, User Manager, Settings

2. Cài đặt Bottom Tabs trong component Home

## II. Code Project

```jsx title="1. Tạo file src/screens/user_info/index.js"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const UserInfo = () => {
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
    },
    profile: {
        padding: 20,
        marginVertical: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        marginHorizontal: 20,
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

export default UserInfo;

```

```jsx title="2. Tạo file src/screens/settings/index.js"
import { View, Text, StyleSheet } from 'react-native';

const SettingScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Settings</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default SettingScreen;

```

```jsx title="3. Tạo file src/screens/user_manage/index.js"
import { View, Text, StyleSheet } from 'react-native';

const UserManage = () => {
    return (
        <View style={styles.container}>
            <Text>User Management</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default UserManage;
```

```jsx title="4. Sửa file src/screens/home/index.js"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserInfo from '../user_info';
import SettingScreen from '../settings';
import UserManage from '../user_manage';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
    return (
        <Tab.Navigator                    
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#192f6a',
            }}
        >
            <Tab.Screen 
                options={{
                    tabBarIcon: ({ color })=> <FontAwesome5 name="address-card" size={24} color={ color } />
                }}
                name="User Info" component={UserInfo} 
            />
            <Tab.Screen 
                options={{
                    tabBarIcon: ({ color })=> <FontAwesome5 name="user-cog" size={24} color={ color } />
                }}
                name="User Manage" component={UserManage} 
            />
            <Tab.Screen 
                options={{
                    tabBarIcon: ({ color })=> <FontAwesome5 name="cog" size={24} color={ color } />
                }}
                name="Settings" component={SettingScreen} 
            />
        </Tab.Navigator>
    )
}

export default HomeScreen;
```


## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### 1. Bottom Tabs Navigator trong React Native là gì?

Bottom Tabs Navigator trong React Native là một kiểu điều hướng (navigation) hiển thị thanh tab ở phía dưới màn hình, cho phép người dùng chuyển đổi giữa các màn hình khác nhau trong ứng dụng bằng cách nhấn vào các tab tương ứng. Đây là một phần của thư viện React Navigation rất phổ biến trong việc xây dựng ứng dụng di động bằng React Native

Tài liệu: https://reactnavigation.org/docs/bottom-tab-navigator

### 2. Cách sử dụng Bottom Tabs Navigator?

```bash title="1. Cài đặt thư viện"
npm install @react-navigation/native
npm install @react-navigation/bottom-tabs
```

```jsx title="2. Cách khai báo"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```