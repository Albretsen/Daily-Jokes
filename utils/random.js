import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { UserDataManager } from '../services/userDataManager';

export const generateRandomCredentials = async () => {
    const deviceID = await generateDeviceID();

    const name = generateUsername() + `_${deviceID.substring(0, 2)}`; 
    const email = `${deviceID}@dailyjokes.app`; 
    const password = uuidv4();

    return { name, email, password, deviceID };
};

const generateUsername = () => {
    const adjective = adjectives[getRandomIndex(adjectives.length)];
    const noun = nouns[getRandomIndex(nouns.length)];
    return `${adjective}${noun}`;
};

const getRandomIndex = (arrayLength) => Math.floor(Math.random() * arrayLength);

const generateDeviceID = async () => {
    let localDeviceID = await UserDataManager.getDeviceID();

    if (localDeviceID) {
        return localDeviceID;
    } else {
        const newDeviceID = uuidv4();

        await UserDataManager.storeDeviceID(newDeviceID);

        return newDeviceID;
    }
};

const adjectives = [
    'Wacky', 'Sneaky', 'Jolly', 'Funky', 'Quirky', 'Zany', 'Breezy', 'Cheery', 'Chilly', 'Crispy',
    'Dizzy', 'Fizzy', 'Fluffy', 'Gloomy', 'Goofy', 'Grumpy', 'Hasty', 'Icy', 'Jazzy', 'Kooky',
    'Loopy', 'Lucky', 'Misty', 'Muddy', 'Nifty', 'Nutty', 'Oily', 'Peppy', 'Picky', 'Quaint',
    'Rusty', 'Salty', 'Silky', 'Smoggy', 'Snappy', 'Soggy', 'Spicy', 'Spry', 'Squishy', 'Sticky',
    'Stormy', 'Sunny', 'Tangy', 'Tidy', 'Tipsy', 'Tricky', 'Twiggy', 'Vast', 'Windy', 'Zippy',
    'Gritty', 'Hearty', 'Inky', 'Jumpy', 'Knotty', 'Leafy', 'Moody', 'Nippy', 'Opulent', 'Pristine',
    'Quirky', 'Ripe', 'Sleek', 'Taut', 'Uplifted', 'Vivid', 'Woeful', 'Xenial', 'Youthful', 'Zesty',
    'Aged', 'Boisterous', 'Crafty', 'Dapper', 'Elastic', 'Feisty', 'Golden', 'Harsh', 'Inventive', 'Jaunty',
    'Keen', 'Luminous', 'Majestic', 'Noble', 'Ornate', 'Plush', 'Quixotic', 'Radiant', 'Svelte', 'Thorny',
    'Ubiquitous', 'Velvety', 'Whimsical', 'Exotic', 'Yawning', 'Zealous', 'Animated', 'Brisk', 'Candid',
    'Dainty', 'Ethereal', 'Frugal', 'Gregarious', 'Hallowed', 'Impish', 'Jubilant', 'Knavish', 'Lavish',
    'Measured', 'Nonchalant', 'Opaque', 'Pungent', 'Querulous', 'Rambunctious', 'Serene', 'Turbulent',
    'Unruly', 'Venerated', 'Wistful', 'Exuberant', 'Yearning', 'Zapped', 'Aromatic', 'Blissful', 'Coy',
    'Dauntless', 'Effervescent', 'Frolicsome', 'Ghastly', 'Heroic', 'Idyllic', 'Joyous', 'Kitschy',
    'Lethal', 'Miraculous', 'Nocturnal', 'Omnipotent', 'Pacifist', 'Quintessential', 'Resilient', 'Sacred',
    'Tenacious', 'Undulating', 'Volatile', 'Wholesome', 'Exhilarating', 'Yielding', 'Zealot', 'Affable',
    'Bilious', 'Comely', 'Desolate', 'Enigmatic', 'Facetious', 'Gallant', 'Hypnotic', 'Invincible', 'Jocular',
    'Knightly', 'Luxurious', 'Mystical', 'Nostalgic', 'Ostentatious', 'Philosophical', 'Quarrelsome', 'Rejuvenated',
    'Spellbound', 'Translucent', 'Unassuming', 'Vibrant', 'Winsome', 'Ebullient', 'Yummy', 'Zigzag'
];

const nouns = [
    'Penguin', 'Taco', 'Unicorn', 'Ninja', 'Pirate', 'Robot', 'Zombie', 'Alien', 'Wizard', 'Knight',
    'Dragon', 'Goblin', 'Phoenix', 'Robot', 'Sphinx', 'Vampire', 'Werewolf', 'Yeti', 'Zebra', 'Koala',
    'Llama', 'Narwhal', 'Octopus', 'Panda', 'Quokka', 'Rabbit', 'Asgeir', 'Sloth', 'Turtle', 'Unicorn', 'Vulture',
    'Walrus', 'Xerus', 'Yak', 'Zorse', 'Apple', 'Bagel', 'Cookie', 'Doughnut', 'Eclair', 'Fajita',
    'Gelato', 'Hummus', 'IceCream', 'Jellybean', 'Kebab', 'Lemon', 'Mango', 'Noodle', 'Olive', 'Peach',
    'Quiche', 'Radish', 'Strawberry', 'Tomato', 'Udon', 'Vanilla', 'Waffle', 'Xacuti', 'Yogurt', 'Ziti',
    'Mermaid', 'Centaur', 'Banshee', 'Cyclops', 'Djinni', 'Elf', 'Fairy', 'Griffin', 'Hydra', 'Imp',
    'Jinn', 'Kraken', 'Leviathan', 'Minotaur', 'Nymph', 'Ogre', 'Pegasus', 'Quetzalcoatl', 'Reaper', 'Satyr',
    'Troll', 'Umbra', 'Valkyrie', 'Witch', 'Xiphosura', 'Yetti', 'Zephyr', 'Avocado', 'Bruschetta', 'Cupcake',
    'Dumpling', 'Empanada', 'Flan', 'Gnocchi', 'Hashbrown', 'Idli', 'Jambalaya', 'Kimchi', 'Lobster', 'Macaroon',
    'Nachos', 'Oyster', 'Paella', 'Quinoa', 'Risotto', 'Salmon', 'Tiramisu', 'Ugali', 'Veloute', 'Watermelon',
    'Xiaolongbao', 'Yucca', 'Zeppole', 'Axolotl', 'Buffalo', 'Cheetah', 'Dolphin', 'Emu', 'Falcon', 'Giraffe',
    'Hippo', 'Iguana', 'Jackal', 'Kangaroo', 'Lynx', 'Mongoose', 'Newt', 'Orangutan', 'Peacock', 'Quail',
    'Raccoon', 'Seahorse', 'Tapir', 'Urial', 'Viper', 'Walrus', 'Xenopus', 'Yabby', 'Zebu', 'Armadillo',
    'Bonobo', 'Chameleon', 'Dugong', 'Egret', 'Flamingo', 'Gorilla', 'Hedgehog', 'Ibis', 'Jaguar', 'Kudu',
    'Lemur', 'Mandrill', 'Numbat', 'Ocelot'
];