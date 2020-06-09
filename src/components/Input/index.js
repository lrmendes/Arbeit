import React from 'react'
import { TextInput, Text, StyleSheet } from "react-native";

export default function Input({ label = "", ...props  }) {
  return (
		<>
			<Text style={styles.label}>{label}</Text>
			<TextInput style={styles.input} autoCompleteType="off" {...props} />
		</>
	);
}


const styles = StyleSheet.create({
	label: {
    flex: 1,
    color: "#6C6C80",
		fontSize: 14,
		marginTop: 14,
		marginBottom: 8,
	},
	input: {
		height: 64,
		backgroundColor: "#FFF",
		borderRadius: 20,
		marginBottom: 8,
		paddingHorizontal: 24,
		fontSize: 16,
	},
});
