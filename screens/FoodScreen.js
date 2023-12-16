import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db2 } from "../MyCalBuddy";
import NavbarFilled from "../components/NavbarFilled";

import tw from "twrnc";

export default function FoodScreen() {
	const [food, setFood] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const foodQuery = query(
			collection(db2, "products"),
			where("name", "==", "Żurawina suszona - Finesia")
		);
		const unsubscribe = onSnapshot(foodQuery, snapshot => {
			const foodData = snapshot.docs.map(doc => ({
				...doc.data(),
				id: doc.id,
			}));
			setFood(foodData);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const renderItem = ({ item }) => (
		<View>
			<Text style={tw`text-lg text-slate-50`}>{item.name}</Text>
			<Text style={tw`text-lg text-slate-50`}>Kalorie: {item.calories}</Text>
			<Text style={tw`text-lg text-slate-50`}>Węglowodane: {item.carbs}</Text>
			<Text style={tw`text-lg text-slate-50`}>Tłuszcze: {item.fats}</Text>
			<Text style={tw`text-lg text-slate-50`}>Białko: {item.protein}</Text>
		</View>
	);
	if (loading) {
		return <Text>Loading...</Text>;
	}

	return (
		<View style={tw`h-full w-full bg-gray-900 flex flex-col gap-2`}>
			<NavbarFilled />
			<FlatList
				data={food}
				renderItem={renderItem}
				keyExtractor={item => item.id}
			/>
		</View>
	);
}
