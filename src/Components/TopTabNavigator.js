import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Screen1 = () => (
    //   <SearchBar />
    <View style={styles.screenContainer}>
        <Text>Screen 1 Content</Text>
    </View>

);

const Screen2 = () => (
    //   <Ratings />//
    <View style={styles.screenContainer}>
        <Text>Screen 2 Content</Text>
    </View>


);

const Screen3 = () => (
    //   <ListAccordion />//
    <View style={styles.screenContainer}>
        <Text>Screen 3 Content</Text>
    </View>

);

const TopTabNavigator = () => {
    const [selectedTab, setSelectedTab] = useState('Tab1');

    const handleTabPress = (tab) => {
        setSelectedTab(tab);
    };

    const renderScreen = () => {
        switch (selectedTab) {
            case 'Tab1':
                return <Screen1 />;
            case 'Tab2':
                return <Screen2 />;
            case 'Tab3':
                return <Screen3 />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'Tab1' && styles.selectedTab]}
                    onPress={() => handleTabPress('Tab1')}
                >
                    <MaterialCommunityIcons
                        name={selectedTab === 'Tab1' ? 'star' : 'star-outline'}
                        size={24}
                        color={selectedTab === 'Tab1' ? '#3498db' : '#bdc3c7'}
                    />
                    <Text style={styles.tabText}>Tab 1</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'Tab2' && styles.selectedTab]}
                    onPress={() => handleTabPress('Tab2')}
                >
                    <MaterialCommunityIcons
                        name={selectedTab === 'Tab2' ? 'heart' : 'heart-outline'}
                        size={24}
                        color={selectedTab === 'Tab2' ? '#e74c3c' : '#bdc3c7'}
                    />
                    <Text style={styles.tabText}>Tab 2</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'Tab3' && styles.selectedTab]}
                    onPress={() => handleTabPress('Tab3')}
                >
                    <MaterialCommunityIcons
                        name={selectedTab === 'Tab3' ? 'bookmark' : 'bookmark-outline'}
                        size={24}
                        color={selectedTab === 'Tab3' ? '#2ecc71' : '#bdc3c7'}
                    />
                    <Text style={styles.tabText}>Tab 3</Text>
                </TouchableOpacity>
            </View>

            {renderScreen()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TopTabNavigator;
