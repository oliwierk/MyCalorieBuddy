import { View, Text } from "react-native";
import tw from "twrnc";

export default function Home() {
	return (
		<View
			style={tw`h-1/10 w-full rounded-t-xl flex flex-row items-center absolute bottom-0 left-0 bg-slate-800 px-4`}
		>
			<View style={tw`flex flex-row gap-10`}>
				{/* Tutaj ma być łaczna suma kalorii i makroskładników wszystkich produktówś */}
				<Text style={tw`text-base text-slate-50`}>Kcal 3000</Text>
				<Text style={tw`text-base text-slate-50`}>B 140</Text>
				<Text style={tw`text-base text-slate-50`}>Tł 150</Text>
				<Text style={tw`text-base text-slate-50`}>W 300</Text>
			</View>
		</View>
	);
}
