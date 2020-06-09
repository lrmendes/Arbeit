import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Expanded({ isEnterprise }) {
	return (
		<View style={classes.header}>
			<Text
				style={[classes.title, { color: isEnterprise ? "#8C00CA" : "#FF0077" }]}
			>
				ARBEIT
			</Text>
			<Text style={classes.subtitle}>Need Jobs?</Text>
		</View>
	);
}

const classes = StyleSheet.create({
	header: {
		width: "100%",
		height: 164,
		marginVertical: 24,
		paddingVertical: 24,
		alignItems: "center",
	},
	title: {
		fontSize: 48,
		fontWeight: "bold",
		marginBottom: 10,
		marginTop: 20,
	},
	subtitle: {
		color: "#8F8F8F",
	},
});
