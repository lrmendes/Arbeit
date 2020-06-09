import React, { useState } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import Constants from "expo-constants";
import {
	View,
	TextInput,
	Linking,
	StyleSheet,
	Text,
	ScrollView,
	TouchableOpacity,
	Alert,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import firebase,{db} from "../../../services/firebase.js";
import { useEffect } from "react";

export default function ViewCandidate({navigation,route}) {
	const {email} = route.params;

	const [user,setUser] = useState(null);

	function handleNavigationBack() {
		navigation.goBack();
	}

	const callUser = () => {
		return Linking.openURL(`whatsapp://send?phone=${user.phone}&text=[ARBEIT] Hello, I wish to talk about the job opportunity in *${firebase.auth().currentUser.displayName}*.`);
	}

	useEffect(() => {
		db.collection('Users').where('email', '==', email).get().then(querySnapshot => {
			querySnapshot.forEach(documentSnapshot => {
				setUser({...documentSnapshot.data(), id: documentSnapshot.id });
			});
		});
	},[]);

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
				{
				user == null
				? null
				: (
				<ScrollView vertical showsVerticalScrollIndicator={false}>
				<Text style={styles.label}>Person</Text>
				<Text style={styles.offer}>{user.fullName}</Text>

				<Text style={styles.label}>Skills</Text>

				{user.skills.split(",").map( skill => {
					return (
						<View key={skill} style={styles.skills}>
							<View style={styles.buttonIcon2}>
								<Icon name="check" color="#000" size={20} />
								<Text style={styles.skillsText}>{skill.toString()}</Text>
							</View>
						</View>
					)
				})
				}
				</ScrollView>
				)}
			</View>
			<HideWithKeyboard style={styles.footer}>
				<TouchableOpacity onPress={() => callUser()} style={styles.buttonCall}>
					<View style={styles.buttonIcon}>
						<Icon name="phone" color="#FFF" size={24} />
					</View>
					<Text style={styles.buttonCallText}>Call</Text>
					<View style={styles.buttonIcon} />
				</TouchableOpacity>
			</HideWithKeyboard>
		</>
	);
}

const styles = StyleSheet.create({
	skills: {
		marginTop: 8,
		flexDirection: "row",
		borderRadius: 20,
		alignItems: "center",
	},

	skillsText: {
    backgroundColor: "#32FFE3",
    marginLeft: 16,
	},

	buttonIcon: {
		height: 40,
		width: 40,
		justifyContent: "center",
		alignItems: "center",
	},

	buttonIcon2: {
		backgroundColor: "#32FFE3",
		flexDirection: "row",
    borderRadius: 20,
    padding: 16,
		alignContent: 'center',
		justifyContent: 'center',
	},

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

	buttonCall: {
		marginTop: 8,
		marginBottom: 16,
		marginHorizontal: 16,
		backgroundColor: "#8C00CA",
		height: 60,
		flexDirection: "row",
		borderRadius: 20,
		overflow: "hidden",
		alignItems: "center",
	},

	buttonCallText: {
		flex: 1,
		justifyContent: "center",
		textAlign: "center",
		color: "#FFF",
		fontSize: 24,
		fontWeight: "bold",
	},

	footer: {},
});
