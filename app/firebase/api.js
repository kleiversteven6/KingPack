import {
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from './firebase';
const collectionName = 'your_urls';
const collectionlog = 'log_urlsShort';

export const saveWebsite = newLink =>
  addDoc(collection(db, collectionName), newLink);

export const savelog = datalog =>
  addDoc(collection(db, collectionlog), datalog);

export const updateWebsite = (id, updatedFields) =>
  updateDoc(doc(db, collectionName, id), updatedFields);

export const onGetLinks = callback => {
  const unsub = onSnapshot(collection(db, collectionName), callback);
  return unsub;
};

export const getWebsiteShort = short =>
  getDocs(query(collection(db, collectionName), where('short', '==', short)));

export const getWebsites = () => getDocs(collection(db, collectionName));

export const deleteWebsite = id => deleteDoc(doc(db, collectionName, id));

export const getWebsite = id => getDoc(doc(db, collectionName, id));

export const updateClicksCountries = (id, updatedFields) =>
  updateDoc(doc(db, collectionName, id), updatedFields);

export const getGraphLineInfo = async id => {
  let thisYear = new Date(Date.now());
  thisYear = thisYear.getFullYear(); // Contiene año actual

  const querySnapshot = await getDocs(
    query(
      collection(db, collectionlog),
      where('idurl', '==', id),
      where('DateTime', '>', new Date(`1/1/${thisYear}`)),
      where('DateTime', '<', new Date(`12/31/${thisYear}`)),
      orderBy('DateTime'),
    ),
  );

  const month = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  querySnapshot.forEach(data => {
    const datos = data.data();
    const fecha = new Date(datos.DateTime.toDate().toString());

    month[fecha.getMonth()] += 1;
  });

  return month;
};

export const getGroupCountry = async id => {
  const querySnapshot = await getDocs(
    query(
      collection(db, collectionlog),
      where('idurl', '==', id),
      where('DateTime', '>', new Date('11/1/2022')),
      where('DateTime', '<', new Date('11/30/2022')),
      orderBy('DateTime'),
    ),
  );

  const countries = [];
  const weeks = [];
  const drill = [];

  querySnapshot.forEach(data => {
    const datos = data.data();

    // Clicks por Paises --------------------------------------------------------------------
    const found = countries.find(
      obj => obj.country === datos.countryCode.toLowerCase(),
    );

    if (found) {
      found.clicks += 1;
    } else {
      const reg = { country: datos.countryCode.toLowerCase(), clicks: 1 };
      countries.push({ ...reg });
    }

    // Clicks por Fecha ---------------------------------------------------------------------
    const fecha = new Date(datos.DateTime.toDate().toString());

    // Semanas
    function getWeek() {
      const a = new Date(fecha.getFullYear(), 0, 1);
      const b = Math.floor((fecha - a) / (24 * 60 * 60 * 1000));
      return Math.ceil(b / 7);
    }

    function getWeekLength(x = 'end', y = 0) {
      let a = new Date(Date.now());
      a = a.getFullYear(); // Contiene año actual

      const b = new Date(); // Variable con Fecha resultado
      const c = getWeek() * 7; // Contiene cantidad de semanas actuales

      if (x === 'start') {
        b.setFullYear(a, 0, c - 5);
        if (b.getFullYear() !== fecha.getFullYear()) b.setFullYear(a, 0, 1);
      } else {
        b.setFullYear(a, 0, c + (1 - y));
        if (b.getFullYear() !== fecha.getFullYear()) b.setFullYear(a, 11, 31);
      }

      return b.toLocaleDateString();
    }

    // Dias de las semanas + Asignar Semanas ------------------------------------------------
    // Semanas
    const week = getWeek() + 1;
    const weekFound = weeks.find(obj => obj.drilldown === week);

    // Dias
    const dayList = [
      [`Domingo <br/> ${getWeekLength('end', 6)}`, 0],
      [`Lunes <br/> ${getWeekLength('end', 5)}`, 0],
      [`Martes <br/> ${getWeekLength('end', 4)}`, 0],
      [`Miercoles <br/> ${getWeekLength('end', 3)}`, 0],
      [`Jueves <br/> ${getWeekLength('end', 2)}`, 0],
      [`Viernes <br/> ${getWeekLength('end', 1)}`, 0],
      [`Sabado <br/> ${getWeekLength('end')}`, 0],
    ];

    if (weekFound) {
      weekFound.y += 1; // Semanas++

      // Dias++
      let k = 0;
      const drillFound = drill.find(obj => obj.id === week);
      drillFound.data.forEach(obj => {
        if (obj[0] === dayList[fecha.getDay()][0]) drillFound.data[k][1] += 1;
        k += 1;
      });
    } else {
      // Nueva Semana
      let dete = [];

      if (getWeek() !== 0) dete = dayList;
      else {
        for (let k = 0; k < 7; k += 1) {
          if (k >= fecha.getDay()) dete.push([...dayList[k]]);
        }
      }

      let k = 0;
      dete.forEach(obj => {
        if (obj[0] === dayList[fecha.getDay()][0]) dete[k][1] += 1;
        k += 1;
      });

      // Asignar Valores
      const w = {
        drilldown: week,
        y: 1,
        name: `${getWeekLength('start')} - ${getWeekLength()}`,
      };

      const d = {
        name: `${getWeekLength('start')} - ${getWeekLength()}`,
        id: week,
        data: dete,
      };

      weeks.push({ ...w });
      drill.push({ ...d });
    }
  });

  // Retornar Valores de la Funcion -------------------------------------------------------
  const mapamundi = [];
  countries.forEach(data => {
    const propertyNames = Object.values(data);
    mapamundi.push([...propertyNames]);
  });

  return { mapamundi, weeks, drill };
};
