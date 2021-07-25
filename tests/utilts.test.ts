import {to8BitString, appendSingle1} from "../src/utils";

test('to8BitString - empty string expect empty array', () => {
    expect(to8BitString('')).toEqual('');
});

test('to8BitString - hello world', () => {
    const word = 'hello world';
    const expectedBinaryString = 
    '0110100001100101011011000110110001101111001000000111011101101111011100100110110001100100';
    expect(to8BitString(word)).toEqual(expectedBinaryString);
});

test('appendSingle1', () => {
    const word = 
    '0110100001100101011011000110110001101111001000000111011101101111011100100110110001100100';
    const wordWithSingle1 = 
    '01101000011001010110110001101100011011110010000001110111011011110111001001101100011001001';
    expect(appendSingle1(word)).toEqual(wordWithSingle1);
})