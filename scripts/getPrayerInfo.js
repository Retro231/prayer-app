export const getPrayerInfo = async () => {
  const url = "http://api.aladhan.com/v1/timingsByAddress?address=London,UK";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const result = await response.json();

    const data = result.data;
    const timeingsObj = data.timings;
    let timeing = [];

    for (const key in timeingsObj) {
      if (timeingsObj.hasOwnProperty.call(timeingsObj, key)) {
        timeing.push({
          name: key,
          time: timeingsObj[key],
        });
      }
    }

    const myTiming = [
      { name: "Fajr", time: "01:25" },
      { name: "Sunrise", time: "01:10" },
      { name: "Dhuhr", time: "01:20" },
      { name: "Asr", time: "21:00" },
      { name: "Sunset", time: "21:30" },
      { name: "Maghrib", time: "20:48" },
      { name: "Isha", time: "23:14" },
      { name: "Imsak", time: "02:40" },
      { name: "Midnight", time: "01:06" },
      { name: "Firstthird", time: "23:40" },
      { name: "Lastthird", time: "02:32" },
    ];

    timeing = [...myTiming];

    // const timings = timingsObj.map(([name, time]) => ({ name, time }));

    const date = data.date.readable;
    const hijri = `${data.date.hijri.day} ${data.date.hijri.month.en},${data.date.hijri.year}`;

    return { timeing, date, hijri };
  } catch (error) {
    console.log(error);
  }
};
