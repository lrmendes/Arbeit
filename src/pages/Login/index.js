import React, {useState, useEffect} from 'react';
import { ImageBackground, TouchableOpacity, View, Text, StyleSheet,TextInput, ActivityIndicator, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from '../../services/firebase.js';
import { CommonActions, useNavigation } from '@react-navigation/native';

import Input from "../../components/Input";
import HideWithKeyboard from 'react-native-hide-with-keyboard';

export default function Login({ navigation }) {
    const [user,setUser] = useState("");
    const [pass,setPass] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [runOnce,setRunOnce] = useState(true);

    const [isEnterprise,setIsEnterprise] = useState(false);
    // const navigation = useNavigation();

   //  function handleNavigateToRegisterUser() {
   //     navigation.navigate('RegisterUser')
   //  }

    /*const createTwoButtonAlert = (title,msg) => {
        if (!isEnterprise) {
            navigation.navigate("FindOffer");
        } else {
            navigation.navigate("RegisterEnterprise");
        }
		}*/

		const createButtonAlert = (title, msg) => {
      Alert.alert(
         title,
         msg,
         [
            { text: "OK" }
         ],
         { cancelable: false }
      );
   }

    function sendToCorretRoute() {
        firebase.firestore().collection('Users').get().then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                if (documentSnapshot.data().email == user) {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                            { name: 'FindOffer' },
                    ],}))
                }
            });
        }).catch(error => {
						console.log("Erro ao buscar Users");
						setIsLoading(false);
        });

        firebase.firestore().collection('Company').get().then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                if (documentSnapshot.data().email == user) {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                            { name: 'ListOffer' },
                        ],}));
                }
            });
        }).catch(error => {
						console.log("Erro ao buscar Companies");
						setIsLoading(false);
        });
    }

    function loginUser() {
        setIsLoading(true);

        if (user == "" || pass == "") {
            setIsLoading(false);
            return createButtonAlert('Error','Empty Field!');
        }

        firebase.auth()
            .signInWithEmailAndPassword(user, pass)
                .then(() => {
                    console.log("Autenticado - Enviando para rota correta...");
                    return sendToCorretRoute();
                })
                .catch(error => {
                    if (error == 'auth/wrong-password' || error == 'The password is invalid or the user does not have a password.') {
                        return createButtonAlert('Error','Wrong Password!');
                    }
                    if (error == 'auth/invalid-email') {
                        return createButtonAlert('Error','Invalid Email!');
                    }
                    setIsLoading(false);
                    console.log(error);
                    alert(error);
                });
        }

    // Caso o usuario ja esteja logado e abra o APP novamente -> Loga automaticamente
    useEffect(() => {
        /*if (runOnce == true) {
            setRunOnce(false);
            if (firebase.auth().currentUser != null) {
                setIsLoading(true);
                setUser((firebase.auth().currentUser.email));
                sendToCorretRoute();
            }
        }*/
      }, []);

  return (
		<View style={classes.container}>
			{/* Header */}
			<View style={classes.header}>
				<Text
					style={[
						classes.titleText,
						{ color: isEnterprise ? "#8C00CA" : "#FF0077" },
					]}
				>
					ARBEIT
				</Text>
				<Text style={classes.subtitleText}>Need Jobs?</Text>
			</View>

			{/* Tab */}
			<View style={classes.containerItemPill}>
				<TouchableOpacity
					style={isEnterprise ? classes.pillLeft : classes.pillLeftSelected}
					onPress={() => setIsEnterprise(false)}
				>
					<Text style={classes.pillText}>Looking for job?</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={isEnterprise ? classes.pillRightSelected : classes.pillRight}
					onPress={() => setIsEnterprise(true)}
				>
					<Text style={classes.pillText}>Need workers?</Text>
				</TouchableOpacity>
			</View>

			<View style={classes.login}>
                <View>
                    <Input
                        label="Email"
                        placeholder="Email"
                        keyboardType={"email-address"}
                        value={user}
                        onChangeText={(text) => setUser(text)}
                    />
                </View>
                <View>
                    <Input
                        label="Password"
                        onChangeText={(text) => setPass(text)}
                        value={pass}
                        placeholder="Password"
                        secureTextEntry={true}
                        autoCompleteType={"off"}
                    />
                </View>
			</View>

			<HideWithKeyboard style={classes.containerBotton}>
				<TouchableOpacity
					style={[
						classes.loginButton,
						isEnterprise
							? { backgroundColor: "#8C00CA" }
							: { backgroundColor: "#FF0077" },
					]}
					disabled={isLoading}
					onPress={() => loginUser()}
				>
					{isLoading ? (
						<ActivityIndicator size="small" color="rgba(255, 255, 255,1)" />
					) : (
						<Text style={classes.buttonTextLogin}>Login</Text>
					)}
				</TouchableOpacity>
				<TouchableOpacity
					style={classes.registerButton}
					onPress={() =>
						navigation.navigate(
							isEnterprise ? "CreateOffer" : "RegisterUser"
						)
					}
				>
					<Text style={classes.buttonTextRegister}>Register</Text>
				</TouchableOpacity>
			</HideWithKeyboard>
		</View>
	);
}

const classes = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		padding: 24,
		alignItems: "center",
	},
	containerBotton: {
		width: '100%',
		alignItems: 'center',
	},
	header: {
		width: "100%",
		height: 154,
		marginVertical: 24,
		paddingVertical: 24,
		alignItems: "center",
	},
	login: {
        flex: 1,
        flexDirection: "column",
        width: "100%",
	},
	containerItemPill: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
	},
	pillLeft: {
		maxWidth: "50%",
		backgroundColor: "#7E7E7E",
		padding: 20,
		borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20,
	},
	pillLeftSelected: {
		maxWidth: "50%",
		backgroundColor: "#FF0077",
		padding: 20,
		borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20,
	},
	pillRight: {
		maxWidth: "50%",
		backgroundColor: "#7E7E7E",
		padding: 20,
		borderTopRightRadius: 20,
		borderBottomRightRadius: 20,
	},
	pillRightSelected: {
		maxWidth: "50%",
		backgroundColor: "#8C00CA",
		padding: 20,
		borderTopRightRadius: 20,
		borderBottomRightRadius: 20,
	},
	icone: {
		opacity: 0.7,
	},
	pillText: {
		fontSize: 16,
		color: "#ffffff",
	},
	bgimage: {
		flex: 1,
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
	titleText: {
		fontSize: 48,
		fontWeight: "bold",
		marginBottom: 10,
		marginTop: 20,
	},
	buttonTextLogin: {
		fontSize: 20,
		color: "#ffffff",
	},
	inputText: {
		padding: 15,
		marginBottom: 25,
		width: "90%",
		borderColor: "rgba(200,200,200,1)",
		borderRadius: 20,
		borderWidth: 1,
		color: "rgba(0,0,0,0.5)",
		opacity: 1,
		textAlign: "center",
	},
	placeText: {
		color: "#8F8F8F",
		marginBottom: 2,
	},
	loginButton: {
		width: "100%",
		marginTop: 15,
		backgroundColor: "#8C00CA",
		padding: 20,
		borderRadius: 20,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	text2: {
		color: "rgba(0,0,0,0.5)",
	},
	registerButton: {
		padding: 10,
		marginTop: 15,
		fontSize: 15,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	buttonTextRegister: {
		fontSize: 16,
		color: "#000",
	},

	colorUser: {
		color: "#FF0077",
	},

	colorEnterprise: {
		color: "#8C00CA",
	},
});
