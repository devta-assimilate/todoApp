import { StyleSheet } from "react-native";
import { BLACK, BLUE, GRAY_SHADE, WHITE } from "../Colors";

export const MainScreenStyle = StyleSheet.create({
    mainBody: {
        flex: 1,
        backgroundColor: WHITE
    },
    countBody: {
        color: BLACK,
        padding: 10
    },
    filterIcon: {
        fontSize: 15,
        color: WHITE,
        right: 20,
        top: 8
    },

    sortMenu: {
        backgroundColor: BLACK,
        borderWidth: 1,
        borderColor: WHITE,
        marginHorizontal: 10,
        borderRadius: 8,
        overflow: 'hidden',
    },

    sortItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: BLACK,
    },

    sortText: {
        color: BLACK,
        fontSize: 14,
    },
    buttonBody: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    selectedButton: {
        backgroundColor: BLUE,      
    },

    unselectedButton: {
        backgroundColor: GRAY_SHADE, 
    },
    buttonStyle: {
        flexDirection: "row",
        backgroundColor: BLUE,
        height: 30,
        borderRadius: 8,
        paddingHorizontal: 20,
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        color: WHITE,
        fontSize: 14,
        letterSpacing: 0.5,
    }

})