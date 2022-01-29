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

const redirectFB = () => {
  const url = "www.facebook.com/spotmies";
  redirectToAnotherPage(url);
};

const redirectInstagram = () => {
  const url = "www.instagram.com/spotmies";
  redirectToAnotherPage(url);
};

const redirectTwitter = () => {
  const url = "twitter.com/spotmies";
  redirectToAnotherPage(url);
};

const redirectYoutube = () => {
  const url = "www.youtube.com/channel/UChxfIgxe7BmyCamz-Zi6lsg";
  redirectToAnotherPage(url);
};

const redirectWhatsapp = () => {
  const url = "api.whatsapp.com/send?phone=8341980196";
  redirectToAnotherPage(url);
};

const redirectLinedin = () => {
  const url = "www.linkedin.com/company/spotmies-llp";
  redirectToAnotherPage(url);
};

export {
  redirectToAnotherPage,
  redirectToPartnerApp,
  redirectToPartnerPage,
  redirectFB,
  redirectInstagram,
  redirectTwitter,
  redirectYoutube,
  redirectWhatsapp,
  redirectLinedin,
};
