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
