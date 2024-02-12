import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SalesReport from './SalesReport/SalesReport';
import SalesSummary from './SalesSummary/SalesSummary';
import HeaderComp from '../../../../../Components/HeaderCompo';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { GetgetSalesReportMethod } from '../../../../../config/userApiMethods';




const Sales = () => {
    const [selectedTab, setSelectedTab] = useState('Tab1');
    const navigation = useNavigation()
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(GetgetSalesReportMethod())
    }, [])


    const handleTabPress = (tab) => {
        setSelectedTab(tab);
    };

    const renderScreen = () => {
        switch (selectedTab) {
            case 'Tab1':
                return <SalesReport />;
            case 'Tab2':
                return <SalesSummary />;
            default:
                return null;
        }
    };

    return (
        <>
            <HeaderComp
                screenName='Sales and GST Report'
                onBackPress={() => navigation.goBack()}

            />
            <View style={styles.container}>
                <View style={styles.tabsContainer}>
                    <TouchableOpacity
                        style={[styles.tab, selectedTab === 'Tab1' && styles.selectedTab]}
                        onPress={() => handleTabPress('Tab1')}
                    >
                        <MaterialCommunityIcons
                            name={selectedTab === 'Tab1' ? 'book-open' : 'book-open'}
                            size={24}
                            color={selectedTab === 'Tab1' ? '#3498db' : '#bdc3c7'}
                        />
                        <Text style={styles.tabText}>Sales Report</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tab, selectedTab === 'Tab2' && styles.selectedTab]}
                        onPress={() => handleTabPress('Tab2')}
                    >
                        <MaterialCommunityIcons
                            name={selectedTab === 'Tab2' ? 'book-open' : 'book-open'}
                            size={24}
                            color={selectedTab === 'Tab2' ? '#3498db' : '#bdc3c7'}
                        />
                        <Text style={styles.tabText}>Sales Summary</Text>
                    </TouchableOpacity>


                </View>

                {renderScreen()}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#ecf0f1',
        padding: 10,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 10,
    },
    selectedTab: {
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
    },
    tabText: {
        marginLeft: 8,
        color:"#000"
    },
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Sales;
