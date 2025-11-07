document.addEventListener("DOMContentLoaded", function () {
  const calculateBtn = document.getElementById("calculate");
  const resultEl = document.getElementById("result");
  const downloadBtn = document.getElementById("download-report");

  calculateBtn.addEventListener("click", function () {
    const P = parseFloat(document.getElementById("principal").value);
    const r = parseFloat(document.getElementById("rate").value) / 100;
    const t = parseFloat(document.getElementById("days").value);

    if (isNaN(P) || isNaN(r) || isNaN(t)) {
      alert("Lütfen geçerli değerler giriniz.");
      return;
    }

    // Simple compound interest formula
    const A_comp = P * Math.pow(1 + r, t);
    const A_simple = P * (1 + r * t / 365);
    const totalInterest = A_simple - P;

    resultEl.innerHTML = `
      Güncel Borç: ₺${A_simple.toFixed(2)}<br>
      Toplam Faiz: ₺${totalInterest.toFixed(2)}
    `;

    downloadBtn.style.display = "inline-block";
  });

  // Generate and download report as text file

  downloadBtn.addEventListener("click", function () {
    const P = document.getElementById("principal").value;
    const r = document.getElementById("rate").value;
    const t = document.getElementById("days").value;
    const resultText = resultEl.innerText;

    const report = `
Financial Report
-----------------
Borç Tutarı: ₺${P}
Yıllık Oran: ${r}%
Gün Sayısı: ${t}

${resultText}
`;

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "financial_report.txt";
    a.click();
    URL.revokeObjectURL(url);
  });
});