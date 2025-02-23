import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Card, Title, Paragraph, IconButton, Chip, Button, useTheme } from "react-native-paper";
import { initialProducts } from "../api/sanity";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 24) / 2 - 8;

const ProductList = ({ products, toggleFavorite, addToCart, favorites, setSelectedProduct }) => {
	const theme = useTheme();
	const navigation = useNavigation();
	return (
		<View style={styles.productsGrid}>
			{products.map((item) => (
				<Card key={item.id} style={styles.productCard}>
					<View style={styles.imageContainer} onPress={() => navigation.navigate("ProductViewScreen")}>
						<Card.Cover source={{ uri: item.image }} style={styles.productImage} />
						<IconButton
							icon={favorites.includes(item.id) ? "heart" : "heart-outline"}
							iconColor={favorites.includes(item.id) ? theme.colors.primary : "#000"}
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
					{/* <Card.Actions style={styles.cardActions}>
						<Button mode="contained" onPress={() => setSelectedProduct(item)} style={styles.viewButton} labelStyle={styles.viewButtonLabel}>
							View Details
						</Button>
					</Card.Actions> */}
				</Card>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
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
});

export default ProductList;
