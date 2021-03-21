import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const useFetchData = (url) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});

  //console.log("useFecthData hook","Fetching started");
  const doFetch = useCallback((options = {}) => {
    console.log("useFecthData hook", "do fetch datas");
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios(url, options);
        setResponse(res.data);
      } catch (err) {
        const data = err.response ? err.response.data : "Server error";
        setError(data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [isLoading, options, url]);

  return [{ response, error, isLoading }, doFetch];
};

// IMPORTANT:
// TODO:  get requests // doFetch();
// TODO:  post requests // doFetch({ method: "posts", data:{ user:{} } })
export default useFetchData;
