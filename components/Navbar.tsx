import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import NavDay from "./NavDay";
import tw from "twrnc";

export default function Navbar() {
	return (
		<View
			style={tw`flex flex-col gap-2 justify-center items-center w-full h-1/7 rounded-b-xl bg-indigo-600`}
		>
			<SafeAreaView>
				<Text style={tw`text-xl font-bold text-slate-50`}>MyCalorieBuddy</Text>
			</SafeAreaView>
			<View style={tw`flex flex-row gap-6`}>
				<NavDay day={"P"}></NavDay>
				<NavDay day={"W"}></NavDay>
				<NavDay day={"Ś"}></NavDay>
				<NavDay day={"C"}></NavDay>
				<NavDay day={"P"}></NavDay>
				<NavDay day={"S"}></NavDay>
				<NavDay day={"N"}></NavDay>
			</View>
		</View>
	);
}
