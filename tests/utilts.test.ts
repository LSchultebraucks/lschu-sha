import {to8BitString, appendSingle1, padWithZerosToDiv512, preprocess} from "../src/utils";

test('to8BitString - empty string expect empty array', () => {
    expect(to8BitString('')).toEqual('');
});

test('to8BitString - hello world', () => {
    const word = 'hello world';
    const expectedBinaryString = '0110100001100101011011000110110001101111001000000111011101101111011100100110110001100100';
    expect(to8BitString(word)).toEqual(expectedBinaryString);
});

test('appendSingle1', () => {
    const word = '0110100001100101011011000110110001101111001000000111011101101111011100100110110001100100';
    const wordWithSingle1 = '01101000011001010110110001101100011011110010000001110111011011110111001001101100011001001';
    expect(appendSingle1(word)).toEqual(wordWithSingle1);
})

test('padWithZerosToDiv512 - empty word', () => {
    const word = '';
    const expectedWord = '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    expect(padWithZerosToDiv512(word)).toEqual(expectedWord);
})

test('padWithZerosToDiv512 - word length less than 512 in binary', () => {
    const word = '01101000011001010110110001101100011011110010000001110111011011110111001001101100011001001';
    const expectedWord = '01101000011001010110110001101100011011110010000001110111011011110111001001101100011001001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    expect(padWithZerosToDiv512(word)).toEqual(expectedWord);
});

test('preprocess - single chunk length word', () => {
    const message = 'hello world';
    const expectedPreprocessedMessage = '01101000011001010110110001101100011011110010000001110111011011110111001001101100011001001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001011000';
    expect(preprocess(message)).toEqual(expectedPreprocessedMessage);
})

test('preprocess - multiple chunk length word', () => {
    const message = 'Let\'s hash something! Long enough to have multiple chunks...';
    const expectedPreprocessedMessage = '0100110001100101011101000010011101110011001000000110100001100001011100110110100000100000011100110110111101101101011001010111010001101000011010010110111001100111001000010010000001001100011011110110111001100111001000000110010101101110011011110111010101100111011010000010000001110100011011110010000001101000011000010111011001100101001000000110110101110101011011000111010001101001011100000110110001100101001000000110001101101000011101010110111001101011011100110010111000101110001011101000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111100000';
    expect(preprocess(message)).toEqual(expectedPreprocessedMessage);
})