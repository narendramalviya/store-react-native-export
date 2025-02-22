import React from "react";
import { View, ScrollView, Image, StyleSheet, Dimensions } from "react-native";
import { Portal, Dialog, Appbar, Title, Paragraph, Chip, Divider, IconButton, Button, Card } from "react-native-paper";
import { useTheme } from "react-native-paper";

const { width } = Dimensions.get("window");

const ProductView = ({ selectedProduct, setSelectedProduct, toggleFavorite, addToCart, favorites }) => {
	const theme = useTheme();

	return (
		<Portal>
			<Dialog visible={selectedProduct !== null} onDismiss={() => setSelectedProduct(null)} style={styles.productViewDialog}>
				{selectedProduct && (
					<ScrollView>
						<Appbar.Header style={styles.productViewHeader}>
							<Appbar.BackAction onPress={() => setSelectedProduct(null)} />
							<Appbar.Content title="Product Details" />
							<Appbar.Action icon="share" onPress={() => {}} />
							<Appbar.Action
								icon={favorites.includes(selectedProduct.id) ? "heart" : "heart-outline"}
								onPress={() => toggleFavorite(selectedProduct.id)}
							/>
						</Appbar.Header>

						<Image source={{ uri: selectedProduct.image }} style={styles.productViewImage} />

						<View style={styles.productViewInfo}>
							<Title style={styles.productViewBrand}>{selectedProduct.brand}</Title>
							<Title style={styles.productViewName}>{selectedProduct.name}</Title>

							<View style={styles.productViewPricing}>
								<Paragraph style={styles.productViewPrice}>₹{selectedProduct.price}</Paragraph>
								<Paragraph style={styles.productViewOriginalPrice}>₹{selectedProduct.originalPrice}</Paragraph>
								<Chip mode="outlined" style={styles.productViewDiscount}>
									{selectedProduct.discount}
								</Chip>
							</View>

							<Chip icon="star" style={styles.productViewRating}>
								{selectedProduct.rating} | {selectedProduct.reviews} reviews
							</Chip>

							<Divider style={styles.divider} />

							<Title style={styles.sectionTitle}>Description</Title>
							<Paragraph style={styles.productViewDescription}>{selectedProduct.description}</Paragraph>

							<Title style={styles.sectionTitle}>Details</Title>
							{selectedProduct.details.map((detail, index) => (
								<View key={index} style={styles.detailItem}>
									<IconButton icon="check" size={20} iconColor={theme.colors.primary} />
									<Paragraph style={styles.detailText}>{detail}</Paragraph>
								</View>
							))}
						</View>
					</ScrollView>
				)}
				<Card.Actions style={styles.productViewActions}>
					<Button icon="heart" mode="outlined" onPress={() => toggleFavorite(selectedProduct.id)} style={styles.wishlistButton}>
						Wishlist
					</Button>
					<Button icon="cart" mode="contained" onPress={() => addToCart(selectedProduct)} style={styles.addToCartButton}>
						Add to Cart
					</Button>
				</Card.Actions>
			</Dialog>
		</Portal>
	);
};

const styles = StyleSheet.create({
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
});

export default ProductView;
