// import React, { useCallback, memo, useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useNavigation } from '@react-navigation/native';
// import { moderateScale } from '../../../../../../styles/responsiveSize';
// import Calender from '../../../../../../Components/Calender';
// import {  GetgetSalesSummarytMethod } from '../../../../../../config/userApiMethods';
// import NoDataFound from '../../../../../../Components/NoDataFound';

// const getCurrentDateInIndianFormat = () => {
//   const currentDate = new Date();

//   const day = currentDate.getDate();
//   const month = currentDate.getMonth() + 1; // Months are zero-indexed
//   const year = currentDate.getFullYear();

//   // Pad single-digit day and month with a leading zero
//   const formattedDay = day < 10 ? `0${day}` : day;
//   const formattedMonth = month < 10 ? `0${month}` : month;

//   return `${year}-${formattedMonth}-${formattedDay}`;
// };



// const ListItem = memo(({ item }) => {
//   const navigation = useNavigation()

//   const handlePress = () => {
//     // Handle item press, e.g., navigate to the PDF URL
//     console.log(`Pressed item ${item.invoice_no}`);
//   };

//   const handleGenerateReceipt = () => {
//     // Handle generating receipt for the item
//     console.log(`Generate receipt for item ${item.pdf_name}`);
//     const pdf_file_name = item.pdf_name
//     navigation.navigate('GenrateInvoicePdf', pdf_file_name)
//     // console.log(pdf_file_name)

//   };

//   return (
//     <View style={styles.itemContainer}>
//       <View style={styles.itemContent}>
//         <Text style={[styles.listStyle, { fontWeight: 'bold', color: '#000' }]}>{`Business Date: ${item.business_date}`}</Text>
//         {/* <Text style={[styles.listStyle]}>{`Business Date: ${item.business_date}`}</Text> */}
//         <Text style={[styles.listStyle]}>{`Invoice Total: ₹${item.net_value}`}</Text>
//         <Text style={[styles.listStyle]}>{`Tax Total: ₹${item.tax_total}`}</Text>
//       </View>
//       {/* <TouchableOpacity onPress={handleGenerateReceipt} style={styles.generateButton}>
//         <MaterialCommunityIcons name="cloud-print" size={32} color='blue' />

//       </TouchableOpacity> */}
//     </View>
//   );
// });

// const SalesSummary = () => {
//   const { salesSummaryData, startDate } = useSelector((state) => state?.salesSummaryReducer);
//   const keyExtractor = useCallback((item) => String(item.invoice_no), []);
//   const renderItem = useCallback(({ item }) => <ListItem item={item} />, []);
//   const [fromDate, setFromDate] = useState(getCurrentDateInIndianFormat());
//   const dispatch = useDispatch()

//   console.log("salesSummaryDataa", salesSummaryData.length)


//   const handleSelectedDate = useCallback((date) => {
//     // console.log("date", date);

//     function extractDateFromTimestamp(timestamp) {
//       const date = new Date(timestamp);
//       const year = date.getFullYear();
//       const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
//       const day = String(date.getDate()).padStart(2, '0');

//       return `${year}-${month}-${day}`;
//     }
//     // const timestamp = "2023-12-30T10:21:00.000Z";
//     const timestamp = date;
//     const extractedDate = extractDateFromTimestamp(timestamp);


//     setFromDate(extractedDate);
//     // console.log("indianDateFormat", datePart);
//   }, [setFromDate]);

//   useEffect(() => {
//     // This code will be executed whenever `handleSelectedDate` changes.
//     // console.log('handleSelectedDate has changed');
//   }, [handleSelectedDate]);

//   useEffect(() => {
//     dispatch(GetgetSalesSummarytMethod(fromDate))
//   }, [fromDate]);




//   // console.log("first", salesReportData.length)



//   return (
//     <>
//       <View style={[styles.itemContainer, { marginBottom: 0, flexDirection: "row", padding: 0, paddingHorizontal: moderateScale(16) }]}>

//         <Text style={styles.listStyle}>{`Sales Summary (Business Date: ${fromDate})`}</Text>
//         <TouchableOpacity style={styles.generateButton}>
//           {/* <Text style={styles.buttonText}>Generate Receipt</Text> */}
//           {/* <MaterialCommunityIcons name="cloud-print" size={24} color='blue' /> */}
//           <Calender
//             placeholder="From Date"
//             onSelect={(date) => handleSelectedDate(date, 'From Date')}
//           />

//         </TouchableOpacity>
//       </View>

//       {salesSummaryData?.length === 0 ?
//         (
//           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <NoDataFound
//               text='No Sales Data'
//               iconName='cart-remove'
//               iconSize={50}
//             />
//           </View>
//         )
//         :
//         null}
//       <FlatList
//         data={salesSummaryData}
//         keyExtractor={keyExtractor}
//         renderItem={renderItem}
//         contentContainerStyle={styles.flatListContainer}
//       />

