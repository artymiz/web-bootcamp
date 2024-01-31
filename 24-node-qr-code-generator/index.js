import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


// if the path starts with ~, resolve it to the home directory
const resolveHome = (filePath) => {
  return (filePath[0] === '~') ?
    path.join(process.env.HOME, filePath.slice(1)) : filePath;
}


// if the path is relative, resolve it to absolute path
const resolveRelativePath = (filePath) => {
  let resolvedPath = resolveHome(filePath);
  if (!path.isAbsolute(resolvedPath)) {
    resolvedPath = path.resolve(filePath);
  }

  return resolvedPath;
}


// if the path is a directory, the default file name is qr-code
const resolveDefaultPath = (filePath) => {
  if (fs.existsSync(filePath) && fs.lstatSync(filePath).isDirectory()) {
    return path.join(filePath, "qr-code");
  }

  return filePath;
}


const textWithColor = (text, color) => {
  const colors = {
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    reset: "\x1b[0m"
  };

  return `${colors[color]}${text}${colors.reset}`;
}


const validateFilePath = (filePath) => {
  let resolvedPath = resolveDefaultPath(resolveRelativePath(filePath));

  let parentDir = path.dirname(resolvedPath);
  if (!fs.existsSync(parentDir)) {
    return `${textWithColor(parentDir, "green")} does not exist`;
  } else if (!fs.lstatSync(parentDir).isDirectory()) {
    return `${textWithColor(parentDir, "green")} is not a folder`;
  }

  return true;
};


const writeQRCodeToFile = (url, fullFilePath, fileType) => {
  const qrCode = qr.image(url, { type: fileType });
  qrCode.pipe(fs.createWriteStream(fullFilePath));
  console.log("\nQR code generated successfully");
  console.log(`    saved at: ${textWithColor(fullFilePath, "green")}`);
}


const writeEntryToLog = (entry, logFile) => {
  fs.appendFile(
    logFile,
    entry + "\n",
    (err) => { if (err) { console.error(err); } }
  );

  console.log(`New log entry added:\n    saved at: ${textWithColor(logFile, "green")}`);
}


inquirer
  .prompt([
    {
      message: "Type in your URL\n",
      name: "url"
    },
    {
      message: "Choose your file type",
      name: "fileType",
      type: "list",
      choices: ['png', 'svg', 'pdf', 'eps']
    },
    {
      message: "Where do you want to save the file?\n(file/folder name without .<type>)\n",
      name: "filePath",
      validate: validateFilePath
    },
    {
      type: "confirm",
      message: "Do you want to log this entry?",
      name: "saveInput",
      default: true
    }
  ])
  .then((answers) => {
    const filePath = resolveDefaultPath(resolveRelativePath(answers.filePath));
    const qrCodeFile = `${filePath}.${answers.fileType}`;
    writeQRCodeToFile(answers.url, qrCodeFile, answers.fileType);

    if (answers.saveInput) {
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const logFile = path.join(__dirname, "log.txt");
      const currentDateTime = new Date().toString();
      const logEntry = currentDateTime + `\n  url: ${answers.url}\n  saved at: ${qrCodeFile}\n`;
      writeEntryToLog(logEntry, logFile);
    }
  });
