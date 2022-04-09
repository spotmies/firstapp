const redirectToAnotherPage = (url) => {
  window.open(`https://${url}`, "_blank");
};

const redirectToPartnerApp = () => {
  const url = "play.google.com/store/apps/details?id=com.spotmiespartner";
  redirectToAnotherPage(url);
};

const redirectToUserApp = () => {
  const url = "play.google.com/store/apps/details?id=com.spotmies";
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

const sekharLinkedin = () => {
  const url = "www.linkedin.com/in/sekhar-javvadi-987380158";
  redirectToAnotherPage(url);
};

const satishLinkedin = () => {
  const url = "www.linkedin.com/in/saride-satish-kumar-59a26a187";
  redirectToAnotherPage(url);
};

const naveenLinkedin = () => {
  const url = "www.linkedin.com/in/naveen-kumar-atava-318ba318a";
  redirectToAnotherPage(url);
};

const gowriLinkedin = () => {
  const url = "www.linkedin.com/in/gowrishankar-sonaila-b463981b1";
  redirectToAnotherPage(url);
};

const hemanthLinkedin = () => {
  const url = "www.linkedin.com/in/hemanth-kumar-veeranala-967ba318a";
  redirectToAnotherPage(url);
};

const tejaLinkedin = () => {
  const url = "www.linkedin.com/in/teja-pekala-3418231b6";
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
  satishLinkedin,
  sekharLinkedin,
  naveenLinkedin,
  gowriLinkedin,
  hemanthLinkedin,
  tejaLinkedin,
  redirectToUserApp,
};
