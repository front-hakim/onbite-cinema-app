const formatDate = (d: string) => {
  const date = new Date(d);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}. ${month}. ${day}.`;
};

export default formatDate;
