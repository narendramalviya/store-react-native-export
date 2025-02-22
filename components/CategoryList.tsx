import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Surface, Avatar, Paragraph } from "react-native-paper";

const CategoryList = ({ categories }) => {
	return (
		<View style={styles.categoriesContainer}>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{categories.map((item) => (
					<Surface key={item.id} style={styles.categoryItem}>
						<Avatar.Text size={48} label={item.icon} style={styles.categoryIcon} />
						<Paragraph style={styles.categoryName}>{item.name}</Paragraph>
					</Surface>
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
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
});

export default CategoryList;
