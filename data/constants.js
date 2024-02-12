const elements = {
  MAP: 'C',
  MOUNTAIN: 'M',
  ADVENTURER: 'A',
  TREASURE: 'T',
  GROUND: '-',
  WALL: '|',
};

const orientations = {
  NORTH: 'N',
  SOUTH: 'S',
  EAST: 'E',
  WEST: 'O',
};

const movementsType = {
  FORWARD: 'A',
  TURN_LEFT: 'G',
  TURN_RIGHT: 'D',
};

module.exports = {
  elements,
  orientations,
  movementsType,
};
