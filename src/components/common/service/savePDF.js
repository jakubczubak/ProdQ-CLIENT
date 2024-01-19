export const savePDF = (item) => {
  const linkSource = `data:application/pdf;base64,${item.filePDF.pdfData}`;
  const downloadLink = document.createElement('a');
  const fileName = item.filePDF.name;
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
};
