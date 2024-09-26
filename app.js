document.addEventListener("DOMContentLoaded", () => {
    const PuzzleContainer = document.getElementById('puzzle');
    const puzzleSize = 3;
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

            casePuzzle.addEventListener("click", ()=>{
                DeplacementCase(index)
            })

            PuzzleContainer.appendChild(casePuzzle); // Ajouter l'élément DOM au container
        });

    }

    function MelangerElementCase(array) {
        for (let i = array.length - 1 ; i > 0 ; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); // j est entre 1 et 3
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function DeplacementCase(index) {
        const indexCaseVide = cases.indexOf("");
        const deplacementValide = [
            index -1,
            index +1,
            index - puzzleSize,
            index + puzzleSize
        ];
        if (deplacementValide.includes(indexCaseVide)) {
            [cases[index], cases[indexCaseVide]] = [cases[indexCaseVide], cases[index]];
        }
    }

    creationCasePuzzle();
});
