import React, {useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator } from "react-native";
import Constants from "expo-constants";
import { Feather } from "@expo/vector-icons";

import AppBar from "../../../components/AppBar";
import Avatar from "../../../components/Avatar";
import OfferCard from "../../../components/OfferCard";

import firebase,{db} from "../../../services/firebase.js";
import { CommonActions } from "@react-navigation/native";
import { useEffect } from "react";

export default function FindOffer({ navigation }) {
	const [activeIndex,setActiveIndex] = useState(0);
	const [myOffers,setMyOffers] = useState([]);
	const [reload,setReload] = useState(false);
	const [isLoading,setIsLoading] = useState(false);

	const user = {email: firebase.auth().currentUser.email, name: firebase.auth().currentUser.displayName };

	useEffect(() => {
		db.collection('Offers').get().then(querySnapshot => {
			//console.log(firebase.auth().currentUser.displayName);
			//console.log(querySnapshot.size);
			//console.log("Ofertas Listadas:");

			let offers = [];
			querySnapshot.forEach(documentSnapshot => {
				let data = documentSnapshot.data();
				let exists = false;
				if (!data.acceptedUsers || data.acceptedUsers == undefined || data.acceptedUsers.length == undefined || data.acceptedUsers.length == 0) {
					//console.log("Vazio");
				} else {
					exists = data.acceptedUsers.some(userF => userF.email == user.email);
				}

				if (!exists) {
					if (!data.refusedUsers || data.refusedUsers == undefined || data.refusedUsers.length == undefined || data.refusedUsers.length == 0) {
						//console.log("Vazio");
					} else {
						exists = data.refusedUsers.some(userF => userF.email == user.email);
					}
				}

				if(!exists) {
					offers.push({...documentSnapshot.data(), id: documentSnapshot.id });
				}
			});
			console.log(offers);
			console.log("Indice = ",activeIndex);
			console.log("\n\n");
			setMyOffers(offers);
		});
	},[reload]);

	const logoutAlert = (title, msg) =>
		Alert.alert(
			title,
			msg,
			[{ text: "Yes", onPress: () => doLogout() }, { text: "Cancel" }],
			{ cancelable: true }
		);

	function doLogout() {
		firebase
			.auth()
			.signOut()
			.then(() => {
				navigation.dispatch(
					CommonActions.reset({
						index: 0,
						routes: [{ name: "Login" }],
					})
				);
			});
	}

	const doApprove = () => {
		/*let accepted = [];

		if (!data.acceptedUsers || data.acceptedUsers == undefined || data.acceptedUsers.length == undefined || data.acceptedUsers.length == 0) {
			//console.log("Vazio");
		} else {
			accepted = data.acceptedUsers;
		}
		accepted.push(user);
		*/
		let data = myOffers[activeIndex];
		setIsLoading(true);
		db.collection('Offers').doc(data.id)
		.update({
			acceptedUsers: firebase.firestore.FieldValue.arrayUnion(user)
		})
		.then(() => {
			setIsLoading(false);
			setActiveIndex(activeIndex+1);
		}).catch(error => {
			setIsLoading(false);
			console.log(error);
		});
	};

	const doDeny = () => {
		/*let deny = [];
		let data = myOffers[activeIndex];
		if (!data.refusedUsers || data.refusedUsers == undefined || data.refusedUsers.length == undefined || data.refusedUsers.length == 0) {
		} else {
			deny = data.refusedUsers;
		}
		deny.push(user);
		*/
		let data = myOffers[activeIndex];
		setIsLoading(true);
		db.collection('Offers').doc(data.id)
		.update({
			refusedUsers: firebase.firestore.FieldValue.arrayUnion(user)
		})
		.then(() => {
			setIsLoading(false);
			setActiveIndex(activeIndex+1);
		}).catch(error => {
			setIsLoading(false);
			console.log(error);
		});
	};

	return (
		<View style={classes.wrapper}>
			<AppBar
				renderLeft={
					<TouchableOpacity
						onPress={() => logoutAlert("Confirm", "Do you want to log out??")}
					>
						<Feather name="log-out" size={24} color="black" />
					</TouchableOpacity>
				}
				renderRight={
				<TouchableOpacity
					onPress={() => { setReload(!reload), setActiveIndex(0) }}
				>
					<Feather name="refresh-cw" size={24} color="black" />
				</TouchableOpacity>
				}
			/>

			<View style={classes.itemsContainer}>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}

				>
				{ activeIndex == myOffers.length
				? null
				:	myOffers[activeIndex].skills.split(',').map( skill => {
					return (
						<View style={classes.skills}>
							<View style={classes.buttonIcon2}>
								<Feather name="check" color="#fff" size={20} />
								<Text style={classes.skillsText}>{skill}</Text>
							</View>
						</View>
					)
				})}
				</ScrollView>
			</View>

			{ activeIndex == myOffers.length
			? <Text>There are no current jobs now!</Text>
			:	<OfferCard
					description={myOffers[activeIndex].description}
					title={myOffers[activeIndex].jobTitle}
					business={myOffers[activeIndex].businessName}
					place="Bragança, Portugal"
					value={myOffers[activeIndex].payment == "" ? "Negotiable" : myOffers[activeIndex].payment}
				/>
			}

			{ activeIndex == myOffers.length
			? null
			:
				<View style={classes.actions}>
					<TouchableOpacity style={classes.buttonReject} onPress={doDeny} disabled={isLoading}>
						{isLoading ? (
							<ActivityIndicator size="small" color="rgba(255, 255, 255,1)" />
						) : (
							<Feather style={classes.deniedIcon} name="x" size={38} />
						)}
					</TouchableOpacity>
					<TouchableOpacity style={classes.buttonApprove} onPress={doApprove} disabled={isLoading}>
						{isLoading ? (
							<ActivityIndicator size="small" color="rgba(255, 255, 255,1)" />
						) : (
							<Feather style={classes.approvedIcon} name="check" size={38} />
						)}
					</TouchableOpacity>
				</View>
			}
		</View>
	);
}

const classes = StyleSheet.create({
	itemsContainer: {
      flexDirection: 'row',
      marginTop: 16,
      marginBottom: 3,
   },
	skills: {
		marginLeft: 5,
		marginTop: 8,
		flexDirection: "row",
		borderRadius: 20,
		alignItems: "center",

	},
	skillsText: {
		marginLeft: 16,
		color: '#ffffff',
	},
	buttonIcon2: {
		backgroundColor: "#333",
		flexDirection: "row",
    	borderRadius: 15,
    	padding: 10,
		alignContent: 'center',
		justifyContent: 'center',
	},
	wrapper: {
		flex: 1,
		padding: 24,
		paddingTop: 24 + Constants.statusBarHeight,
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: "#EBEBEB",
	},
	actions: {
		padding: 24,
		height: 120,
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		justifyContent: "space-between",
	},
	buttonReject: {
		width: 84,
		height: 84,
		backgroundColor: "#FE2845",
		borderRadius: 84,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonApprove: {
		width: 84,
		height: 84,
		backgroundColor: "#00b556",
		borderRadius: 84,
		alignItems: "center",
		justifyContent: "center",
	},
	deniedIcon: {
		color: "#fff",
	},
	approvedIcon: {
		color: "#fff",
	},
});
