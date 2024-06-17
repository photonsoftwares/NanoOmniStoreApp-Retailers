import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import ImagePath from '../constants/ImagePath'
import { scale } from '../styles/responsiveSize'

const HomeSliderCompo = () => {
    return (
        <View style={styles.container}>
            {/* <TouchableOpacity > */}
            <Image
                // source={imgPath.banner}
                source={ImagePath?.nanoPos}
                //  source={{ uri : " https://media.geeksforgeeks.org/wp-content/uploads/20220221170632/ezgifcomgifmaker1.gif"}}     
                // resizeMode='contain'
                resizeMode='cover'
                style={styles.imgStyle} />
            {/* </TouchableOpacity> */}
        </View>
    )
}

export default HomeSliderCompo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        // margin: scale(4)
        
    },
    imgStyle: {
        height: '100%',
        width: '100%',
        borderRadius: 8
    }
})