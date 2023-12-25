const formatTimestamp = (timestamp) => {
  const date = timestamp?.toDate(); // Преобразование временной метки Firestore в объект Date
  const day = date?.getDate().toString().padStart(2, "0"); // День
  const month = (date?.getMonth() + 1).toString().padStart(2, "0"); // Месяц (начинается с 0)
  const year = date?.getFullYear(); // Год
  const hours = date?.getHours().toString().padStart(2, "0"); // Часы
  const minutes = date?.getMinutes().toString().padStart(2, "0"); // Минуты

  return `${day}.${month}.${year}, ${hours}:${minutes}`;
};

export default formatTimestamp;
