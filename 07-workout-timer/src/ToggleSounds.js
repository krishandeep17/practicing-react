import { memo } from "react";

function ToggleSounds({ allowSound, setAllowSound }) {
  return (
    <button
      className="btn-sound"
      onClick={() => setAllowSound((allow) => !allow)}
    >
      {allowSound ? "🔈" : "🔇"}
    </button>
  );
}

// Memoize the <ToggleSounds /> so that it'll not re-render when its parent(<App />) re-render
export default memo(ToggleSounds);
