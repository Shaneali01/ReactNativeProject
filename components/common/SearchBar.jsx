import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'

const SearchBar = () => {
  return (
    <View style={styles.searchBar}>
                        <Text style={styles.searchPlaceholder}>Search</Text>
                        <View style={styles.searchIcons}>
                            <Ionicons name="search" size={18} color="#999" />
                            <Ionicons name="options-outline" size={20} color="#999" style={{ marginLeft: 12 }} />
                        </View>
                    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
     searchBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        marginHorizontal: 20,
        marginTop: 20,
        paddingHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#DCDCDC",
    },
    searchPlaceholder: {
        color: "#6C7278",
        fontSize: 14,
        fontWeight: "400",
        paddingHorizontal:14,
        paddingVertical:16
    },
    searchIcons: {
        flexDirection: "row",
        alignItems: "center",
    },

})