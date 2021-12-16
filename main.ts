import Foswig from "foswig"
import { readFile } from "fs/promises"
import { argv } from "process"

const readDict = async (inputFname: string): Promise<string[]> => {
  const b = await readFile(inputFname, { encoding: "utf-8" })
  return b
    .toLocaleLowerCase()
    .split(" ")
    .filter((x) => x.length > 2)
    .map((x) => x.trim())
}

;(async () => {
  const inputFname = argv[2]
  const genNb = Number(argv[3])
  const dict = await readDict(inputFname)
  const chain = new Foswig(2, dict)
  const constraints = {
    minLength: 8,
    maxLength: 14,
    allowDuplicates: false,
    maxAttempts: 100,
  }
  for (let i = 0; i < genNb; i++) {
    console.log(chain.generate(constraints))
  }
})()
