import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import tw from "twrnc";

export default function NavDay({ day }) {
	return (
		<TouchableOpacity>
			<Text
				style={tw`text-base mb-4 px-2 rounded-xl border-slate-50 text-slate-50`}
			>
				{day}
			</Text>
		</TouchableOpacity>
	);
}
