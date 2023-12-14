import { View, Text } from "react-native";
import tw from "twrnc";

export default function Home() {
	return (
		<View
			style={tw`h-1/10 w-full rounded-t-xl flex flex-row items-center absolute bottom-0 left-0 bg-slate-800 px-4`}
		>
			<Text style={tw`text-base text-slate-50`}>Kcal x</Text>
		</View>
	);
}
