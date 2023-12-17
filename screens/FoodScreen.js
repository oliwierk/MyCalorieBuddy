import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput } from "react-native";
import {
	collection,
	query,
	where,
	onSnapshot,
	limit,
} from "firebase/firestore";
import { db } from "../FirebaseConfig";
import NavbarFilled from "../components/NavbarFilled";
import tw from "twrnc";

export default function FoodScreen() {
	const [initialFood, setInitialFood] = useState([]);
	const [filteredFood, setFilteredFood] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");
	const [searchCache, setSearchCache] = useState({});

	useEffect(() => {
		// Początkowe ładowanie kilku produktów
		const initialQuery = query(collection(db, "products"), limit(5));
		const unsubscribe = onSnapshot(initialQuery, snapshot => {
			const initialData = snapshot.docs.map(doc => ({
				...doc.data(),
				id: doc.id,
			}));
			setInitialFood(initialData);
			setFilteredFood(initialData);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const delayDebounce = setTimeout(() => {
			if (search.trim() === "") {
				setFilteredFood(initialFood);
				return;
			}
			if (searchCache[search]) {
				setFilteredFood(searchCache[search]);
			} else {
				// Wyszukiwanie na żądanie
				const searchQuery = query(
					collection(db, "products"),
					where("name", ">=", search.toLowerCase()),
					where("name", "<=", search.toLowerCase() + "\uf8ff"),
					limit(10)
				);
				onSnapshot(searchQuery, snapshot => {
					const searchData = snapshot.docs.map(doc => ({
						...doc.data(),
						id: doc.id,
					}));
					setSearchCache({ ...searchCache, [search]: searchData });
					setFilteredFood(searchData);
				});
			}
		}, 1000); // Debouncing

		return () => clearTimeout(delayDebounce);
	}, [search, initialFood, searchCache]);

	const capitalizeFirstLetter = string =>
		string
			.split(" ")
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");

	const renderItem = ({ item }) => (
		<View style={tw`p-4 border-b border-gray-200`}>
			<Text style={tw`text-lg text-white`}>
				{capitalizeFirstLetter(item.name)}
			</Text>
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
