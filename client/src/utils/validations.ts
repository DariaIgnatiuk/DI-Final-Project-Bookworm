// checks if the score is between 0 and 5
export const checkScore = (score: number): boolean => {
  if (score > 5) return false;
  else if (score < 0) return false;
  else return true;
};

// checks if the date is not in the future
export const chectDateNotInTheFuture = (date: string): boolean => {
  const selectedDate = new Date(date);
  const today = new Date();
  if (selectedDate.getDate() > today.getDate()) {
    return false;
  } else {
    return true;
  }
};
