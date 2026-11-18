// Turns a number of seconds into "MM:SS", e.g. 5400 -> "90:00" and 75 -> "01:15".
// Minutes are allowed to go past 59 because the timer starts at 90:00.
export function formatTime(totalSeconds) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds || 0));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
