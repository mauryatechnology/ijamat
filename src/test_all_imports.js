import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const appPath = path.join(__dirname, 'App.jsx')
const appContent = fs.readFileSync(appPath, 'utf8')

const lines = appContent.split('\n')
const checkPromises = []

for (let l of lines) {
  l = l.trim()
  if (l.startsWith('import ') && l.includes('from') && l.includes('./')) {
    const parts = l.split('from')
    const importClause = parts[0].replace('import', '').trim()
    const relPath = parts[1].replace(/['";]/g, '').trim()
    let fullPath = path.resolve(__dirname, relPath)
    if (!fs.existsSync(fullPath)) {
      if (fs.existsSync(fullPath + '.jsx')) fullPath += '.jsx'
      else if (fs.existsSync(fullPath + '.js')) fullPath += '.js'
    }
    
    checkPromises.push((async () => {
      try {
        const fileUrl = pathToFileURL(fullPath).href
        const mod = await import(fileUrl)
        if (importClause.startsWith('{')) {
          const names = importClause.replace(/[{}]/g, '').split(',').map(s => s.trim())
          names.forEach(n => {
            if (mod[n] === undefined) {
              console.error(`FAILED: ${n} is UNDEFINED from ${relPath}`)
            }
          })
        } else {
          if (mod.default === undefined) {
            console.error(`FAILED DEFAULT: ${importClause} is UNDEFINED from ${relPath}`)
          }
        }
      } catch (err) {
        console.error(`ERROR IMPORTING ${relPath}:`, err.message)
      }
    })())
  }
}

await Promise.all(checkPromises)
console.log('All import checks complete.')
