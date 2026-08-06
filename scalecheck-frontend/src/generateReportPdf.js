import jsPDF from "jspdf";

const DIMENSION_LABELS = {
  ownership: "Ownership",
  integration: "Integration Readiness",
  financial_value: "Financial Value",
  governance: "Governance",
  transformation: "Organizational Transformation",
};

function buildNarrative(result) {
  const { org_name, overall_score, risk_flags } = result;
  if (!risk_flags || risk_flags.length === 0) {
    return `${org_name} shows a strong, balanced structure across all five readiness dimensions, with an overall score of ${overall_score}/100. No major structural failure modes were flagged.`;
  }
  const flagNames = risk_flags.map((f) => f.type).join(" and ");
  return `${org_name} scores ${overall_score}/100 overall. The diagnostic flags risk of ${flagNames}. This pattern mirrors what the underlying research identifies as the leading cause of stalled pilot-to-production conversion: not budget constraints, but structural and governance gaps.`;
}

export function generateReportPdf(result) {
  const { org_name, sector, industry, team_size, overall_score, dimension_scores, risk_flags, timestamp } = result;
  const doc = new jsPDF();
  const navy = [10, 31, 68];
  const gold = [201, 162, 75];
  let y = 20;

  doc.setFont("times", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...navy);
  doc.text("ScaleCheck", 20, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text("An OIN Diagnostic for Pilot-to-Production Readiness", 20, y);
  y += 10;

  doc.setDrawColor(...gold);
  doc.setLineWidth(1);
  doc.line(20, y, 190, y);
  y += 10;

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...navy);
  doc.text(`Organization: ${org_name}`, 20, y);
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(80);
  if (sector) { doc.text(`Sector: ${sector}`, 20, y); y += 6; }
  if (industry) { doc.text(`Industry: ${industry}`, 20, y); y += 6; }
  if (team_size) { doc.text(`Team size: ${team_size}`, 20, y); y += 6; }
  doc.text(`Date: ${new Date(timestamp).toLocaleDateString()}`, 20, y);
  y += 12;

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...gold);
  doc.text(`Overall Readiness Score: ${overall_score}/100`, 20, y);
  y += 12;

  doc.setFontSize(12);
  doc.setTextColor(...navy);
  doc.text("Dimension Scores", 20, y);
  y += 8;

  Object.entries(dimension_scores).forEach(([key, score]) => {
    const label = DIMENSION_LABELS[key] || key;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60);
    doc.text(label, 20, y);
    doc.setFillColor(230, 230, 230);
    doc.rect(75, y - 4, 100, 5, "F");
    doc.setFillColor(...gold);
    doc.rect(75, y - 4, score, 5, "F");
    doc.setFontSize(8);
    doc.text(`${score}`, 178, y);
    y += 9;
  });
  y += 6;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...navy);
  doc.text("Risk Flags", 20, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  if (!risk_flags || risk_flags.length === 0) {
    doc.setTextColor(58, 125, 92);
    doc.text("No major risk flags identified.", 20, y);
    y += 8;
  } else {
    risk_flags.forEach((flag) => {
      doc.setTextColor(178, 58, 58);
      doc.text(`- ${flag.type} (${flag.severity})`, 20, y);
      y += 6;
      doc.setTextColor(90);
      const noteLines = doc.splitTextToSize(flag.note, 160);
      doc.text(noteLines, 24, y);
      y += noteLines.length * 5 + 4;
    });
  }
  y += 6;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...navy);
  doc.text("Diagnostic Report", 20, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60);
  const narrativeLines = doc.splitTextToSize(buildNarrative(result), 170);
  doc.text(narrativeLines, 20, y);

  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text('This diagnostic operationalizes the OIN framework from the whitepaper', 20, 280);
  doc.text('"Stalled Pilot-to-Production Conversion Amid Economic Tightening."', 20, 285);

  doc.save(`ScaleCheck_${org_name.replace(/\s+/g, "_")}_Report.pdf`);
}