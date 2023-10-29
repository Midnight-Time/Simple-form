import showMessage from "./modal";

const sendData = async function (data) {
  const response = await fetch(
    "https://my-project-83d90-default-rtdb.firebaseio.com/portfolioForm.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(`Something went wrong! Error:${response.status}`);
  } else {
    showMessage("Your message was successfully delivered!");
  }
};

export default sendData;
