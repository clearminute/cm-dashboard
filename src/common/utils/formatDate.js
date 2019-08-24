export default function formatDate(date, format) {
  const year = date.getFullYear();

  if (format === 'YYYYMMDD') {
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();

    return `${year}${month}${day}`;
  }

  if (format === 'JSON') {
    const day = date.getDate();
    const month = date.getMonth();

    return { year, month, day };
  }

  throw new Error('Unhandled formatDate format');
}
