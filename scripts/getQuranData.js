const getSurahList = async () => {
  const url = "http://api.alquran.cloud/v1/surah";
  const headers = {
    Accept: "application/json",
  };

  const response = await fetch(url, { method: "GET", headers: headers });

  const json = await response.json();

  return json.data;
};

const getAyahs = async (surahNo) => {
  const url = `https://api.alquran.cloud/v1/surah/${surahNo}`;
  const headers = {
    Accept: "application/json",
  };

  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });

  const json = await response.json();

  return json.data;
};

const getAudioAyahs = async (surahNo) => {
  // https://api.alquran.cloud/v1/surah/1/editions/ar.abdullahbasfar
  const url = `https://api.alquran.cloud/v1/surah/${surahNo}/editions/ar.abdullahbasfar,en.ahmedali`;

  const headers = {
    Accept: "application/json",
  };

  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });

  const json = await response.json();
  return json.data;
};

const getJuzData = async (juz_number) => {
  const ayahURL = `https://api.alquran.cloud/v1/juz/${juz_number}/ar.abdullahbasfar`;
  const translationURL = `https://api.alquran.cloud/v1/juz/${juz_number}/en.ahmedali`;

  const headers = {
    Accept: "application/json",
  };
  const response1 = await fetch(ayahURL, {
    method: "GET",
    headers: headers,
  });
  const response2 = await fetch(translationURL, {
    method: "GET",
    headers: headers,
  });

  // ayah
  const json1 = await response1.json();
  // translation
  const json2 = await response2.json();

  const data = [json1.data, json2.data];
  console.log(json2.data);
  return data;
};

const getJuz = async () => {
  const url = "https://api.quran.com/api/v4/juzs";
  const headers = {
    Accept: "application/json",
  };

  const response = await fetch(url, { method: "GET", headers: headers });
  const data = await response.json();
  if (data) {
    const juzs = data.juzs.filter((item) => item.id <= 30);
    return juzs;
  }
};

const getTafsir = async (surahID) => {
  const url = `https://api.alquran.cloud/v1/surah/${surahID}/ar.muyassar`;
  const headers = {
    Accept: "application/json",
  };

  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });

  const json = await response.json();
  return json.data;
};

// export const getQuranData = async () => {};

export { getSurahList, getAyahs, getAudioAyahs, getJuz, getTafsir, getJuzData };
