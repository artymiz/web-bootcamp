import inquirer from 'inquirer';
import fs from 'fs';
import qr from 'qr-image';

inquirer
  .prompt([
    {
      "message": "Type in your URL",
      "name": "url"
    },
    {
      "message": "Choose your file type",
      "name": "fileType",
      "type": "list",
      "choices": ['svg', 'png', 'pdf', 'eps']
    },
    {
      "message": "Type in the folder to store your qr code",
      "name": "directory"
    }
  ])
  .then((answers) => {
    const { url, fileType, directory } = answers;
    console.log(`url: ${url}, fileType: ${fileType}, directory: ${directory}`);
  });
