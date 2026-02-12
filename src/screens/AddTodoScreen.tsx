import React, { useState } from 'react'
import { Button, TextInput, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { GRAY_SHADE } from '../shared/component/Colors'
import { addTodo } from '../store/ToDoSlice'

const AddTodoScreen = ({ navigation }: any) => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Enter TODO"
                value={text}
                placeholderTextColor={GRAY_SHADE}
                onChangeText={setText}
                style={{ borderWidth: 1, marginBottom: 10 }}
            />
            <Button
                title="Add"
                onPress={() => {
                    dispatch(addTodo(text))
                    navigation.goBack()
                }}
            />
        </View>
    )
}

export default AddTodoScreen
