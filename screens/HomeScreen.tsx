import React, { useState } from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	Image,
	Dimensions,
	Platform,
	SafeAreaView,
	StatusBar,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import {
	Provider as PaperProvider,
	MD3LightTheme,
	Button,
	Card,
	Title,
	Paragraph,
	TextInput as PaperInput,
	Badge,
	IconButton,
	Surface,
	Avatar,
	Chip,
	Divider,
	Portal,
	Dialog,
	Snackbar,
	BottomNavigation,
	Appbar,
	useTheme,
} from "react-native-paper";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 24) / 2 - 8;

// Sample data
const categories = [
	{ id: "1", name: "Men", icon: "👔" },
	{ id: "2", name: "Women", icon: "👗" },
	{ id: "3", name: "Kids", icon: "🧸" },
	{ id: "4", name: "Sports", icon: "⚽" },
	{ id: "5", name: "Beauty", icon: "💄" },
	{ id: "6", name: "Home", icon: "🏠" },
];

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

export default function FashionStore() {
	const [products, setProducts] = useState(initialProducts);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [showAdmin, setShowAdmin] = useState(false);
	const [showAddProduct, setShowAddProduct] = useState(false);
	const [favorites, setFavorites] = useState([]);
	const [cart, setCart] = useState([]);
	const [selectedSize, setSelectedSize] = useState(null);
	const [snackbarVisible, setSnackbarVisible] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [index, setIndex] = useState(0);
	const [newProduct, setNewProduct] = useState({
		name: "",
		brand: "",
		price: "",
		originalPrice: "",
		description: "",
		image: "",
	});

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
		if (!selectedSize) {
			showSnackbar("Please select a size");
			return;
		}
		setCart([...cart, { ...product, size: selectedSize }]);
		showSnackbar("Added to cart successfully!");
		setSelectedSize(null);
	};

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 5],
			quality: 1,
		});

		if (!result.canceled) {
			setNewProduct({ ...newProduct, image: result.assets[0].uri });
		}
	};

	const handleAddProduct = () => {
		if (!newProduct.name || !newProduct.price || !newProduct.brand) {
			showSnackbar("Please fill in all required fields");
			return;
		}

		const productImage =
			newProduct.image ||
			`https://api.a0.dev/assets/image?text=${encodeURIComponent(
				newProduct.name
			)}%20product%20photography%20minimalist&aspect=4:5`;

		const product = {
			id: Date.now().toString(),
			...newProduct,
			image: productImage,
			price: parseInt(newProduct.price),
			originalPrice: parseInt(newProduct.originalPrice),
			discount: `${Math.round(
				(1 -
					parseInt(newProduct.price) /
						parseInt(newProduct.originalPrice)) *
					100
			)}% OFF`,
			rating: 0,
			reviews: 0,
			details: ["New Product", "Premium Quality"],
		};

		setProducts([...products, product]);
		setNewProduct({
			name: "",
			brand: "",
			price: "",
			originalPrice: "",
			description: "",
			image: "",
		});
		setShowAddProduct(false);
		showSnackbar("Product added successfully!");
	};
	const ProductCard = ({ item }) => (
		<Card style={styles.productCard}>
			<View style={styles.imageContainer}>
				<Card.Cover
					source={{ uri: item.image }}
					style={styles.productImage}
				/>
				<IconButton
					icon={
						favorites.includes(item.id) ? "heart" : "heart-outline"
					}
					iconColor={
						favorites.includes(item.id)
							? theme.colors.primary
							: "#000"
					}
					size={24}
					style={styles.favoriteButton}
					onPress={() => toggleFavorite(item.id)}
				/>
			</View>
			<Card.Content style={styles.productInfo}>
				<Title style={styles.brandName}>{item.brand}</Title>
				<Paragraph style={styles.productName} numberOfLines={1}>
					{item.name}
				</Paragraph>
				<View style={styles.priceContainer}>
					<Paragraph style={styles.price}>₹{item.price}</Paragraph>
					<Paragraph style={styles.originalPrice}>
						₹{item.originalPrice}
					</Paragraph>
					<Chip
						mode="outlined"
						style={styles.discountChip}
						textStyle={styles.discountText}
					>
						{item.discount}
					</Chip>
				</View>
				<View style={styles.ratingContainer}>
					<Chip
						icon="star"
						style={styles.ratingChip}
						textStyle={styles.ratingText}
					>
						{item.rating} | {item.reviews} reviews
					</Chip>
				</View>
			</Card.Content>
			<Card.Actions style={styles.cardActions}>
				<Button
					mode="contained"
					onPress={() => setSelectedProduct(item)}
					style={styles.viewButton}
					labelStyle={styles.viewButtonLabel}
				>
					View Details
				</Button>
			</Card.Actions>
		</Card>
	);

	const ProductView = () => (
		<Portal>
			<Dialog
				visible={selectedProduct !== null}
				onDismiss={() => setSelectedProduct(null)}
				style={styles.productViewDialog}
			>
				{selectedProduct && (
					<ScrollView>
						<Appbar.Header style={styles.productViewHeader}>
							<Appbar.BackAction
								onPress={() => setSelectedProduct(null)}
							/>
							<Appbar.Content title="Product Details" />
							<Appbar.Action icon="share" onPress={() => {}} />
							<Appbar.Action
								icon={
									favorites.includes(selectedProduct.id)
										? "heart"
										: "heart-outline"
								}
								onPress={() =>
									toggleFavorite(selectedProduct.id)
								}
							/>
						</Appbar.Header>

						<Image
							source={{ uri: selectedProduct.image }}
							style={styles.productViewImage}
						/>

						<View style={styles.productViewInfo}>
							<Title style={styles.productViewBrand}>
								{selectedProduct.brand}
							</Title>
							<Title style={styles.productViewName}>
								{selectedProduct.name}
							</Title>

							<View style={styles.productViewPricing}>
								<Paragraph style={styles.productViewPrice}>
									₹{selectedProduct.price}
								</Paragraph>
								<Paragraph
									style={styles.productViewOriginalPrice}
								>
									₹{selectedProduct.originalPrice}
								</Paragraph>
								<Chip
									mode="outlined"
									style={styles.productViewDiscount}
								>
									{selectedProduct.discount}
								</Chip>
							</View>

							<Chip icon="star" style={styles.productViewRating}>
								{selectedProduct.rating} |{" "}
								{selectedProduct.reviews} reviews
							</Chip>

							<Divider style={styles.divider} />

							<Title style={styles.sectionTitle}>
								Description
							</Title>
							<Paragraph style={styles.productViewDescription}>
								{selectedProduct.description}
							</Paragraph>

							<Title style={styles.sectionTitle}>Details</Title>
							{selectedProduct.details.map((detail, index) => (
								<View key={index} style={styles.detailItem}>
									<IconButton
										icon="check"
										size={20}
										iconColor={theme.colors.primary}
									/>
									<Paragraph style={styles.detailText}>
										{detail}
									</Paragraph>
								</View>
							))}

							<Title style={styles.sectionTitle}>
								Select Size
							</Title>
							<View style={styles.sizeContainer}>
								{["S", "M", "L", "XL", "XXL"].map((size) => (
									<Chip
										key={size}
										selected={selectedSize === size}
										onPress={() => setSelectedSize(size)}
										style={styles.sizeChip}
									>
										{size}
									</Chip>
								))}
							</View>
						</View>
					</ScrollView>
				)}
				<Card.Actions style={styles.productViewActions}>
					<Button
						icon="heart"
						mode="outlined"
						onPress={() => toggleFavorite(selectedProduct.id)}
						style={styles.wishlistButton}
					>
						Wishlist
					</Button>
					<Button
						icon="cart"
						mode="contained"
						onPress={() => addToCart(selectedProduct)}
						style={styles.addToCartButton}
					>
						Add to Cart
					</Button>
				</Card.Actions>
			</Dialog>
		</Portal>
	);

	const AdminPanel = () => (
		<Portal>
			<Dialog
				visible={showAddProduct}
				onDismiss={() => setShowAddProduct(false)}
				style={styles.adminDialog}
			>
				<Dialog.Title>Add New Product</Dialog.Title>
				<Dialog.ScrollArea>
					<ScrollView>
						<View style={styles.adminForm}>
							<PaperInput
								label="Product Name"
								value={newProduct.name}
								onChangeText={(text) =>
									setNewProduct({ ...newProduct, name: text })
								}
								style={styles.input}
								mode="outlined"
							/>

							<PaperInput
								label="Brand"
								value={newProduct.brand}
								onChangeText={(text) =>
									setNewProduct({
										...newProduct,
										brand: text,
									})
								}
								style={styles.input}
								mode="outlined"
							/>

							<View style={styles.priceInputs}>
								<PaperInput
									label="Price"
									value={newProduct.price}
									onChangeText={(text) =>
										setNewProduct({
											...newProduct,
											price: text,
										})
									}
									style={[styles.input, { flex: 1 }]}
									mode="outlined"
									keyboardType="numeric"
								/>
								<View style={{ width: 16 }} />
								<PaperInput
									label="Original Price"
									value={newProduct.originalPrice}
									onChangeText={(text) =>
										setNewProduct({
											...newProduct,
											originalPrice: text,
										})
									}
									style={[styles.input, { flex: 1 }]}
									mode="outlined"
									keyboardType="numeric"
								/>
							</View>

							<PaperInput
								label="Description"
								value={newProduct.description}
								onChangeText={(text) =>
									setNewProduct({
										...newProduct,
										description: text,
									})
								}
								style={styles.input}
								mode="outlined"
								multiline
								numberOfLines={4}
							/>

							<Button
								icon="image"
								mode="outlined"
								onPress={pickImage}
								style={styles.imagePickerButton}
							>
								Pick an image
							</Button>

							{newProduct.image && (
								<Image
									source={{ uri: newProduct.image }}
									style={styles.imagePreview}
								/>
							)}
						</View>
					</ScrollView>
				</Dialog.ScrollArea>
				<Dialog.Actions>
					<Button onPress={() => setShowAddProduct(false)}>
						Cancel
					</Button>
					<Button onPress={handleAddProduct} mode="contained">
						Add Product
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);

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
					<View style={styles.categoriesContainer}>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
						>
							{categories.map((item) => (
								<Surface
									key={item.id}
									style={styles.categoryItem}
								>
									<Avatar.Text
										size={48}
										label={item.icon}
										style={styles.categoryIcon}
									/>
									<Paragraph style={styles.categoryName}>
										{item.name}
									</Paragraph>
								</Surface>
							))}
						</ScrollView>
					</View>

					{showAdmin && (
						<Card style={styles.adminActions}>
							<Card.Actions>
								<Button
									icon="plus"
									mode="contained"
									onPress={() => setShowAddProduct(true)}
								>
									Add Product
								</Button>
							</Card.Actions>
						</Card>
					)}

					<View style={styles.productsGrid}>
						{products.map((item) => (
							<ProductCard key={item.id} item={item} />
						))}
					</View>
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

				<ProductView />
				<AdminPanel />

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
	categoriesContainer: {
		padding: 16,
		backgroundColor: "white",
	},
	categoryItem: {
		alignItems: "center",
		marginRight: 16,
		elevation: 2,
		borderRadius: 8,
		padding: 8,
	},
	categoryIcon: {
		marginBottom: 8,
	},
	categoryName: {
		fontSize: 12,
		color: "#666",
	},
	productsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		padding: 8,
		justifyContent: "space-between",
	},
	productCard: {
		width: CARD_WIDTH,
		marginBottom: 16,
		elevation: 2,
	},
	productImage: {
		height: CARD_WIDTH * 1.25,
	},
	favoriteButton: {
		position: "absolute",
		right: 4,
		top: 4,
		backgroundColor: "white",
	},
	productInfo: {
		padding: 8,
	},
	brandName: {
		fontSize: 14,
		color: "#666",
	},
	productName: {
		fontSize: 16,
		marginTop: 4,
	},
	priceContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 8,
	},
	price: {
		fontSize: 16,
		fontWeight: "bold",
	},
	originalPrice: {
		fontSize: 14,
		color: "#666",
		textDecorationLine: "line-through",
		marginLeft: 8,
	},
	discountChip: {
		marginLeft: 8,
		backgroundColor: "#e8f5e9",
	},
	ratingContainer: {
		marginTop: 8,
	},
	ratingChip: {
		backgroundColor: "#fff3e0",
	},
	viewButton: {
		flex: 1,
	},
	productViewDialog: {
		backgroundColor: "white",
		maxHeight: "90%",
	},
	productViewHeader: {
		elevation: 0,
	},
	productViewImage: {
		width: "100%",
		height: width * 1.25,
	},
	productViewInfo: {
		padding: 16,
	},
	productViewBrand: {
		fontSize: 18,
		color: "#666",
	},
	productViewName: {
		fontSize: 24,
		marginTop: 4,
	},
	productViewPricing: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 16,
	},
	productViewPrice: {
		fontSize: 24,
		fontWeight: "bold",
	},
	productViewOriginalPrice: {
		fontSize: 18,
		color: "#666",
		textDecorationLine: "line-through",
		marginLeft: 12,
	},
	productViewDiscount: {
		marginLeft: 12,
		backgroundColor: "#e8f5e9",
	},
	productViewRating: {
		marginTop: 16,
		backgroundColor: "#fff3e0",
	},
	divider: {
		marginVertical: 16,
	},
	sectionTitle: {
		fontSize: 18,
		marginBottom: 8,
	},
	productViewDescription: {
		fontSize: 16,
		lineHeight: 24,
		color: "#666",
	},
	detailItem: {
		flexDirection: "row",
		alignItems: "center",
	},
	detailText: {
		fontSize: 16,
		color: "#666",
	},
	sizeContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
		marginTop: 8,
	},
	sizeChip: {
		margin: 4,
	},
	productViewActions: {
		padding: 16,
		borderTopWidth: 1,
		borderTopColor: "#eee",
	},
	wishlistButton: {
		flex: 1,
		marginRight: 8,
	},
	addToCartButton: {
		flex: 2,
	},
	adminDialog: {
		backgroundColor: "white",
		maxHeight: "90%",
	},
	adminForm: {
		padding: 16,
	},
	input: {
		marginBottom: 16,
	},
	priceInputs: {
		flexDirection: "row",
		marginBottom: 16,
	},
	imagePickerButton: {
		marginBottom: 16,
	},
	imagePreview: {
		width: "100%",
		height: 200,
		resizeMode: "cover",
		borderRadius: 8,
		marginBottom: 16,
	},
	adminActions: {
		margin: 16,
	},
	snackbar: {
		margin: 16,
	},
});
