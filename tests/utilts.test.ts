import { chunkString, createMessageSchedule, createInitialWords, preprocess, rightRotate, rightShiftLogical, xor, add, and, not, hashRound } from '../src/utils';

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

test('rightRotate - 32bit word 17 rotations', () => {
    const word = '00000000000000010101000110011011';
    const expectedWord = '10101000110011011000000000000000'
    expect(rightRotate(word, 17)).toEqual(expectedWord);
});

test('rightRotate - 32bit word 19 rotations', () => {
    const word = '00000000000000010101000110011011';
    const expectedWord = '00101010001100110110000000000000'
    expect(rightRotate(word, 19)).toEqual(expectedWord);
});

test('rightRotate - 32bit word 19 rotations', () => {
    const word = '00000000000000000000000000000000';
    const expectedWord = '00000000000000000000000000000000'
    expect(rightRotate(word, 10)).toEqual(expectedWord);
});

test('rightRotate - 32bit word 18 rotations', () => {
    const word = '01101111001000000111011101101111';
    const expectedWord = '00011101110110111101101111001000'
    expect(rightRotate(word, 18)).toEqual(expectedWord);
});


test('rightShiftLogical - singleShift', () => {
    const word = '10010010';
    const expectedWord = '01001001';
    expect(rightShiftLogical(word, 1)).toEqual(expectedWord);
});

test('rightShiftLogical - multipleShift', () => {
    const word = '10010010';
    const expectedWord = '00010010'; 
    expect(rightShiftLogical(word, 3)).toEqual(expectedWord);
});

test('rightShiftLogical - fullShift', () => {
    const word = '10010010';
    const expectedWord = '00000000';
    expect(rightShiftLogical(word, 8)).toEqual(expectedWord);
});

test('rightShiftLogical - 32bit word 10 shift', () => {
    const word = '00000000000000010101000110011011';
    const expectedWord = '00000000000000000000000001010100'
    expect(rightShiftLogical(word, 10)).toEqual(expectedWord);
});

test('rightShiftLogical - 32bit word 3 shift', () => {
    const word = '01101111001000000111011101101111';
    const expectedWord = '00001101111001000000111011101101'
    expect(rightShiftLogical(word, 3)).toEqual(expectedWord);
});

