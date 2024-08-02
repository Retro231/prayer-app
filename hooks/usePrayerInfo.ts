import { getPrayerInfo } from "@/scripts/getPrayerInfo";
import { useState, useEffect } from "react";

const usePrayerInfo = () => {
  const [data, setData] = useState<{
    timeing: any;
    date: any;
    hijri: any;
  }>({
    timeing: null,
    date: null,
    hijri: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    const data = await getPrayerInfo();
    setData({
      timeing: data?.timeing,
      date: data?.date,
      hijri: data?.hijri,
    });
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return { data, loading, error };
};

export default usePrayerInfo;
