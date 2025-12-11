# TaskMaster Pro - React Native Application

A simple task management application built with React Native (Expo) and React Navigation v6 for a school assignment (TP 7).

## 🚀 Features

### Module 1: UI Components
- **TaskItem**: Displays a task with a checkbox for completion
- **TaskCard**: Shows task title, description, and "See Details" button
- **UserProfile**: Displays user avatar and information

### Module 2: Authentication
- **LoginScreen**: Simple email/password form with mock authentication
- Simulated login that passes user data through navigation

### Module 3: Navigation Structure

#### Zone 1 (Public)
- **LoginScreen**: Entry point of the application

#### Zone 2 (Private - Main App)
- **Bottom Tab Navigator** with two tabs:
  - **Tasks Tab**: Stack Navigator containing:
    - TasksScreen: List of tasks using TaskCard components
    - TaskDetailsScreen: Detailed view of individual tasks
  - **Profile Tab**: Shows user information using UserProfile component

## 📋 How It Works

### Data Flow (Without Redux/Context)
The application uses simple `useState` and navigation parameters to pass data between screens:

1. **Login → Main App**: User object is passed via `navigation.navigate('MainApp', { user: fakeUser })`
2. **Tasks → Task Details**: Task ID and user data are passed via `navigation.navigate('TaskDetails', { taskId, user })`
3. **Parameter Retrieval**: Data is retrieved using `route.params` in destination screens

### Sample User Credentials
- **Email**: Any valid email format (e.g., `admin@test.com`)
- **Password**: Any non-empty string
- **Mock User Data**:
  ```javascript
  {
    userId: 101,
    role: 'Admin',
    username: 'admin', // extracted from email
    email: 'admin@test.com'
  }
  ```

## 🛠️ Installation & Setup

1. **Prerequisites**:
   - Node.js installed
   - Expo CLI (`npm install -g expo-cli`)
   - Expo Go app on your phone (optional)

2. **Dependencies Already Installed**:
   ```bash
   npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context
   ```

3. **Run the Application**:
   ```bash
   npm start
   ```

4. **Testing Options**:
   - Scan QR code with Expo Go app (iOS/Android)
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Press `w` for Web Browser

## 📱 App Flow

1. **Start**: App opens to LoginScreen
2. **Login**: Enter any email/password and click "Connect"
3. **Main App**: Navigate between Tasks and Profile tabs
4. **Tasks**: View task list, tap "See Details" to view individual tasks
5. **Profile**: View user information passed from login

## 🔧 Code Structure

### Key Components
```javascript
// UI Components (Module 1)
- TaskItem: Checkbox + task title
- TaskCard: Task info + details button  
- UserProfile: Avatar + user details

// Screens (Module 2 & 3)
- LoginScreen: Authentication form
- TasksScreen: Task list with TaskCard components
- TaskDetailsScreen: Individual task details
- ProfileScreen: User profile using UserProfile component

// Navigation
- Stack Navigator: Login → MainApp
- Bottom Tab Navigator: Tasks ↔ Profile
- Tasks Stack Navigator: TasksList → TaskDetails
```

### Parameter Passing Examples

**Login to Main App**:
```javascript
// Sending data
navigation.navigate('MainApp', { user: fakeUser });

// Receiving data
const user = route.params?.user;
```

**Tasks to Task Details**:
```javascript
// Sending data
navigation.navigate('TaskDetails', { taskId: taskId, user: user });

// Receiving data  
const { taskId, user } = route.params;
```

## 📚 Learning Points

This application demonstrates:
- **React Navigation v6**: Stack and Tab navigators
- **Parameter Passing**: Data flow without state management libraries
- **Component Composition**: Reusable UI components
- **Conditional Navigation**: Public vs Private zones
- **Mock Authentication**: Simulated login process
- **State Management**: Simple useState for local state

## 🎯 Assignment Requirements Met

✅ **Module 1**: TaskItem, TaskCard, UserProfile components  
✅ **Module 2**: LoginScreen with mock authentication  
✅ **Module 3**: Conditional navigation with Stack + Tab navigators  
✅ **Beginner Level**: No Redux/Context, simple useState and route params  
✅ **Comments**: Detailed code comments explaining parameter passing  
✅ **StyleSheet**: Standard React Native styling  

## 🔄 Testing the App

1. **Login Screen**: Enter any email/password
2. **Tasks Tab**: Browse tasks, tap "See Details"  
3. **Task Details**: View task info, toggle completion, go back
4. **Profile Tab**: View user data passed from login
5. **Navigation**: Switch between tabs, use stack navigation

The app uses mock data, so all functionality is simulated but fully interactive.# TaskMaster-Pro
