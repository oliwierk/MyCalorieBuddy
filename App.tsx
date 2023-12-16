import React from "react";
import { NativeRouter, Route, Routes } from "react-router-native";
import HomeScreen from "./screens/HomeScreen";
import FoodScreen from "./screens/FoodScreen";

export default function App() {
	return (
		<NativeRouter>
			<Routes>
				<Route exact path='/' element={<HomeScreen />} />
				<Route path='/food' element={<FoodScreen />} />
			</Routes>
		</NativeRouter>
	);
}
