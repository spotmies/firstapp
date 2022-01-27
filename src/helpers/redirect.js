const redirectToAnotherPage = (url) => {
  window.open(`https://${url}`, "_blank");
};

const redirectToPartnerApp = () => {
  const url = "play.google.com/store/apps/details?id=com.spotmiespartner";
  redirectToAnotherPage(url);
};

const redirectToPartnerPage = () => {
  const url = "/service-partner";
  window.location.href = url;
};

export { redirectToAnotherPage, redirectToPartnerApp, redirectToPartnerPage };
