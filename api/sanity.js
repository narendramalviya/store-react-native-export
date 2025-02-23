import sanityClient from '@sanity/client';

const client = sanityClient({
	projectId: 'uwe1cs8l',
	dataset: 'production',
	useCdn: true,
});

export const fetchProducts = async () => {
	const query = '*[_type == "product"]';
	const products = await client.fetch(query);
	return products;
};

export const fetchCategories = async () => {
	const query = '*[_type == "category"]';
	const categories = await client.fetch(query);
	return categories;
};


export const initialProducts = [
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