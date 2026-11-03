const canvas = document.getElementById('canvas-ceas');
const ctx = canvas.getContext('2d');

const imgCadran = new Image();
imgCadran.src = 'cadran.png'; // Fundalul cu cadranul Tag Heuer Formula 1

// ========================================================
// ⚠️ PANOU DE CONTROL ȘI REGLAJ LA PIXEL (COORDONATELE TALE)
// ========================================================
const axCeasX = (canvas.width / 2) - 1;   
const axCeasY = (canvas.height / 2) - 15;  

// 🛠️ CORECTARE TIMP/DECALAJ GRAFIC (ÎN GRADE)
const ajustareGraficaUnghi = -90; 

// Lungimile limbilor pe cadran (Ajustabile în pixeli)
const lungimeSecundar = 175;
const lungimeMinutar = 160;
const lungimeOrar = 110; 

// Proporții cadran
const inaltimeCeas = 850; 
const corectieLatime = 0.75; 
const latimeCeas = inaltimeCeas * corectieLatime;

const cadranX = (canvas.width - latimeCeas) / 2;
const cadranY = (canvas.height - inaltimeCeas) / 2;

// 🛠️ REGLAJ POZIȚIE CASSETĂ DATĂ (În pixeli pe ecran, în dreptul orei 3)
// Dacă numărul nu cade fix în pătrățelul de pe fundal, ajustează aceste valori:
const dataX = axCeasX + 118; // Crește ca să muți numărul mai la DREAPTA
const dataY = axCeasY + 6;   // Crește ca să muți numărul mai JOS

