import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Switch } from 'react-native'
import React, { useState } from 'react'
import HeaderComp from '../../../../Components/HeaderCompo'

const Notification = ({ navigation }) => {
  const [notificationText, setNotificationText] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', selected: false, type: 'custom' },
    { id: 2, name: 'Jane Smith', selected: false, type: 'switch' },
    { id: 3, name: 'Robert Johnson', selected: false, type: 'custom' },
    { id: 4, name: 'Emily Davis', selected: false, type: 'switch' },
    { id: 5, name: 'Michael Wilson', selected: false, type: 'custom' },
  ]);

  const toggleUserSelection = (userId) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, selected: !user.selected } : user
    ));
  };

  const handleSubmit = () => {
    const selectedUsers = users.filter(user => user.selected);
    console.log('Notification Text:', notificationText);
    console.log('Selected Users:', selectedUsers);
    alert(`This feature is comming soon`);
  };

  const renderCheckbox = (user) => {

    return (
      <TouchableOpacity
        style={[
          styles.customCheckbox,
          user.selected && styles.customCheckboxSelected
        ]}
        onPress={() => toggleUserSelection(user.id)}
      >
        {user.selected && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <HeaderComp
        screenName='Notification'
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Compose Notification</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your notification message"
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
          value={notificationText}
          onChangeText={setNotificationText}
        />

        <Text style={styles.subtitle}>Select Recipients</Text>

        <ScrollView style={styles.usersList}>
          {users.map(user => (
            <View key={user.id} style={styles.userItem}>
              {renderCheckbox(user)}
              <Text style={styles.userName} onPress={() => toggleUserSelection(user.id)}>{user.name}</Text>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Send Notification</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 100,
    marginBottom: 10,
  },
  usersList: {
    flex: 1,
    marginBottom: 15,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userName: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
    color: "#333",
  },
  checkboxType: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 5,
  },
  customCheckbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#1E90FF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  customCheckboxSelected: {
    backgroundColor: '#1E90FF',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});