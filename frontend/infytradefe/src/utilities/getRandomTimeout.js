// utils.js
export function getRandomTimeout(min = 200, max = 1000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
