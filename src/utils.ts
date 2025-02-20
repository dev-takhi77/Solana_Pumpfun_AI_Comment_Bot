import { createInterface } from 'readline';
import { CommandLineFunction } from './types';
import fs from 'fs';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const cliMenu = (headline: string, command_line: CommandLineFunction[], clear: boolean = true) => {
  if (clear) console.clear()
  const title = headline == "" ? `${command_line.map((ele, idx) => `\n\t[${idx + 1}] ${ele.command}`)}\n` : `${headline}\n${command_line.map((ele, idx) => `\n\t[${idx + 1}] ${ele.command}`)}\n`
  const temp = () => rl.question(title, (answer: string) => {
    console.clear()
    try {
      const i = parseInt(answer) - 1
      command_line[i].fn()
    } catch (error) {
      console.error(" =============== Invalid Input =============== \n");
      temp()
    }
  })

  temp()
}


// Function to read JSON file
const readJson = (filename: string = "data.json"): string[] => {
  if (!fs.existsSync(filename)) {
    // If the file does not exist, create an empty array
    fs.writeFileSync(filename, '[]', 'utf-8');
  }
  const data = fs.readFileSync(filename, 'utf-8');
  return JSON.parse(data) as string[];
}

// Function to write JSON file
const writeJson = (data: string[], filename: string = "data.json",): void => {
  fs.writeFileSync(filename, JSON.stringify(data, null, 4), 'utf-8');
}

// Function to add JSON file
const addJson = (data: string[], filename: string = "data.json",): void => {
  const oldData = readJson(filename)
  writeJson([...oldData, ...data], filename)
}

export {
  cliMenu,
  rl,
  readJson,
  writeJson,
  addJson,
}