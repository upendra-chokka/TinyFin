export interface FlashItem { big: string; lab: string; }
export interface FlashSet { key: string; label: string; items: FlashItem[]; }

export const learnSets: FlashSet[] = [
  {
    key: 'alphabet', label: 'Alphabet',
    items: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((l) => ({ big: l, lab: l })),
  },
  {
    key: 'numbers', label: 'Numbers',
    items: Array.from({ length: 20 }, (_, i) => ({ big: String(i + 1), lab: `Number ${i + 1}` })),
  },
  {
    key: 'colors', label: 'Colors',
    items: [
      { big: '🔴', lab: 'Red' }, { big: '🟠', lab: 'Orange' }, { big: '🟡', lab: 'Yellow' },
      { big: '🟢', lab: 'Green' }, { big: '🔵', lab: 'Blue' }, { big: '🟣', lab: 'Purple' },
      { big: '🟤', lab: 'Brown' }, { big: '⚫', lab: 'Black' }, { big: '⚪', lab: 'White' },
      { big: '🩷', lab: 'Pink' },
    ],
  },
  {
    key: 'shapes', label: 'Shapes',
    items: [
      { big: '⚪', lab: 'Circle' }, { big: '🟥', lab: 'Square' }, { big: '🔺', lab: 'Triangle' },
      { big: '⭐', lab: 'Star' }, { big: '💚', lab: 'Heart' }, { big: '🔶', lab: 'Diamond' },
      { big: '⬭', lab: 'Oval' }, { big: '▬', lab: 'Rectangle' }, { big: '⬠', lab: 'Pentagon' },
      { big: '⬡', lab: 'Hexagon' }, { big: '☆', lab: 'Star outline' }, { big: '✦', lab: 'Four-point star' },
      { big: '◗', lab: 'Semicircle' }, { big: '▲', lab: 'Arrow up' }, { big: '◆', lab: 'Rhombus' },
      { big: '⏣', lab: 'Octagon' }, { big: '♦', lab: 'Kite' }, { big: '⬟', lab: 'Heptagon' },
    ],
  },
  {
    key: 'animals', label: 'Animals',
    items: [
      { big: '🐶', lab: 'Dog' }, { big: '🐱', lab: 'Cat' }, { big: '🐘', lab: 'Elephant' },
      { big: '🦁', lab: 'Lion' }, { big: '🐒', lab: 'Monkey' }, { big: '🐦', lab: 'Bird' },
      { big: '🐟', lab: 'Fish' }, { big: '🦋', lab: 'Butterfly' }, { big: '🐸', lab: 'Frog' },
      { big: '🐍', lab: 'Snake' }, { big: '🐢', lab: 'Turtle' }, { big: '🦎', lab: 'Lizard' },
      { big: '🐊', lab: 'Crocodile' }, { big: '🦅', lab: 'Eagle' }, { big: '🦆', lab: 'Duck' },
      { big: '🐧', lab: 'Penguin' }, { big: '🦉', lab: 'Owl' }, { big: '🦜', lab: 'Parrot' },
      { big: '🐝', lab: 'Bee' }, { big: '🐛', lab: 'Caterpillar' }, { big: '🐞', lab: 'Ladybug' },
      { big: '🦗', lab: 'Cricket' }, { big: '🐌', lab: 'Snail' }, { big: '🦀', lab: 'Crab' },
      { big: '🐙', lab: 'Octopus' }, { big: '🦈', lab: 'Shark' }, { big: '🐳', lab: 'Whale' },
      { big: '🐬', lab: 'Dolphin' }, { big: '🦭', lab: 'Seal' }, { big: '🪼', lab: 'Jellyfish' },
    ],
  },
  {
    key: 'mammals', label: 'Mammals',
    items: [
      { big: '🐕', lab: 'Dog' }, { big: '🐈', lab: 'Cat' }, { big: '🐄', lab: 'Cow' },
      { big: '🐎', lab: 'Horse' }, { big: '🐑', lab: 'Sheep' }, { big: '🐐', lab: 'Goat' },
      { big: '🐖', lab: 'Pig' }, { big: '🐘', lab: 'Elephant' }, { big: '🦛', lab: 'Hippo' },
      { big: '🦏', lab: 'Rhino' }, { big: '🐪', lab: 'Camel' }, { big: '🦒', lab: 'Giraffe' },
      { big: '🦘', lab: 'Kangaroo' }, { big: '🐻', lab: 'Bear' }, { big: '🐼', lab: 'Panda' },
      { big: '🦊', lab: 'Fox' }, { big: '🐺', lab: 'Wolf' }, { big: '🐰', lab: 'Rabbit' },
      { big: '🦌', lab: 'Deer' }, { big: '🐿️', lab: 'Squirrel' }, { big: '🦇', lab: 'Bat' },
      { big: '🐨', lab: 'Koala' }, { big: '🦦', lab: 'Otter' }, { big: '🦫', lab: 'Beaver' },
      { big: '🦝', lab: 'Raccoon' }, { big: '🦨', lab: 'Skunk' }, { big: '🐆', lab: 'Leopard' },
      { big: '🐅', lab: 'Tiger' }, { big: '🦬', lab: 'Bison' }, { big: '🫎', lab: 'Moose' },
    ],
  },
  {
    key: 'birds', label: 'Birds',
    items: [
      { big: '🐦', lab: 'Bird' }, { big: '🦅', lab: 'Eagle' }, { big: '🦆', lab: 'Duck' },
      { big: '🐧', lab: 'Penguin' }, { big: '🦉', lab: 'Owl' }, { big: '🦜', lab: 'Parrot' },
      { big: '🦚', lab: 'Peacock' }, { big: '🦩', lab: 'Flamingo' }, { big: '🐓', lab: 'Rooster' },
      { big: '🐥', lab: 'Chick' }, { big: '🦢', lab: 'Swan' }, { big: '🕊️', lab: 'Dove' },
      { big: '🦃', lab: 'Turkey' }, { big: '🦤', lab: 'Dodo' }, { big: '🪿', lab: 'Goose' },
    ],
  },
  {
    key: 'sea', label: 'Sea Life',
    items: [
      { big: '🐟', lab: 'Fish' }, { big: '🐠', lab: 'Tropical Fish' }, { big: '🐡', lab: 'Pufferfish' },
      { big: '🦈', lab: 'Shark' }, { big: '🐳', lab: 'Whale' }, { big: '🐬', lab: 'Dolphin' },
      { big: '🐙', lab: 'Octopus' }, { big: '🦑', lab: 'Squid' }, { big: '🦐', lab: 'Shrimp' },
      { big: '🦀', lab: 'Crab' }, { big: '🦞', lab: 'Lobster' }, { big: '🐚', lab: 'Shell' },
      { big: '🦭', lab: 'Seal' }, { big: '🐊', lab: 'Crocodile' }, { big: '🪼', lab: 'Jellyfish' },
      { big: '🪸', lab: 'Coral' }, { big: '🐢', lab: 'Sea Turtle' }, { big: '🦦', lab: 'Sea Otter' },
    ],
  },
  {
    key: 'insects', label: 'Insects',
    items: [
      { big: '🐝', lab: 'Bee' }, { big: '🐛', lab: 'Caterpillar' }, { big: '🦋', lab: 'Butterfly' },
      { big: '🐞', lab: 'Ladybug' }, { big: '🐜', lab: 'Ant' }, { big: '🦗', lab: 'Cricket' },
      { big: '🪲', lab: 'Beetle' }, { big: '🪳', lab: 'Cockroach' }, { big: '🦟', lab: 'Mosquito' },
      { big: '🪰', lab: 'Fly' }, { big: '🐌', lab: 'Snail' }, { big: '🦠', lab: 'Microbe' },
      { big: '🕷️', lab: 'Spider' }, { big: '🦂', lab: 'Scorpion' }, { big: '🪱', lab: 'Worm' },
    ],
  },
  {
    key: 'people', label: 'People',
    items: [
      { big: '👮', lab: 'Police Officer' }, { big: '🧑‍🚒', lab: 'Firefighter' }, { big: '👷', lab: 'Construction Worker' },
      { big: '👨‍⚕️', lab: 'Doctor' }, { big: '👩‍⚕️', lab: 'Nurse' }, { big: '👨‍🍳', lab: 'Chef' },
      { big: '👩‍🏫', lab: 'Teacher' }, { big: '👨‍🌾', lab: 'Farmer' }, { big: '👩‍🔬', lab: 'Scientist' },
      { big: '👨‍🚀', lab: 'Astronaut' }, { big: '👩‍✈️', lab: 'Pilot' }, { big: '🧑‍🎤', lab: 'Singer' },
      { big: '👨‍🎨', lab: 'Artist' }, { big: '👩‍💻', lab: 'Programmer' }, { big: '🧑‍🔧', lab: 'Mechanic' },
      { big: '👨‍⚖️', lab: 'Judge' }, { big: '🧑‍🏭', lab: 'Factory Worker' }, { big: '👩‍🦰', lab: 'Woman' },
      { big: '👨', lab: 'Man' }, { big: '👶', lab: 'Baby' }, { big: '🧒', lab: 'Child' },
      { big: '👴', lab: 'Grandfather' }, { big: '👵', lab: 'Grandmother' }, { big: '🦸', lab: 'Superhero' },
      { big: '🧙', lab: 'Wizard' }, { big: '🧜‍♀️', lab: 'Mermaid' }, { big: '🤴', lab: 'Prince' },
      { big: '👸', lab: 'Princess' }, { big: '🥷', lab: 'Ninja' }, { big: '🧑‍🦽', lab: 'Person in wheelchair' },
    ],
  },
  {
    key: 'vehicles', label: 'Vehicles',
    items: [
      { big: '🚗', lab: 'Car' }, { big: '🚕', lab: 'Taxi' }, { big: '🚌', lab: 'Bus' },
      { big: '🚑', lab: 'Ambulance' }, { big: '🚒', lab: 'Fire Truck' }, { big: '🚓', lab: 'Police Car' },
      { big: '🚲', lab: 'Bicycle' }, { big: '🛵', lab: 'Scooter' }, { big: '✈️', lab: 'Airplane' },
      { big: '🚀', lab: 'Rocket' }, { big: '🚂', lab: 'Train' }, { big: '🚢', lab: 'Ship' },
      { big: '🚁', lab: 'Helicopter' }, { big: '🛻', lab: 'Truck' }, { big: '🏎️', lab: 'Race Car' },
      { big: '🛶', lab: 'Canoe' }, { big: '⛵', lab: 'Sailboat' }, { big: '🚜', lab: 'Tractor' },
    ],
  },
  {
    key: 'food', label: 'Food',
    items: [
      { big: '🍎', lab: 'Apple' }, { big: '🍌', lab: 'Banana' }, { big: '🍊', lab: 'Orange' },
      { big: '🍇', lab: 'Grapes' }, { big: '🍓', lab: 'Strawberry' }, { big: '🍉', lab: 'Watermelon' },
      { big: '🥕', lab: 'Carrot' }, { big: '🥦', lab: 'Broccoli' }, { big: '🌽', lab: 'Corn' },
      { big: '🍕', lab: 'Pizza' }, { big: '🍔', lab: 'Burger' }, { big: '🍦', lab: 'Ice Cream' },
      { big: '🧁', lab: 'Cupcake' }, { big: '🍪', lab: 'Cookie' }, { big: '🥛', lab: 'Milk' },
      { big: '🍞', lab: 'Bread' }, { big: '🥚', lab: 'Egg' }, { big: '🧀', lab: 'Cheese' },
    ],
  },
  {
    key: 'nature', label: 'Nature',
    items: [
      { big: '🌳', lab: 'Tree' }, { big: '🌻', lab: 'Sunflower' }, { big: '🌹', lab: 'Rose' },
      { big: '🌈', lab: 'Rainbow' }, { big: '☀️', lab: 'Sun' }, { big: '🌙', lab: 'Moon' },
      { big: '⭐', lab: 'Star' }, { big: '☁️', lab: 'Cloud' }, { big: '🌧️', lab: 'Rain' },
      { big: '❄️', lab: 'Snowflake' }, { big: '⚡', lab: 'Lightning' }, { big: '🌊', lab: 'Wave' },
      { big: '🏔️', lab: 'Mountain' }, { big: '🌵', lab: 'Cactus' }, { big: '🍄', lab: 'Mushroom' },
      { big: '🍀', lab: 'Four-leaf Clover' }, { big: '🌾', lab: 'Rice' }, { big: '🪨', lab: 'Rock' },
    ],
  },
  {
    key: 'flags', label: 'Flags',
    items: [
      { big: '🇮🇳', lab: 'India' }, { big: '🇺🇸', lab: 'USA' }, { big: '🇬🇧', lab: 'UK' },
      { big: '🇯🇵', lab: 'Japan' }, { big: '🇫🇷', lab: 'France' }, { big: '🇩🇪', lab: 'Germany' },
      { big: '🇧🇷', lab: 'Brazil' }, { big: '🇦🇺', lab: 'Australia' }, { big: '🇨🇦', lab: 'Canada' },
      { big: '🇨🇳', lab: 'China' }, { big: '🇷🇺', lab: 'Russia' }, { big: '🇮🇹', lab: 'Italy' },
      { big: '🇪🇸', lab: 'Spain' }, { big: '🇰🇷', lab: 'South Korea' }, { big: '🇲🇽', lab: 'Mexico' },
    ],
  },
];
