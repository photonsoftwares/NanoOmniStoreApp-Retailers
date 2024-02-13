import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomDropDown from '../../Components/CustomDropDown'; // Adjust the path as per your project structure

const Test = () => {

  // const handleAddItem = async (e) => {
  //   e.preventDefault();
  //   console.log(itemCategory);
  //   console.log("categoryArr", categoryArr);
  //   const body = {
  //     item_name: itemName,
  //     item_code: Number(itemCode),
  //     description: itemName,
  //     special_description: spacildescription,
  //     price: Number(itemPrice),
  //     brand: brandName,
  //     UOM: "pieces",
  //     colorList: [{
  //       "product_size": 10,
  //       "product_color": "Red",
  //       "saas_id": "6",
  //       "store_id": "60001"
  //     },
  //     {
  //       "product_size": 12,
  //       "product_color": "Blue",
  //       "saas_id": "6",
  //       "store_id": "60001"
  //     }],
  //     // discount: Number(selectedOptionDiscount.value),
  //     tax: Number(taxPercentage),
  //     tax_code: Number(taxPercentage),
  //     status: "active",
  //     saas_id: saasId,
  //     product_cost: purchasePrice,
  //     mrp: mrp,
  //     category: itemCategory,
  //     selling_price: sellingPrice,
  //     stock_qty: stockQty,
  //     tax_percentage: taxPercenatage,
  //     store_id: storeId,
  //     department: itemName,
  //   }
  //   try {
  //     const response = await axios.post(${ BASE_Url } / item / add - item, body)
  //     console.log("this response", response.data.data, response.data.status)
  //     if (response.data.status) {
  //       if (response.data.data.item_id) {
  //         console.log("this item id", response.data.data.item_id)
  //         const Data = {
  //           saas_id: saasId,
  //           store_id: storeId,
  //           item_id: response.data.data.item_id,
  //           sizes: size
  //         }
  //         if (size.length > 0) {
  //           try {
  //             await axios.post(${ BASE_Url } / item / add - size - master, Data)
  //             setSize([])
  //           } catch (error) {
  //             console.log(error)
  //           }
  //         }
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Item Added Successfully',

  //         });
  //         dispatch(handleAddItemToStoreResponse({ data: response.data.data }))
  //       }
  //     }


  //     setItemName("");
  //     setItemCategory("");
  //     setSpacildescription("")

  //   } catch (error) {
  //     // Log the error to the console
  //     console.error('Error in handleAddItem:', error);

  //     // Show an error alert using Swal
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error',
  //       text: 'An error occurred while adding the item. Please try again.',
  //     });
  //   }
  // };
 
  return (
    <View>
      <Text>Test</Text>
      <CustomDropDown/>
    </View>
  )
}

export default Test

const styles = StyleSheet.create({})