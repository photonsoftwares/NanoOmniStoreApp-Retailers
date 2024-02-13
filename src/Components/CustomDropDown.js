// // CustomDropDown.js

// import React, { useState } from 'react';
// import { View, Text } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { useSelector } from 'react-redux';

// const CustomDropDown = () => {
//     const { categoryData } = useSelector((state) => state?.productReducer)
//     console.log("cateee", categoryData)

//     const category = [{
//         category_id: 16314,
//         saas_id: "6",
//         store_id: "60001",
//         category_name: "Khobra",
//         image_path: "https://posprdapi.photonsoftwares.com/prod/api/v1/category/get-category-image/16314"
//     },
//     {
//         category_id: 16315,
//         saas_id: "6",
//         store_id: "60001",
//         category_name: "Chockolet",
//         image_path: "https://posprdapi.photonsoftwares.com/prod/api/v1/category/get-category-image/16315"
//     },]

//     const [open, setOpen] = useState(false);
//     const [value, setValue] = useState(null);
//     const [items, setItems] = useState(
//         // [
//         //     { label: 'Apple', value: 'apple' },
//         //     { label: 'Banana', value: 'banana' },
//         //     { label: 'Pear', value: 'pear' },
//         // ]
//         categoryData
//     );

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
//                     setValue={setValue}
//                     setItems={setItems}
//                     placeholder={'Choose a category.'}
//                 />
//             </View>

//             {/* <View style={{
//                 flex: 1,
//                 alignItems: 'center',
//                 justifyContent: 'center'
//             }}>
//                 <Text>Chosen fruit: {value === null ? 'none' : value}</Text>
//             </View> */}
//         </View>
//     );
// }

// export default CustomDropDown; // Exporting CustomDropDown as default


////
// CustomDropDown.js

// import React, { useState } from 'react';
// import { View, Text } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { useSelector } from 'react-redux';

// const CustomDropDown = () => {
//     const { categoryData } = useSelector((state) => state?.productReducer);

//     const [open, setOpen] = useState(false);
//     const [value, setValue] = useState(null);

//     // Transform categoryData into the format expected by DropDownPicker
//     const items = categoryData.map(category => ({
//         label: category.category_name,
//         value: category.category_id.toString() // Ensure value is a string
//     }));

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
//                     setValue={setValue}
//                     placeholder={'Choose a category.'}
//                 />
//             </View>
//         </View>
//     );
// }

// export default CustomDropDown;



/////


import React, { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector } from 'react-redux';

const CustomDropDown = ({ onSelect }) => {
    const { categoryData } = useSelector((state) => state?.productReducer);
    const [open, setOpen] = useState(false);
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
