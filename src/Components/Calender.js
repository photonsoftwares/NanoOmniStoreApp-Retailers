import React, { useState } from 'react';
import { View, Button, Platform, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { moderateScale } from '../styles/responsiveSize';
// import { moderateScale } from '../styles/responsiveSize';

const Calender = ({ placeholder, onSelect }) => {
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const dateString = date;
    const dateObject = new Date(dateString);

    // Options for formatting the date
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timeZone: 'Asia/Kolkata',
    };
    // Convert the date to the Indian date format
    const indianDateFormat = dateObject.toLocaleDateString('en-IN', options);

    // console.log(indianDateFormat);


    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios'); // For iOS, show the picker in modal
        if (selectedDate) {
            setDate(selectedDate);
            onSelect && onSelect(selectedDate);

        }
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    return (
        <View style={{  justifyContent: 'center', backgroundColor: '#FFF' }}>
            <TouchableOpacity onPress={showDatepicker} style={[styles.dropdownStyle]}>
                <MaterialCommunityIcons name="calendar-month" size={30}  color={'#000'}/>
                {/* <Text style={[styles.textStyle]} >{indianDateFormat ? indianDateFormat : placeholder}</Text> */}
                {/* <Text style={[styles.textStyle]} ></Text> */}
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            {/* <View>
                <Text>Selected Date: {date.toDateString()}</Text>
            </View> */}
        </View>
    );
};

export default Calender;
const styles = StyleSheet.create({
    dropdownStyle: {
        width: '100%',
        flexDirection: 'row',
        // justifyContent: 'space-around',
        marginHorizontal: moderateScale(18),
        // backgroundColor: 'red',
        gap: moderateScale(20),
        // marginLeft: 45,
        paddingVertical: moderateScale(10)

    },
    textStyle: {
        alignSelf: 'center',
        fontWeight: 'bold',
        // color:'#D3D3D3'
    }
})





/////////


// import React, { useState } from 'react';
// import { View, TouchableOpacity, StyleSheet } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { moderateScale } from '../styles/responsiveSize';

// const Calender = ({ placeholder, onSelect }) => {
//   // For start and end date selection
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
  
//   // For date picker visibility
//   const [showStartDatePicker, setShowStartDatePicker] = useState(false);
//   const [showEndDatePicker, setShowEndDatePicker] = useState(false);

//   // Function to handle date changes
//   const handleDateChange = (event, selectedDate, type) => {
//     if (type === 'start') {
//       setShowStartDatePicker(Platform.OS === 'ios');
//       if (selectedDate) {
//         setStartDate(selectedDate);
//         onSelect && onSelect(selectedDate, type);
//       }
//     } else {
//       setShowEndDatePicker(Platform.OS === 'ios');
//       if (selectedDate) {
//         setEndDate(selectedDate);
//         onSelect && onSelect(selectedDate, type);
//       }
//     }
//   };

//   // Function to show date picker
//   const showDatepicker = (type) => {
//     if (type === 'start') {
//       setShowStartDatePicker(true);
//     } else {
//       setShowEndDatePicker(true);
//     }
//   };

//   return (
//     <View style={{ justifyContent: 'center', backgroundColor: '#fff' }}>
//       {/* Start Date */}
//       <TouchableOpacity onPress={() => showDatepicker('start')} style={[styles.dropdownStyle]}>
//         <MaterialCommunityIcons name="calendar-month" size={30} color={'#000'} />
//       </TouchableOpacity>

//       {/* End Date */}
//       <TouchableOpacity onPress={() => showDatepicker('end')} style={[styles.dropdownStyle]}>
//         <MaterialCommunityIcons name="calendar-month" size={30} color={'#000'} />
//       </TouchableOpacity>

//       {/* Start Date Picker */}
//       {showStartDatePicker && (
//         <DateTimePicker
//           value={startDate}
//           mode="date"
//           is24Hour={true}
//           display="default"
//           onChange={(event, selectedDate) => handleDateChange(event, selectedDate, 'start')}
//         />
//       )}

//       {/* End Date Picker */}
//       {showEndDatePicker && (
//         <DateTimePicker
//           value={endDate}
//           mode="date"
//           is24Hour={true}
//           display="default"
//           onChange={(event, selectedDate) => handleDateChange(event, selectedDate, 'end')}
//         />
//       )}
//     </View>
//   );
// };

// export default Calender;

// const styles = StyleSheet.create({
//   dropdownStyle: {
//     width: '100%',
//     flexDirection: 'row',
//     marginHorizontal: moderateScale(18),
//     gap: moderateScale(20),
//     marginLeft: 45,
//     paddingVertical: moderateScale(10)
//   },
// });
