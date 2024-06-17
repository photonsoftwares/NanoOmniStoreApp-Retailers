// import React, { useState } from 'react';
// import { View } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { useSelector } from 'react-redux';

// const CustomDropDown = ({ onSelect, type, data }) => {
//     const { categoryData } = useSelector((state) => state?.productReducer);
//     const { subCategory, subCategoryItems,masterCategory, selectedMasterCategory, } = useSelector((state) => state?.mainCategoryReducer);


//     const [open, setOpen] = useState(true);
//     const [value, setValue] = useState(null);

//     // const items = categoryData.map(category => ({
//     const subCategoryDrop = subCategory?.map(category => ({
//         label: category.category,
//         value: category.category
//         // value: category.category_name.toString()
//     }));

//     const masterCategoryDrop = masterCategory?.map(category => ({
//         label: category.masterCategoryName,
//         value: category.masterCategoryName
//         // value: category.category_name.toString()
//     }));

//     // console.log("items1", subCategoryDrop)

//     // Function to handle value selection
//     const handleValueChange = (selectedValue) => {
//         setValue(selectedValue);
//         onSelect(selectedValue); // Call the onSelect callback with the selected value
//     };

//     // console.log("vbnjkl", data, type, categoryData)

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
//                     items={type == '1' ? masterCategoryDrop : type == '2' ? subCategoryDrop : null}
//                     // items={subCategoryDrop}
//                     setOpen={setOpen}
//                     setValue={handleValueChange} // Pass the handleValueChange function to setValue
//                     placeholder={'Choose a category.'}
//                 />
//             </View>
//         </View>
//     );
// }

// export default CustomDropDown;





//////////////////

import React, { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector } from 'react-redux';

const CustomerEligibility = [
    { key: 'New', text: 'New' },
    { key: 'Old', text: 'Old' },
    { key: 'Everyone', text: 'Everyone' },
];

const CustomDropDown = ({ onSelect, type, data }) => {
    const { categoryData } = useSelector((state) => state?.productReducer);
    const { subCategory, subCategoryItems, masterCategory, selectedMasterCategory, } = useSelector((state) => state?.mainCategoryReducer);


    const [open, setOpen] = useState(true);
    const [value, setValue] = useState(null);

    // const items = categoryData.map(category => ({
    const subCategoryDrop = subCategory?.map(category => ({
        label: category.category,
        value: category.category
        // value: category.category_name.toString()
    }));

    const masterCategoryDrop = masterCategory?.map(category => ({
        label: category.masterCategoryName,
        value: category.masterCategoryName
        // value: category.category_name.toString()
    }));

    const CustomerEligibilityDrop = CustomerEligibility?.map(category => ({
        label: category.key,
        value: category.text
        // value: category.category_name.toString()
    }));

    // console.log("CustomDropDown", subCategory)

    // Function to handle value selection
    const handleValueChange = (selectedValue) => {
        setValue(selectedValue);
        onSelect(selectedValue); // Call the onSelect callback with the selected value
    };



    // console.log("vbnjkl", data, type, categoryData)

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
                    items={type == '1' ? masterCategoryDrop : type == '2' ? subCategoryDrop : type == '3' ? CustomerEligibilityDrop : null}
                    // items={subCategoryDrop}
                    setOpen={setOpen}
                    setValue={handleValueChange} // Pass the handleValueChange function to setValue
                    placeholder={'Choose a category.'}
                />
            </View>
        </View>
    );
}

export default CustomDropDown;