test('rightShiftLogical - 32bit word 3 shift', () => {
    const word = '00000000000000000000000000000000';
    const expectedWord = '00000000000000000000000000000000'
    expect(rightShiftLogical(word, 10)).toEqual(expectedWord);
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

test('createInitialWords', () => {
    const messageSchedule = [
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
    ];
    const result = createInitialWords(messageSchedule, 32);
    expect(result[0]).toEqual('01101000011001010110110001101100');
    expect(result[16]).toEqual('00110111010001110000001000110111');
    expect(result[32]).toEqual('00111011010111111110010111010110');
    expect(result[48]).toEqual('00111001001111110000010110101101');
    expect(result[63]).toEqual('11000010110000101110101100010110');
});

test('hashRound, "hello world" hash round i = 0', () => {
    const a = '01101010000010011110011001100111';
    const b = '10111011011001111010111010000101';
    const c = '00111100011011101111001101110010';
    const d = '10100101010011111111010100111010';
    const e = '01010001000011100101001001111111';
    const f = '10011011000001010110100010001100';
    const g = '00011111100000111101100110101011';
    const h = '01011011111000001100110100011001';
    const hashes = [a, b, c, d, e, f, g, h];
    const w = '01101000011001010110110001101100';
    const k = '01000010100010100010111110011000';
    const aResult = '01100100011011011111010010111001';
    const bResult = '01101010000010011110011001100111';
    const cResult = '10111011011001111010111010000101';
    const dResult = '00111100011011101111001101110010';
    const eResult = '00000001001011010100111100001110';
    const fResult = '01010001000011100101001001111111';
    const gResult = '10011011000001010110100010001100';
    const hResult = '00011111100000111101100110101011';
    const expectedHashes = [aResult, bResult, cResult, dResult, eResult, fResult, gResult, hResult];
    const bitSize = 32;
    const actualHashes = hashRound(hashes, k, w, bitSize);
    expect(expectedHashes.length).toEqual(actualHashes.length);
    expect(expectedHashes[0]).toEqual(actualHashes[0]);
    expect(expectedHashes[1]).toEqual(actualHashes[1]);
    expect(expectedHashes[2]).toEqual(actualHashes[2]);
    expect(expectedHashes[3]).toEqual(actualHashes[3]);
    expect(expectedHashes[4]).toEqual(actualHashes[4]);
    expect(expectedHashes[5]).toEqual(actualHashes[5]);
    expect(expectedHashes[6]).toEqual(actualHashes[6]);
    expect(expectedHashes[7]).toEqual(actualHashes[7]);
});

test('hashRound, "hello world" hash round i = 1', () => {
    const a = '01100100011011011111010010111001';
    const b = '01101010000010011110011001100111';
    const c = '10111011011001111010111010000101';
    const d = '00111100011011101111001101110010';
    const e = '00000001001011010100111100001110';
    const f = '01010001000011100101001001111111';
    const g = '10011011000001010110100010001100';
    const h = '00011111100000111101100110101011';
    const hashes = [a, b, c, d, e, f, g, h];
    const w = '01101111001000000111011101101111';
    const k = '01110001001101110100010010010001';
    const aResult = '10011111101110111011001001000011';
    const bResult = '01100100011011011111010010111001';
    const cResult = '01101010000010011110011001100111';
    const dResult = '10111011011001111010111010000101';
    const eResult = '00100110101110100000001101000000';
    const fResult = '00000001001011010100111100001110';
    const gResult = '01010001000011100101001001111111';
    const hResult = '10011011000001010110100010001100';
    const expectedHashes = [aResult, bResult, cResult, dResult, eResult, fResult, gResult, hResult];
    const bitSize = 32;
    const actualHashes = hashRound(hashes, k, w, bitSize);
    expect(expectedHashes.length).toEqual(actualHashes.length);
    expect(expectedHashes[0]).toEqual(actualHashes[0]);
    expect(expectedHashes[1]).toEqual(actualHashes[1]);
    expect(expectedHashes[2]).toEqual(actualHashes[2]);
    expect(expectedHashes[3]).toEqual(actualHashes[3]);
    expect(expectedHashes[4]).toEqual(actualHashes[4]);
    expect(expectedHashes[5]).toEqual(actualHashes[5]);
    expect(expectedHashes[6]).toEqual(actualHashes[6]);
    expect(expectedHashes[7]).toEqual(actualHashes[7]);
});

test('hashRound, "hello world" hash round i = 8', () => {
    const a = '01001011111000110100111111101100';
    const b = '11010000000000111000000110101000';
    const c = '10000110010100110100010011000011';
    const d = '11110100100001101100011000000110';
    const e = '11100011011010100000111110011101';
    const f = '11110010000010000001111011000000';
    const g = '10011101001111010010000110010011';
    const h = '01000110001001101000011001101001';
    const hashes = [a, b, c, d, e, f, g, h];
    const w = '00000000000000000000000000000000';
    const k = '11011000000001111010101010011000';
    const aResult = '11110000011010011110111011000111';
    const bResult = '01001011111000110100111111101100';
    const cResult = '11010000000000111000000110101000';
    const dResult = '10000110010100110100010011000011';
    const eResult = '01000010000010000011000100010111';
    const fResult = '11100011011010100000111110011101';
    const gResult = '11110010000010000001111011000000';
    const hResult = '10011101001111010010000110010011';
    const expectedHashes = [aResult, bResult, cResult, dResult, eResult, fResult, gResult, hResult];
    const bitSize = 32;
    const actualHashes = hashRound(hashes, k, w, bitSize);
    expect(expectedHashes.length).toEqual(actualHashes.length);
    expect(expectedHashes[0]).toEqual(actualHashes[0]);
    expect(expectedHashes[1]).toEqual(actualHashes[1]);
    expect(expectedHashes[2]).toEqual(actualHashes[2]);
    expect(expectedHashes[3]).toEqual(actualHashes[3]);
    expect(expectedHashes[4]).toEqual(actualHashes[4]);
    expect(expectedHashes[5]).toEqual(actualHashes[5]);
    expect(expectedHashes[6]).toEqual(actualHashes[6]);
    expect(expectedHashes[7]).toEqual(actualHashes[7]);
});

test('hasRound, "hello world" parts i = 8', () => {
    const a = '01001011111000110100111111101100';
    const b = '11010000000000111000000110101000';
    const c = '10000110010100110100010011000011';
    const d = '11110100100001101100011000000110';
    const e = '11100011011010100000111110011101';
    const f = '11110010000010000001111011000000';
    const g = '10011101001111010010000110010011';
    const h = '01000110001001101000011001101001';
    const hashes = [a, b, c, d, e, f, g, h];
    const w = '00000000000000000000000000000000';
    const k = '11011000000001111010101010011000';
    const bitSize = 32;
    const S1 = xor(xor(rightRotate(e, 6), rightRotate(e, 11), bitSize), rightRotate(e, 25), bitSize);
    const ch = xor(and(e, f, bitSize), and(not(e, bitSize), g, bitSize), bitSize);
    const temp1 = add(
        add(add(add(k, w, bitSize), ch, bitSize), S1, bitSize),
        h,
        bitSize,
    );
    const S0 = xor(xor(rightRotate(a, 2), rightRotate(a, 13), bitSize), rightRotate(a, 22), bitSize);
    const maj = xor(xor(and(a, b, bitSize), and(a, c, bitSize), bitSize), and(b, c, bitSize), bitSize);
    const temp2 = add(S0, maj, bitSize);
    const expectedCh = '11111110000111010010111010000010'; // TODO test why it is wrong here
    const expectedS1 = '00110001001101100000101110001110';
    const expectedMaj = '11000010010000110100010111101000';
    const expectedS0 = '11100000101001010011110111001110';
    const expectedTemp1 = '01001101100000010110101100010001';
    expect(expectedCh).toEqual(ch);
    expect(expectedS0).toEqual(S0);
    expect(expectedMaj).toEqual(maj);
    expect(expectedS1).toEqual(S1);
    expect(expectedTemp1).toEqual(temp1);
});

test('hashRound, "hello world" hash round i = 15', () => {
    const a = '11010110001111100010110000100110';
    const b = '01000011010101001111010111010010';
    const c = '00010100001100110001110100110101';
    const d = '10101000010011100010111101101111';
    const e = '00011101000100111110101000101011';
    const f = '01001010000010100100000111000101';
    const g = '10100001111111010110010101110010';
    const h = '00110100111100010011101011011101';
    const hashes = [a, b, c, d, e, f, g, h];
    const w = '00000000000000000000000001011000';
    const k = '11000001100110111111000101110100';
    const aResult = '10000010100111100100100100101011';
    const bResult = '11010110001111100010110000100110';
    const cResult = '01000011010101001111010111010010';
    const dResult = '00010100001100110001110100110101';
    const eResult = '10101000101011001001100111000100';
    const fResult = '00011101000100111110101000101011';
    const gResult = '01001010000010100100000111000101';
    const hResult = '10100001111111010110010101110010';
    const expectedHashes = [aResult, bResult, cResult, dResult, eResult, fResult, gResult, hResult];
    const bitSize = 32;
    const actualHashes = hashRound(hashes, k, w, bitSize);
    expect(expectedHashes.length).toEqual(actualHashes.length);
    expect(expectedHashes[0]).toEqual(actualHashes[0]);
    expect(expectedHashes[1]).toEqual(actualHashes[1]);
    expect(expectedHashes[2]).toEqual(actualHashes[2]);
    expect(expectedHashes[3]).toEqual(actualHashes[3]);
    expect(expectedHashes[4]).toEqual(actualHashes[4]);
    expect(expectedHashes[5]).toEqual(actualHashes[5]);
    expect(expectedHashes[6]).toEqual(actualHashes[6]);
    expect(expectedHashes[7]).toEqual(actualHashes[7]);
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

test('xor - multiple operations on 32bit words', () => {
    const a = '10101000110011011000000000000000';
    const b = '00101010001100110110000000000000';
    const c = '00000000000000000000000001010100';
    const bitSize = 32;
    const expectedWord = '10000010111111101110000001010100';
    expect(xor(xor(a, b, bitSize), c, bitSize));
});

test('xor - 32bit words', () => {
    const a = '10101000110011011000000000000000';
    const b = '00101010001100110110000000000000';
    const bitSize = 32;
    const expectedWord = '10000010111111101110000000000000';
    expect(xor(a, b, bitSize)).toEqual(expectedWord);
})

test('xor - 32bit 0 words', () => {
    const a = '00000000000000000000000000000000';
    const b = '00000000000000000000000000000000';
    const bitSize = 32;
    const expectedWord = '00000000000000000000000000000000';
    expect(xor(a, b, bitSize)).toEqual(expectedWord);
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

test('add - multiple 32 bit words with overflow', () => {
    const a = '01101000011001010110110001101100';
    const b = '11001110111000011001010111001011';
    const c = '00000000000000000000000000000000';
    const d = '00000000000000000000000000000000';
    const bitSize = 32;
    const expectedWord = '00110111010001110000001000110111';
    expect(add(a, add(b, add(c, d, bitSize), bitSize), bitSize)).toEqual(expectedWord);
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

test('and - 32bit words', () => {
    const a = '01010001000011100101001001111111';
    const b = '10011011000001010110100010001100';
    const bitSize = 32;
    const expectedWord = '00010001000001000100000000001100';
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

test('not - 32 bit word', () => {
    const a = '01010001000011100101001001111111';
    const bitSize = 32;
    const expectedWord = '10101110111100011010110110000000';
    expect(not(a, bitSize)).toEqual(expectedWord);
});

test('multiple operations xor, rotateRight, rotateShiftLogical 32bit words', () => {
    const w = '00000000000000010101000110011011';
    const expectedWord = '10000010111111101110000001010100';
    const bitSize = 32;
    const a = rightRotate(w, 17);
    const b = rightRotate(w, 19);
    const c = rightShiftLogical(w, 10);
    const res1 = xor(a, b, bitSize);
    const res2 = xor(res1, c, bitSize);
    const s1 = xor(xor(a, b, bitSize), c, bitSize);
    expect(res2).toEqual(expectedWord);
});
