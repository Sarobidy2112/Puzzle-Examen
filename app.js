document.addEventListener("DOMContentLoaded", () => {
    const PuzzleContainer = document.getElementById('puzzle');
    const puzzleSize = 3;
    let cases = [];

    function creationCasePuzzle() {

        for (let i = 1; i < puzzleSize * puzzleSize; i++) {
            cases.push(i);
        }
        cases.push(""); // Ajouter une case vide à la fin

        cases.forEach((caseElement, index) => {
            const casePuzzle = document.createElement("div");
            casePuzzle.className = "casePuzzle";
            casePuzzle.textContent = caseElement;

            if (caseElement === "") {
                casePuzzle.classList.add("empty"); // Ajout de la classe à l'élément DOM
            }

            PuzzleContainer.appendChild(casePuzzle); // Ajouter l'élément DOM au container
        });

    }

    creationCasePuzzle();
});
