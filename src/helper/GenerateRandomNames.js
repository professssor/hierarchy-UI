//gives out random names
export function generateRandomName() {
  const names = [
    "John",
    "Emma",
    "Michael",
    "Sophia",
    "William",
    "Olivia",
    "James",
    "Ava",
    "Benjamin",
    "Isabella",
    "Jamari",
    "Braylyn",
    "Aneesh",
    "Gibson",
    "Sana",
    "Juaquin",
    "Kasper",
    "Malania",
    "Makyla",
    "Tailyn",
    "Aveah",
    "Andie",
    "Dottie",
    "Tariq",
    "Corbin",
    "Freddie",
    "Briza",
    "Jayliah",
    "Liesel",
    "Jaycee",
    "Jaeda",
    "Aedan",
    "Caeden",
    "Clara",
    "Melinda",
    "Anika",
    "Jariah",
    "Rebecca",
    "Liliane",
    "Joana",
  ];

  return names[Math.floor(Math.random() * names.length)];
}
