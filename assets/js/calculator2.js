
document.addEventListener("DOMContentLoaded", function () {
    const calculateBtn = document.getElementById("calculate2");
    const resultEl = document.getElementById("result2");
    const downloadBtn = document.getElementById("download-report2");
  
    // --- Set default date values (example: today and 30 days earlier) ---
    const today = new Date();
    const defaultStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
  
    document.querySelector(".start-date").value = defaultStart.toISOString().slice(0, 10);
    document.querySelector(".end-date").value = today.toISOString().slice(0, 10);
  
    calculateBtn.addEventListener("click", function () {
      const start = document.querySelector(".start-date").value;
      const end = document.querySelector(".end-date").value;
  
      if (!start || !end) {
        alert("Lütfen başlangıç ve bitiş tarihlerini giriniz.");
        return;
      }
  
      const startDate = new Date(start);
      const endDate = new Date(end);

      let years = endDate.getFullYear() - startDate.getFullYear();
      let months = endDate.getMonth() - startDate.getMonth();
      let days = endDate.getDate() - startDate.getDate() + 1;

      if (days < 0) {
        // Get days in previous month
        const previousMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
        days += previousMonth.getDate();
        months--;
      }
    
      // Adjust months if negative
      if (months < 0) {
        months += 12;
        years--;
      }

      const diffTime = endDate - startDate;
      const diffInDays = diffTime / (1000 * 60 * 60 * 24);
      const diffYears = Math.floor(diffInDays / 365);
      const diffMonths = Math.floor((diffInDays-diffYears*365)/30);
      const diffDays = Math.floor(diffInDays-diffYears*365-diffMonths*30);
  
      resultEl.textContent = `Hizmet Süresi: ${years.toFixed(0)} yıl ${months.toFixed(0)} ay ${days.toFixed(0)} gün`;
    //   resultEl.textContent = `Hizmet Süresi: ${diffYears.toFixed(0)} yıl ${diffMonths.toFixed(0)} ay ${diffDays.toFixed(0)} gün`;
  
      downloadBtn.style.display = "inline-block";
    });
  
    downloadBtn.addEventListener("click", function () {

        const employer = document.querySelector(".employer").value;
        const start = document.querySelector(".start-date").value;
        const end = document.querySelector(".end-date").value;
        const resultText = resultEl.textContent.replace("Hizmet Süresi: ", "").replace(" gün", "");
    
        // Create worksheet data
        const data = [
          ["İşveren", "Başlangıç Tarihi", "Bitiş Tarihi", "Toplam Gün"],
          [employer, start, end, resultText]
        ];
    
        // Create a new workbook and sheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(data);
    
        XLSX.utils.book_append_sheet(workbook, worksheet, "Hizmet Süresi");
    
        // Trigger download
        XLSX.writeFile(workbook, "hizmet_suresi_raporu.xlsx");
      });
  });
  