import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-native";
import tw from "twrnc";

export default function NavbarFilled() {
	const navigate = useNavigate();

	return (
		<View
			style={tw`flex flex-col gap-2 justify-center items-center w-full h-1/7 relative rounded-b-xl bg-indigo-600`}
		>
			<TouchableOpacity style={tw``} onPress={() => navigate("/")}>
				<Text style={tw`text-lg text-slate-50`}>Wróć</Text>
			</TouchableOpacity>
			<Text style={tw`text-xl font-bold text-slate-50`}>Posiłek I</Text>
		</View>
	);
}
