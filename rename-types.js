import fs from 'fs'
import path from 'path'

const cjsTypesDir = path.resolve('lib/cjs/types')
const esmTypesDir = path.resolve('lib/esm/types')

function renameFiles(dir, newExtension) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file)
    const stats = fs.statSync(fullPath)

    if (stats.isDirectory()) {
      renameFiles(fullPath, newExtension)
    } else if (file.endsWith('.d.ts')) {
      const newFile = fullPath.replace('.d.ts', newExtension)
      fs.renameSync(fullPath, newFile)
      console.log(`Renamed: ${fullPath} -> ${newFile}`)
    }
  })
}

// Rename .d.ts to .d.cts in cjs/types
renameFiles(cjsTypesDir, '.d.cts')

// Rename .d.ts to .d.mts in esm/types
renameFiles(esmTypesDir, '.d.mts')
