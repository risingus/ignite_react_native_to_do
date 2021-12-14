import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'
import { ItemWrapper } from './ItemWrapper';
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'


interface TaskItemProps {
  item: {
    id: number;
    title: string;
    done: boolean;
  },
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  handleEditTask: (taskId: number, taskNewTitle: string) => void;
}


export function TaskItem({item, index, toggleTaskDone, removeTask, handleEditTask} : TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState(item.title);
  const textInputRef = useRef<TextInput>(null);


  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTaskTitle(item.title)
    setIsEditing(false)
  }

  function handleSubmitEditing() {
    handleEditTask(item.id, taskTitle)
    setIsEditing(false)
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
        return
      }
      textInputRef.current.blur();
    }
  }, [isEditing])


  return (
    <ItemWrapper index={index}>
    <View>
      <TouchableOpacity
        testID={`button-${index}`}
        activeOpacity={0.7}
        style={styles.taskButton}
        onPress={() => toggleTaskDone(item.id)}
      >
        <View 
          testID={`marker-${index}`}
          style={item.done ? styles.taskMarkerDone : styles.taskMarker}
        >
          { item.done && (
            <Icon 
              name="check"
              size={12}
              color="#FFF"
            />
          )}
        </View>

        <TextInput 
          style={item.done ? styles.taskTextDone : styles.taskText}
          value={taskTitle}
          onChangeText={setTaskTitle}
          editable
          onSubmitEditing={handleSubmitEditing}
          ref={textInputRef}
        />
      </TouchableOpacity>
    </View>

    <View
      style={styles.buttonContainer}
    >

      {
        isEditing ? (
            <TouchableOpacity
              testID={`x-${index}`}
              onPress={() => handleCancelEditing()}
              style={{paddingHorizontal: 10}}
            >
              <Icon 
                name="x"
                size={20}
                color="#B2B2B2"
              />
            </TouchableOpacity>
        ) : (

          <TouchableOpacity
            testID={`edit-${index}`}
            onPress={() => handleStartEditing()}
            style={{paddingHorizontal: 10}}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )
      }

      <TouchableOpacity
        testID={`trash-${index}`}
        style={isEditing ? {opacity: 0.2, paddingHorizontal: 10} : {opacity: 1, paddingHorizontal: 10}}
        onPress={() => removeTask(item.id)}
        disabled={isEditing}
      >
        <Image source={trashIcon} />
      </TouchableOpacity>

    </View>

   
  </ItemWrapper>
  )
}



const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginHorizontal: 20,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})