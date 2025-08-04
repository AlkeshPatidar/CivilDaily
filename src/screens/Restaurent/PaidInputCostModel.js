import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native'
import {Cross} from '../../assets/SVGs'
import CustomInputField from '../../components/wrapper/CustomInput'

const {height: screenHeight} = Dimensions.get('window')

const PaidInputModel = ({isVisible, onClose, onNext}) => {
  const [selectedType, setSelectedType] = useState('Barter')
  const [slideAnim] = useState(new Animated.Value(screenHeight))
  const [cost, setCost] = useState(0)


  useEffect(() => {
    if (isVisible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start()
    } else {
      Animated.spring(slideAnim, {
        toValue: screenHeight,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start()
    }
  }, [isVisible, slideAnim])

  const handleClose = () => {
    Animated.spring(slideAnim, {
      toValue: screenHeight,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start(() => {
      onClose()
    })
  }

  const handleNext = () => {
    onNext(cost)
    handleClose()
  }


  return (
    <Modal
      visible={isVisible}
      transparent
      animationType='none'
      onRequestClose={handleClose}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.modalContainer,
                {
                  transform: [{translateY: slideAnim}],
                },
              ]}>
              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={handleClose}
                  style={styles.closeButton}>
                  <Cross />
                </TouchableOpacity>
                <Text style={styles.title}>Paid Collaboration</Text>
                <View style={styles.placeholder} />
              </View>

              {/* Content */}
              <View style={styles.content}>
                <CustomInputField label={'Cost'} 
                onChangeText={setCost}
                keyboardType={'numeric'}
                />
              </View>

              {/* Next Button */}
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Submit</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 20,
    minHeight: 200,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
    fontWeight: '300',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  placeholder: {
    width: 32,
    height: 32,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D64A3A',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D64A3A',
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  nextButton: {
    backgroundColor: '#D64A3A',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
})

export default PaidInputModel
