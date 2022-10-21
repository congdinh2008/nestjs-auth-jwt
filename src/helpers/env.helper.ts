import { existsSync } from 'fs';
import { resolve } from 'path';

export function getEnvPath(dest: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  const fallback: string = resolve(`${dest}/.env`);
  const fileName: string = env ? `${env}.env` : `.development.env`;
  let filePath: string = resolve(`${dest}/${fileName}`);
  if (!existsSync(filePath)) {
    filePath = fallback;
  }
  return filePath;
}
