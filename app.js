document.addEventListener("DOMContentLoaded", () => {
    const PuzzleContainer = document.getElementById("puzzle");
    const puzzleSize = 3; // Taille du puzzle 3x3
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
      Victoire()
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
        index + puzzleSize // case en-dessous
      ];
  
      // Vérifiez si le déplacement est valide
      if (deplacementValide.includes(indexCaseVide)) {
        [cases[index], cases[indexCaseVide]] = [cases[indexCaseVide], cases[index]];
        MajApresDeplacement(); // Mettre à jour l'affichage après le déplacement
      }
    }
  
    function MajApresDeplacement() {
      const casePuzzle = PuzzleContainer.children;
      cases.forEach((tile, index) => {
        if (casePuzzle[index]) { // Vérifiez si l'élément existe
          casePuzzle[index].textContent = tile;
          casePuzzle[index].className = "casePuzzle";
          if (tile === "") {
            casePuzzle[index].classList.add("empty");
          }
        }
      });
    }

    // victoire
    function Victoire(){
        var a =0;
        cases.forEach((caseElement,index) => {
            if(caseElement == index + 1){
                a++;
            }
            if(a==8){
                alert(" VOUS AVEZ GAGNEZ")
            }
        })
    }


  
    creationCasePuzzle();
  });
  