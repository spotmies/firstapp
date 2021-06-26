module.exports = Object.freeze({
  baseUrl: "https://spotmiesserver.herokuapp.com/api",
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
    CREATE_ORDER: "/order/Create-Ord",
    NEW_USER: "/user/newUser",
    USER_RESPONSES: "/response/user",
  },
});
