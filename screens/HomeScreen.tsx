import { View } from "react-native";
import Navbar from "../components/Navbar";
import MealBox from "../components/MealBox";
import Footer from "../components/Footer";
import tw from "twrnc";

export default function HomeSreen() {
	return (
		<View style={tw`h-full w-full bg-gray-900 flex flex-col gap-2`}>
			<Navbar />
			<MealBox mealName={"Śniadanie"} />
			<MealBox mealName={"II Śniadanie"} />
			<MealBox mealName={"Lunch"} />
			<MealBox mealName={"Obiad"} />
			<MealBox mealName={"Podwieczorek"} />
			<MealBox mealName={"Kolacja"} />
			<Footer></Footer>
		</View>
	);
}
