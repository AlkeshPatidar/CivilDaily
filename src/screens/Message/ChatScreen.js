// import React, {useState} from 'react'
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   TextInput,
//   Modal,
//   StyleSheet,
//   StatusBar,
//   SafeAreaView,
//   Image,
// } from 'react-native'
// import {
//   Attachment,
//   Back,
//   Call,
//   Camera,
//   Cross,
//   Files,
//   Location,
//   Microphone,
//   Poll,
//   User,
//   Video,
// } from '../../assets/SVGs'
// import IMG from '../../assets/Images'
// import CustomButton from '../../components/Button'
// import CustomText from '../../components/TextComponent'
// import color from '../../common/Colors/colors'
// import {FONTS_FAMILY} from '../../assets/Fonts'
// // import {
// //   ArrowLeft,
// //   Phone,
// //   Video,
// //   Camera,
// //   Image,
// //   FileText,
// //   Mic,
// //   MapPin,
// //   Users,
// //   Send,
// //   X,
// // } from 'react-native-feather';

// const ChatScreen = ({navigation}) => {
//   const [showPopup, setShowPopup] = useState(false)
//   const [messageText, setMessageText] = useState('')

//   const messages = [
//     {
//       id: 1,
//       text: 'Hello',
//       sender: 'other',
//       time: '10:30 AM',
//     },
//     {
//       id: 2,
//       text: 'How are you doing?',
//       sender: 'me',
//       time: '10:32 AM',
//     },
//     {
//       id: 3,
//       text: "Hello, How's the day going?",
//       sender: 'other',
//       time: '10:35 AM',
//     },
//     {
//       id: 4,
//       text: 'Great glad working today!',
//       sender: 'me',
//       time: '10:36 AM',
//     },
//     {
//       id: 5,
//       text: 'How about watching movie?',
//       sender: 'other',
//       time: '10:38 AM',
//     },
//   ]

//   const ShareContentPopup = () => (
//     <Modal
//       visible={showPopup}
//       transparent={true}
//       animationType='slide'
//       onRequestClose={() => setShowPopup(false)}>
//       <View style={styles.modalOverlay}>
//         <TouchableOpacity
//           style={styles.modalBackground}
//           onPress={() => setShowPopup(false)}
//         />
//         <View style={styles.popupContainer}>
//           {/* Popup Header */}
//           <View style={styles.popupHeader}>
//             <TouchableOpacity onPress={() => setShowPopup(false)}>
//               <Cross />
//             </TouchableOpacity>
//             <Text style={styles.popupTitle}>Share Content</Text>
//             <View style={{width: 24}} />
//           </View>

//           {/* Share Options */}
//           <View style={styles.shareOptions}>
//             <TouchableOpacity style={styles.shareOption}>
//               <View style={styles.shareIconContainer}>
//                 <Camera />
//               </View>
//               <Text style={styles.shareOptionText}>Camera</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.shareOption}>
//               <View style={styles.shareIconContainer}>
//                 <Files />
//               </View>
//               <View>
//                 <Text style={styles.shareOptionText}>Documents</Text>
//                 <Text style={styles.shareOptionSubtext}>Share your files</Text>
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.shareOption}>
//               <View style={styles.shareIconContainer}>
//                 <Poll />
//               </View>
//               <View>
//                 <Text style={styles.shareOptionText}>Create a poll</Text>
//                 <Text style={styles.shareOptionSubtext}>
//                   Create a poll for any querry
//                 </Text>
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.shareOption}>
//               <View style={styles.shareIconContainer}>
//                 <Microphone />
//               </View>
//               <View>
//                 <Text style={styles.shareOptionText}>Media</Text>
//                 <Text style={styles.shareOptionSubtext}>
//                   Share photos and videos
//                 </Text>
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.shareOption}>
//               <View style={styles.shareIconContainer}>
//                 {/* <Users stroke="#666" width={24} height={24} /> */}
//                 <User />
//               </View>
//               <View>
//                 <Text style={styles.shareOptionText}>Contact</Text>
//                 <Text style={styles.shareOptionSubtext}>
//                   Share your contacts
//                 </Text>
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.shareOption}>
//               <View style={styles.shareIconContainer}>
//                 <Location />
//               </View>
//               <View>
//                 <Text style={styles.shareOptionText}>Location</Text>
//                 <Text style={styles.shareOptionSubtext}>
//                   Share your location
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   )

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle='dark-content' backgroundColor='#fff' />

