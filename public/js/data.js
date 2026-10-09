// Dinosaur Skins Data
const dinosaurSkins = [
    {
        id: 'alosaure',
        name: 'Alosaure',
        type: 'dinosaur',
        image: 'assets/skins/dinosaurs/alosaure.svg',
        stages: [
            { stage: 1, scale: 0.5, silhouette: 'M20,80 Q50,20 80,80 L80,90 L20,90 Z' },
            { stage: 2, scale: 0.75, silhouette: 'M15,80 Q50,15 85,80 L85,90 L15,90 Z' },
            { stage: 3, scale: 1.0, silhouette: 'M10,80 Q50,10 90,80 L90,90 L10,90 Z' },
            { stage: 4, scale: 1.25, silhouette: 'M5,80 Q50,5 95,80 L95,90 L5,90 Z' }
        ],
        anchorPoint: { x: 0.5, y: 1.0 } // Point d'ancrage au sol (centre bas)
    },
    {
        id: 'raptor',
        name: 'Raptor',
        type: 'dinosaur',
        image: 'assets/skins/dinosaurs/raptor.svg',
        stages: [
            { stage: 1, scale: 0.4, silhouette: 'M25,80 Q50,30 75,80 L75,90 L25,90 Z' },
            { stage: 2, scale: 0.6, silhouette: 'M20,80 Q50,25 80,80 L80,90 L20,90 Z' },
            { stage: 3, scale: 0.8, silhouette: 'M15,80 Q50,20 85,80 L85,90 L15,90 Z' },
            { stage: 4, scale: 1.0, silhouette: 'M10,80 Q50,15 90,80 L90,90 L10,90 Z' }
        ],
        anchorPoint: { x: 0.5, y: 1.0 }
    },
    {
        id: 'tyrannosaure',
        name: 'Tyrannosaure',
        type: 'dinosaur',
        image: 'assets/skins/dinosaurs/tyrannosaure.svg',
        stages: [
            { stage: 1, scale: 0.6, silhouette: 'M20,80 Q50,25 80,80 L80,90 L20,90 Z' },
            { stage: 2, scale: 0.9, silhouette: 'M15,80 Q50,20 85,80 L85,90 L15,90 Z' },
            { stage: 3, scale: 1.2, silhouette: 'M10,80 Q50,15 90,80 L90,90 L10,90 Z' },
            { stage: 4, scale: 1.5, silhouette: 'M5,80 Q50,10 95,80 L95,90 L5,90 Z' }
        ],
        anchorPoint: { x: 0.5, y: 1.0 }
    },
    {
        id: 'triceratops',
        name: 'Tricératops',
        type: 'dinosaur',
        image: 'assets/skins/dinosaurs/triceratops.svg',
        stages: [
            { stage: 1, scale: 0.5, silhouette: 'M15,80 Q50,30 85,80 L85,90 L15,90 Z' },
            { stage: 2, scale: 0.75, silhouette: 'M10,80 Q50,25 90,80 L90,90 L10,90 Z' },
            { stage: 3, scale: 1.0, silhouette: 'M5,80 Q50,20 95,80 L95,90 L5,90 Z' },
            { stage: 4, scale: 1.25, silhouette: 'M0,80 Q50,15 100,80 L100,90 L0,90 Z' }
        ],
        anchorPoint: { x: 0.5, y: 1.0 }
    },
    {
        id: 'stegosaure',
        name: 'Stégosaure',
        type: 'dinosaur',
        image: 'assets/skins/dinosaurs/stegosaure.svg',
        stages: [
            { stage: 1, scale: 0.45, silhouette: 'M20,80 Q50,35 80,80 L80,90 L20,90 Z' },
            { stage: 2, scale: 0.7, silhouette: 'M15,80 Q50,30 85,80 L85,90 L15,90 Z' },
            { stage: 3, scale: 0.95, silhouette: 'M10,80 Q50,25 90,80 L90,90 L10,90 Z' },
            { stage: 4, scale: 1.2, silhouette: 'M5,80 Q50,20 95,80 L95,90 L5,90 Z' }
        ],
        anchorPoint: { x: 0.5, y: 1.0 }
    }
];

// Bird Skins Data
const birdSkins = [
    {
        id: 'eagle',
        name: 'Aigle',
        type: 'bird',
        image: 'assets/skins/birds/eagle.svg',
        svg: 'assets/svg/eagle.svg',
        stages: [
            { stage: 1, scale: 0.4 },
            { stage: 2, scale: 0.6 },
            { stage: 3, scale: 0.8 },
            { stage: 4, scale: 1.0 }
        ]
    },
    {
        id: 'parrot',
        name: 'Perroquet',
        type: 'bird',
        image: 'assets/skins/birds/parrot.svg',
        svg: 'assets/svg/parrot.svg',
        stages: [
            { stage: 1, scale: 0.35 },
            { stage: 2, scale: 0.55 },
            { stage: 3, scale: 0.75 },
            { stage: 4, scale: 0.95 }
        ]
    }
];

