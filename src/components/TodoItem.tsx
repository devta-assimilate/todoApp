import React, { memo, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'

interface Todo {
    id: number
    title: string
    completed: boolean
    created_at: string
    updated_at: string
}

interface Props {
    todo: Todo
    onToggle: () => void
    onDelete: () => void
    onEdit: (title: string) => void
}

export default memo(function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
    const [editing, setEditing] = useState(false)
    const [text, setText] = useState(todo.title)

    return (
        <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1 }}>
            <TouchableOpacity onPress={onToggle}>
                <Text style={{ marginRight: 10 }}>
                    {todo.completed ? '✅' : '⬜'}
                </Text>
            </TouchableOpacity>

            {editing ? (
                <TextInput
                    value={text}
                    onChangeText={setText}
                    onSubmitEditing={() => {
                        onEdit(text)
                        setEditing(false)
                    }}
                    style={{ flex: 1, borderBottomWidth: 0.8 }}
                />
            ) : (
                <Text style={{ flex: 1, textDecorationLine: todo.completed ? 'line-through' : 'none' }}>
                    {todo.title}
                </Text>
            )}

            <TouchableOpacity onPress={() => setEditing(true)}>
                <Text>✏️</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onDelete}>
                <Text>🗑️</Text>
            </TouchableOpacity>
        </View>
    )
})
