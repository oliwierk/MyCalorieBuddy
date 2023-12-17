import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	FlatList,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { useNavigate } from "react-router-native";

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
	const [meals, setMeals] = useState({});

	useEffect(() => {
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
		if (search.trim() === "") {
			setFilteredFood([]);
			return;
		}

		const delayDebounce = setTimeout(() => {
			const searchQuery = query(
				collection(db, "products"),
				where("name", ">=", search.toLowerCase()),
				where("name", "<=", search.toLowerCase() + "\uf8ff"),
				limit(10) // Limit można dostosować
			);

			const unsubscribe = onSnapshot(searchQuery, snapshot => {
				const searchData = snapshot.docs.map(doc => ({
					...doc.data(),
					id: doc.id,
				}));
				setFilteredFood(searchData);
			});

			return () => {
				unsubscribe();
			};
		}, 500); // Debouncing

		return () => clearTimeout(delayDebounce);
	}, [search]);

	const navigate = useNavigate();

	const capitalizeFirstLetter = string =>
		string
			.split(" ")
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
	const addToMealBox = (product, quantity) => {
		const updatedProduct = {
			...product,
			quantity: parseFloat(quantity),
			totalCalories: (product.calories / 100) * quantity,
			totalCarbs: (product.carbs / 100) * quantity,
			totalFats: (product.fats / 100) * quantity,
			totalProtein: (product.protein / 100) * quantity,
		};

		setMeals(prevMeals => ({
			...prevMeals,
			[product.id]: updatedProduct,
		}));
	};

	const FoodItem = ({ item, addToMealBox }) => {
		const [quantity, setQuantity] = useState("");

		const handleAdd = () => {
			addToMealBox(item, quantity);
		};
		const navigateToMealBox = () => {
			navigate("/", { state: { meals } });
		};

		return (
			<View style={tw`flex flex-row gap-2`}>
				<TextInput
					style={tw`bg-white p-2 w-1/2 rounded-lg`}
					placeholder='Gramy'
					keyboardType='numeric'
					onChangeText={setQuantity}
					value={quantity}
				/>
				{/* Ten przycisk ma dodawac tany produkt do posilku na ktorym aktualnie jestesmy, oraz przenosic na HomeScreen juz z dodanym jedzeniem ale w ilosci gramow wpisanej w polu text input */}
				<TouchableOpacity onPress={handleAdd}>
					<Text style={tw`text-lg text-slate-50`}>Dodaj</Text>
				</TouchableOpacity>
			</View>
		);
	};

	const renderItem = ({ item }) => (
		<View style={tw`p-4 border-b border-gray-200 gap-1`}>
			<Text style={tw`text-lg text-white`}>
				{capitalizeFirstLetter(item.name)}
			</Text>
			<Text style={tw`text-sm text-gray-400`}>Kalorie: {item.calories}</Text>
			<Text style={tw`text-sm text-gray-400`}>Węglowodany: {item.carbs}</Text>
			<Text style={tw`text-sm text-gray-400`}>Tłuszcze: {item.fats}</Text>
			<Text style={tw`text-sm text-gray-400`}>Białko: {item.protein}</Text>
			<FoodItem item={item} addToMealBox={addToMealBox} />
		</View>
	);

	return (
		<View style={tw`h-full w-full bg-gray-900 flex gap-2`}>
			<NavbarFilled />
			<TextInput
				placeholder='Wyszukaj jedzenie...'
				onChangeText={text => setSearch(text)}
				style={tw`text-lg bg-white p-2 rounded-lg m-4`}
			/>
			<FlatList
				data={filteredFood}
				renderItem={renderItem}
				keyExtractor={item => item.id}
			/>
		</View>
	);
}
