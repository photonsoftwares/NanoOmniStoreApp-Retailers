
import React from 'react';
import { Modal, TouchableOpacity, Text, FlatList, StyleSheet, View } from 'react-native';

const ColorPicker = ({ visible, onSelect, onClose }) => {
    const colors = ['purple', 'blue', 'green', 'red', '#33ECFF', 'black'];

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={[styles.colorItem, { backgroundColor: item }]}
                onPress={() => onSelect(item)}
            />
        );
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.colorPickerContainer}>
                    <Text style={styles.modalTitle}>Select a Color</Text>
                    <FlatList
                        data={colors}
                        renderItem={renderItem}
                        keyExtractor={(item) => item}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.colorList}
                        estimatedItemSize={59}
                    />
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    colorPickerContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',


    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 10,
    },
    colorList: {
        marginVertical: 10,
    },
    colorItem: {
        width: 50,
        height: 50,
        marginHorizontal: 5,
        borderRadius: 25,
    },
    closeButton: {
        marginTop: 10,
    },
    closeButtonText: {
        color: 'blue',
    },
});

export default ColorPicker;





