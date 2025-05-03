const rulesByType = {
  A: {
    dos: [
      "Donate gently used art supplies",
      "Label all materials clearly",
      "Respect posted hours",
    ],
    donts: [
      "Don't leave open containers",
      "Don't drop off hazardous materials",
    ],
    description:
      "A care cubby locations, you can pick up and trade all the artsy supplies you need, which can include fiber art supplies (yarn, fabric, thread, notions, etc), drawing supplies, painting supplies, beads, collage supplies, clay (sealed), and more. Items not to donate include unpackaged sharp objects like exacto blades/needles, electronics (hard to test safety).",
    word: "Art Supplies",
  },

  B: {
    dos: ["Share books for all ages", "Organize by genre"],
    donts: ["No torn or damaged books", "Don't leave trash behind"],
    description:
      "Pick up your next favorite reads at B cubby locations. B cubbies can include zines, hard cover/soft cover books in good condition (i.e. not missing covers, severely torn, or moldy) and safe for work.",
    word: "Books",
  },

  C: {
    dos: ["Restock when needed", "Report misuse to admin"],
    donts: ["Don't monopolize the resource", "No offensive content"],
    description:
      "Practice care for yourself and your community at C cubbies. At C cubbies you can find/donate first-aid supplies, Narcan, drug testing strips, masks (sealed/wrapped KN95s, Auras), and rapid COVID tests. Please do not donate any unsealed materials or surgical masks.",

    word: "Care",
  },
};

export default rulesByType;
