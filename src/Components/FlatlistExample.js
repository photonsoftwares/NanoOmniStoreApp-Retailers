// File: App.js

import React from 'react';
import { SafeAreaView, View, FlatList, Text, StyleSheet } from 'react-native';

const DATA = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
  { id: '4', title: 'Item 4' },
  { id: '5', title: 'Item 5' },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const ListHeader = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>List Header</Text>
  </View>
);

const ListFooter = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>List Footer</Text>
  </View>
);

const ItemSeparator = () => (
  <View style={styles.separator} />
);

const FlatlistExample = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        ItemSeparatorComponent={ItemSeparator}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  item: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 18,
  },
  header: {
    padding: 20,
    backgroundColor: '#4CAF50',
  },
  headerText: {
    fontSize: 24,
    color: '#ffffff',
  },
  footer: {
    padding: 20,
    backgroundColor: '#f1f1f1',
  },
  footerText: {
    fontSize: 18,
    color: '#333333',
  },
  separator: {
    height: 1,
    backgroundColor: '#cccccc',
  },
});

export default FlatlistExample;
