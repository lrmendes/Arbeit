import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function OfferCard({
  description = "",
  title = "",
  business = "",
  place = "",
  value = ""
}) {
  return (
		<View style={classes.wrapper}>
			<Text style={classes.description}>{description}</Text>
			<View style={classes.footerWrapper}>
				<Text style={classes.title}>{title}</Text>
				<View style={classes.detailsWrapper}>
					<View>
						<Text style={classes.business}>{business}</Text>
						<Text style={classes.place}>
							<Feather name="map-pin" size={14} /> {place}
						</Text>
					</View>
					{ value && (
            <View>
              <Text style={classes.value}>
                <Feather name="dollar-sign" size={14} /> {value}
              </Text>
            </View>
          )}
				</View>
			</View>
		</View>
	);
}

const classes = StyleSheet.create({
	wrapper: {
		flex: 1,
		width: "100%",
		flexDirection: "column",
		backgroundColor: "#FFFFFF",
		borderRadius: 20,
		overflow: "hidden",
	},
	description: {
		width: "100%",
		height: "75%",
		padding: 24,
		fontSize: 14,
	},
	footerWrapper: {
		flex: 1,
		padding: 14,
		width: "100%",
		alignSelf: "flex-end",
		justifyContent: "flex-end",
		backgroundColor: "#333",
	},
	title: {
		paddingVertical: 8,
		color: "#FFF",
		fontSize: 24,
		fontWeight: "bold",
		alignSelf: "center",
		textTransform: "uppercase",
	},
	detailsWrapper: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "space-between",
	},
	business: {
		fontSize: 18,
		color: "#FFF",
		fontWeight: "bold",
		paddingVertical: 8,
		alignSelf: "flex-start",
	},
	place: {
		color: "#FFF",
		alignSelf: "flex-start",
	},
	value: {
		color: "#FFF",
		fontSize: 22,
	},
});
