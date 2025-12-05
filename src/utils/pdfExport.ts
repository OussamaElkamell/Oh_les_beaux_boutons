import { jsPDF } from 'jspdf';
import { GameResults } from '@/types/game';
import { getScoreLabel } from './scoreCalculator';

export const exportResultsPDF = (results: GameResults): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header
  doc.setFillColor(28, 15, 51);
  doc.rect(0, 0, pageWidth, 50, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('NIRD swipe', pageWidth / 2, 25, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Rapport de Diagnostic Numérique', pageWidth / 2, 35, { align: 'center' });
  
  // Date
  doc.setFontSize(10);
  doc.text(new Date(results.completedAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }), pageWidth / 2, 45, { align: 'center' });

  // Score Section
  doc.setTextColor(28, 15, 51);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Score NIRD Global', 20, 70);
  
  // Score circle color based on score
  if (results.overallScore >= 70) {
    doc.setFillColor(44, 181, 133);
  } else if (results.overallScore >= 40) {
    doc.setFillColor(255, 138, 60);
  } else {
    doc.setFillColor(255, 79, 154);
  }
  doc.circle(pageWidth / 2, 100, 25, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text(`${results.overallScore}%`, pageWidth / 2, 105, { align: 'center' });
  
  doc.setTextColor(28, 15, 51);
  doc.setFontSize(14);
  doc.text(getScoreLabel(results.overallScore), pageWidth / 2, 140, { align: 'center' });

  // Pillar Breakdown
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Scores par Pilier', 20, 160);
  
  const pillars = [
    { name: 'Inclusion ♿', score: results.pillarScores.inclusion, r: 66, g: 133, b: 244 },
    { name: 'Responsabilité 🔒', score: results.pillarScores.responsabilite, r: 44, g: 181, b: 133 },
    { name: 'Durabilité 🌍', score: results.pillarScores.durabilite, r: 255, g: 193, b: 7 }
  ];
  
  let yPos = 175;
  pillars.forEach(pillar => {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(28, 15, 51);
    doc.text(`${pillar.name}: ${pillar.score}%`, 20, yPos);
    
    // Progress bar background
    doc.setFillColor(230, 230, 230);
    doc.rect(20, yPos + 3, 100, 6, 'F');
    
    // Progress bar fill
    doc.setFillColor(pillar.r, pillar.g, pillar.b);
    doc.rect(20, yPos + 3, pillar.score, 6, 'F');
    
    yPos += 20;
  });

  // Stats
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Statistiques', 20, yPos + 10);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  yPos += 25;
  doc.text(`• Technologies Big Tech acceptées: ${results.bigTechAccepted}`, 25, yPos);
  yPos += 10;
  doc.text(`• Alternatives NIRD choisies: ${results.nirdAccepted}`, 25, yPos);
  yPos += 10;
  doc.text(`• Total évalué: ${results.totalCards} technologies`, 25, yPos);

  // Recommendations
  if (results.recommendations.length > 0) {
    yPos += 20;
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Plan d\'Action Recommandé', 20, yPos);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    yPos += 15;
    
    results.recommendations.forEach((rec, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(`${index + 1}. ${rec.title}`, 25, yPos);
      yPos += 7;
      doc.setTextColor(100, 100, 100);
      doc.text(`   → ${rec.impact}`, 25, yPos);
      doc.setTextColor(28, 15, 51);
      yPos += 12;
    });
  }

  // Footer
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text('Rapport généré par NIRD swipe - Projet Nuit de l\'Info 2025', pageWidth / 2, 285, { align: 'center' });

  // Save
  doc.save(`rapport-nird-${new Date().toISOString().split('T')[0]}.pdf`);
};
