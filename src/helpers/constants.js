module.exports = Object.freeze({
  // baseUrl: "https://spotmiesserver.herokuapp.com/api",
  baseUrl: "https://spotmies.herokuapp.com/api",
  socketUrl: "https://spotmies.herokuapp.com",
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
    NEW_INTERN_REGISTRATION: "/career/intern/new-intern-registration",
    new_partner_feedback: "/partner-feedback/new-feedback",
    new_suggestion: "/suggestion/new-suggestion",
    userLogin: "/public/user/login",
    feedback_questions: "/suggestion/feedback-question/feedback-questions/",
    cloud_constants: "/constant/doc-id/user_web",
    access_token: "/public/access-token",
    CREATE_NEW_CHAT: "/chat/createNewChatRoom",
    confirmDeclineOrder: "/order/stateChange",
  },
  servicesList: "/services/all-service-list",
  reviews: "/partner-feedback/feedbacks/partner/",
  get_faq: "/support/faq/all-faqs",
  routeConstants: {
    home: "home",
    partnerRegistration: "others",
  },
});
