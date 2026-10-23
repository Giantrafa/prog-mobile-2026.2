import { StyleSheet, View, FlatList, Pressable, } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import React, { useState } from "react";


export default function TarefasScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    marginTop: 10,
    textAlign: 'center',
  },
});
