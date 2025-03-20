import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

const BusinessSummary = () => {
    const dashboard = useSelector((state) => state?.dashboardReducer?.dashboard) || {}


    console.log(dashboard, "dashboard")

    // console.log("redux", redux)

    const SummaryItem = ({ iconName, label, value, backgroundColor, iconColor }) => (
        <Pressable style={[styles.summaryItem, { backgroundColor }]}>
            <Icon name={iconName} size={24} color={iconColor} />
            <View style={styles.textContainer}>
                <Text style={styles.value}>{value}</Text>
                <Text style={styles.label}>{label}</Text>
            </View>
        </Pressable>
    );

    const themes = useTheme().colors
    //   console.log("themes",themes)
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: themes.blackOpacity90 }]}>Business summary</Text>
                {/* <Text style={styles.date}>Today</Text> */}
            </View>
            <Text style={[styles.subTitle, { color: themes.blackOpacity60 }]}>Complete business summary in a glance</Text>

            <View style={styles.grid}>
                <SummaryItem iconName="stats-chart" label="Today's Sale" value={`₹ ${dashboard?.todaySales}`} backgroundColor="#E8F4FF" iconColor="#2979FF" />
                {/* <SummaryItem iconName="bag" label="Yesterday Sales" value={`₹ ${dashboard?.yesterdaySales}`} backgroundColor="#FFF4F2" iconColor="#FF6F61" /> */}
                <SummaryItem iconName="card" label="Last Week Sales" value={`₹ ${dashboard?.lastWeekSales}`} backgroundColor="#FFECEC" iconColor="#FF3B3B" />
                <SummaryItem iconName="cash" label="Last 14 Days Sales" value={`₹ ${dashboard?.last14DaysSales}`} backgroundColor="#E8FFF1" iconColor="#28A745" />
                <SummaryItem iconName="trending-down" label="Last Month Sales" value={`₹ ${dashboard?.salesInAMonth}`} backgroundColor="#F4E8FF" iconColor="#8E44AD" />
                {/* <SummaryItem iconName="cart" label="Last 60 Days Sales" value={`₹ ${dashboard?.lastSixtyDaysSales}`} backgroundColor="#FFF1F1" iconColor="#FF5252" /> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderColor: '#E0E0E0',
        shadowColor: '#000',

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',

    },
    date: {
        fontSize: 16,
        color: '#757575',
    },
    subTitle: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 10,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    summaryItem: {
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    textContainer: {
        marginLeft: 10,
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
    label: {
        fontSize: 14,
        color: '#757575',
    },
});

export default BusinessSummary;
