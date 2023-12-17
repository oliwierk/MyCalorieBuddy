import { Text, View, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-native";
import tw from "twrnc";

export default function MealBox({ mealName }) {
	const navigate = useNavigate();

	return (
		<TouchableOpacity
			style={tw`h-18 w-full flex flex-row justify-between items-center px-4`}
		>
			<View>
				<View style={tw`flex-row gap-2`}>
					<Text style={tw`font-bold text-xl text-slate-50`}>{mealName}</Text>
					{/* Do tego rozwiń dodaj funkcjonalnosc rozwijanej listy ktora pokaze dodane juz produkty do tego posilku */}
					<Text style={tw`font-bold text-base text-slate-50`}>Rozwiń</Text>
				</View>
				<View style={tw`flex flex-row gap-11`}>
					{/* To jest łączna ilość makroskładników wszystkich rzeczy dodanych do danego posiłku */}
					<Text style={tw`text-slate-50`}>120 kcal</Text>
					<Text style={tw`text-slate-50`}>10 B</Text>
					<Text style={tw`text-slate-50`}>25 Tł</Text>
					<Text style={tw`text-slate-50`}>30 W</Text>
				</View>
			</View>
			<View>
				<TouchableOpacity
					onPress={() => navigate("/food", { state: { mealName } })}
				>
					<Text style={tw`text-lg text-slate-50`}>Dodaj</Text>
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	);
}
