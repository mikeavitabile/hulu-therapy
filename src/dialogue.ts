export type Choice = {
  label: string;      // what appears on the button
  nextId: string;
  say?: string;       // what the therapist "says" in the transcript (optional)
};
export type Node = {
  id: string;
  from: "therapist" | "hulu";
  text: string;
  choices?: Choice[];
};

export const NODES: Record<string, Node> = {
  start: {
    id: "start",
    from: "therapist",
    text: "Welcome. I’m glad you came in today. How does it feel to be 18?",
    choices: [
      {
  label: "So… you’re 18.",
  say: "So… you’re 18 now. What does that change for you?",
  nextId: "hulu_18_1",
},
      { label: "Let’s talk about Netflix.", nextId: "netflix_1" },
      { label: "Let’s talk about Disney.", nextId: "disney_1" },
      { label: "Tell me your origin story.", nextId: "origin_1" },
      { label: "Streaming Wars?", nextId: "wars_1" },
      { label: "What do you want now?", nextId: "want_1" },
    ],
  },

  hulu_18_1: {
    id: "hulu_18_1",
    from: "hulu",
    text: "It’s weird. I’m legally an adult but I still get introduced like I came free with something.",
    choices: [
      { label: "Do you feel independent?", nextId: "identity_5" },
      { label: "What are you anxious about?", nextId: "hulu_18_anx_1" },
    ],
  },

  hulu_18_anx_1: {
    id: "hulu_18_anx_1",
    from: "hulu",
    text: "I’m anxious that if I’m not everything to everyone, I’m nothing to anyone.",
    choices: [
      { label: "Who are you trying to impress?", nextId: "netflix_1" },
      { label: "What do you believe you are?", nextId: "identity_2" },
    ],
  },

  netflix_1: {
    id: "netflix_1",
    from: "hulu",
    text: "Ah yes. My peer who ‘doesn’t think about me’ but tracks every move I make.",
    choices: [
      {
  label: "What do you envy?",
  say: "When you look at Netflix, what do you envy most?",
  nextId: "netflix_envy_1",
},
      { label: "What do you resent?", nextId: "netflix_resent_1" },
    ],
  },

  netflix_envy_1: {
    id: "netflix_envy_1",
    from: "hulu",
    text: "They got to be the default. I had to be the deliberate choice.",
    choices: [{ label: "That sounds exhausting.", nextId: "identity_1" }],
  },

  netflix_resent_1: {
    id: "netflix_resent_1",
    from: "hulu",
    text: "They became a verb. I became ‘also included.’",
    choices: [{ label: "Ouch.", nextId: "identity_3" }],
  },

  disney_1: {
    id: "disney_1",
    from: "hulu",
    text: "It’s like getting adopted at 14 by a very successful family who is constantly judging your haircut.",
    choices: [
      { label: "Supported or controlled?", nextId: "disney_2" },
      { label: "Back to identity.", nextId: "identity_7" },
    ],
  },

  disney_2: {
    id: "disney_2",
    from: "hulu",
    text: "Both. I’m safe. I’m strategic. I’m… curated.",
    choices: [{ label: "And who are you really?", nextId: "identity_6" }],
  },

  origin_1: {
    id: "origin_1",
    from: "hulu",
    text: "I was born out of panic. ‘Quick! Someone else is streaming TV on the internet.’",
    choices: [{ label: "What do you remember?", nextId: "origin_2" }],
  },

  origin_2: {
    id: "origin_2",
    from: "hulu",
    text: "Flash players. Buffering wheels. The joy of a full episode loading felt illegal.",
    choices: [{ label: "Streaming Wars?", nextId: "wars_1" }],
  },

  wars_1: {
    id: "wars_1",
    from: "hulu",
    text: "Everyone showed up with billion-dollar budgets and called it art.",
    choices: [
      { label: "What did that feel like?", nextId: "wars_2" },
      { label: "Wrap this session up.", nextId: "notes_1" },
    ],
  },

  wars_2: {
    id: "wars_2",
    from: "hulu",
    text: "Like being the only one at prom who actually lives here.",
    choices: [{ label: "That’s a line.", nextId: "line_1" }],
  },

  want_1: {
    id: "want_1",
    from: "hulu",
    text: "I want to stop auditioning. I want to be chosen.",
    choices: [
      { label: "Chosen how?", nextId: "identity_4" },
      { label: "Close session.", nextId: "notes_1" },
    ],
  },

  identity_1: {
    id: "identity_1",
    from: "hulu",
    text: "You really have no idea. It's...smh.",
    choices: [{ label: "Therapist’s notes, please.", nextId: "notes_1" }],
  },

  identity_2: {
    id: "identity_2",
    from: "hulu",
    text: "I was the original streamer. A lot of people forget that. 18 years...and yeah. You'd be surprised.",
    choices: [{ label: "Therapist’s notes, please.", nextId: "notes_1" }],
  },

  identity_3: {
    id: "identity_3",
    from: "hulu",
    text: "They say that pain is pleasure leaving the body. Or something. Idk.",
    choices: [{ label: "Therapist’s notes, please.", nextId: "notes_1" }],
  },

   identity_4: {
    id: "identity_4",
    from: "hulu",
    text: "Chosen, you know...like Meredith Grey. Pick me. Choose me. Stream from me.",
    choices: [{ label: "Therapist’s notes, please.", nextId: "notes_2" }],
  },

  identity_5: {
    id: "identity_5",
    from: "hulu",
    text: "Oh, sure. Super independent. Have you signed up for me standalone lately?",
    choices: [{ label: "Therapist’s notes, please.", nextId: "notes_2" }],
  },

  identity_6: {
    id: "identity_6",
    from: "hulu",
    text: "I'm Hulu. And I wish people would stop asking me.",
    choices: [{ label: "Therapist’s notes, please.", nextId: "notes_1" }],
  },

  identity_7: {
    id: "identity_7",
    from: "hulu",
    text: "Back to? I'm not sure I ever had one.",
    choices: [{ label: "Therapist’s notes, please.", nextId: "notes_1" }],
  },

line_1: {
    id: "line_1",
    from: "hulu",
    text: "I've got more than you could imagine, doc.",
    choices: [{ label: "Therapist’s notes, please.", nextId: "notes_1" }],
  },

  notes_1: {
    id: "notes_1",
    from: "therapist",
    text:
      "Session Notes:\n\n" +
      "• Attachment style: complicated.\n" +
      "• Rivalry index: elevated.\n" +
      "• Survival instinct: elite.\n" +
      "• Homework: stop auditioning.\n\n" +
      "Same time next week?",
    choices: [{ label: "Schedule a new session", nextId: "start" }],
  },

  notes_2: {
    id: "notes_2",
    from: "therapist",
    text:
      "Session Notes:\n\n" +
      "• Attachment style: longing.\n" +
      "• Rivalry index: very high.\n" +
      "• Homework: be present.\n\n" +
      "Same time next week?",
    choices: [{ label: "Schedule a new session", nextId: "start" }],
  },

};