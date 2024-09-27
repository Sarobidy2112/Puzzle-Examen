document.addEventListener("DOMContentLoaded", () => {
  const PuzzleContainer = document.querySelector(".puzzle");
  const MenuContainer = document.querySelector(".menu-container");
  const btns = document.querySelectorAll(".btn-container .btn");

  let puzzleSize;

  const canvas = document.getElementById('congratsCanvas');
  const ctx = canvas.getContext('2d');
  let celebrationStarted = false;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function startCelebration() {
    let fireworks = [];
    const gravity = 0.05;

    function drawText() {
      ctx.font = 'bold 80px Arial';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'aqua';
      ctx.shadowOffsetX = 4;
      ctx.shadowOffsetY = 4;
      ctx.shadowBlur = 10;
      ctx.fillText('Congratulations!', canvas.width / 2, canvas.height / 2);
    }

    function Firework(x, y) {
      this.x = x;
      this.y = y;
      this.radius = Math.random() * 3 + 2;
      this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      this.dx = Math.random() * 4 - 2;
      this.dy = Math.random() * -4 - 4;
      this.alpha = 1;
      this.fade = Math.random() * 0.03 + 0.02;

      this.update = function () {
        this.dy += gravity;
        this.x += this.dx;
        this.y += this.dy;
        this.alpha -= this.fade;
        this.draw();
      };

      this.draw = function () {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      };
    }

    function createFireworks() {
      for (let i = 0; i < 5; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height / 2;
        fireworks.push(new Firework(x, y));
      }
    }

    function animateFireworks() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawText();

      for (let i = 0; i < fireworks.length; i++) {
        fireworks[i].update();
        if (fireworks[i].alpha <= 0) {
          fireworks.splice(i, 1);
          i--;
        }
      }

      if (fireworks.length < 100) {
        createFireworks();
      }

      requestAnimationFrame(animateFireworks);
    }

    animateFireworks();
  }


  btns.forEach((btn) => {
    btn.addEventListener("click", function () {

      puzzleSize = parseInt(this.value);
      console.log("Puzzle size:", puzzleSize);

      MenuContainer.classList.add("none");
      PuzzleContainer.classList.add("active");

      const PuzzleContainerActive = document.querySelector(".puzzle.active");

      PuzzleContainerActive.style.gridTemplateColumns = `repeat(${puzzleSize}, 100px)`;
      PuzzleContainerActive.style.gridTemplateRows = `repeat(${puzzleSize}, 100px)`;


      PuzzleContainer.innerHTML = "";
      cases = [];


      creationCasePuzzle();
    });
  });

  let cases = [];

  function creationCasePuzzle() {
    for (let i = 1; i < puzzleSize * puzzleSize; i++) {
      cases.push(i);
    }
    cases.push("");

    MelangerElementCase(cases);

    cases.forEach((caseElement, index) => {
      const casePuzzle = document.createElement("div");
      casePuzzle.className = "casePuzzle";
      casePuzzle.textContent = caseElement;

      if (caseElement === "") {
        casePuzzle.classList.add("empty");
      }


      casePuzzle.addEventListener("click", () => {
        DeplacementCase(index);
      });

      PuzzleContainer.appendChild(casePuzzle);
    });


    MajApresDeplacement();
  }

  function MelangerElementCase(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function DeplacementCase(index) {
    const indexCaseVide = cases.indexOf("");
    const deplacementValide = [
      index - 1,
      index + 1,
      index - puzzleSize,
      index + puzzleSize,
    ];


    if (deplacementValide.includes(indexCaseVide)) {
      [cases[index], cases[indexCaseVide]] = [
        cases[indexCaseVide],
        cases[index],
      ];
      MajApresDeplacement();
    }
  }

  function MajApresDeplacement() {
    const casePuzzle = PuzzleContainer.children;
    cases.forEach((caseElement, index) => {
      if (casePuzzle[index]) {

        casePuzzle[index].textContent = caseElement;
        casePuzzle[index].className = "casePuzzle";
        if (caseElement === "") {
          casePuzzle[index].classList.add("empty");
        }
      }
      Victoire();
    });
  }


  function Victoire() {
    let a = 0;

    cases.forEach((caseElement, index) => {
      console.log("caseElement:" + caseElement);
      console.log("Index : " + (index + 1));

      if (caseElement !== "" && caseElement == index + 1) {
        a++;
      }
    });


    if (a === (puzzleSize * puzzleSize) - 1 && !celebrationStarted) {
      celebrationStarted = true;
      PuzzleContainer.style.display = 'none';


      document.querySelector('.titre h1').style.display = 'none';
      document.querySelector(".texte").style.display = 'block';
      document.querySelector(".texte").style.position = 'absolute';
      document.querySelector(".texte").style.bottom = '0';

      startCelebration();
    }
  }
});
