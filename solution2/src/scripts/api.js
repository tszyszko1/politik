export const getData = async () => {
  const response = await fetch("http://ws-old.parlament.ch/councillors", {
    headers: { Accept: "text/json" }
  });
  console.log("getting new data");

  return response.json();
};
