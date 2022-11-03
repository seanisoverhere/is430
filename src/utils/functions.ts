export const getColor = (score: number) => {
  if (score >= 0 && score <= 0.754) {
    return "#FF0000";
  } else if (score <= 0.824) {
    return "#FFA500";
  } else {
    return "#008000";
  }
};
