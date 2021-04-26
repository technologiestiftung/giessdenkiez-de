export const formatUnixTimestamp = (unix_timestamp: string): string => {
  const sliced = unix_timestamp.slice(0, 16);
  const date = new Date(sliced);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();

  return `${day}. ${month}. ${year}`;
};
