

export const returnScore = (score: number) => {
    const numbers = [1, 2, 3, 4, 5];
    return numbers.map((num) =>
      num <= score ? (
        <img className="imgIcon" src="../../../rating/star.svg" />
      ) : (
        <img className="imgIcon" src="../../../rating/emptyStar.svg" />
      )
    );
  };