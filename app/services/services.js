export async function getIp(ip = '') {
  const ehe = new Promise(resolve => {
    const req = new XMLHttpRequest();

    req.open(
      'GET',
      `http://ip-api.com/json/${ip}?fields=status,country,countryCode,regionName,city,district,query`,
      true,
    );
    req.send();

    req.onreadystatechange = () => {
      if (req.readyState === XMLHttpRequest.DONE) {
        resolve(JSON.parse(req.response));
      }
    };
  });

  const ready = await ehe;

  return ready;
}

export const getNavigator = () => {
  let nav = JSON.stringify(navigator.userAgent);
  let resp = 'Dispositivo Generico';

  nav = nav.toLowerCase();

  if (nav.search('windows') !== -1) resp = 'Windows';
  if (nav.search('linux') !== -1) resp = 'Linux';
  if (nav.search('macintosh') !== -1) resp = 'macOS';
  if (nav.search('android') !== -1) resp = 'Android';
  if (nav.search('iphone') !== -1) resp = 'iPhone';
  if (nav.search('ipad') !== -1) resp = 'iPad';

  return resp;
};
