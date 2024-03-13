// CustomButton.js

import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ButtonWithToggle = ({ beforeText, afterText, beforeIcon, afterIcon, beforeColor, afterColor }) => {
    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
        setIsPressed(!isPressed);
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            style={[
                styles.button,
                { backgroundColor: isPressed ? afterColor : beforeColor },
            ]}
        >
            <View style={styles.buttonContent}>
                <MaterialCommunityIcons
                    name={isPressed ? afterIcon : beforeIcon}
                    size={24}
                    color="white"
                />
                <Text style={styles.buttonText}>
                    {isPressed ? afterText : beforeText}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '90%',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        marginLeft: 10,
        fontSize: 18,
    },
});

export default ButtonWithToggle;