//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.headerLeft}>
//           <TouchableOpacity onPress={()=>navigation.goBack()}>
//             <Back />
//           </TouchableOpacity>
//           <View style={styles.profileContainer}>
//             <View style={styles.profilePic}>
//               <Text style={styles.profileText}>J</Text>
//             </View>
//             <View style={styles.profileInfo}>
//               <Text style={styles.profileName}>Jasu Abraham</Text>
//               <Text style={styles.onlineStatus}>Online</Text>
//             </View>
//           </View>
//         </View>
//         <View style={styles.headerRight}>
//           <TouchableOpacity style={styles.headerButton}>
//             <Call />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.headerButton}>
//             <Video />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Messages */}
//       <ScrollView
//         style={styles.messagesContainer}
//         showsVerticalScrollIndicator={false}>
//         {messages.map(message => (
//           <View
//             key={message.id}
//             style={[
//               styles.messageBubble,
//               message.sender === 'me' ? styles.myMessage : styles.otherMessage,
//             ]}>
//             <Text
//               style={{
//                 ...styles.messageText,
//                 color: message.sender === 'me' ? 'white' : 'black',
//               }}>
//               {message.text}
//             </Text>
//           </View>
//         ))}
//       </ScrollView>

//       {/* Input Area */}
//       <View style={styles.inputContainer}>
//         <View style={styles.inputWrapper}>
//           <TouchableOpacity onPress={() => setShowPopup(true)}>
//             <Attachment style={{bottom: 10}} />
//           </TouchableOpacity>
//           <TextInput
//             style={styles.textInput}
//             placeholder='Write your message'
//             value={messageText}
//             onChangeText={setMessageText}
//             placeholderTextColor={'gray'}
//             multiline={true}
//           />
//           <TouchableOpacity
//             onPress={() => setShowPopup(true)}
//             style={{bottom: 10}}>
//             <Camera />
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity style={styles.sendButton}>
//           {/* <Send stroke="#fff" width={20} height={20} fill="#fff" /> */}
//           <CustomText
//             style={{
//               color: 'white',
//               fontFamily: 'Poppins-SemiBold',
//             }}>
//             Send
//           </CustomText>
//         </TouchableOpacity>
//       </View>

//       <ShareContentPopup />
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//     marginTop: 30,
//   },
//   headerLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   profileContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: 16,
//   },
//   profilePic: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#FFC107',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   profileText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   profileInfo: {
//     marginLeft: 12,
//   },
//   profileName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#000',
//   },
//   onlineStatus: {
//     fontSize: 12,
//     color: '#4CAF50',
//     marginTop: 2,
//   },
//   headerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   headerButton: {
//     marginLeft: 20,
//   },
//   messagesContainer: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingTop: 16,
//     backgroundColor: '#f8f9fa',
//   },
//   messageBubble: {
//     maxWidth: '80%',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderRadius: 20,
//     marginVertical: 4,
//   },
//   myMessage: {
//     alignSelf: 'flex-end',
//     backgroundColor: '#E53E3E',
//   },
//   otherMessage: {
//     alignSelf: 'flex-start',
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#e5e5e5',
//   },
//   messageText: {
//     fontSize: 14,
//     color: '#000',
//     fontFamily: 'Poppins-Regular',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderTopColor: '#f0f0f0',
//   },
//   inputWrapper: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     backgroundColor: '#f5f5f5',
//     borderRadius: 25,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginRight: 12,
//   },
//   textInput: {
//     flex: 1,
//     fontSize: 14,
//     maxHeight: 100,
//     color: '#000',
//   },
//   attachButton: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#E53E3E',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 8,
//   },
//   attachButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   sendButton: {
//     // width: 44,
//     // height: 44,
//     borderRadius: 22,
//     backgroundColor: '#E53E3E',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//   },
//   popupContainer: {
//     backgroundColor: 'white',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingBottom: 34,
//   },
//   popupHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   popupTitle: {
//     fontSize: 18,
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//     color: '#000',
//   },
//   shareOptions: {
//     paddingHorizontal: 20,
//     paddingTop: 16,
//   },
//   shareOption: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 16,
//   },
//   shareIconContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#F2F8F7',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 16,
//   },
//   shareOptionText: {
//     fontSize: 16,
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//     color: '#000',
//   },
//   shareOptionSubtext: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 2,
//     marginLeft: 4,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
// })

