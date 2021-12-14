import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle === null) return
    if (newTaskTitle === '') return
    if (newTaskTitle === undefined) return
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks([...tasks, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const selectedTask = tasks.find((task) => task.id === id)
    if (!selectedTask) return
    const clonedTasks = JSON.parse(JSON.stringify(tasks));
    const selectedTaskClone = clonedTasks.find((task: Task) => task.id === id)
    const indexTask = clonedTasks.indexOf(selectedTaskClone)
    clonedTasks[indexTask].done = !clonedTasks[indexTask].done
    setTasks(clonedTasks)
  }

  function handleRemoveTask(id: number) {
    const taskToRemove = tasks.find((task) => task.id === id)
    if (!taskToRemove) return
    const newTaskList = tasks.filter((task) => task.id !== id)

    setTasks(newTaskList)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})