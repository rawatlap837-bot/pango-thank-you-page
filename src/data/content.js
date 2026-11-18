// Everything you are likely to edit lives in this one file:
// the video link, the timer length and all the text on the page.

export const workshop = {
  hostName: "Azhar Ali Sayed",
  videoTitle: "Gym Growth Workshop",

  // Option 1: put your file in public/videos/ and keep this path.
  // Option 2: replace it with a full link, e.g. "https://cdn.example.com/workshop.mp4"
  videoUrl: `${import.meta.env.BASE_URL}videos/workshop.mp4`,

  // Optional cover image shown before the video starts, e.g. "/images/cover.jpg"
  posterUrl: "",

  // Length of the video in minutes. Used for the timer until the real
  // video length has loaded, and for the "90-minute video" labels.
  durationMinutes: 90,

  // Where the viewer's progress is saved in their browser.
  // Change this if you reuse the page for a different video.
  storageKey: "gym-growth-workshop-progress",

  // Optional help link shown in the footer (WhatsApp, email, etc.).
  // Leave it as "" to hide the link. Example: "https://wa.me/91XXXXXXXXXX"
  supportUrl: "",
};

export const hero = {
  badge: "Booking Confirmed",
  title: "Thank You! Your Spot Is Reserved",
  subtitle: `Watch the full ${workshop.durationMinutes}-minute video below. Your next step unlocks as soon as it ends.`,
};

export const timerText = {
  idle: "Press play to start",
  playing: "Timer running",
  paused: "Timer paused",
  completed: "Completed",
};

// Small reminders shown under the timer. `icon` can be: lock, pause, check
export const notes = [
  { icon: "lock", text: "Skipping is turned off" },
  { icon: "pause", text: "Pauses if you switch tabs" },
  { icon: "check", text: "Progress saves automatically" },
];

export const steps = {
  heading: "What Happens Next",
  items: [
    {
      title: "Booking Confirmed",
      text: "Your payment went through and your spot is reserved.",
    },
    {
      title: "Watch The Full Video",
      text: `Watch all ${workshop.durationMinutes} minutes. The timer shows how much is left.`,
    },
    {
      title: "Continue To Your Next Step",
      text: "This opens the moment the video ends.",
    },
  ],
};

export const nextStep = {
  lockedTitle: "Your Next Step Is Locked",
  lockedText: "Finish the full video to unlock it.",
  lockedButton: "Finish The Video To Unlock",
  unlockedTitle: "You Did It! Your Next Step Is Open",
  unlockedText: "Thanks for watching the whole video. Tap the button below to continue.",
  unlockedButton: "Continue To Next Step",
  // Where the button goes once the video is finished. Replace with your own link.
  buttonUrl: "https://wa.me/910000000000",
};
