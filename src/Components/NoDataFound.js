import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import { textScale } from '../styles/responsiveSize';

const NoDataFound = (props) => {
    // const { text = strings.NO_DATA_FOUND, containerStyle, textStyle } = props;
    const { text = "NO_DATA_FOUND", containerStyle, textStyle } = props;
    return (
        <View style={{ ...(containerStyle || {}), }}>
            <Text style={{ ...styles.textStyle, ...(textStyle || {}) }}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: textScale(17),
        color: '#000'
    }
});

export default NoDataFound;
