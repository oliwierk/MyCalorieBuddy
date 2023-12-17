import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput } from "react-native";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import NavbarFilled from "../components/NavbarFilled";
import tw from "twrnc";

export default function FoodScreen() {
	const [allFood, setAllFood] = useState([]);
	const [filteredFood, setFilteredFood] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const foodQuery = query(collection(db, "products"));
		const unsubscribe = onSnapshot(foodQuery, snapshot => {
			const foodData = snapshot.docs.map(doc => ({
				...doc.data(),
				id: doc.id,
			}));
			setAllFood(foodData);
			setFilteredFood(foodData);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const handler = setTimeout(() => {
			const filteredData = allFood.filter(item =>
				item.name.toLowerCase().includes(search.toLowerCase())
			);
			setFilteredFood(filteredData);
		}, 500); // Opóźnienie 500ms

		return () => {
			clearTimeout(handler);
		};
	}, [search, allFood]);

	const renderItem = ({ item }) => (
		<View style={tw`p-4 border-b border-gray-200`}>
			<Text style={tw`text-lg text-white`}>{item.name}</Text>
			<Text style={tw`text-sm text-gray-400`}>Kalorie: {item.calories}</Text>
			<Text style={tw`text-sm text-gray-400`}>Węglowodany: {item.carbs}</Text>
			<Text style={tw`text-sm text-gray-400`}>Tłuszcze: {item.fats}</Text>
			<Text style={tw`text-sm text-gray-400`}>Białko: {item.protein}</Text>
		</View>
	);

	return (
		<View style={tw`h-full w-full bg-gray-900 flex flex-col gap-2`}>
			<NavbarFilled />
			<TextInput
				placeholder='Wyszukaj jedzenie...'
				onChangeText={text => setSearch(text)}
				style={tw`text-lg bg-white p-2`}
			/>
			<FlatList
				data={filteredFood}
				renderItem={renderItem}
				keyExtractor={item => item.id}
			/>
		</View>
	);
}
