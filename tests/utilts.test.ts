import { chunkString, createMessageSchedule, preprocess, rightRotate, rightShiftWithLeadingZeros, xor, add, and, not } from '../src/utils';

test('preprocess - single chunk length word', () => {
    const message = 'hello world';
    const expectedPreprocessedMessage = '01101000011001010110110001101100011011110010000001110111011011110111001001101100011001001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001011000';
    expect(preprocess(message)).toEqual(expectedPreprocessedMessage);
});

test('preprocess - multiple chunk length word', () => {
    const message = 'Let\'s hash something! Long enough to have multiple chunks...';
    const expectedPreprocessedMessage = '0100110001100101011101000010011101110011001000000110100001100001011100110110100000100000011100110110111101101101011001010111010001101000011010010110111001100111001000010010000001001100011011110110111001100111001000000110010101101110011011110111010101100111011010000010000001110100011011110010000001101000011000010111011001100101001000000110110101110101011011000111010001101001011100000110110001100101001000000110001101101000011101010110111001101011011100110010111000101110001011101000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111100000';
    expect(preprocess(message)).toEqual(expectedPreprocessedMessage);
});

test('rightRotate - singleRotate', () => {
    const word = '10010010';
    const expectedWord = '01001001';
    expect(rightRotate(word, 1)).toEqual(expectedWord);
});

test('rightRotate - multipleRotate', () => {
    const word = '10010010';
    const expectedWord = '01010010';
    expect(rightRotate(word, 3)).toEqual(expectedWord);
});

test('rightRotate - fullRotate', () => {
    const word = '10010010';
    const expectedWord = '10010010';
    expect(rightRotate(word, 8)).toEqual(expectedWord);
});

test('rightShift - singleShift', () => {
    const word = '10010010';
    const expectedWord = '01001001';
    expect(rightShiftWithLeadingZeros(word, 1)).toEqual(expectedWord);
});

test('rightShift - multipleShift', () => {
    const word = '10010010';
    const expectedWord = '00010010'; 
    expect(rightShiftWithLeadingZeros(word, 3)).toEqual(expectedWord);
});

test('rightShift - fullShift', () => {
    const word = '10010010';
    const expectedWord = '00000000';
    expect(rightShiftWithLeadingZeros(word, 8)).toEqual(expectedWord);
});

test('chunkString - multiple chunks', () => {
    const str = '11110000';
    const expectedChunks = ['1111', '0000'];
    const actualChunks = chunkString(str, 4);
    expect(actualChunks.length).toEqual(actualChunks.length);
    expect(actualChunks[0]).toEqual(actualChunks[0]);
    expect(actualChunks[1]).toEqual(actualChunks[1]);
});

test('chunkString - singleChunk', () => {
    const str = '11110000';
    const expectedChunks = ['11110000'];
    const actualChunks = chunkString(str, 8);
    expect(actualChunks.length).toEqual(actualChunks.length);
    expect(actualChunks[0]).toEqual(actualChunks[0]);
});

test('chunkString - singleChunk tiny string', () => {
    const str = '11';
    const expectedChunks = ['11'];
    const actualChunks = chunkString(str, 8);
    expect(actualChunks.length).toEqual(actualChunks.length);
    expect(actualChunks[0]).toEqual(actualChunks[0]);
});

test('chunkString - singleChunk empty string', () => {
    const str = '';
    const expectedChunks = [''];
    const actualChunks = chunkString(str, 8);
    expect(actualChunks.length).toEqual(actualChunks.length);
    expect(actualChunks[0]).toEqual(actualChunks[0]);
});


test('messageSchedule', () => {
    const chunk = '01101000011001010110110001101100011011110010000001110111011011110111001001101100011001001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001011000';
    const expectedMessageSchedule = [
        '01101000011001010110110001101100',
        '01101111001000000111011101101111',
        '01110010011011000110010010000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000001011000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',        
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',        
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',        
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
    ]
    const actualMessageSchedule = createMessageSchedule(chunk);
    expect(actualMessageSchedule.length).toEqual(expectedMessageSchedule.length);
    actualMessageSchedule.forEach((item, i) => {
        expect(item).toEqual(expectedMessageSchedule[i]);
    });
});

test('xor - 8 bit words', () => {
    const a = '10011001';
    const b = '10101010';
    const bizSize = 8;
    const expectedWord = '00110011';
    expect(xor(a, b, bizSize)).toEqual(expectedWord);
});

test('xor - 8 bit and 6 bit words', () => {
    const a = '10011001';
    const b = '10101010';
    const bizSize = 8;
    const expectedWord = '00110011';
    expect(xor(a, b, bizSize)).toEqual(expectedWord);
});

test('xor - 8 bit words', () => {
    const a = '10011001';
    const b = '101010';
    const bizSize = 8;
    const expectedWord = '10110011';
    expect(xor(a, b, bizSize)).toEqual(expectedWord);
});

test('xor - 6 bit and 8 bit words', () => {
    const a = '101010';
    const b = '10011001';
    const bizSize = 8;
    const expectedWord = '10110011';
    expect(xor(a, b, bizSize)).toEqual(expectedWord);
});

test('add - 8 bit words', () => {
    const a = '01001000';
    const b = '01001000';
    const bitSize = 8;
    const expectedWord = '10010000';
    expect(add(a, b, bitSize)).toEqual(expectedWord);
});

test('add - 8 bit and 6 bit words', () => {
    const a = '01001000';
    const b = '001000';
    const bitSize = 8;
    const expectedWord = '01010000';
    expect(add(a, b, bitSize)).toEqual(expectedWord);
});

test('add - 8 bit words with overflow and modulo operation used', () => {
    const a = '11111110';
    const b = '00000011';
    const bitSize = 8;
    const expectedWord = '00000001';
    expect(add(a, b, bitSize)).toEqual(expectedWord);
});

test('add - 8 bit words with overflow and modulo operation used', () => {
    const a = '11111111';
    const b = '11111111';
    const bitSize = 8;
    const expectedWord = '11111110';
    expect(add(a, b, bitSize)).toEqual(expectedWord);
});

test('and - 8 bit words', () => {
    const a = '10001000';
    const b = '11110000';
    const bitSize = 8;
    const expectedWord = '10000000';
    expect(and(a, b, bitSize)).toEqual(expectedWord);
});

test('and - 8 bit words', () => {
    const a = '01010101';
    const b = '10101010';
    const bitSize = 8;
    const expectedWord = '00000000';
    expect(and(a, b, bitSize)).toEqual(expectedWord);
});

test('and - 8 bit and 6 bit words', () => {
    const a = '10001010';
    const b = '110010';
    const bitSize = 8;
    const expectedWord = '00000010';
    expect(and(a, b, bitSize)).toEqual(expectedWord);
});

test('not - 8 bit word', () => {
    const a = '01100011';
    const bitSize = 8;
    const expectedWord = '10011100';
    expect(not(a, bitSize)).toEqual(expectedWord);
});

test('not - 8 bit word', () => {
    const a = '00000000';
    const bitSize = 8;
    const expectedWord = '11111111';
    expect(not(a, bitSize)).toEqual(expectedWord);
});

test('not - 8 bit word', () => {
    const a = '11111111';
    const bitSize = 8;
    const expectedWord = '00000000';
    expect(not(a, bitSize)).toEqual(expectedWord);
});