// export default ChatScreen

import React, {useState, useEffect, useRef} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
} from 'react-native'
import {
  Attachment,
  Back,
  Call,
  Camera,
  Cross,
  Files,
  Location,
  Microphone,
  Poll,
  User,
  Video,
} from '../../assets/SVGs'
import IMG from '../../assets/Images'
import CustomButton from '../../components/Button'
import CustomText from '../../components/TextComponent'
import color from '../../common/Colors/colors'
import {FONTS_FAMILY} from '../../assets/Fonts'
import { io } from "socket.io-client";

const ChatScreen = ({navigation, route}) => {
  const [showPopup, setShowPopup] = useState(false)
  const [messageText, setMessageText] = useState('')
  const [messages, setMessages] = useState([
  
  ])

  // Socket setup
  const socket = useRef(null);
  const currentUserId = "687f88d68573b5e7840101a2"; // Replace with actual user ID
  const receiverId = "68807c9642411e75bb4671d0"; // Replace with actual receiver ID

  useEffect(() => {
    // Only initialize socket if we have currentUserId
    if (!currentUserId) {
      console.log('❌ No currentUserId found:', currentUserId);
      return;
    }

    console.log('🔗 Connecting socket with userId:', currentUserId);
    console.log('💬 Receiver ID:', receiverId);

    // Initialize socket connection
    socket.current = io("http://10.33.251.149:8080");

    // Connection events
    socket.current.on('connect', () => {
      console.log('✅ Socket connected successfully');
      // Join room after connection
      socket.current.emit("joinRoom", { userId: currentUserId });
      console.log('🏠 Joining room with userId:', currentUserId);
    });

    socket.current.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });

    socket.current.on('error', (error) => {
      console.log('🚨 Socket error:', error);
    });

    // Listen for incoming messages
    socket.current.on("receiveMessage", (msg) => {
      console.log('📨 Message received:', msg);
      
      const newMessage = {
        id: Date.now(),
        text: msg.message,
        sender: msg.senderId === currentUserId ? 'me' : 'other',
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      
      setMessages(prevMessages => [...prevMessages, newMessage]);
      
      // Mark message as read
      socket.current.emit("markAsRead", { messageId: msg._id });
    });

    // Cleanup on unmount
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [currentUserId]);

  const sendMessage = () => {
    if (!messageText.trim()) return;

    const messageData = {
      senderId: currentUserId,
      senderModel: "Brand",
      receiverId: receiverId,
      receiverModel: "Influencer",
      type: "text",
      message: messageText,
    };

    // Send message via socket
    socket.current.emit("sendMessage", messageData);

    // Add message to local state immediately
    const newMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setMessageText('');
  };

  const ShareContentPopup = () => (
    <Modal
      visible={showPopup}
      transparent={true}
      animationType='slide'
      onRequestClose={() => setShowPopup(false)}>
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={() => setShowPopup(false)}
        />
        <View style={styles.popupContainer}>
          {/* Popup Header */}
          <View style={styles.popupHeader}>
            <TouchableOpacity onPress={() => setShowPopup(false)}>
              <Cross />
            </TouchableOpacity>
            <Text style={styles.popupTitle}>Share Content</Text>
            <View style={{width: 24}} />
          </View>

          {/* Share Options */}
          <View style={styles.shareOptions}>
            <TouchableOpacity style={styles.shareOption}>
              <View style={styles.shareIconContainer}>
                <Camera />
              </View>
              <Text style={styles.shareOptionText}>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.shareOption}>
              <View style={styles.shareIconContainer}>
                <Files />
              </View>
              <View>
                <Text style={styles.shareOptionText}>Documents</Text>
                <Text style={styles.shareOptionSubtext}>Share your files</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.shareOption}>
              <View style={styles.shareIconContainer}>
                <Poll />
              </View>
              <View>
                <Text style={styles.shareOptionText}>Create a poll</Text>
                <Text style={styles.shareOptionSubtext}>
                  Create a poll for any querry
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.shareOption}>
              <View style={styles.shareIconContainer}>
                <Microphone />
              </View>
              <View>
                <Text style={styles.shareOptionText}>Media</Text>
                <Text style={styles.shareOptionSubtext}>
                  Share photos and videos
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.shareOption}>
              <View style={styles.shareIconContainer}>
                {/* <Users stroke="#666" width={24} height={24} /> */}
                <User />
              </View>
              <View>
                <Text style={styles.shareOptionText}>Contact</Text>
                <Text style={styles.shareOptionSubtext}>
                  Share your contacts
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.shareOption}>
              <View style={styles.shareIconContainer}>
                <Location />
              </View>
              <View>
                <Text style={styles.shareOptionText}>Location</Text>
                <Text style={styles.shareOptionSubtext}>
                  Share your location
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='#fff' />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Back />
          </TouchableOpacity>
          <View style={styles.profileContainer}>
            <View style={styles.profilePic}>
              <Text style={styles.profileText}>J</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Jasu Abraham</Text>
              <Text style={styles.onlineStatus}>Online</Text>
            </View>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Call />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Video />
          </TouchableOpacity>
        </View>
      </View>

     
      {/* Messages */}
      <ScrollView
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        ref={ref => {
          if (ref) {
            setTimeout(() => ref.scrollToEnd({animated: true}), 100);
          }
        }}>
        {messages.map(message => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.sender === 'me' ? styles.myMessage : styles.otherMessage,
            ]}>
            <Text
              style={{
                ...styles.messageText,
                color: message.sender === 'me' ? 'white' : 'black',
              }}>
              {message.text}
            </Text>
            <Text style={{
              ...styles.messageTime,
              color: message.sender === 'me' ? 'rgba(255,255,255,0.8)' : '#666',
            }}>
              {message.time}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TouchableOpacity onPress={() => setShowPopup(true)}>
            <Attachment style={{bottom: 10}} />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder='Write your message'
            value={messageText}
            onChangeText={setMessageText}
            placeholderTextColor={'gray'}
            multiline={true}
          />
          <TouchableOpacity
            onPress={() => setShowPopup(true)}
            style={{bottom: 10}}>
            <Camera />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <CustomText
            style={{
              color: 'white',
              fontFamily: 'Poppins-SemiBold',
            }}>
            Send
          </CustomText>
        </TouchableOpacity>
      </View>

      <ShareContentPopup />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginTop: 30,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFC107',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileInfo: {
    marginLeft: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  onlineStatus: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 20,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#f8f9fa',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginVertical: 4,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#E53E3E',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  messageText: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Poppins-Regular',
  },
  messageTime: {
    fontSize: 10,
    marginTop: 4,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    maxHeight: 100,
    color: '#000',
  },
  attachButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E53E3E',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  attachButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sendButton: {
    borderRadius: 22,
    backgroundColor: '#E53E3E',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  popupContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34,
  },
  popupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  popupTitle: {
    fontSize: 18,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
    color: '#000',
  },
  shareOptions: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  shareOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  shareIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F8F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  shareOptionText: {
    fontSize: 16,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
    color: '#000',
  },
  shareOptionSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    marginLeft: 4,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
})

export default ChatScreen
