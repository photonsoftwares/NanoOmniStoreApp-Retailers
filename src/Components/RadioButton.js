// components/RadioButton.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RadioButton = ({ selected, onPress, label }) => {

    console.log("selected",selected)
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={[styles.radioCircle, selected && styles.selectedRadioCircle]}>
                {selected && <View style={styles.selectedRb} />}
            </View>
            {label && <Text style={styles.label}>{label}</Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,

    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#2c3e50',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRadioCircle: {
        borderColor: '#3498db',
    },
    selectedRb: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#3498db',
    },
    label: {
        marginLeft: 10,
        fontSize: 16,
        color: '#2c3e50',
    },
});

export default RadioButton;
