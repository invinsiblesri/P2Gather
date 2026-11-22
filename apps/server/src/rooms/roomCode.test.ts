import { generateCode } from './RoomManager';

describe('Room Code Generator', () => {
  const ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
  const ALPHABET_SET = new Set(ALPHABET.split(''));

  it('generates 6 character code with hyphen', () => {
    const code = generateCode();
    expect(code).toMatch(/^[A-Z0-9]{3}-[A-Z0-9]{3}$/);
  });

  it('never uses confusing characters (0, O, 1, I, L)', () => {
    for (let i = 0; i < 1000; i++) {
      const code = generateCode();
      const chars = code.replace('-', '').split('');
      for (const char of chars) {
        expect(['0', 'O', '1', 'I', 'L']).not.toContain(char);
      }
    }
  });

  it('uses only valid alphabet characters', () => {
    for (let i = 0; i < 1000; i++) {
      const code = generateCode();
      const chars = code.replace('-', '').split('');
      for (const char of chars) {
        expect(ALPHABET_SET.has(char)).toBe(true);
      }
    }
  });

  it('has high entropy (unique codes over many generations)', () => {
    const codes = new Set<string>();
    for (let i = 0; i < 10000; i++) {
      codes.add(generateCode());
    }
    expect(codes.size).toBe(10000); // All unique
  });
});