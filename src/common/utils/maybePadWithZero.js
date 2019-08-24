export default function maybePadWithZero(value) {
  if (String(value).length === 1) {
    return `0${value}`;
  }

  return String(value);
}
