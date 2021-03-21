let currentHostUrl;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // dev code
  currentHostUrl = process.env.REACT_APP_DEV_URL;
} else {
  // production code
  currentHostUrl = process.env.REACT_APP_LIVE_URL;
}

export default currentHostUrl;
