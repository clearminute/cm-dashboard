export default stats => {
  if (stats.topActivities) {
    return stats.topActivities;
  }
  return [];
};
