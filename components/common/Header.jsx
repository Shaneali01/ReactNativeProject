import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Header = ({title}) => {
  return (
     <View style={styles.header}>
                   <TouchableOpacity
                       style={styles.backButton}
                       onPress={() => router.back()}
                   >
                       <Ionicons name="chevron-back" size={24} color="#fff" />
                   </TouchableOpacity>
                   <Text style={styles.headerTitle}>{title}</Text>
                   <View style={styles.backButton} />
               </View>
   
  )
}

export default Header

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#008080",
        height: 140,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    headerTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        fontFamily:"Inter",
    },

})