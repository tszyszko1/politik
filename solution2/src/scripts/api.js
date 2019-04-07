export const getData = async (type = "councillors") => {
  const response = await fetch(`http://ws-old.parlament.ch/${type}`, {
    headers: { Accept: "text/json" }
  });
  console.log("getting new data");
  return response.json();
};
