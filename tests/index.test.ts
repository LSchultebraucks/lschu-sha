import {sha256} from '../src/index';

test('sha256 - hello world', () => {
  const message = 'hello world';
  const expectedHash = 'B94D27B9934D3E08A52E52D7DA7DABFAC484EFE37A5380EE9088F7ACE2EFCDE9';
  expect(sha256(message)).toEqual(expectedHash);
})

test('sha256 - complex word', () => {
  const message = '1234567!&/#HelloWorld1234567!&/#HelloWorld1234567!&/#HelloWorld1234567!&/#HelloWorld';
  const expectedHash = '16F9241122A0F54EB57059AF5F203391A2E5D8BDAEEBB7A621DFF71F7B789D0C';
  expect(sha256(message)).toEqual(expectedHash);
})
