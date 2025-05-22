const rulesByType = {
  A: {
    accepted: [
      "Fiber art supplies (yarn, fabric, etc.)",
      "Drawing and painting supplies",
      "Beads",
      "Collage materials",
      "Sealed clay",
    ],
    notAccepted: [
      "Unpackaged sharp objects (e.g., X-Acto blades, needles)",
      "Electronics (due to safety/testing concerns)",
    ],
    description:
      "At A care cubby locations, you can pick up and trade all the artsy supplies you need, which can include fiber art supplies (yarn, fabric, thread, notions, etc), drawing supplies, painting supplies, beads, collage supplies, clay (sealed), and more. Items not to donate include unpackaged sharp objects like exacto blades/needles, electronics (hard to test safety).",
    word: "Art Supplies",
  },

  B: {
    accepted: ["Zines", "Hardcover and softcover books in good condition"],
    notAccepted: ["NSFW (Not Safe For Work) books", "Severely damaged books"],
    description:
      "Pick up your next favorite reads at B cubby locations. B cubbies can include zines, hard cover/soft cover books in good condition (i.e. not missing covers, severely torn, or moldy) and safe for work.",
    word: "Books",
  },

  C: {
    accepted: [
      "First-aid supplies",
      "Narcan",
      "Drug testing strips",
      "Masks and rapid COVID tests",
      "Sealed/wrapped KN95s",
      "Auras",
    ],
    notAccepted: ["Opened items", "Surgical masks"],
    description:
      "Practice care for yourself and your community at C cubbies. At C cubbies you can find/donate first-aid supplies, Narcan, drug testing strips, masks (sealed/wrapped KN95s, Auras), and rapid COVID tests. Please do not donate any unsealed materials or surgical masks.",
    word: "Care",
  },
};

export default rulesByType;
