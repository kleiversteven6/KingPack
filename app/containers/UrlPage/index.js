/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { getWebsiteShort, updateWebsite, savelog } from '../../firebase/api';
import { getIp } from '../../services/services';

export default function UrlPage({ match }) {
  const websiteshort = async () => {
    const querySnapshot = await getWebsiteShort(match.params.short);
    const datos = await getIp();
    let url = {};
    querySnapshot.forEach(doc => {
      url = doc.data();
      url.id = doc.id;
    });

    const newLink = {
      cliks: url.cliks + 1,
    };
    await updateWebsite(url.id, newLink);
    const DateTime = new Date();
    const newLinkLog = {
      DateTime,
      CITY: datos.city,
      country: datos.country,
      countryCode: datos.countryCode,
      regionname: datos.regionName,
      ip: datos.query,
      short: match.params.short,
    };
    await savelog(newLinkLog);
    window.location.href = url.url;
  };

  useEffect(() => {
    websiteshort();
  }, []);
  return <></>;
}
