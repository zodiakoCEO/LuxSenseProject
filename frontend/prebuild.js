import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Copiar tipos compartidos antes del build
const sharedTypesSource = path.join(__dirname, '..', 'shared', 'types');
const sharedTypesDest = path.join(__dirname, 'src', 'types', 'shared');

if (fs.existsSync(sharedTypesSource)) {
  fs.mkdirSync(sharedTypesDest, { recursive: true });
  
  // Copiar index.ts
  fs.copyFileSync(
    path.join(sharedTypesSource, 'index.ts'),
    path.join(sharedTypesDest, 'index.ts')
  );
  
  console.log('✅ Tipos compartidos copiados correctamente');
} else {
  console.warn('⚠️ No se encontró shared/types, usando tipos locales');
}
