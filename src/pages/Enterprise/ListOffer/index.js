import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import firebase,{db} from '../../../services/firebase.js';
import { CommonActions } from '@react-navigation/native';

import AppBar from "../../../components/AppBar";
import Avatar from "../../../components/Avatar";
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

export default function ListOffer({navigation}) {

	const [myOffers,setMyOffers] = useState([]);
	const [runOnce,setRunOnce] = useState(true);
	const [reload,setReload] = useState(false);

	useEffect(() => {
		//if(runOnce) {
		//	setRunOnce(false);
			db.collection('Offers').where('email', '==', firebase.auth().currentUser.email).get().then(querySnapshot => {
				let offers = [];
				querySnapshot.forEach(documentSnapshot => {
					offers.push({...documentSnapshot.data(), id: documentSnapshot.id });
				});
				setMyOffers(offers);
			});
		//}
	},[reload]);

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
					});
		}

  return (
    <View style={classes.container}>

      {/* AppBar */}
      <View style={classes.appBar}>
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
							onPress={() => setReload(!reload)}
						>
							<Feather name="refresh-cw" size={24} color="black" />
						</TouchableOpacity>
					}
				/>
      </View>

      {/* List */}
      <Text style={classes.groupTitle}>Your offers</Text>

			{myOffers.map(offer => {
				return (
					<TouchableOpacity key={offer.id} style={classes.card} onPress={() => navigation.navigate('ListCandidates', {offer: offer})}>
						<Text style={classes.cardTitle}>{offer.jobTitle}</Text>
						<Text style={classes.cardSubtitle}>candidates: <Text  style={classes.cardValue}>{offer.acceptedUsers.length}</Text></Text>
					</TouchableOpacity>
				)
			})}
			{myOffers.length == 0 ? <Text style={classes.cardTitle}>You do not have offers yet!</Text> : null}

      {/* Actions */}
      <View style={classes.actions}>
        <TouchableOpacity
          style={classes.tinderButton}
          onPress={() => navigation.navigate("CreateOffer")}>
          <Feather style={classes.icon} name="plus" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}


const classes = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 24,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "#EBEBEB"
  },
  appBar: {
    height: 64,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: "center"
  },
  logo: {
    flex: 1,
    fontSize: 32,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    color: "#8C00CA",
  },
  avatar: {
    width: 42,
    height: 42,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "#7E7E7E",
    color: "#FFFFFF",
    textAlign: "center",
    textAlignVertical: "center",
    alignContent: "flex-end",
    borderRadius: 42
  },
  backButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    width: "100%",
    height: 64,
    padding: 14,
    marginVertical: 8,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "space-between"
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333"
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#333"
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8C00CA"
  },
  groupTitle: {
    marginTop: 24,
    marginBottom: 14,
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 18,
    color: "#8F8F8F"
  },
  actions: {
    padding: 24,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  tinderButton: {
    width: 54,
    height: 54,
    backgroundColor: "#FFF",
    borderRadius: 84,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    color: "#ADADAD"
  },
});
