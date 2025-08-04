import React, {useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {DeleteWithcross, RestoreBin} from '../assets/SVGs'
import {FONTS_FAMILY} from '../assets/Fonts'
import SpaceBetweenRow from '../components/wrapper/spacebetween'

const {width} = Dimensions.get('window')

const TrashScreen = ({navigation}) => {
  const [selectedCards, setSelectedCards] = useState([])

  const renderItem = ({item}) => {
    const isSelected = selectedCards.includes(item.id)

    const toggleSelect = () => {
      setSelectedCards(prev =>
        prev.includes(item.id)
          ? prev.filter(id => id !== item.id)
          : [...prev, item.id],
      )
    }

    return (
      <TouchableOpacity
        style={[
          styles.cardWrapper,
          isSelected && {borderColor: '#00f', borderWidth: 1},
        ]}
        onPress={toggleSelect}
        activeOpacity={0.8}>
        <View style={styles.card}>
          <Image source={{uri: item.image}} style={styles.cardImage} />
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.category}>{item.category}</Text>
          <SpaceBetweenRow>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
            <View
              style={{
                borderWidth: 4,
                height:12,
                padding:5,
                marginHorizontal:5,
                borderRadius:100,
                borderColor:'#8BC34A'
              }}
            />
          </SpaceBetweenRow>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}
        onPress={()=>navigation.goBack()}
        >
          <Icon name='close' size={24} color='white' />
          <Text style={styles.headerButtonText}>1</Text>
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton}>
            <RestoreBin />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <DeleteWithcross />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          contentContainerStyle={{gap: 12}}
        />
      </View>

      {/* Bottom Note */}
      <View style={styles.bottomNote}>
        <Text style={styles.noteText}>
          Campaigns in Trash are deleted after 30 days
        </Text>
        <TouchableOpacity>
          <Icon name='close' size={16} color='#666' />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#e53e3e',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    height: 100,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 4,
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    // padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // height:
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLeft: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    color: '#333',
    // lineHeight: 22,
    // marginVertical: 8,
    padding: 5,
  },
  tagContainer: {
    marginBottom: 8,
  },
  cardWrapper: {
    width: (width - 48) / 2, // Adjust for padding and spacing
    borderRadius: 12,
  },
  tag: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  category: {
    fontSize: 12,
    color: '#666',
    paddingHorizontal: 5,
  },
  statusBadge: {
    backgroundColor: '#666',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 100,
    height: 20,
    width: 50,
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 5,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardRight: {
    marginLeft: 16,
  },
  cardImage: {
    width: '100%',
    height: 159,
    // borderRadius: 8,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  bottomNote: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 18,
    // backgroundColor: 'white',
    // borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  noteText: {
    fontSize: 12,
    color: 'black',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
})

export default TrashScreen

const data = [
  {
    id: 1,
    title: 'Special Promo 11.11',
    category: 'Food & Beverage',
    status: 'DRAFT',
    image:
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop', // replace with your actual image
  },
  {
    id: 2,
    title: 'Independence Day Discount',
    category: 'Food & Beverage',
    status: 'DRAFT',
    image:
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop',
  },
]
