import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import tw from "twrnc";

export default function MealBox({ mealName }) {
	return (
		<View
			style={tw`h-18 w-full flex flex-row justify-between items-center px-4 `}
		>
			<View style={tw``}>
				<Text style={tw`font-bold text-xl text-slate-50`}>{mealName}</Text>
				<Text style={tw`text-slate-50`}>x kcal</Text>
			</View>
			<View>
				<TouchableOpacity>
					<Text style={tw`text-lg text-slate-50`}>Dodaj</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
