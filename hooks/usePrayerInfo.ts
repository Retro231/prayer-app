// import { useState, useEffect } from "react";

// interface UpcomingPrayer {
//   name: string;
//   time: string;
// }

// interface ApiResponse {
//   timing: any | "";
//   date: string | "";
//   hijri: string | "";
//   upcomingPrayer: UpcomingPrayer;
// }

// interface Prayer {
//   name: string;
//   time: string;
// }

// interface PrayerWithMinutes extends Prayer {
//   minutes: number;
// }

// const usePrayerInfo = () => {
//   const [prayerInfo, setPrayerInfo] = useState<ApiResponse | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   const url = "http://api.aladhan.com/v1/timingsByAddress?address=London,UK";

//   useEffect(() => {
//     function getUpcomingPrayer(timings: Prayer[]): {
//       name: string;
//       time: string;
//     } {
//       // Get the current time in HH:mm format
//       const now = new Date();
//       const currentTime = now.getHours() * 60 + now.getMinutes();

//       // Convert time strings to minutes since midnight for comparison
//       const timesInMinutes: PrayerWithMinutes[] = timings.map(
//         (prayer: Prayer): PrayerWithMinutes => {
//           const [hours, minutes] = prayer.time.split(":").map(Number);
//           return { ...prayer, minutes: hours * 60 + minutes };
//         }
//       );

//       // Find the next upcoming prayer
//       const upcomingPrayer = timesInMinutes.find(
//         (prayer) => prayer.minutes > currentTime
//       );

//       // If no upcoming prayer is found for today, return the first prayer of the next day
//       return upcomingPrayer
//         ? { name: upcomingPrayer.name, time: upcomingPrayer.time }
//         : { name: timings[0].name, time: timings[0].time };
//     }

//     const getPrayerInfo = async () => {
//       try {
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error(`Error: ${response.status}`);
//         }
//         const result = await response.json();

//         const data = result.data;
//         const timingsObj = data.timings;
//         let timing = [];

//         for (const key in timingsObj) {
//           if (timingsObj.hasOwnProperty.call(timingsObj, key)) {
//             timing.push({
//               name: key,
//               time: timingsObj[key],
//             });
//           }
//         }

//         // const myTiming: Prayer[] = [
//         //   { name: "Fajr", time: "01:25" },
//         //   { name: "Sunrise", time: "01:10" },
//         //   { name: "Dhuhr", time: "01:20" },
//         //   { name: "Asr", time: "21:00" },
//         //   { name: "Sunset", time: "21:30" },
//         //   { name: "Maghrib", time: "22:48" },
//         //   { name: "Isha", time: "23:14" },
//         //   { name: "Imsak", time: "02:40" },
//         //   { name: "Midnight", time: "01:06" },
//         //   { name: "Firstthird", time: "23:40" },
//         //   { name: "Lastthird", time: "02:32" },
//         // ];

//         // timing = [...myTiming];

//         timing = timing.filter((prayer) =>
//           ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].includes(prayer.name)
//         );

//         const upcomingPrayer = getUpcomingPrayer(timing);

//         // const timings = timingsObj.map(([name, time]) => ({ name, time }));

//         const date = data.date.readable;
//         const hijri = `${data.date.hijri.day} ${data.date.hijri.month.en},${data.date.hijri.year}`;
//         setPrayerInfo({ timing, date, hijri, upcomingPrayer });
//       } catch (error) {
//         setError("An error occurred while fetching data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getPrayerInfo();
//   }, []);

//   return { prayerInfo, error, loading };
// };

// export default usePrayerInfo;

import { RootState } from "@/rtk/store";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

interface UpcomingPrayer {
  name: string;
  time: string;
}

interface ApiResponse {
  timing: any | "";
  date: string | "";
  hijri: string | "";
  upcomingPrayer: UpcomingPrayer;
}

interface Prayer {
  name: string;
  time: string;
}

interface PrayerWithMinutes extends Prayer {
  minutes: number;
}

const usePrayerInfo = () => {
  // const [is24HourFormat, setIs24HourFormat] = useState<boolean>(false);
  const { is24HourFormat } = useSelector((state: RootState) => state.app);
  const [prayerInfo, setPrayerInfo] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const url = "http://api.aladhan.com/v1/timingsByAddress?address=London,UK";

  // Function to convert 24-hour format to 12-hour format
  const convertTo12HourFormat = (time: string): string => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12; // Convert "0" to "12" for midnight
    return `${hour12}:${minutes < 10 ? `0${minutes}` : minutes} ${period}`;
  };

  const formatTime = (time: string): string => {
    return is24HourFormat ? time : convertTo12HourFormat(time);
  };

  useEffect(() => {
    function getUpcomingPrayer(timings: Prayer[]): {
      name: string;
      time: string;
    } {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

      const timesInMinutes: PrayerWithMinutes[] = timings.map(
        (prayer: Prayer): PrayerWithMinutes => {
          const [hours, minutes] = prayer.time.split(":").map(Number);
          return { ...prayer, minutes: hours * 60 + minutes };
        }
      );

      const upcomingPrayer = timesInMinutes.find(
        (prayer) => prayer.minutes > currentTime
      );

      return upcomingPrayer
        ? { name: upcomingPrayer.name, time: formatTime(upcomingPrayer.time) }
        : { name: timings[0].name, time: formatTime(timings[0].time) };
    }

    const getPrayerInfo = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();

        const data = result.data;
        const timingsObj = data.timings;
        let timing = [];

        for (const key in timingsObj) {
          if (timingsObj.hasOwnProperty.call(timingsObj, key)) {
            timing.push({
              name: key,
              time: timingsObj[key],
            });
          }
        }

        timing = timing.filter((prayer) =>
          ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].includes(prayer.name)
        );

        const upcomingPrayer = getUpcomingPrayer(timing);

        const date = data.date.readable;
        const hijri = `${data.date.hijri.day} ${data.date.hijri.month.en}, ${data.date.hijri.year}`;
        setPrayerInfo({
          timing: timing.map((prayer) => ({
            name: prayer.name,
            time: formatTime(prayer.time),
          })),
          date,
          hijri,
          upcomingPrayer,
        });
      } catch (error) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    getPrayerInfo();
  }, [is24HourFormat]);

  return { prayerInfo, error, loading };
};

export default usePrayerInfo;