// All Skins
const allSkins = [...dinosaurSkins, ...birdSkins];

// Food Data with Diet restrictions
const foods = [
    // Foods for Alosaure
    { id: 'food_alosaure_1', name: 'Viande d\'Alosaure', image: 'assets/food/meat.svg', dietFor: 'alosaure', dietValue: 10 },
    { id: 'food_alosaure_2', name: 'Os d\'Alosaure', image: 'assets/food/bone.svg', dietFor: 'alosaure', dietValue: 15 },
    
    // Foods for Raptor
    { id: 'food_raptor_1', name: 'Viande de Raptor', image: 'assets/food/meat.svg', dietFor: 'raptor', dietValue: 12 },
    { id: 'food_raptor_2', name: 'Plume de Raptor', image: 'assets/food/feather.svg', dietFor: 'raptor', dietValue: 8 },
    
    // Foods for Tyrannosaure
    { id: 'food_trex_1', name: 'Viande de T-Rex', image: 'assets/food/meat.svg', dietFor: 'tyrannosaure', dietValue: 20 },
    { id: 'food_trex_2', name: 'Dent de T-Rex', image: 'assets/food/tooth.svg', dietFor: 'tyrannosaure', dietValue: 25 },
    
    // Foods for Triceratops
    { id: 'food_trike_1', name: 'Feuille de Tricératops', image: 'assets/food/leaf.svg', dietFor: 'triceratops', dietValue: 10 },
    { id: 'food_trike_2', name: 'Fruit de Tricératops', image: 'assets/food/fruit.svg', dietFor: 'triceratops', dietValue: 12 },
    
    // Foods for Stegosaure
    { id: 'food_stego_1', name: 'Plante de Stégosaure', image: 'assets/food/plant.svg', dietFor: 'stegosaure', dietValue: 14 },
    { id: 'food_stego_2', name: 'Fleur de Stégosaure', image: 'assets/food/flower.svg', dietFor: 'stegosaure', dietValue: 10 },
    
    // Foods for Eagle
    { id: 'food_eagle_1', name: 'Poisson pour Aigle', image: 'assets/food/fish.svg', dietFor: 'eagle', dietValue: 8 },
    { id: 'food_eagle_2', name: 'Souris pour Aigle', image: 'assets/food/mouse.svg', dietFor: 'eagle', dietValue: 6 },
    
    // Foods for Parrot
    { id: 'food_parrot_1', name: 'Graine pour Perroquet', image: 'assets/food/seed.svg', dietFor: 'parrot', dietValue: 5 },
    { id: 'food_parrot_2', name: 'Fruit pour Perroquet', image: 'assets/food/fruit.svg', dietFor: 'parrot', dietValue: 7 },
    
    // Universal foods (no diet restriction)
    { id: 'food_universal_1', name: 'Viande Universelle', image: 'assets/food/meat.svg', dietFor: null, dietValue: 5 },
    { id: 'food_universal_2', name: 'Plante Universelle', image: 'assets/food/plant.svg', dietFor: null, dietValue: 5 },
    { id: 'food_universal_3', name: 'Fruit Universel', image: 'assets/food/fruit.svg', dietFor: null, dietValue: 5 }
];

// Generate 50 foods with specific diets for 50 different skins
// Since we have less than 50 skins, we'll create multiple foods per skin
function generateFoodsWithDiets() {
    const generatedFoods = [];
    const skinIds = allSkins.map(skin => skin.id);
    
    // Create 50 foods, each with a diet for a specific skin
    for (let i = 0; i < 50; i++) {
        const skinIndex = i % skinIds.length;
        const skinId = skinIds[skinIndex];
        const skin = allSkins.find(s => s.id === skinId);
        
        generatedFoods.push({
            id: `food_specific_${i + 1}`,
            name: `Nourriture Spéciale ${i + 1} pour ${skin.name}`,
            image: getFoodImageForType(skin.type),
            dietFor: skinId,
            dietValue: Math.floor(Math.random() * 15) + 5,
            description: `Donne un Diet uniquement pour le skin ${skin.name}`
        });
    }
    
    return generatedFoods;
}

function getFoodImageForType(type) {
    if (type === 'dinosaur') {
        return 'assets/food/meat.png';
    } else if (type === 'bird') {
        return 'assets/food/seed.png';
    }
    return 'assets/food/fruit.png';
}

// Combine all foods
const allFoods = [...foods, ...generateFoodsWithDiets()];

// Player State
let playerState = {
    currentSkin: 'alosaure',
    currentStage: 1,
    diets: [],
    unlockedSkins: ['alosaure', 'raptor']
};

// Save/Load Functions
function savePlayerState() {
    localStorage.setItem('dinoGameState', JSON.stringify(playerState));
}

function loadPlayerState() {
    const saved = localStorage.getItem('dinoGameState');
    if (saved) {
        playerState = JSON.parse(saved);
    }
}
