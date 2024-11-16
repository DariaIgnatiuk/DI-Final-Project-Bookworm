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

  // checks if the password is at least 8 characters long
export const checkPassword = (password:string):boolean => {
    if (password.length < 8) return false;
    else return true
  }

    // function to check if the user is at least 7 years old 
export const checkBirthDate = (date_of_birth: string): boolean => {
      const currentDate = new Date();
      const birthDate = new Date(date_of_birth);
      // calculating the age of the user
      const age = currentDate.getFullYear() - birthDate.getFullYear();
      // checking if the user is less than 7 years old
      if (age < 7) {
        return false;
      }
      return true;
  };