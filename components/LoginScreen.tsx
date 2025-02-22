import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Title, Snackbar } from "react-native-paper";

const LoginScreen = ({ setIsAdminLoggedIn }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [snackbarVisible, setSnackbarVisible] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");

	const handleLogin = () => {
		if (username === "admin" && password === "12345") {
			setIsAdminLoggedIn(true);
		} else {
			setSnackbarMessage("Invalid credentials");
			setSnackbarVisible(true);
		}
	};

	return (
		<View style={styles.container}>
			<Title style={styles.title}>Admin Login</Title>
			<TextInput
				label="Username"
				value={username}
				onChangeText={setUsername}
				style={styles.input}
			/>
			<TextInput
				label="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
				style={styles.input}
			/>
			<Button mode="contained" onPress={handleLogin} style={styles.button}>
				Login
			</Button>
			<Snackbar
				visible={snackbarVisible}
				onDismiss={() => setSnackbarVisible(false)}
				duration={2000}
			>
				{snackbarMessage}
			</Snackbar>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 16,
		backgroundColor: "#f5f5f5",
	},
	title: {
		textAlign: "center",
		marginBottom: 24,
	},
	input: {
		marginBottom: 16,
	},
	button: {
		marginTop: 16,
	},
});

export default LoginScreen;
