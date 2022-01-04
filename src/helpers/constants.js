module.exports = Object.freeze({
  baseUrl: "https://spotmiesserver.herokuapp.com/api",
  socketUrl: "https://spotmiesserver.herokuapp.com",
  localHostSocketUrl: "http://localhost:4000",
  localHostUrl: "http://localhost:4000/api",
  devBaseUrl:
    "https://cors-anywhere.herokuapp.com/https://spotmiesserver.herokuapp.com/api",
  feedBackurl: "/feed",
  partnerRegistration: "/partnerRegistration",
  contactUs: "/contactUs",
  feedBack: "/feedBack",
  uploadFileLink: "",
  constants: {
    demoVersion: false,
    restrictLogin: true,
    localBacked: false,
    categories: [
      "Ac/Refrigirator Service",
      "Computer/laptop Service",
      "Tv Repair",
      "Development",
      "Tutor",
      "Beauty",
      "Photographer",
      "Driver",
      "Events",
      "Electrician",
      "Carpenter",
      "Plumber",
      "Interior Design",
      "Design",
      "CC Tv Installation",
      "Catering",
    ],
  },
  api: {
    USER_DETAILS: "/user/users", //PASS UID AT LAST
    USER_ORDERS: "/order/user", //PASS UID AT LAST
    ORDER_DETAILS: "/order/orders", //PASS ORDER ID AT LAST
    PARTNER_DETAILS: "/partner/partners", //PASS PID AT LAST
    NEW_CHAT: "/chat/createNewChatRoom",
    USER_CHATS: "/chat/user",
    CREATE_ORDER: "/order/Create-Ord",
    NEW_USER: "/user/newUser",
    USER_RESPONSES: "/response/user",
    ORDER_RESPONSES: "/response/responses",
    NEW_INTERN_REGISTRATION:"/career/intern/new-intern-registration"
  },
  servicesList: "/services/all-service-list",
  reviews: "/partner-feedback/feedbacks/partner/"
});
