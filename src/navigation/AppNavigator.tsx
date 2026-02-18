import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainScreen from '../screens/MainScreen'
import AddTodoScreen from '../screens/AddTodoScreen'

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="AddTodoScreen" component={AddTodoScreen} />
        </Stack.Navigator>
    )
}

export default AppNavigator;
