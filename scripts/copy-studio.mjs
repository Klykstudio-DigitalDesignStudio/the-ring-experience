import { cp, mkdir, rm } from 'node:fs/promises';
import { access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const studioDistDir = path.join(rootDir, 'studio', 'dist');
const targetAdminDir = path.join(rootDir, 'dist', 'admin');

async function exists(targetPath) {
    try {
        await access(targetPath, constants.F_OK);
        return true;
    } catch {
        return false;
    }
}

if (!(await exists(studioDistDir))) {
    throw new Error(`Studio build not found at ${studioDistDir}`);
}

await rm(targetAdminDir, { recursive: true, force: true });
await mkdir(targetAdminDir, { recursive: true });
await cp(studioDistDir, targetAdminDir, { recursive: true });
