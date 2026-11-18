// Small helpers to remember how much of the video someone has watched.
// Everything is wrapped in try/catch because some browsers (private mode,
// strict privacy settings) block localStorage. The page still works without it.

export function loadProgress(key) {
  const empty = { watched: 0, completed: false };

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return empty;

    const saved = JSON.parse(raw);
    return {
      watched: Number(saved.watched) || 0,
      completed: Boolean(saved.completed),
    };
  } catch {
    return empty;
  }
}

export function saveProgress(key, progress) {
  try {
    window.localStorage.setItem(key, JSON.stringify(progress));
  } catch {
    // Nothing to do. Progress just won't be remembered after a refresh.
  }
}
