import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import TodoItem from '../components/TodoItem'
import { MainScreenStyle } from '../shared/component/style/MainScreenStyle'
import { AppDispatch, RootState } from '../store/store'
import {
    deleteTodo,
    editTodo,
    loadTodos,
    setFilter,
    setSort,
    toggleTodo
} from '../store/ToDoSlice'

const MainScreen = ({ navigation }: any) => {
    const dispatch = useDispatch<AppDispatch>()
    const [showSortMenu, setShowSortMenu] = useState(false)
    const { todos, filter, sort } = useSelector((state: RootState) => state.todos)

    useEffect(() => {
        dispatch(loadTodos())
    }, [])

    const filteredTodos = useMemo(() => {
        let list = [...todos]
        if (filter === 'active') list = list.filter(t => !t.completed)
        if (filter === 'done') list = list.filter(t => t.completed)
        if (sort === 'recent') list.sort((a, b) => b.created_at.localeCompare(a.created_at))
        if (sort === 'id') list.sort((a, b) => a.id - b.id)
        return list
    }, [todos, filter, sort])

    const completedCount = todos.filter(t => t.completed).length

    const renderItem = useCallback(({ item }: any) => (
        <TodoItem
            todo={item}
            onToggle={() => dispatch(toggleTodo(item.id))}
            onDelete={() => dispatch(deleteTodo(item.id))}
            onEdit={title => dispatch(editTodo({ id: item.id, title }))}
        />
    ), [dispatch])

    const renderButton = (
        label: string,
        value: 'all' | 'active' | 'done',
        onPress: () => void
    ) => {
        const isSelected = filter === value
        return (
            <TouchableOpacity
                style={[
                    MainScreenStyle.buttonStyle,
                    isSelected
                        ? MainScreenStyle.selectedButton
                        : MainScreenStyle.unselectedButton,
                ]}
                onPress={onPress}
            >
                <Text
                    style={[
                        MainScreenStyle.label,
                        { color: isSelected ? '#fff' : '#000' },
                    ]}
                >
                    {label}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={MainScreenStyle.mainBody}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={MainScreenStyle.countBody}>
                    Total: {todos.length} | Completed: {completedCount}
                </Text>
                <TouchableOpacity onPress={() => setShowSortMenu(prev => !prev)}>
                    <Text style={MainScreenStyle.filterIcon}>⚙️</Text>
                </TouchableOpacity>
            </View>
            {showSortMenu && (
                <View style={MainScreenStyle.sortMenu}>
                    <TouchableOpacity
                        style={MainScreenStyle.sortItem}
                        onPress={() => {
                            dispatch(setSort('recent'))
                            setShowSortMenu(false)
                        }}>
                        <Text style={MainScreenStyle.sortText}>
                            Sort by Recent {sort === 'recent' ? '✓' : ''}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={MainScreenStyle.sortItem}
                        onPress={() => {
                            dispatch(setSort('id'))
                            setShowSortMenu(false)
                        }}>
                        <Text style={MainScreenStyle.sortText}>
                            Sort by ID {sort === 'id' ? '✓' : ''}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={MainScreenStyle.buttonBody}>
                {renderButton("All", "all", () => dispatch(setFilter("all")))}
                {renderButton("Active", "active", () => dispatch(setFilter("active")))}
                {renderButton("Done", "done", () => dispatch(setFilter("done")))}
            </View>

            <FlatList
                style={{ marginVertical: 10 }}
                data={filteredTodos}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
            <View style={{ marginBottom: 10 }}>
                <TouchableOpacity style={{ ...MainScreenStyle.buttonStyle, paddingHorizontal: 40, height: 40 }} onPress={() => navigation.navigate('AddTodo')}>
                    <Text style={MainScreenStyle.label}>Add Todo</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MainScreen;
