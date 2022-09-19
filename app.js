// dinoData taken from ./dino.json
const dinoData = {
  Dinos: [
    {
      species: "Triceratops",
      weight: 13000,
      height: 114,
      diet: "herbavor",
      where: "North America",
      when: "Late Cretaceous",
      fact: "First discovered in 1889 by Othniel Charles Marsh",
    },
    {
      species: "Tyrannosaurus Rex",
      weight: 11905,
      height: 144,
      diet: "carnivor",
      where: "North America",
      when: "Late Cretaceous",
      fact: "The largest known skull measures in at 5 feet long.",
    },
    {
      species: "Anklyosaurus",
      weight: 10500,
      height: 55,
      diet: "herbavor",
      where: "North America",
      when: "Late Cretaceous",
      fact: "Anklyosaurus survived for approximately 135 million years.",
    },
    {
      species: "Brachiosaurus",
      weight: 70000,
      height: "372",
      diet: "herbavor",
      where: "North America",
      when: "Late Jurasic",
      fact: "An asteroid was named 9954 Brachiosaurus in 1991.",
    },
    {
      species: "Stegosaurus",
      weight: 11600,
      height: 79,
      diet: "herbavor",
      where: "North America, Europe, Asia",
      when: "Late Jurasic to Early Cretaceous",
      fact:
        "The Stegosaurus had between 17 and 22 seperate places and flat spines.",
    },
    {
      species: "Elasmosaurus",
      weight: 16000,
      height: 59,
      diet: "carnivor",
      where: "North America",
      when: "Late Cretaceous",
      fact: "Elasmosaurus was a marine reptile first discovered in Kansas.",
    },
    {
      species: "Pteranodon",
      weight: 44,
      height: 20,
      diet: "carnivor",
      where: "North America",
      when: "Late Cretaceous",
      fact: "Actually a flying reptile, the Pteranodon is not a dinosaur.",
    },
    {
      species: "Pigeon",
      weight: 0.5,
      height: 9,
      diet: "herbavor",
      where: "World Wide",
      when: "Holocene",
      fact: "All birds are living dinosaurs.",
    },
  ],
};
// Create Dino Objects
class Dino {
  // Create Dino Constructor

  constructor(
    species,
    weight,
    heightInInches,
    diet,
    location,
    timePeriod,
    fact
  ) {
    this.species = species;
    this.weight = weight;
    this.height = heightInInches;
    this.diet = diet;
    this.location = location;
    this.timePeriod = timePeriod;
    this.fact = fact;
  }

  // Create Dino Compare Method 1
  // NOTE: Weight in JSON file is in lbs, height in inches.
  // This method compares the weight of dinosaur to human info
  compareWeight(humanData, dinoData) {
    // Generate comparison facts if species is not a bird
    if (dinoData.species == "Pigeon") {
      return dinoData.fact;
    }
    let fact = factDescriptions.weightFact(humanData, dinoData);

    return fact;
  }
  // Create Dino Compare Method 2
  // NOTE: Weight in JSON file is in lbs, height in inches.
  // This method compares the height of dinosaur to human info

  compareHeight(humanData, dinoData) {
    if (dinoData.species == "Pigeon") {
      return dinoData.fact;
    }
    let fact = factDescriptions.heightFact(humanData, dinoData);

    return fact;
  }
  // Create Dino Compare Method 3
  // NOTE: Weight in JSON file is in lbs, height in inches.
  // This method compares the diet of dinosaur to human info

  compareDiet(humanData, dinoData) {
    if (dinoData.species == "Pigeon") {
      return dinoData.fact;
    }
    let fact = factDescriptions.dietFact(humanData, dinoData);

    return fact;
  }
}
// Generate Tiles for each Dino in Array

