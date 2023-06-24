import { parse } from "https://deno.land/std@0.192.0/flags/mod.ts";

const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+-=';

/*
* 0001 - lowercase
* 0010 - uppercase
* 0100 - numbers
* 1000 - symbols
*/
const random_character = (settings: number): string => {
  let charsets = (() => {
    if (!settings) throw("No settings selected!");

    let temp = [];

    if (settings & 0b0001) temp.push(lowercase);
    if (settings & 0b0010) temp.push(uppercase);
    if (settings & 0b0100) temp.push(numbers);
    if (settings & 0b1000) temp.push(symbols);

    return temp;
  })();

  let charset = Math.floor(Math.random() * (charsets.length - 1));
  let rand = Math.floor(Math.random() * (charsets[charset].length - 1));


  return charsets[charset][rand];
}

const parse_arguments = (): number => {
  const args = parse(Deno.args);
  let settings: number = 0;
  if (args['a']) settings += 0b0001;
  if (args['A']) settings += 0b0010;
  if (args['1']) settings += 0b0100;
  if (args['$']) settings += 0b1000;

  let length = (args['t'] != undefined ? args['t'] : 8);

  return [length, settings];
}

let [length, settings] = parse_arguments();
let pass: string = "";

for (let i = 0; i < length; i++) {
  pass += random_character(settings);
}

console.log(pass);
