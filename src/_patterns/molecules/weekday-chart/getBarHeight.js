const MAX_BAR_HEIGHT = 140;

export default function getBarHeight(seconds, maxSeconds) {
  return `${(seconds * MAX_BAR_HEIGHT) / maxSeconds}px`;
}
