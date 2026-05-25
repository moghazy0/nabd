import axios from "axios";

export const getPrayerTimes = async (lat, lon) => {
  const res = await axios.get(
    "https://api.aladhan.com/v1/timings",
    {
      params: {
        latitude: lat,
        longitude: lon,
        method: 5,
      },
    }
  );

  return res.data.data.timings;
};