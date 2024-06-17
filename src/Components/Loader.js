import React from 'react';
import { View, Modal ,ActivityIndicator} from 'react-native';
import commonStyles from '../styles/commonStyles';
import colors from '../styles/colors';

const Loader = (props) => {
    const { isLoading } = props;
    if (isLoading) {
        return (
            <Modal transparent visible={isLoading} >
                <View style={{ ...commonStyles.loader, backgroundColor: "rgba(0,0,0,0.3)" }}>
                    <ActivityIndicator size={25} color={colors.theme} />
                </View>
            </Modal>
        );
    }
    return null;
};

export default Loader;
