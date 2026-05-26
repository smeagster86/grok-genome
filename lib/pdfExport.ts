import jsPDF from 'jspdf';
import { AnalysisResult } from './types';

// Beautiful PDF report generator

export async function generatePDFReport(result: AnalysisResult) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 22;

  // Header
  doc.setFillColor(10, 15, 26);
  doc.rect(0, 0, pageWidth, 38, 'F');
  doc.setTextColor(16, 185, 129);
  doc.setFontSize(22);
  doc.text("GROK GENOME", 18, 17);
  doc.setFontSize(11);
  doc.setTextColor(148, 163, 184);
  doc.text("Private DNA Insights Report", 18, 25);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text(new Date(result.generatedAt).toLocaleDateString(), pageWidth - 18, 17, { align: 'right' });
  doc.text(result.fileName, pageWidth - 18, 25, { align: 'right' });

  y = 48;
  doc.setTextColor(241, 245, 249);
  doc.setFontSize(15);
  doc.text("Summary", 18, y);
  y += 9;

  doc.setFontSize(11);
  doc.text(`${result.matchedVariants} high-value variants analyzed from ${result.totalVariantsParsed.toLocaleString()} total variants in your file.`, 18, y);
  y += 7;
  doc.text(`Detected format: ${result.format}`, 18, y);

  y += 14;
  // Categories
  doc.setFontSize(13);
  doc.text("Key Findings by Category", 18, y);
  y += 8;

  Object.entries(result.categories).forEach(([cat, insights]) => {
    if (insights.length === 0) return;
    doc.setFontSize(11);
    doc.setTextColor(16, 185, 129);
    doc.text(cat.replace('_', ' ').toUpperCase(), 18, y);
    y += 6;
    doc.setTextColor(226, 232, 240);
    insights.slice(0, 3).forEach((i) => {
      doc.text(`• ${i.snp.gene} (${i.snp.rsid}): ${i.genotype} — ${i.interpretation.effect.replace('_', ' ')}`, 22, y);
      y += 5.5;
    });
    y += 4;
    if (y > 250) {
      doc.addPage();
      y = 30;
    }
  });

  // Disclaimer
  y += 10;
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  const disclaimer = "This report is for educational purposes only and does not constitute medical advice. Genetic associations are probabilistic. Always consult a licensed healthcare professional or genetic counselor. All analysis performed locally in your browser.";
  const split = doc.splitTextToSize(disclaimer, pageWidth - 36);
  doc.text(split, 18, y);

  doc.save(`GrokGenome_Report_${result.fileName.replace(/\.[^/.]+$/, '')}.pdf`);
}
