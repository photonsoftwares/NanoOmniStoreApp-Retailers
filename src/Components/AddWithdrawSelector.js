import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AddWithdrawSelector = ({ onSelect }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelect = useCallback((option) => {
        setSelectedOption(option);
        onSelect(option); // Notify parent component
    }, [onSelect]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, selectedOption === 'ADD' && styles.selectedButton]}
                onPress={() => handleSelect('ADD')}
            >
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, selectedOption === 'WITHDRAW' && styles.selectedButton]}
                onPress={() => handleSelect('WITHDRAW')}
            >
                <Text style={styles.buttonText}>Withdraw</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddWithdrawSelector;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    button: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        width: 100
    },
    selectedButton: {
        backgroundColor: '#4CAF50',
    },
    buttonText: {
        color: '#000',
        textAlign: 'center'
        
    },
});
