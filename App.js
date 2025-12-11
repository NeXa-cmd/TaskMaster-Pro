import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TasksStack = createNativeStackNavigator();
const TaskItem = ({ title, completed, onToggle }) => {
  return (
    <View style={styles.taskItem}>
      <TouchableOpacity 
        style={[styles.checkbox, completed && styles.checkboxChecked]}
        onPress={onToggle}
      >
        {completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
      <Text style={[styles.taskTitle, completed && styles.taskTitleCompleted]}>
        {title}
      </Text>
    </View>
  );
};

const TaskCard = ({ task, onSeeDetails }) => {
  return (
    <View style={styles.taskCard}>
      <Text style={styles.cardTitle}>{task.title}</Text>
      <Text style={styles.cardDescription}>{task.description}</Text>
      <TouchableOpacity 
        style={styles.detailsButton}
        onPress={() => onSeeDetails(task.id)}
      >
        <Text style={styles.detailsButtonText}>See Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const UserProfile = ({ userId, username }) => {
  return (
    <View style={styles.userProfile}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{username.charAt(0).toUpperCase()}</Text>
      </View>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.userId}>User ID: {userId}</Text>
    </View>
  );
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const fakeUser = {
      userId: 101,
      role: 'Admin',
      username: email.split('@')[0] || 'User',
      email: email
    };

    Alert.alert('Success', 'Login successful!', [
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate('MainApp', { user: fakeUser });
        }
      }
    ]);
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginTitle}>TaskMaster Pro</Text>
      <Text style={styles.loginSubtitle}>Please sign in to continue</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize={'none'}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Connect</Text>
      </TouchableOpacity>
    </View>
  );
};

const TasksScreen = ({ navigation, route }) => {
  const user = route.params?.user;
  const [tasks] = useState([
    {
      id: 1,
      title: 'Complete React Native Assignment',
      description: 'Finish the TaskMaster Pro app for TP 7',
      details: 'This assignment requires implementing navigation, components, and basic state management using React Native and Expo.',
      completed: false
    },
    {
      id: 2,
      title: 'Study for Exam',
      description: 'Prepare for the mobile development exam',
      details: 'Review React Native concepts, navigation patterns, and component lifecycle methods.',
      completed: true
    },
    {
      id: 3,
      title: 'Project Presentation',
      description: 'Prepare slides for final project demo',
      details: 'Create a comprehensive presentation showing the app features and explain the code structure.',
      completed: false
    }
  ]);

  const handleSeeDetails = (taskId) => {
    navigation.navigate('TaskDetails', { 
      taskId: taskId,
      user: user
    });
  };

  return (
    <View style={styles.tasksContainer}>
      <Text style={styles.screenTitle}>My Tasks</Text>
      <Text style={styles.welcomeText}>Welcome, {user?.username}!</Text>
      
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskCard 
            task={item} 
            onSeeDetails={handleSeeDetails}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const TaskDetailsScreen = ({ route, navigation }) => {
  const { taskId, user } = route.params;
  const tasks = [
    {
      id: 1,
      title: 'Complete React Native Assignment',
      description: 'Finish the TaskMaster Pro app for TP 7',
      details: 'This assignment requires implementing navigation, components, and basic state management using React Native and Expo.',
      completed: false,
      dueDate: '2025-12-15',
      priority: 'High'
    },
    {
      id: 2,
      title: 'Study for Exam',
      description: 'Prepare for the mobile development exam',
      details: 'Review React Native concepts, navigation patterns, and component lifecycle methods.',
      completed: true,
      dueDate: '2025-12-10',
      priority: 'Medium'
    },
    {
      id: 3,
      title: 'Project Presentation',
      description: 'Prepare slides for final project demo',
      details: 'Create a comprehensive presentation showing the app features and explain the code structure.',
      completed: false,
      dueDate: '2025-12-20',
      priority: 'High'
    }
  ];

  const task = tasks.find(t => t.id === taskId);
  const [completed, setCompleted] = useState(task?.completed || false);

  if (!task) {
    return (
      <View style={styles.detailsContainer}>
        <Text>Task not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.detailsContainer}>
      <Text style={styles.detailsTitle}>{task.title}</Text>
      
      <View style={styles.detailsSection}>
        <Text style={styles.sectionLabel}>Description:</Text>
        <Text style={styles.sectionText}>{task.description}</Text>
      </View>

      <View style={styles.detailsSection}>
        <Text style={styles.sectionLabel}>Details:</Text>
        <Text style={styles.sectionText}>{task.details}</Text>
      </View>

      <View style={styles.detailsSection}>
        <Text style={styles.sectionLabel}>Due Date:</Text>
        <Text style={styles.sectionText}>{task.dueDate}</Text>
      </View>

      <View style={styles.detailsSection}>
        <Text style={styles.sectionLabel}>Priority:</Text>
        <Text style={[styles.sectionText, { color: task.priority === 'High' ? '#e74c3c' : '#f39c12' }]}>
          {task.priority}
        </Text>
      </View>

      <View style={styles.detailsSection}>
        <TaskItem 
          title="Mark as completed"
          completed={completed}
          onToggle={() => setCompleted(!completed)}
        />
      </View>

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back to Tasks</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const ProfileScreen = ({ route }) => {
  const user = route.params?.user;

  return (
    <View style={styles.profileContainer}>
      <Text style={styles.screenTitle}>Profile</Text>
      
      {user ? (
        <UserProfile 
          userId={user.userId}
          username={user.username}
        />
      ) : (
        <Text>No user data available</Text>
      )}

      <View style={styles.profileInfo}>
        <Text style={styles.infoLabel}>Role:</Text>
        <Text style={styles.infoText}>{user?.role}</Text>
        
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoText}>{user?.email}</Text>
      </View>
    </View>
  );
};

const TasksStackNavigator = ({ route }) => {
  const user = route.params?.user;

  return (
    <TasksStack.Navigator>
      <TasksStack.Screen 
        name="TasksList" 
        component={TasksScreen}
        options={{ title: 'Tasks' }}
        initialParams={{ user: user }}
      />
      <TasksStack.Screen 
        name="TaskDetails" 
        component={TaskDetailsScreen}
        options={{ title: 'Task Details' }}
      />
    </TasksStack.Navigator>
  );
};

const MainAppNavigator = ({ route }) => {
  const user = route.params?.user;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tab.Screen 
        name="Tasks" 
        component={TasksStackNavigator}
        initialParams={{ user: user }}
        options={{
          headerShown: false,
          tabBarLabel: 'Tasks',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        initialParams={{ user: user }}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="MainApp" 
          component={MainAppNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#f8f9fa',
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2c3e50',
  },
  loginSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#7f8c8d',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  tasksContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#f8f9fa',
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  welcomeText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#7f8c8d',
  },
  taskCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#2c3e50',
  },
  cardDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 15,
    lineHeight: 20,
  },
  detailsButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskTitle: {
    fontSize: 16,
    color: '#2c3e50',
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#7f8c8d',
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#f8f9fa',
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  detailsSection: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#2c3e50',
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#34495e',
  },
  backButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 30,
  },
  backButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  profileContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#f8f9fa',
  },
  userProfile: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  username: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 5,
    color: '#2c3e50',
  },
  userId: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  profileInfo: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 15,
    color: '#2c3e50',
  },
  infoText: {
    fontSize: 14,
    color: '#34495e',
  },
});
