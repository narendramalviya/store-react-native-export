import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Toaster } from "sonner-native";
import HomeScreen from "./screens/HomeScreen";
import ProductViewScreen from "./screens/ProductViewScreen";
import { useState } from "react";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="HomeScreen" component={HomeScreen} />
			<Stack.Screen name="ProductViewScreen" component={ProductViewScreen} />
		</Stack.Navigator>
	);
}

function CategoriesScreen() {
	return (
		<View>
			<Text>CategoriesScreen</Text>
		</View>
	);
}

function StudioScreen() {
	return (
		<View>
			<Text>StudioScreen</Text>
		</View>
	);
}

function ProfileScreen() {
	return (
		<View>
			<Text>ProfileScreen</Text>
		</View>
	);
}

export default function App() {
	return (
		<SafeAreaProvider style={styles.container}>
			<Toaster />
			<NavigationContainer>
				<Tab.Navigator
					screenOptions={{
						headerShown: false,
					}}
				>
					<Tab.Screen name="Home" component={HomeStack} />
					<Tab.Screen name="Categories" component={CategoriesScreen} />
					<Tab.Screen name="Studio" component={StudioScreen} />
					<Tab.Screen name="Profile" component={ProfileScreen} />
				</Tab.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bottomNav: {
		backgroundColor: "white",
		borderTopWidth: 1,
		borderTopColor: "#eee",
	},
});
