import fs from 'fs';
import path from 'path';

const imagesDir = './images';
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Function to generate WhatsApp card SVG
function createWhatsAppSvg(name, message, time) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340">
    <rect width="100%" height="100%" fill="#0B141A" rx="20"/>
    <rect x="0" y="0" width="600" height="55" fill="#202C33" rx="20"/>
    <circle cx="35" cy="28" r="16" fill="#00A884"/>
    <text x="35" y="33" fill="#FFFFFF" font-family="-apple-system, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">E</text>
    <text x="65" y="27" fill="#E9EDEF" font-family="-apple-system, sans-serif" font-size="14" font-weight="bold">${name}</text>
    <text x="65" y="42" fill="#8696A0" font-family="-apple-system, sans-serif" font-size="11">en ligne • WhatsApp Messenger</text>
    
    <!-- Chat bubble -->
    <rect x="30" y="85" width="540" height="190" fill="#005C4B" rx="16"/>
    <!-- Triangular tail -->
    <polygon points="30,95 18,105 30,115" fill="#005C4B"/>
    
    <foreignObject x="45" y="100" width="510" height="145">
      <div xmlns="http://www.w3.org/1999/xhtml" style="color: #E9EDEF; font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 15px; line-height: 1.5; word-wrap: break-word;">
        ${message}
      </div>
    </foreignObject>
    <text x="550" y="260" fill="#8696A0" font-family="-apple-system, sans-serif" font-size="11" text-anchor="end">${time} ✓✓</text>
  </svg>`;
}

// Function to generate YouTube comment SVG
function createYouTubeSvg(user, handle, comment) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="260" viewBox="0 0 600 260">
    <rect width="100%" height="100%" fill="#0F0F0F" rx="20"/>
    <!-- YouTube Red bar -->
    <rect x="0" y="0" width="600" height="45" fill="#181818" rx="20"/>
    <rect x="25" y="14" width="22" height="16" rx="4" fill="#FF0000"/>
    <polygon points="33,18 40,22 33,26" fill="#FFFFFF"/>
    <text x="56" y="26" fill="#FFFFFF" font-family="Roboto, sans-serif" font-size="13" font-weight="bold">Commentaire certifié sur YouTube</text>

    <!-- Avatar circle -->
    <circle cx="45" cy="85" r="20" fill="#D72638"/>
    <text x="45" y="91" fill="#FFFFFF" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle">${user.charAt(0)}</text>
    
    <text x="80" y="80" fill="#F1F1F1" font-family="Roboto, sans-serif" font-size="14" font-weight="bold">${user}</text>
    <text x="80" y="96" fill="#AAAAAA" font-family="Roboto, sans-serif" font-size="11">${handle} • il y a 3 semaines</text>
    
    <foreignObject x="80" y="110" width="480" height="110">
      <div xmlns="http://www.w3.org/1999/xhtml" style="color: #F1F1F1; font-family: Roboto, sans-serif; font-size: 14px; line-height: 1.5;">
        ${comment}
      </div>
    </foreignObject>
    <text x="80" y="235" fill="#AAAAAA" font-family="sans-serif" font-size="11">👍 42  👎  Répondre</text>
  </svg>`;
}

// Function to generate Marie Hester Verified Review
function createMarieSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="280" viewBox="0 0 600 280">
    <rect width="100%" height="100%" fill="#14141A" rx="20" stroke="#F5C542" stroke-width="1"/>
    <circle cx="50" cy="55" r="22" fill="#F5C542"/>
    <text x="50" y="62" fill="#0B0B0D" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle">M</text>
    <text x="85" y="48" fill="#FFFFFF" font-family="sans-serif" font-size="16" font-weight="bold">Marie Hester L.</text>
    <text x="85" y="68" fill="#F5C542" font-family="sans-serif" font-size="12">★ ★ ★ ★ ★ • Avis d'élève vérifié (Cohorte 5 Jours)</text>
    <foreignObject x="40" y="100" width="520" height="120">
      <div xmlns="http://www.w3.org/1999/xhtml" style="color: #F2F2F2; font-family: sans-serif; font-size: 15px; line-height: 1.6;">
        « J'ai vraiment apprécié la formation et je la recommande les yeux fermés. La clarté des explications d'Espoir sur les tons a complètement débloqué ma prononciation ! »
      </div>
    </foreignObject>
    <text x="40" y="245" fill="#A1A1AA" font-family="monospace" font-size="11">ID VÉRIFICATION : #MM-ZH-2026-089 • CERTIFIÉ ACADÉMIE ESPOIR CHINOIS</text>
  </svg>`;
}

// Write files
fs.writeFileSync('./images/temoignage-1.webp', createWhatsAppSvg('Étudiant WhatsApp', 'Bonsoir, mon professeur ! Aujourd\'hui, j\'ai eu le goût d\'apprendre la langue chinoise parce que votre méthode est tellement appréciable ! Je crois qu\'avec vous, j\'ai l\'espoir de parler !', '21:42'));
fs.writeFileSync('./images/temoignage-2.webp', createWhatsAppSvg('Élève Cohorte', 'Bonjour Espoir, le cours était conforme à mes attentes, top ! Vous ciblez vraiment juste au niveau des prononciations, ce qui est crucial pour se faire comprendre. J\'essaye d\'être à fond malgré l\'horaire (nos journées commencent tôt ici, vers 6h), mais l\'ambiance chaleureuse et vos encouragements me le font vite oublier. Vivement ce soir !', '07:15'));
fs.writeFileSync('./images/temoignage-3.webp', createWhatsAppSvg('Participant WhatsApp', 'Hier, j\'ai beaucoup apprécié le cours. À cette allure, je risque de parler plus vite que je ne le pense.', '22:04'));

fs.writeFileSync('./images/temoignage-yt1.webp', createYouTubeSvg('Thérèse Léger', '@thereseleger559', 'Merci beaucoup pour ces merveilles ❤️ Thérèse, de Saint-Léonard, Québec, Canada'));
fs.writeFileSync('./images/temoignage-yt2.webp', createYouTubeSvg('Faiza', '@Sweet.faiza77', 'Magnifique, apprendre avec toi est vraiment facile, surtout pour distinguer les sons.'));
fs.writeFileSync('./images/temoignage-yt3.webp', createYouTubeSvg('Amandine Beyer', '@amandinebeyer6993', 'Merci mille fois : grâce à vous et votre voix magnifique, apprendre des mots chinois est devenu un jeu au quotidien !'));
fs.writeFileSync('./images/temoignage-yt4.webp', createYouTubeSvg('Nayle Roobens', '@NayleROOBENS', 'Wouah, j\'aime trop la méthode utilisée ! Super, continuez ainsi, je reste.'));

fs.writeFileSync('./images/temoignage-marie.webp', createMarieSvg());

console.log('All testimonial mockup assets generated successfully!');
