'use strict'

const fs = require('fs')

class FileService {
  constructor(options = {}) {
    this._options = options
  }

  safeCreateDir(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  }

  safeDeleteDir(dir) {
    if (fs.existsSync(dir)) {
      fs.rmdirSync(dir, { recursive: true })
    }
  }

  writeFile(filePath, data) {
    fs.writeFileSync(filePath, data)
  }

  isExists(filePath) {
    const isExists = fs.existsSync(filePath)

    return isExists
  }

  safeDeleteFile(file) {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file)
    }
  }

  copyFile(sourcePath, destinationPath) {
    fs.copyFileSync(sourcePath, destinationPath)
  }

  readFile(filePath) {
    // return fs.readFileSync(filePath, 'utf8')
    return fs.readFileSync(filePath)
  }

  readFolder(dir) {
    const fileNames = fs.readdirSync(dir)

    return fileNames
  }

  readAllFilesAtDir(dir, filePaths = []) {
    const fileNames = this.readFolder(dir)

    for (const fileName of fileNames) {
      const filePath = `${dir}/${fileName}`

      if (fs.statSync(filePath).isDirectory()) {
        filePaths = this.readAllFilesAtDir(filePath, filePaths)
      } else {
        filePaths.push(filePath)
      }
    }

    return filePaths
  }
}

module.exports = FileService