//     </>
//   );
// };

// const styles = StyleSheet.create({
//   flatListContainer: {
//     padding: 16,

//   },
//   itemContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//     padding: 16,
//     borderRadius: 8,
//     backgroundColor: 'white',
//     elevation: 2, // Android elevation
//     shadowColor: 'black', // iOS shadow color
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,

//   },
//   itemContent: {
//     flex: 1,
//   },
//   generateButton: {
//     marginLeft: 16,
//     padding: 8,
//     borderRadius: 4,
//     backgroundColor: '#fff',
//     // backgroundColor: 'red',
//   },
//   buttonText: {
//     color: 'white',
//     // color: 'blue',
//   },
//   listStyle: {
//     color: '#000',
//     color: 'grey'
//     // color: 'blue',
//   },
// });



// export default SalesSummary














/////////////

import React, { useCallback, memo, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { moderateScale } from '../../../../../../styles/responsiveSize';
import Calender from '../../../../../../Components/Calender';
import { GetgetSalesSummarytMethod } from '../../../../../../config/userApiMethods';
import NoDataFound from '../../../../../../Components/NoDataFound';
import { showMessage } from 'react-native-flash-message';

const getCurrentDateInIndianFormat = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed
  const year = currentDate.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${year}-${formattedMonth}-${formattedDay}`;
};

const ListItem = memo(({ item }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Text style={[styles.listStyle, {}]}>{`Business Date: `}
          <Text style={{ fontWeight: 'bold', color: '#000' }}>{item.business_date}</Text>
        </Text>
        <Text style={[styles.listStyle]}>{`Invoice Total: ₹${item.net_value}`}</Text>
        <Text style={[styles.listStyle]}>{`Tax Total: ₹${item.tax_total}`}</Text>
      </View>
    </View>
  );
});

const SalesSummary = () => {
  const { salesSummaryData } = useSelector((state) => state?.salesSummaryReducer);
  const keyExtractor = useCallback((item, index) => String(item?.business_date), []);
  const renderItem = useCallback(({ item }) => <ListItem item={item} />, []);
  const [fromDate, setFromDate] = useState(getCurrentDateInIndianFormat());
  const [toDate, setToDate] = useState(getCurrentDateInIndianFormat());
  const dispatch = useDispatch();

  const handleSelectedDate = useCallback((date, type) => {


    function extractDateFromTimestamp(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    }
    // const timestamp = "2023-12-30T10:21:00.000Z";
    const timestamp = date;
    const extractedDate = extractDateFromTimestamp(timestamp);

    ///////
    if (type === 'From Date') {
      setFromDate(extractedDate);
    } else {
      setToDate(extractedDate);
    }
  }, [setFromDate, setToDate]);

  useEffect(() => {
    dispatch(GetgetSalesSummarytMethod(fromDate, toDate));
  }, [fromDate, toDate]);

  // console.log("<>", fromDate, toDate)

  useFocusEffect(() => {
    showMessage({
      message: "Select Date",
      description: "Please Select from date and to date",
      type: "info",
    });

  })
  return (
    <>
      <View style={[{ flexDirection: "row", justifyContent: 'space-around', elevation: 2, backgroundColor: '#fff', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }]}>
        {/* <Text style={styles.listStyle}>{`Sales Summary (Business Date: ${fromDate} - ${toDate})`}</Text> */}
        {/* <TouchableOpacity style={styles.generateButton}> */}
        <Calender
          placeholder="From Date"
          onSelect={(date) => handleSelectedDate(date, 'From Date')}
        />
        <View style={{ justifyContent: 'center' }}>

          <Text style={[styles.listStyle, { fontWeight: 'bold' }]}>{`${fromDate}     -    ${toDate}`}</Text>
        </View>

        <Calender
          placeholder="To Date"
          onSelect={(date) => handleSelectedDate(date, 'To Date')}
        />
        {/* </TouchableOpacity> */}
      </View>

      {salesSummaryData?.length === 0 ?
        (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <NoDataFound
              text='No Sales Data'
              iconName='cart-remove'
              iconSize={50}
            />
          </View>
        )
        :
        null}
      <FlatList
        data={salesSummaryData}
        // keyExtractor={keyExtractor}
        keyExtractor={(item, index) => item.business_date}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContainer}
      />
    </>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  itemContent: {
    flex: 1,
  },
  generateButton: {
    marginLeft: 16,
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    backgroundColor: 'pink',
  },
  buttonText: {
    color: 'white',
  },
  listStyle: {
    color: '#000',
    color: 'grey',
  },
});

export default SalesSummary;
