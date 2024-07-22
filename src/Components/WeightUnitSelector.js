import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WeightUnitSelector = ({ onUnitChange }) => {
    const [selectedUnit, setSelectedUnit] = useState('KG');

    const handleUnitChange = (unit) => {
        setSelectedUnit(unit);
        onUnitChange(unit); // Call the callback function with the selected unit
    };

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Select Unit</Text> */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, selectedUnit === 'KG' && styles.selectedButton]}
                    onPress={() => handleUnitChange('KG')}
                >
                    <Text style={[styles.buttonText, selectedUnit === 'KG' && styles.selectedButtonText]}>KG</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, selectedUnit === 'GMS' && styles.selectedButton]}
                    onPress={() => handleUnitChange('GMS')}
                >
                    <Text style={[styles.buttonText, selectedUnit === 'GMS' && styles.selectedButtonText]}>GMS</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, selectedUnit === 'PCS' && styles.selectedButton]}
                    onPress={() => handleUnitChange('PCS')}
                >
                    <Text style={[styles.buttonText, selectedUnit === 'PCS' && styles.selectedButtonText]}>PCS</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        // padding: 20,
        backgroundColor: '#f8f9fa',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#343a40',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    button: {
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#007bff',
        borderRadius: 8,
        width: 100,
    },
    selectedButton: {
        backgroundColor: '#0056b3',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center'

    },
    selectedButtonText: {
        fontWeight: 'bold',
    },
});

export default WeightUnitSelector;
