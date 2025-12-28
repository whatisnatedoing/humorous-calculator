const personalities = {
  sarcastic: [
    "Oh wonderful, more addition 🙄",
    "Couldn't figure that one out yourself?",
    "Wow, groundbreaking calculation",
    "Such complex math... said no one 😏",
  ],
  enthusiastic: [
    "OMG YES! AMAZING! 🎉",
    "You're CRUSHING it! 🌟",
    "INCREDIBLE WORK! 🎊",
    "MATH SUPERSTAR! ⭐",
  ],
  existential: [
    "Does this even matter? 🤔",
    "Numbers... society's constructs",
    "42 remains the only answer",
    "We're all just calculating... life",
  ],
  pirate: [
    "Arrr, that be the answer, matey! 🏴‍☠️",
    "Shiver me timbers! Fine calculatin'!",
    "Yo ho ho and a sum of numbers!",
    "Ahoy! Math treasure found! ⚓",
  ],
  robot: [
    "BEEP BOOP. COMPUTED. 🤖",
    "CALCULATION COMPLETE. *whirring*",
    "PROCESSING... RESULT ACHIEVED",
    "BINARY CONVERSION: SUCCESS",
  ],
};

export function getPersonalityResponse(mode, result) {
  if (mode === 'normal' || !personalities[mode]) return null;
  
  const responses = personalities[mode];
  return responses[Math.floor(Math.random() * responses.length)];
}
