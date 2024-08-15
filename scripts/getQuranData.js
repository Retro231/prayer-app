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
  const url = `https://api.alquran.cloud/v1/surah/${surahNo}/editions/ar.abdullahbasfar`;
  const headers = {
    Accept: "application/json",
  };

  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });

  const json = await response.json();
  return json.data[0].ayahs;
};

const getJuz = async () => {
  const url = "https://api.quran.com/api/v4/juzs";
  const headers = {
    Accept: "application/json",
  };

  const response = await fetch(url, { method: "GET", headers: headers });
  const data = await response.json();
  if (data) {
    const juzs = data.juzs.filter((item) => item.number <= 30);
    return juzs;
  }
};

// export const getQuranData = async () => {};

export { getSurahList, getAyahs, getAudioAyahs, getJuz };
