import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';

import AppBar from "../../../components/AppBar";
import Avatar from "../../../components/Avatar";
import OfferCard from "../../../components/OfferCard";

import firebase from '../../../services/firebase.js';
import { CommonActions } from '@react-navigation/native';

export default function FindOffer({ navigation }) {
    const logoutAlert = (title,msg) =>
    Alert.alert(
        title,
        msg,
      [
        { text: "Yes", onPress: () => doLogout() },
        { text: "Cancel" }
      ],
      { cancelable: true }
    );

    function doLogout() {
        firebase.auth().signOut().then(() => {
            navigation.dispatch(
                CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'Login' },
                ],}));
            })
    }

    const doApprove = () => {
        console.log("Approves")
    }

    const doDeny = () => {
        console.log("Denies");
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
					renderRight={<Avatar>A</Avatar>}
				/>
				<OfferCard
					description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
					title={"Loja Sonia - DESLOGADO"}
					business="Loja da Sonia"
					place="Bragança, Portugal"
					value="1000.00"
				/>
				<View style={classes.actions}>
					<TouchableOpacity style={classes.button} onPress={doDeny}>
						<Feather style={classes.deniedIcon} name="x" size={38} />
					</TouchableOpacity>
					<TouchableOpacity style={classes.button} onPress={doApprove}>
						<Feather style={classes.approvedIcon} name="check" size={38} />
					</TouchableOpacity>
				</View>
			</View>
		);
}


const classes = StyleSheet.create({
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
	button: {
		width: 84,
		height: 84,
		backgroundColor: "#FFF",
		borderRadius: 84,
		alignItems: "center",
		justifyContent: "center",
	},
	deniedIcon: {
		color: "#FE2845",
	},
	approvedIcon: {
		color: "#67F4AA",
	},
});
