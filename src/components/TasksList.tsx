import React from 'react';
import { FlatList, Image, TouchableOpacity, View, Text, StyleSheet, FlatListProps } from 'react-native';
import { TaskItem } from './TaskItem';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  handleEditTask: (taskId: number, taskNewTitle: string) => void;
}

export function TasksList({ tasks, toggleTaskDone, removeTask, handleEditTask }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
         <TaskItem 
          item={item} 
          index={index} 
          toggleTaskDone={toggleTaskDone} 
          removeTask={removeTask} 
          handleEditTask={handleEditTask}
        />
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}

