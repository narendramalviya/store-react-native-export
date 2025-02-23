import React from "react";
import { View, StyleSheet, ScrollView, Dimensions, SafeAreaView, StatusBar, Platform } from "react-native";
import { Provider as PaperProvider, MD3LightTheme, Appbar, Snackbar } from "react-native-paper";
import ProductView from "../components/ProductView";

const { width } = Dimensions.get("window");

const theme = {
	...MD3LightTheme,
	colors: {
		...MD3LightTheme.colors,
		primary: "#ff3f6c",
		secondary: "#ff3f6c",
		background: "#f5f5f5",
		surface: "#ffffff",
		text: "#333333",
		placeholder: "#999999",
		backdrop: "rgba(0, 0, 0, 0.5)",
	},
};

export default function ProductViewScreen({ route, navigation }) {
	const { selectedProduct, toggleFavorite, addToCart, favorites } = route.params;

	return (
		<PaperProvider theme={theme}>
			<SafeAreaView style={styles.container}>
				<StatusBar backgroundColor={theme.colors.surface} barStyle="dark-content" />
				<Appbar.Header style={styles.header}>
					<Appbar.BackAction onPress={() => navigation.goBack()} />
					<Appbar.Content title="Product Details" />
				</Appbar.Header>
				<ScrollView contentContainerStyle={styles.scrollViewContent}>
					<ProductView
						selectedProduct={selectedProduct}
						setSelectedProduct={() => {}}
						toggleFavorite={toggleFavorite}
						addToCart={addToCart}
						favorites={favorites}
					/>
				</ScrollView>
			</SafeAreaView>
		</PaperProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
	header: {
		elevation: 4,
		backgroundColor: "white",
	},
	scrollViewContent: {
		flexGrow: 1,
	},
});
