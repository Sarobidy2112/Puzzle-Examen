document.addEventListener("DOMContentLoaded", () => {
  const PuzzleContainer = document.querySelector(".puzzle");
  const MenuContainer = document.querySelector(".menu-container");
  const btns = document.querySelectorAll(".btn-container .btn");

  let puzzleSize; // Déclare cette variable à un niveau global

  btns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Récupère la valeur du bouton cliqué
      puzzleSize = parseInt(this.value); // Convertit en entier
      console.log("Puzzle size:", puzzleSize);

      MenuContainer.classList.add("none");
      PuzzleContainer.classList.add("active");

      const PuzzleContainerActive = document.querySelector(".puzzle.active");

      PuzzleContainerActive.style.gridTemplateColumns = `repeat(${puzzleSize}, 100px)`;
      PuzzleContainerActive.style.gridTemplateRows = `repeat(${puzzleSize}, 100px)`;

      // Réinitialise le puzzle avant de le recréer
      PuzzleContainer.innerHTML = "";
      cases = [];

      // Crée le puzzle avec la nouvelle taille
      creationCasePuzzle();
    });
  });

  let cases = [];

  function creationCasePuzzle() {
    for (let i = 1; i < puzzleSize * puzzleSize; i++) {
      cases.push(i);
    }
    cases.push(""); // Ajouter une case vide à la fin

    MelangerElementCase(cases);

    cases.forEach((caseElement, index) => {
      const casePuzzle = document.createElement("div");
      casePuzzle.className = "casePuzzle";
      casePuzzle.textContent = caseElement;

      if (caseElement === "") {
        casePuzzle.classList.add("empty"); // Ajout de la classe à l'élément DOM
      }

      // Écouter les clics sur la case
      casePuzzle.addEventListener("click", () => {
        DeplacementCase(index);
      });

      PuzzleContainer.appendChild(casePuzzle); // Ajouter l'élément DOM au container
    });

    // Mise à jour de l'affichage après la création
    MajApresDeplacement();
  }

  function MelangerElementCase(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // j est un index aléatoire
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function DeplacementCase(index) {
    const indexCaseVide = cases.indexOf("");
    const deplacementValide = [
      index - 1, // case à gauche
      index + 1, // case à droite
      index - puzzleSize, // case au-dessus
      index + puzzleSize, // case en-dessous
    ];

    // Vérifiez si le déplacement est valide
    if (deplacementValide.includes(indexCaseVide)) {
      [cases[index], cases[indexCaseVide]] = [
        cases[indexCaseVide],
        cases[index],
      ];
      MajApresDeplacement(); // Mettre à jour l'affichage après le déplacement
    }
  }

  function MajApresDeplacement() {
    const casePuzzle = PuzzleContainer.children;
    cases.forEach((caseElement, index) => {
      if (casePuzzle[index]) {
        // Vérifiez si l'élément existe
        casePuzzle[index].textContent = caseElement;
        casePuzzle[index].className = "casePuzzle";
        if (caseElement === "") {
          casePuzzle[index].classList.add("empty");
        }
      }
      Victoire();
    });
  }

  // victoire
  function Victoire() {
    let a = 0;

    cases.forEach((caseElement, index) => {
      console.log("caseElement:" + caseElement);
      console.log("Index : " + (index + 1));
      // On ne vérifie pas la dernière case vide
      if (caseElement !== "" && caseElement == index + 1) {
        a++;
      }
    });

    // Il faut que toutes les cases soient dans le bon ordre pour gagner
    if (a === puzzleSize * puzzleSize - 1) {
      alert("VOUS AVEZ GAGNÉ !");
    }
  }
});
