// import React, { useState } from 'react';
// import { View } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { useSelector } from 'react-redux';

// const CustomDropDown = ({ onSelect }) => {
//     const { categoryData } = useSelector((state) => state?.productReducer);
//     const [open, setOpen] = useState(false);
//     const [value, setValue] = useState(null);

//     const items = categoryData.map(category => ({
//         label: category.category_name,
//         // value: category.category_id.toString()
//         value: category.category_name.toString()
//     }));

//     // Function to handle value selection
//     const handleValueChange = (selectedValue) => {
//         setValue(selectedValue);
//         onSelect(selectedValue); // Call the onSelect callback with the selected value
//     };

//     return (
//         <View style={{ flex: 1 }}>
//             <View
//                 style={{
//                     flex: 1,
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     paddingBottom: 12
//                 }}>
//                 <DropDownPicker
//                     open={open}
//                     value={value}
//                     items={items}
//                     setOpen={setOpen}
//                     setValue={handleValueChange} // Pass the handleValueChange function to setValue
//                     placeholder={'Choose a category.'}
//                 />
//             </View>
//         </View>
//     );
// }

// export default CustomDropDown;








////
import React, { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector } from 'react-redux';

const CustomDropDown = ({ onSelect }) => {
    const { categoryData } = useSelector((state) => state?.productReducer);
    const [open, setOpen] = useState(true);
    const [value, setValue] = useState(null);

    const items = categoryData.map(category => ({
        label: category.category_name,
        // value: category.category_id.toString()
        value: category.category_name.toString()
    }));

    // Function to handle value selection
    const handleValueChange = (selectedValue) => {
        setValue(selectedValue);
        onSelect(selectedValue); // Call the onSelect callback with the selected value
    };

    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingBottom: 12
                }}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={handleValueChange} // Pass the handleValueChange function to setValue
                    placeholder={'Choose a category.'}
                />
            </View>
        </View>
    );
}

export default CustomDropDown;
