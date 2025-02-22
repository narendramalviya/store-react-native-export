
  import { NavigationContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import { StyleSheet } from 'react-native';
  import { SafeAreaProvider } from "react-native-safe-area-context"
  import { Toaster } from 'sonner-native';
  import HomeScreen from "./screens/HomeScreen"
import { BottomNavigation } from 'react-native-paper';
import { useState } from 'react';
  
  const Stack = createNativeStackNavigator();
  const routes = [
		{
			key: "home",
			title: "Home",
			focusedIcon: "home",
			unfocusedIcon: "home-outline",
		},
		{
			key: "categories",
			title: "Categories",
			focusedIcon: "grid",
			unfocusedIcon: "grid-outline",
		},
		{
			key: "studio",
			title: "Studio",
			focusedIcon: "camera",
			unfocusedIcon: "camera-outline",
		},
		{
			key: "profile",
			title: "Profile",
			focusedIcon: "account",
			unfocusedIcon: "account-outline",
		},
	];
  function RootStack() {

    return (
      <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddProduct" component={HomeScreen} />
      </Stack.Navigator>
    );
  }
  
  export default function App() {
    const [index, setIndex] = useState(0);
    return (
      <SafeAreaProvider style={styles.container}>
      <Toaster />
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
        <BottomNavigation
					navigationState={{ index, routes }}
					onIndexChange={setIndex}
					renderScene={BottomNavigation.SceneMap({
						home: () => null,
						categories: () => null,
						studio: () => null,
						profile: () => null,
					})}
					barStyle={styles.bottomNav}
				/>
      </SafeAreaProvider>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  });
