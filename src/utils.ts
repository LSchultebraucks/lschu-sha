export const to8BitString = (word: string): string => {
    let binaryString = '';
  Array.from(word).forEach((c: string) => {
    binaryString += (c.charCodeAt(0).toString(2).padStart(8, '0'));
  });
  return binaryString;
};
