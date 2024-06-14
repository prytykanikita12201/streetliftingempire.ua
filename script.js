document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
 
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
 
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
 
  document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-menu').classList.toggle('active');
  });
 
  // Получаем все элементы списка с классом "exercise"
  const exercises = document.querySelectorAll('.exercise');
 
  // Добавляем обработчик события click для каждого элемента списка
  exercises.forEach(exercise => {
    exercise.addEventListener('click', () => {
      // Получаем идентификатор упражнения
      const exerciseId = exercise.id;
 
      // В зависимости от идентификатора упражнения, открываем соответствующее видео на YouTube
      switch (exerciseId) {
        case 'pull-up-weighted':
          window.open('https://www.youtube.com/shorts/ZPG8OsHKXLw', '_blank');
          break;
        case 'dips':
          window.open('https://www.youtube.com/shorts/FCxl2y4nsTA', '_blank');
          break;
        case 'bench-press':
          window.open('https://www.youtube.com/shorts/0cXAp6WhSj4', '_blank');
        break;
        case 'squat':
          window.open('https://www.youtube.com/shorts/iZTxa8NJH2g', '_blank');
        break;
        case 'bicep-curl':
          window.open('https://www.youtube.com/watch?v=xKi1gTvwe10', '_blank');
        break;
        case 'pull-up-weighted-2':
          window.open('https://www.youtube.com/shorts/ZPG8OsHKXLw', '_blank');
        break;
        case 'dips-2':
          window.open('https://www.youtube.com/shorts/FCxl2y4nsTA', '_blank');
        break;
        case 'leg-extension':
          window.open('https://www.youtube.com/shorts/fj80Tj0Lrho', '_blank');
        break;
      case 'hammer-curl':
        window.open('https://www.youtube.com/watch?v=0IAM2YtviQY', '_blank');
        break;
      case 'calf-raises':
        window.open('https://www.youtube.com/shorts/pHm6LFuGGbs', '_blank');
        break;
      case 'hyperextension':
        window.open('https://www.youtube.com/watch?v=H8Swl1N-uis', '_blank');
        break;
        // Добавьте дополнительные случаи для других упражнений
        default:
          alert('Видео для этого упражнения пока недоступно.');
      }
    });
  });
 });

 let rmManuallyEdited = false;

 const calculate = () => {
   const bw = parseFloat(document.getElementById('bwval').value);
   const weight = parseFloat(document.getElementById('weightval').value);
   const reps = parseFloat(document.getElementById('repsval').value);
   let result = 0;

   if (!isNaN(bw) && !isNaN(weight) && !isNaN(reps)) {
     const mode = document.getElementById('calcmode').value;
     if (mode === 'Pull-Up') {
       result = ((bw + weight) * (1 + (0.0333 * (reps - 1)))) - bw;
     } else if (mode === 'Dips') {
       result = ((((bw / 2) + weight) / (1.0278 - (0.0278 * reps))) - (bw / 2));
     }
     document.getElementById('result').textContent = `Your RM: ${result.toFixed(2)} kg`;
     if (!rmManuallyEdited) {
       document.getElementById('rm').value = result.toFixed(2);
     }
   } else {
     document.getElementById('result').textContent = 'Введіть всі значення!';
   }
 };

 document.querySelectorAll('#bwval, #weightval, #repsval, #calcmode').forEach(input => {
   input.addEventListener('input', calculate);
 });

 document.getElementById('rm').addEventListener('input', () => {
   rmManuallyEdited = true;
 });

 function generateTable() {
   let bodyweight = parseFloat(document.getElementById('bwval').value);
   let rm = parseFloat(document.getElementById('rm').value);
   let mode = document.getElementById('calcmode').value;

   if (isNaN(bodyweight) || bodyweight <= 0) {
     alert('Enter a valid Bodyweight');
     return;
   }

   let table = '<table border="1"><tr><th>Повтори</th>';
   for (let addedWeight = 10; addedWeight <= 100; addedWeight += 5) {
     table += '<th>' + addedWeight + ' kg</th>';
   }
   table += '</tr>';

   for (let reps = 1; reps <= 20; reps++) {
     table += '<tr><td>' + reps + '</td>';
     for (let addedWeight = 10; addedWeight <= 100; addedWeight += 5) {
       let estimatedRM;
       if (mode === 'Pull-Up') {
         estimatedRM = ((bodyweight + addedWeight) * (1 + (0.0333 * (reps - 1)))) - bodyweight;
       } else if (mode === 'Dips') {
         estimatedRM = ((((bodyweight / 2) + addedWeight) / (1.0278 - (0.0278 * reps))) - (bodyweight / 2));
       }
       let className = '';
       if (!isNaN(rm)) {
         if (estimatedRM > rm - 5 && estimatedRM <= rm - 1) {
           className = 'low';
         } else if (estimatedRM > rm - 2 && estimatedRM <= rm + 2) {
           className = 'medium';
         } else if (estimatedRM > rm + 1 && estimatedRM <= rm + 5) {
           className = 'high';
         }
       }
       table += `<td class="${className}">${estimatedRM.toFixed(1)}</td>`;
     }
     table += '</tr>';
   }

   table += '</table>';
   document.getElementById('rmTable').innerHTML = table;
 }


