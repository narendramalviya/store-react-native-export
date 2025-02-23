import React, { useState } from "react";
import { View, ScrollView, Image, StyleSheet, Dimensions } from "react-native";
import { Portal, Dialog, Button, TextInput as PaperInput, Card, IconButton, Title, Paragraph, Chip } from "react-native-paper";
import { initialProducts } from "../api/sanity";
const AdminPanel = ({ products, setProducts }) => {
	const [showAddProduct, setShowAddProduct] = useState(false);
	const [newProduct, setNewProduct] = useState({
		name: "",
		brand: "",
		price: "",
		originalPrice: "",
		description: "",
		image: "",
	});

	const pickImage = async () => {
		// Implement image picker logic here
	};

	const handleAddProduct = () => {
		if (!newProduct.name || !newProduct.price || !newProduct.brand) {
			// Show error message
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
	};

	const handleDeleteProduct = (productId) => {
		setProducts(products.filter((product) => product.id !== productId));
	};

	return (
		<Portal>
			<Dialog visible={showAddProduct} onDismiss={() => setShowAddProduct(false)} style={styles.adminDialog}>
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

			<View style={styles.productsGrid}>
				{products.map((item) => (
					<Card key={item.id} style={styles.productCard}>
						<View style={styles.imageContainer}>
							<Card.Cover source={{ uri: item.image }} style={styles.productImage} />
							<IconButton
								icon="delete"
								iconColor="#ff3f6c"
								size={24}
								style={styles.deleteButton}
								onPress={() => handleDeleteProduct(item.id)}
							/>
						</View>
						<Card.Content style={styles.productInfo}>
							<Title style={styles.brandName}>{item.brand}</Title>
							<Paragraph style={styles.productName} numberOfLines={1}>
								{item.name}
							</Paragraph>
							<View style={styles.priceContainer}>
								<Paragraph style={styles.price}>₹{item.price}</Paragraph>
								<Paragraph style={styles.originalPrice}>₹{item.originalPrice}</Paragraph>
								<Chip mode="outlined" style={styles.discountChip} textStyle={styles.discountText}>
									{item.discount}
								</Chip>
							</View>
							<View style={styles.ratingContainer}>
								<Chip icon="star" style={styles.ratingChip} textStyle={styles.ratingText}>
									{item.rating} | {item.reviews} reviews
								</Chip>
							</View>
						</Card.Content>
					</Card>
				))}
			</View>
		</Portal>
	);
};

const styles = StyleSheet.create({
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
	productsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		padding: 8,
		justifyContent: "space-between",
	},
	productCard: {
		width: (Dimensions.get("window").width - 24) / 2 - 8,
		marginBottom: 16,
		elevation: 2,
	},
	productImage: {
		height: ((Dimensions.get("window").width - 24) / 2 - 8) * 1.25,
	},
	deleteButton: {
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
});

export default AdminPanel;