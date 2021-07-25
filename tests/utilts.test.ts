import {to8BitString} from "../src/utils";

test('toBinaryArray - empty string expect empty array', () => {
    expect(to8BitString('')).toEqual('');
});

test('toBinaryArray - hello world', () => {
    const word = 'hello world';
    const expectedBinaryString = 
    '0110100001100101011011000110110001101111001000000111011101101111011100100110110001100100';
    expect(to8BitString(word)).toEqual(expectedBinaryString);
});

