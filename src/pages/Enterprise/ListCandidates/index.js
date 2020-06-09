import React, { useState } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import Constants from "expo-constants";
import {
	View,
	TextInput,
	StyleSheet,
	Text,
	ScrollView,
	TouchableOpacity,
	Alert,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import firebase from "../../../services/firebase.js";

export default function RegisterUser({ navigation, route }) {
	const { offer } = route.params;

	function handleNavigationBack() {
		navigation.goBack();
	}

	return (
		<>
			<View style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity
						style={styles.backButton}
						onPress={handleNavigationBack}
					>
						<Icon name="chevron-left" size={24} color="#8C00CA" />
					</TouchableOpacity>
					<Text style={styles.arbeit}> ARBEIT </Text>
					<TouchableOpacity style={styles.profileButton}>
						<Icon name="user" size={20} color="#8C00CA" />
					</TouchableOpacity>
				</View>

				<ScrollView vertical showsVerticalScrollIndicator={false}>
					<Text style={styles.label}>Offer</Text>
					<Text style={styles.offer}>{offer.jobTitle}</Text>

					<Text style={styles.label}>Description</Text>
					<Text style={styles.description}>{offer.description}</Text>

					<Text style={styles.label}>Candidates</Text>
					<Text style={styles.numCandidates}>{offer.acceptedUsers.length}</Text>

					{offer.acceptedUsers.map((user) => {
						return (
							<TouchableOpacity key={user.email} style={styles.buttonCandidate} onPress={() => navigation.navigate('ViewCandidate',{email: user.email})}>
								<Text style={styles.buttonCandidateText}>{user.name}</Text>
								<View style={styles.buttonIcon}>
									<Text>
										<Icon name="chevron-right" color="#000" size={24} />
									</Text>
								</View>
							</TouchableOpacity>
						);
					})}
				</ScrollView>
				<HideWithKeyboard style={styles.footer}>
					<TouchableOpacity onPress={() => closeOffer()} style={styles.button}>
						<Text style={styles.buttonText}>Close Offer</Text>
					</TouchableOpacity>
				</HideWithKeyboard>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	offer: {
		fontWeight: "bold",
		fontSize: 24,
		marginBottom: 8,
	},

	header: {
		height: 60,
		flexDirection: "row",
		overflow: "hidden",
		alignItems: "center",
		width: "100%",
		marginTop: 8,
	},

	description: {},

	numCandidates: {
		fontWeight: "bold",
		fontSize: 24,
		marginBottom: 16,
		color: "#8C00CA",
	},

	backButton: {
		height: 50,
		width: 50,
		justifyContent: "center",
		alignItems: "flex-start",
	},

	profileButton: {
		height: 50,
		width: 50,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#E0E0E0",
		borderRadius: 30,
	},

	container: {
		flex: 1,
		paddingRight: 32,
		paddingLeft: 32,
		paddingBottom: 8,
		paddingTop: 10 + Constants.statusBarHeight,
	},

	input: {
		height: 60,
		backgroundColor: "#FFF",
		borderRadius: 20,
		marginBottom: 8,
		paddingHorizontal: 24,
		fontSize: 16,
	},

	label: {
		color: "#6C6C80",
		fontSize: 16,
		marginTop: 16,
		marginBottom: 8,
		maxWidth: 260,
		lineHeight: 24,
	},

	title: {
		fontWeight: "bold",
		fontSize: 16,
		marginBottom: 8,
	},

	arbeit: {
		flex: 1,
		justifyContent: "center",
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 34,
		marginLeft: 15,
		color: "#8C00CA",
	},

	location: {
		backgroundColor: "#FFFFFF",
		height: 60,
		flexDirection: "row",
		borderRadius: 20,
		overflow: "hidden",
		alignItems: "center",
		marginTop: 8,
	},

	locationIcon: {
		height: 60,
		width: 60,
		justifyContent: "center",
		alignItems: "center",
	},

	locationText: {
		flex: 1,
		justifyContent: "center",
		textAlign: "center",
		color: "#000",
		fontSize: 16,
	},

	buttonCandidate: {
		borderWidth: 1,
		borderColor: "#E0E0E0",
		marginTop: 8,
		height: 60,
		flexDirection: "row",
		borderRadius: 20,
		overflow: "hidden",
		alignItems: "center",
	},

	buttonCandidateText: {
		flex: 1,
		marginLeft: 16,
		justifyContent: "center",
		fontSize: 18,
		fontWeight: "bold",
	},

	buttonIcon: {
		height: 60,
		width: 60,
		justifyContent: "center",
		alignItems: "center",
	},

	button: {
		marginTop: 8,
		marginHorizontal: 16,
		height: 60,
		flexDirection: "row",
		borderRadius: 20,
		overflow: "hidden",
		alignItems: "center",
	},

	buttonText: {
		flex: 1,
		justifyContent: "center",
		textAlign: "center",
		color: "#FE2845",
		fontSize: 24,
		fontWeight: "bold",
	},

	footer: {},
});
