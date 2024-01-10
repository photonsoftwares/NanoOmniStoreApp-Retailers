// import { StyleSheet, Text, View, Button } from 'react-native'
// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { setStartDate } from '../../../../../../ReduxToolkit/features/salesReport'

// const SalesReport = () => {
//   const { salesReportData, startDate } = useSelector((state) => state?.salesReportReducer)
//   const { salesData } = useSelector((state) => state?.salesSummaryReducer)
//   const dispatch = useDispatch()


//   // console.log("salesReportData", salesReportData?.length, startDate)
//   return (
//     <View>
//       <Text>SalesReport</Text>
//       <Button title='nikl' onPress={() => dispatch(setStartDate('2023/12/20'))} />
//     </View>
//   )
// }

// export default SalesReport

// const styles = StyleSheet.create({})


// import React, { useCallback, memo } from 'react';
// import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useSelector } from 'react-redux';




// const ListItem = memo(({ item }) => {
//   const handlePress = () => {
//     // Handle item press, e.g., navigate to the PDF URL
//     console.log(`Pressed item ${item.invoice_no}`);
//   };

//   return (
//     <TouchableOpacity onPress={handlePress} style={styles.itemContainer}>
//       <View>
//         <Text>{`Invoice No: ${item.invoice_no}`}</Text>
//         <Text>{`Business Date: ${item.business_date}`}</Text>
//         <Text>{`Invoice Total: ${item.invoice_total}`}</Text>
//         <Text>{`Tax Total: ${item.tax_total}`}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// });

// const SalesReport = () => {
//   const { salesReportData, startDate } = useSelector((state) => state?.salesReportReducer)
//   const keyExtractor = useCallback((item) => String(item.invoice_no), []);
//   const renderItem = useCallback(({ item }) => <ListItem item={item} />, []);

//   return (
//     <FlatList
//       data={salesReportData}
//       keyExtractor={keyExtractor}
//       renderItem={renderItem}
//       contentContainerStyle={styles.flatListContainer}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   flatListContainer: {
//     padding: 16,
//   },
//   itemContainer: {
//     marginBottom: 16,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//   },
// });

// export default SalesReport;



import React, { useCallback, memo, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { moderateScale } from '../../../../../../styles/responsiveSize';
import Calender from '../../../../../../Components/Calender';
import { GetgetSalesReportMethod } from '../../../../../../config/userApiMethods';
import NoDataFound from '../../../../../../Components/NoDataFound';

const getCurrentDateInIndianFormat = () => {
  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed
  const year = currentDate.getFullYear();

  // Pad single-digit day and month with a leading zero
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${year}/${formattedMonth}/${formattedDay}`;
};



const ListItem = memo(({ item }) => {
  const navigation = useNavigation()

  const handlePress = () => {
    // Handle item press, e.g., navigate to the PDF URL
    console.log(`Pressed item ${item.invoice_no}`);
  };

  const handleGenerateReceipt = () => {
    // Handle generating receipt for the item
    console.log(`Generate receipt for item ${item.pdf_name}`);
    const pdf_file_name = item.pdf_name
    navigation.navigate('GenrateInvoicePdf', pdf_file_name)
    // console.log(pdf_file_name)

  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Text style={[styles.listStyle, { fontWeight: 'bold', color: '#000' }]}>{`Invoice No: ${item.invoice_no}`}</Text>
        <Text style={[styles.listStyle]}>{`Business Date: ${item.business_date}`}</Text>
        <Text style={[styles.listStyle]}>{`Invoice Total: ₹${item.invoice_total}`}</Text>
        <Text style={[styles.listStyle]}>{`Tax Total: ₹${item.tax_total}`}</Text>
      </View>
      <TouchableOpacity onPress={handleGenerateReceipt} style={styles.generateButton}>
        {/* <Text style={styles.buttonText}>Generate Receipt</Text> */}
        <MaterialCommunityIcons name="cloud-print" size={32} color='blue' />

      </TouchableOpacity>
    </View>
  );
});

const SalesReport = () => {
  const { salesReportData, startDate } = useSelector((state) => state?.salesReportReducer);
  const keyExtractor = useCallback((item) => String(item.invoice_no), []);
  const renderItem = useCallback(({ item }) => <ListItem item={item} />, []);
  const [fromDate, setFromDate] = useState(getCurrentDateInIndianFormat());
  const dispatch = useDispatch()

  // console.log("first.", fromDate)


  const handleSelectedDate = useCallback((date) => {
    // console.log("date", date);

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


    setFromDate(extractedDate);
    // console.log("indianDateFormat", datePart);
  }, [setFromDate]);

  useEffect(() => {
    // This code will be executed whenever `handleSelectedDate` changes.
    // console.log('handleSelectedDate has changed');
  }, [handleSelectedDate]);

  useEffect(() => {
    dispatch(GetgetSalesReportMethod(fromDate))
    // console.log("fromDate",fromDate)
  }, [fromDate]);

  // const dispatchGetSalesReport = useCallback(() => {
  //   dispatch(GetgetSalesReportMethod(fromDate));
  // }, [dispatch, fromDate]);

  // useFocusEffect(dispatchGetSalesReport);




  // console.log("first", salesReportData.length)



  return (
    <>
      <View style={[{ flexDirection: "row", justifyContent: 'space-around', elevation: 2, backgroundColor: '#fff', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }]}>

        <Text style={[styles.listStyle, { alignSelf: 'center', }]}>{`Business Date:  `}
          <Text style={{ fontWeight: 'bold' }}>{fromDate}</Text>
        </Text>
        <Calender
          placeholder="From Date"
          onSelect={(date) => handleSelectedDate(date, 'From Date')}
        />

      </View>

      {salesReportData.length === 0 ?
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
        data={salesReportData}
        keyExtractor={keyExtractor}
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
    backgroundColor: 'white',
    elevation: 2, // Android elevation
    shadowColor: 'black', // iOS shadow color
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderRadius:8

  },
  itemContent: {
    flex: 1,
  },
  generateButton: {
    marginLeft: 16,
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    // backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    // color: 'blue',
  },
  listStyle: {
    color: '#000',
    color: 'grey'
    // color: 'blue',
  },
});

export default SalesReport;
