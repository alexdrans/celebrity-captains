const toCursor = (string: string): string =>
  Buffer.from(string).toString('base64');

const fromCursor = (string: string): string =>
  Buffer.from(string, 'base64').toString('ascii');

export { toCursor, fromCursor };
