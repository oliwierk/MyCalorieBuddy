import { View } from "react-native";
import Navbar from "../components/Navbar";
import MealBox from "../components/MealBox";
import Footer from "../components/Footer";
import tw from "twrnc";

export default function Home() {
	return (
		<View style={tw`h-full w-full bg-gray-900 flex flex-col gap-2`}>
			<Navbar />
			<MealBox mealName={"Posiłek I"} />
			<MealBox mealName={"Posiłek II"} />
			<MealBox mealName={"Posiłek III"} />
			<MealBox mealName={"Posiłek IV"} />
			<MealBox mealName={"Posiłek V"} />
			<MealBox mealName={"Posiłek VI"} />
			<Footer></Footer>
		</View>
	);
}
