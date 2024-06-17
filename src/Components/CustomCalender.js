import React, { useState } from 'react';
import { View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CustomCalender = ({ onDateChange }) => {
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios');
        setDate(currentDate);
        onDateChange(currentDate);
    };

    const showDatepicker = () => {
        setShowPicker(true);
    };

    return (
        <View>
            {/* <Button onPress={showDatepicker} title="Select Date" /> */}
            {/* {showPicker && ( */}
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChange}
            />
            {/* )} */}
        </View>
    );
};

export default CustomCalender;






