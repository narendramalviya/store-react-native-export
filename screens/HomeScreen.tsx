import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	Dimensions,
	Platform,
	SafeAreaView,
	StatusBar,
} from "react-native";
import { Provider as PaperProvider, MD3LightTheme, Button, Appbar, Badge, BottomNavigation, Snackbar } from "react-native-paper";
import { fetchProducts, fetchCategories } from "../api/sanity";
import ProductList from "../components/ProductList";
import CategoryList from "../components/CategoryList";
import AdminPanel from "../components/AdminPanel";
import ProductView from "../components/ProductView";
import LoginScreen from "../components/LoginScreen";

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

const initialProducts = [
	{
		id: "1",
		name: "Premium Cotton T-Shirt",
		brand: "Fashion Brand",
		price: 599,
		originalPrice: 999,
		discount: "40% OFF",
		image: "https://api.a0.dev/assets/image?text=premium%20white%20tshirt%20product%20photography%20minimalist&aspect=4:5",
		rating: 4.2,
		reviews: 128,
		description:
			"Premium cotton t-shirt with a comfortable fit and breathable fabric. Perfect for everyday wear.",
		details: ["100% Cotton", "Regular fit", "Machine wash", "Imported"],
	},
	{
		id: "2",
		name: "Vintage Denim Jacket",
		brand: "Denim Co",
		price: 1999,
		originalPrice: 2999,
		discount: "33% OFF",
		image: "https://api.a0.dev/assets/image?text=stylish%20vintage%20denim%20jacket%20product%20photography%20minimalist&aspect=4:5",
		rating: 4.5,
		reviews: 256,
		description:
			"Classic denim jacket with a vintage wash. Features multiple pockets and adjustable cuffs.",
		details: [
			"100% Cotton Denim",
			"Regular fit",
			"Button closure",
			"Imported",
		],
	},
];

export default function HomeScreen() {
	const [products, setProducts] = useState(initialProducts);
	const [categories, setCategories] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [showAdmin, setShowAdmin] = useState(false);
	const [favorites, setFavorites] = useState([]);
	const [cart, setCart] = useState([]);
	const [snackbarVisible, setSnackbarVisible] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [index, setIndex] = useState(0);
	const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

	useEffect(() => {
		const loadData = async () => {
			const categoriesData = await fetchCategories();
			setCategories(categoriesData);
		};
		loadData();
	}, []);

	const showSnackbar = (message) => {
		setSnackbarMessage(message);
		setSnackbarVisible(true);
	};

	const toggleFavorite = (productId) => {
		setFavorites((prev) =>
			prev.includes(productId)
				? prev.filter((id) => id !== productId)
				: [...prev, productId]
		);
		showSnackbar(
			favorites.includes(productId)
				? "Removed from wishlist"
				: "Added to wishlist"
		);
	};

	const addToCart = (product) => {
		setCart([...cart, product]);
		showSnackbar("Added to cart successfully!");
	};

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

	if (0 && !isAdminLoggedIn) {
		return <LoginScreen setIsAdminLoggedIn={setIsAdminLoggedIn} />;
	}

	return (
		<PaperProvider theme={theme}>
			<SafeAreaView style={styles.container}>
				<StatusBar
					backgroundColor={theme.colors.surface}
					barStyle="dark-content"
				/>
				<Appbar.Header style={styles.header}>
					<Appbar.Content title="Fashion Store" />
					<Appbar.Action
						icon="cog"
						onPress={() => setShowAdmin(!showAdmin)}
					/>
					<Appbar.Action icon="magnify" onPress={() => {}} />
					<View style={styles.cartContainer}>
						<Appbar.Action icon="cart" onPress={() => {}} />
						{cart.length > 0 && (
							<Badge style={styles.cartBadge}>
								{cart.length}
							</Badge>
						)}
					</View>
				</Appbar.Header>

				<ScrollView showsVerticalScrollIndicator={false}>
					<CategoryList categories={categories} />
					{showAdmin && <AdminPanel products={products} setProducts={setProducts} />}
					<ProductList products={products} toggleFavorite={toggleFavorite} addToCart={addToCart} favorites={favorites} setSelectedProduct={setSelectedProduct} />
				</ScrollView>

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

				<ProductView selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} toggleFavorite={toggleFavorite} addToCart={addToCart} favorites={favorites} />

				<Snackbar
					visible={snackbarVisible}
					onDismiss={() => setSnackbarVisible(false)}
					duration={2000}
					style={styles.snackbar}
				>
					{snackbarMessage}
				</Snackbar>
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
	bottomNav: {
		backgroundColor: "white",
		borderTopWidth: 1,
		borderTopColor: "#eee",
	},
	cartContainer: {
		position: "relative",
	},
	cartBadge: {
		position: "absolute",
		top: 4,
		right: 4,
	},
	snackbar: {
		margin: 16,
	},
});
