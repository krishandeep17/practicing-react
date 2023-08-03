const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const WatchedSummary = ({ watched }) => {
  const avgImdbRating = average(watched.map((movie) => movie?.imdbRating || 0));
  const avgUserRating = average(watched.map((movie) => movie?.userRating));
  const avgRuntime = average(watched.map((movie) => movie?.runtime || 0));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p title="Total movies">
          <span>#️⃣</span>
          <span>
            {watched.length} {watched.length === 1 ? "movie" : "movies"}
          </span>
        </p>
        <p title="Average IMDB Rating">
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p title="Average User Rating">
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p title="Average Runtime">
          <span>⏳</span>
          <span>{Math.round(avgRuntime)} min</span>
        </p>
      </div>
    </div>
  );
};

export default WatchedSummary;
