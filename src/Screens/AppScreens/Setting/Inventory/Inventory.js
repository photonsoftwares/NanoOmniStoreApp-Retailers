import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GetInventoryMethod } from '../../../../config/userApiMethods';
import { FlashList } from '@shopify/flash-list';
import HeaderComp from '../../../../Components/HeaderCompo';
import { useNavigation } from '@react-navigation/native';
import { scale } from '../../../../styles/responsiveSize';

const Inventory = () => {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { inventory, inventoryCurrentPage, inventoryTotalPages } = useSelector((state) => state?.inventoryReducer);

  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      try {
        await dispatch(GetInventoryMethod());
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchInventory();
  }, [dispatch]);

  const loadMoreInventory = async () => {
    if (inventoryCurrentPage <= inventoryTotalPages && !loadingMore) {
      setLoadingMore(true);
      try {
        await dispatch(GetInventoryMethod(true));
        setLoadingMore(false);
      } catch (err) {
        setError(err.message);
        setLoadingMore(false);
      }
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={[styles.title, { fontSize: scale(16), fontWeight: 'bold' }]}>{item.item_name}</Text>
      <Text style={styles.title}>Opening Qty: {item?.opening_qty}</Text>
      <Text style={styles.title}>Closing Qty: {item?.closing_qty}</Text>
    </View>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }


  return (
    <View style={[styles.container, { padding: -16 }]}>
      <HeaderComp
        screenName='Inventory'
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        {inventory && inventory.length > 0 ? (
          <FlashList
            data={inventory}
            renderItem={renderItem}
            keyExtractor={(item) => item.item_id}
            estimatedItemSize={100}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreInventory}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
          />
        ) : (
          <Text>No inventory items found.</Text>
        )}
      </View>
    </View>
  );
};

export default Inventory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingVertical: 20,
  },
  errorText: {
    color: 'red',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    color: '#000',
  },
});
