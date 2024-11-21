export default {
sendUserOtp:'/user/LoginUser',
verfyUserOtp:'/user/VerifyOtp',
getAllGames:'/admin/GetAllGames',
createUserDetail:'/user/UpdateUser',
addUserAddress:'/user/UpdateAddress',
addPrefferedGames:'/user/addPreferredSports',
getUserProfile:'/user/GetUserProfile',
getUserNearByTurfs:'/user/GetAllTurf?city=',
// -------------
getAllUsersArenas:'/user/GetAllAreana',
getA_arenaForUser:'/user/GetaArena',
getTurfOfaArenaSportWise:'/user/GetAllTurfOfArenaSportWise',
bookMultipleSlot:'/user/bookTurfMultiSlot',
updateMultiSlotsPaymentStatus:'/user/UpdateTurfmultipleslotpaymentStatus',
getBookingSummary:'/user/GetBookingSummary',
getRecommendedArena:'/user/GetRecommandedAreana',
getNearByArena:'/user/GetNearByAreana?zip_code&city=Bhopal&state',
getUserNotification:'/user/GetUserNotification',
ArenaRating:'/user/CreateArenaReview',
ApplyCoupanCode:'/user/findcouponCode',

// -------------

AllAprovedTurfs:'/admin/GetAllApprovedTurf',
getAturf:'/user/GetaTurf',
getAllUsersMyturfBookings:'/user/GetAllMyturfBooking',
updateUser:'/user/UpdateUser',
turfSlot:'/user/bookTurfSlot',
onPay:'/user/UpdateTurfpaymentStatus',
cancelTurfBookingbyUser:'/user/cancelTurfBooking',

// owner
registerOwner:'/turf/RegisterTurfOwner',
getOwnerProfile:'/turf/GetturfOwnerprofile',
updateOwner:'/turf/UpdateTurfOwner',
OwnerLogin:'/turf/TurfLogin',
verifyOwnerOtp:'/turf/VerifyOtp',
getEarninigsOfOwner:'/turf/GetAllEarningofaTurfOwner',
getAllApproveredTurfsOfOwner:'/turf/GetAllApprovedTurfofowner',
getAllOwnersTurfsBooking:'/turf/GetAllBookingofatrufowner',
getAllMyArena:'/turf/GetAllArenaofaOwner', 
getAllApprovedTurfOfArena:'/turf/GetAllApproveTurfOfArena',
getArenabyOwnerId:'/admin/GetAllTurfofaOwner',
cancelTurfBookingbyOwner:'/turf/cancelTurfBooking',
getOwnerNotification:'/turf/GetTurfOwnerNotification',





};
