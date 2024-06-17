// import React, { useState } from 'react';
// import { View, Text, Button, Linking } from 'react-native';

// const AppUpdateCompo = () => {


//     // Function to open Play Store for updating
//     const openPlayStore = () => {
//         // Replace 'your.package.name' with your app's package name
//         Linking.openURL('https://play.google.com/store/apps/details?id=com.omniretailer')
//             .catch(err => console.error('An error occurred', err));
//     };

//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <View>
//                 <Text>New update available!</Text>
//                 <Button title="Update Now" onPress={openPlayStore} />
//             </View>
//         </View>
//     );
// };

// export default AppUpdateCompo;




import React, { useState } from 'react';
import { View, Text, Button, Linking, Modal, StyleSheet } from 'react-native';

const AppUpdateCompo = () => {
  const [modalVisible, setModalVisible] = useState(true);

  // Function to open Play Store for updating
  const openPlayStore = () => {
    Linking.openURL('https://play.google.com/store/apps/details?id=com.omniretailer')
      .catch(err => console.error('An error occurred', err));
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>New update available!</Text>
            <Button title="Update Now" onPress={openPlayStore} />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      <Button title="Check for Updates" onPress={() => setModalVisible(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
});

export default AppUpdateCompo;
