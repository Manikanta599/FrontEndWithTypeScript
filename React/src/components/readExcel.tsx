import * as XLSX from 'xlsx';

export interface ExcelData {
  name: string;
  village?: string;
  pincode?: string;
  email?: string;
  phno?: string;
  gender?: string;
}

export const readExcel = (file: File): Promise<ExcelData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        const data = new Uint8Array(e.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const excelData: ExcelData[] = XLSX.utils.sheet_to_json(sheet);
        resolve(excelData);
      } else {
        reject(new Error('Failed to read file'));
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
};
