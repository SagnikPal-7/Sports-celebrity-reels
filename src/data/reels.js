// data/reels.js
export const sampleReels = [
  {
    id: 1,
    celebrity: "Lionel Messi",
    script:
      "Lionel Messi, considered one of the greatest footballers of all time, won his first World Cup with Argentina in 2022 after an illustrious career at Barcelona where he won 35 trophies.",
    videoUrl: "https://www.youtube.com/watch?v=Me1_1-CyOvw", // Will use placeholder
    stats: "7x Ballon d'Or winner",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    celebrity: "Serena Williams",
    script:
      "Serena Williams dominated women's tennis with 23 Grand Slam singles titles, the most in the Open Era. Known for her powerful serve and mental toughness, she revolutionized the game.",
    videoUrl: "https://www.youtube.com/watch?v=aClxlyCzxzE",
    stats: "23 Grand Slam titles",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    celebrity: "Michael Phelps",
    script:
      "Michael Phelps, the most decorated Olympian of all time, won 28 medals including 23 golds across 4 Olympics. His 8 gold medals at Beijing 2008 broke Mark Spitz's record.",
    videoUrl: "https://www.youtube.com/watch?v=e-ldwePuoW0",
    stats: "28 Olympic medals",
    createdAt: new Date().toISOString(),
  },
];
