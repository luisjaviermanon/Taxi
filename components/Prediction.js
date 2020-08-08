import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Prediction = ({ main_text, secondary_text, onPress }) => {
  const { secondary, main, container } = styles;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={container}>
        <Text numberOfLines={1} style={secondary}>
          {secondary_text}
        </Text>
        <Text style={main}>{main_text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    color:'#fff',
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#f6f6f6",
    padding: 5
  },
  secondary: {
    color:'#fff',
    fontSize: 12,
    fontWeight: "300",

  },
  main: {
    
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",

  }
});

export default Prediction;