const generateTilesForEachDino = () => {
  // This function generates an array of Dinos Objects pre-rendered on screen
  let dinoArray = [];
  for (let i = 0; i < dinoData["Dinos"].length; i++) {
    let dinoObject = new Dino(
      dinoData["Dinos"][i].species,
      dinoData["Dinos"][i].weight,
      dinoData["Dinos"][i].height,
      dinoData["Dinos"][i].diet,
      dinoData["Dinos"][i].where,
      dinoData["Dinos"][i].when,
      dinoData["Dinos"][i].fact
    );
    dinoObject.imagePath =
      "'images/" + dinoData["Dinos"][i].species.toLowerCase() + ".png'";
    dinoArray.push(dinoObject);
  }
  return dinoArray;
};

// Create Human Object and constructor
class Human {
  constructor() {
    this.name = document.getElementById("name").value || "";
    this.height =
      parseInt(document.getElementById("feet").value * 12) +
        parseInt(document.getElementById("inches").value) || 0;
    this.weight = parseInt(document.getElementById("weight").value || 0);
    this.diet = document.getElementById("diet").value || "";
  }
}

// Create Tile Object
class Tile {
  constructor(species, imagePath, fact) {
    this.species = species;
    this.imagePath = imagePath;
    this.fact = fact;
  }
}

// Methods for fact strings
let factDescriptions = {
  // Weight fact description comparison is generated here
  weightFact: (humanData, dinoData) => {
    return dinoData.weight - humanData.weight > 0
      ? dinoData.species +
          " weights more than you by " +
          (dinoData.weight - humanData.weight) +
          " pounds"
      : dinoData.species +
          " weights less than you by " +
          (humanData.weight - dinoData.weight) +
          " pounds";
  },
  // Height fact description comparison is generated here

  heightFact: (humanData, dinoData) => {
    return dinoData.height - humanData.height > 0
      ? dinoData.species +
          " is higher than you by " +
          (dinoData.height - humanData.height) +
          " inch"
      : dinoData.species +
          " is shorter than you by " +
          (humanData.height - dinoData.height) +
          " inch";
  },
  // Diet fact description comparison is generated here

  dietFact: (humanData, dinoData) => {
    let fact;
    if (humanData.diet.toLowerCase() == dinoData.diet) {
      fact = dinoData.species + " are  " + humanData.diet;
    } else {
      fact = dinoData.species + " is a " + dinoData.diet;
    }

    return fact;
  },
};

// Add tiles to DOM by iterating the dino list

const addTilesToDom = (tilesData) => {
  let testDivItems = "";

  for (data of tilesData) {
    testDivItems +=
      "<div class='grid-item'><h3>" +
      data.species +
      "</h3><img src=" +
      data.imagePath +
      " alt='dino name' /><p>" +
      data.fact +
      "</p></div>";
  }

  document.getElementById("grid").innerHTML += testDivItems;
};

// On button click, prepare and display infographic

const onClickHandler = () => {
  // Randomly switch comparison mode
  const human = new Human();
  let dinosList = [];
  const dinoObjects = generateTilesForEachDino();
  const rndInt = Math.floor(Math.random() * 3) + 1;
  let choice;
  switch (rndInt) {
    case 1:
      choice = "diet";
      break;
    case 2:
      choice = "weight";
      break;
    case 3:
      choice = "height";
      break;
  }
  for (let i = 0; i < dinoObjects.length; i++) {
    dinosList.push(
      new Tile(
        dinoObjects[i].species,
        dinoObjects[i].imagePath,
        choice === "diet"
          ? dinoObjects[i].compareDiet(human, dinoObjects[i])
          : choice === "height"
          ? dinoObjects[i].compareHeight(human, dinoObjects[i])
          : dinoObjects[i].compareWeight(human, dinoObjects[i])
      )
    );
  }
  // Putting Human tile in the center of tiles
  dinosList
    .sort((a, b) => {
      return b - a;
    })
    .splice(4, 0, new Tile(human.name, "images/human.png", ""));

  const allTilesData = dinosList;
  addTilesToDom(allTilesData);

  const dinoCompareElement = document.getElementById("dino-compare");
  // Remove form from screen by style dom manipulation

  if (dinoCompareElement.style.display === "none") {
    dinoCompareElement.style.display = "block";
    return;
  }
  dinoCompareElement.style.display = "none";
};