function actualizeazaCeas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Desenare cadran de fundal
    if (imgCadran.complete && imgCadran.naturalWidth !== 0) {
        ctx.drawImage(imgCadran, cadranX, cadranY, latimeCeas, inaltimeCeas);
    }

    // 2. Calcul timp exact și dată din sistem
    const acum = new Date();
    const ore = acum.getHours();
    const minute = acum.getMinutes();
    const secunde = acum.getSeconds();
    const ziuaCurenta = acum.getDate(); // Extrage numărul zilei (ex: 1, 15, 31)
    
    // Configurare mișcare (Secundar pas cu pas, orar și minutar fluide)
    const secundaFixa = secunde; 
    const minutFluid = minute + (secundaFixa / 60);
    const oraFluida = (ore % 12) + (minutFluid / 60);

    const corectieRadiani = ajustareGraficaUnghi * (Math.PI / 180);

    const unghiOrar     = (oraFluida * (Math.PI / 6)) + corectieRadiani;      
    const unghiMinutar  = (minutFluid * (Math.PI / 30)) + corectieRadiani;     
    const unghiSecundar = (secundaFixa * (Math.PI / 30)) + corectieRadiani;    

    // ========================================================
    // STRATUL NOU: CASSETA CU DATA ZILEI (Afișată direct pe cadran)
    // ========================================================
    ctx.save();
    ctx.font = "bold 20px Arial"; // Font tehnic, gros, similar cu cel din imagine
    ctx.fillStyle = "#1A1A1A";    // Culoarea textului (negru/gri închis ca în original)
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Desenăm numărul zilei curente în dreptul orei 3
    ctx.fillText(ziuaCurenta, dataX, dataY);
    ctx.restore();


    // ========================================================
    // STRATUL 1: ORARUL ARGINTIU (Geometrie Evantai Transparent)
    // ========================================================
    ctx.save();
    ctx.translate(axCeasX, axCeasY);
    ctx.rotate(unghiOrar);

    ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
    ctx.shadowBlur = 7;
    ctx.shadowOffsetY = 3;

    ctx.beginPath();
    ctx.moveTo(-10, 10);                        
    ctx.lineTo(-5.5, -lungimeOrar + 16);        
    ctx.lineTo(-2.0, -lungimeOrar);             
    ctx.lineTo(2.0, -lungimeOrar);              
    ctx.lineTo(5.5, -lungimeOrar + 16);         
    ctx.lineTo(10, 10);                         
    ctx.closePath();
    ctx.fillStyle = "#D5D8DC"; 
    ctx.fill();

    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    ctx.strokeStyle = "#BDC3C7";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-6, -14);
    ctx.lineTo(-3.5, -lungimeOrar + 24);
    ctx.lineTo(3.5, -lungimeOrar + 24);
    ctx.lineTo(6, -14);
    ctx.closePath();
    ctx.fillStyle = "#F8F9F9"; 
    ctx.fill();
    ctx.strokeStyle = "#95A5A6";
    ctx.lineWidth = 0.8;
    ctx.stroke();

    ctx.strokeStyle = "#C0C0C0";
    ctx.lineWidth = 3;
    ctx.lineJoin = "miter";
    ctx.beginPath();
    ctx.arc(0, 13, 11, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 13, 28, 0.25 * Math.PI, 0.75 * Math.PI); 
    ctx.stroke();
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-7.5, 21);  
    ctx.lineTo(-20, 33);   
    ctx.moveTo(7.5, 21);   
    ctx.lineTo(20, 33);    
    ctx.moveTo(0, 24);
    ctx.lineTo(0, 41);
    ctx.stroke();

    ctx.restore();


    // ========================================================
    // STRATUL 2: MINUTARUL ARGINTIU (Model curat, fără găuri)
    // ========================================================
    ctx.save();
    ctx.translate(axCeasX, axCeasY);
    ctx.rotate(unghiMinutar);

    ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 2;

    ctx.beginPath();
    ctx.moveTo(0, 24);                          
    ctx.lineTo(-8.5, 16);                       
    ctx.lineTo(-7.5, 5);                        
    ctx.lineTo(-4.0, -lungimeMinutar + 14);     
    ctx.lineTo(-1.5, -lungimeMinutar);          
    ctx.lineTo(1.5, -lungimeMinutar);           
    ctx.lineTo(4.0, -lungimeMinutar + 14);      
    ctx.lineTo(7.5, 5);                         
    ctx.lineTo(8.5, 16);                        
    ctx.closePath();
    ctx.fillStyle = "#D5D8DC"; 
    ctx.fill();

    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    ctx.strokeStyle = "#BDC3C7";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-4.5, -12);
    ctx.lineTo(-2.2, -lungimeMinutar + 22);
    ctx.lineTo(2.2, -lungimeMinutar + 22);
    ctx.lineTo(4.5, -12);
    ctx.closePath();
    ctx.fillStyle = "#F8F9F9"; 
    ctx.fill();
    ctx.strokeStyle = "#95A5A6"; 
    ctx.lineWidth = 0.8;
    ctx.stroke();

    ctx.restore();


    // ========================================================
    // STRATUL 3: SECUNDARUL ROȘU (Efect ticăit Quartz pas cu pas)
    // ========================================================
    ctx.save();
    ctx.translate(axCeasX, axCeasY);
    ctx.rotate(unghiSecundar);

    ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
    ctx.shadowBlur = 4;
    ctx.beginPath();
    ctx.moveTo(-1.5, 0);
    ctx.lineTo(-1.2, -(lungimeSecundar - 57.5));
    ctx.lineTo(1.2, -(lungimeSecundar - 57.5));
    ctx.lineTo(1.5, 0);
    ctx.fillStyle = "#E31B23"; 
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(-0.8, -(lungimeSecundar - 42.5));
    ctx.lineTo(-0.5, -lungimeSecundar); 
    ctx.lineTo(0.5, -lungimeSecundar);
    ctx.lineTo(0.8, -(lungimeSecundar - 42.5));
    ctx.fillStyle = "#E31B23"; 
    ctx.fill();

    ctx.shadowBlur = 0; 
    ctx.strokeStyle = "#E31B23";
    ctx.lineWidth = 3; 
    ctx.beginPath();
    ctx.arc(0, -(lungimeSecundar - 50), 6, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(0, -(lungimeSecundar - 50), 4.5, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-2, 0);
    ctx.lineTo(-2, 45);
    ctx.lineTo(-3.5, 52); 
    ctx.lineTo(3.5, 52);  
    ctx.lineTo(2, 45);
    ctx.lineTo(2, 0);
    ctx.fillStyle = "#E0E0E0"; 
    ctx.fill();

    ctx.strokeStyle = "#C0C0C0"; 
    ctx.lineWidth = 2.5;         
    ctx.lineJoin = "miter";
    ctx.beginPath();
    ctx.moveTo(0, 52.5);       
    ctx.lineTo(8.5, 56.5);       
    ctx.lineTo(8.5, 77.5);       
    ctx.lineTo(0, 82.5);       
    ctx.lineTo(-8.5, 77.5);      
    ctx.lineTo(-8.5, 56.5);      
    ctx.closePath();
    ctx.stroke(); 

    ctx.fillStyle = "#C0C0C0";
    ctx.fillRect(-8, 65, 16, 4.5);


    // ========================================================
    // STRATUL 4: CAPACUL METALIC CENTRAL COMUN
    // ========================================================
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fillStyle = "#95A5A6"; 
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#BDC3C7"; 
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 0, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = "#2C3E50";
    ctx.fill();

    ctx.restore();


    // ========================================================
    // STRATUL 5: TEXT COPYRIGHT ȘI TELEFON (În colțul din dreapta-jos)
    // ========================================================
    ctx.save();
    ctx.font = "14px monospace";
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)"; // Alb discret cu transparență ca să fie elegant
    ctx.textAlign = "right";
    ctx.textBaseline = "bottom";
    
    // Poziționat la 20 de pixeli distanță de marginile din dreapta și jos ale canvas-ului
    ctx.fillText("© +40744388248", canvas.width - 20, canvas.height - 20);
    ctx.restore();

    // Loop-ul de animație continuă
    requestAnimationFrame(actualizeazaCeas);
}

actualizeazaCeas();
