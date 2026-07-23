// Game Logic

// DOM Elements
const playerElement = document.getElementById('player');
const currentSkinElement = document.getElementById('currentSkin');
const growthSilhouettesElement = document.getElementById('growthSilhouettes');
const skinsGridElement = document.getElementById('skinsGrid');
const foodGridElement = document.getElementById('foodGrid');
const activeDietsElement = document.getElementById('activeDiets');

// Initialize the game
function initGame() {
    loadPlayerState();
    renderSkinsShop();
    renderFoodShop();
    updatePlayerDisplay();
    updateDietsDisplay();
    setupEventListeners();
}

// Setup Event Listeners
function setupEventListeners() {
    // Click on player to show growth silhouettes
    playerElement.addEventListener('click', toggleGrowthSilhouettes);
    
    // Click on skin to change current skin
    skinsGridElement.addEventListener('click', (e) => {
        const skinItem = e.target.closest('.skin-item');
        if (skinItem) {
            const skinId = skinItem.dataset.skinId;
            if (playerState.unlockedSkins.includes(skinId)) {
                playerState.currentSkin = skinId;
                playerState.currentStage = 1; // Reset to stage 1 when changing skin
                updatePlayerDisplay();
                savePlayerState();
            }
        }
    });
    
    // Click on food to eat it
    foodGridElement.addEventListener('click', (e) => {
        const foodItem = e.target.closest('.food-item');
        if (foodItem) {
            const foodId = foodItem.dataset.foodId;
            const food = allFoods.find(f => f.id === foodId);
            if (food) {
                eatFood(food);
            }
        }
    });
}

// Toggle Growth Silhouettes
function toggleGrowthSilhouettes() {
    const currentSkin = allSkins.find(s => s.id === playerState.currentSkin);
    if (!currentSkin) return;
    
    // Toggle the silhouettes display
    growthSilhouettesElement.classList.toggle('active');
    
    // Update silhouettes based on current skin
    if (growthSilhouettesElement.classList.contains('active')) {
        renderGrowthSilhouettes(currentSkin);
    }
}

// Render Growth Silhouettes
function renderGrowthSilhouettes(skin) {
    growthSilhouettesElement.innerHTML = '';
    
    skin.stages.forEach(stage => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', `silhouette stage-${stage.stage}`);
        svg.setAttribute('viewBox', '0 0 100 100');
        svg.setAttribute('style', `width: ${stage.scale * 100}%; height: ${stage.scale * 100}%;`);
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', stage.silhouette || getDefaultSilhouette(stage.stage));
        path.setAttribute('fill', getSilhouetteColor(stage.stage));
        path.setAttribute('opacity', '0.7');
        
        svg.appendChild(path);
        growthSilhouettesElement.appendChild(svg);
    });
}

// Get Default Silhouette
function getDefaultSilhouette(stage) {
    const scale = 1 - (stage * 0.1);
    return `M${10 * stage},80 Q50,${20 + (stage * 5)} ${100 - (10 * stage)},80 L${100 - (10 * stage)},90 L${10 * stage},90 Z`;
}

// Get Silhouette Color
function getSilhouetteColor(stage) {
    const colors = ['rgba(255,0,0,0.3)', 'rgba(255,165,0,0.3)', 'rgba(255,255,0,0.3)', 'rgba(0,255,0,0.3)'];
    return colors[stage - 1] || 'rgba(0,0,255,0.3)';
}

// Render Skins Shop
function renderSkinsShop() {
    skinsGridElement.innerHTML = '';
    
    allSkins.forEach(skin => {
        const skinItem = document.createElement('div');
        skinItem.className = `skin-item ${playerState.currentSkin === skin.id ? 'selected' : ''} ${playerState.unlockedSkins.includes(skin.id) ? '' : 'locked'}`;
        skinItem.dataset.skinId = skin.id;
        
        const img = document.createElement('img');
        img.src = skin.image;
        img.alt = skin.name;
        img.loading = 'lazy';
        
        const name = document.createElement('div');
        name.className = 'skin-name';
        name.textContent = skin.name;
        
        skinItem.appendChild(img);
        skinItem.appendChild(name);
        
        if (!playerState.unlockedSkins.includes(skin.id)) {
            const lockOverlay = document.createElement('div');
            lockOverlay.className = 'lock-overlay';
            lockOverlay.innerHTML = '🔒';
            skinItem.appendChild(lockOverlay);
        }
        
        skinsGridElement.appendChild(skinItem);
    });
}

// Render Food Shop
function renderFoodShop() {
    foodGridElement.innerHTML = '';
    
    allFoods.forEach(food => {
        const foodItem = document.createElement('div');
        foodItem.className = 'food-item';
        foodItem.dataset.foodId = food.id;
        
        const img = document.createElement('img');
        img.src = food.image;
        img.alt = food.name;
        img.loading = 'lazy';
        
        const name = document.createElement('div');
        name.className = 'food-name';
        name.textContent = food.name;
        
        // Add diet icon if this food gives a diet
        if (food.dietFor) {
            const dietIcon = document.createElement('div');
            dietIcon.className = 'diet-icon';
            dietIcon.textContent = 'D';
            foodItem.appendChild(dietIcon);
        }
        
        foodItem.appendChild(img);
        foodItem.appendChild(name);
        
        foodGridElement.appendChild(foodItem);
    });
}

// Eat Food
function eatFood(food) {
    // Check if this food gives a diet to the current skin
    if (food.dietFor) {
        // Only give diet if the food's dietFor matches the current skin
        if (food.dietFor === playerState.currentSkin) {
            playerState.diets.push({
                id: `diet_${Date.now()}`,
                name: food.name,
                value: food.dietValue,
                skin: playerState.currentSkin,
                timestamp: Date.now()
            });
            
            // Grow the dinosaur
            growDinosaur();
            
            updateDietsDisplay();
            savePlayerState();
            
            // Visual feedback
            showEatEffect();
        } else {
            // Show message that this food doesn't give diet to current skin
            showMessage(`Cette nourriture ne donne pas de Diet à ${allSkins.find(s => s.id === playerState.currentSkin)?.name || 'ce skin'}`);
        }
    } else {
        // Universal food - gives diet to any skin
        playerState.diets.push({
            id: `diet_${Date.now()}`,
            name: food.name,
            value: food.dietValue,
            skin: playerState.currentSkin,
            timestamp: Date.now()
        });
        
        updateDietsDisplay();
        savePlayerState();
        showEatEffect();
    }
}

// Grow Dinosaur
function growDinosaur() {
    const currentSkin = allSkins.find(s => s.id === playerState.currentSkin);
    if (!currentSkin) return;
    
    // Check if we can grow to next stage
    const maxStage = currentSkin.stages.length;
    if (playerState.currentStage < maxStage) {
        playerState.currentStage++;
        updatePlayerDisplay();
        
        // Add growing animation
        currentSkinElement.classList.add('growing');
        setTimeout(() => {
            currentSkinElement.classList.remove('growing');
        }, 500);
    }
}

// Update Player Display
function updatePlayerDisplay() {
    const currentSkin = allSkins.find(s => s.id === playerState.currentSkin);
    if (!currentSkin) return;
    
    // Update skin image
    currentSkinElement.src = currentSkin.image;
    currentSkinElement.alt = currentSkin.name;
    currentSkinElement.dataset.skin = currentSkin.id;
    currentSkinElement.dataset.stage = playerState.currentStage;
    
    // Update size based on stage
    const stage = currentSkin.stages.find(s => s.stage === playerState.currentStage);
    if (stage) {
        currentSkinElement.style.transform = `scale(${stage.scale})`;
    }
    
    // Update selected skin in shop
    document.querySelectorAll('.skin-item').forEach(item => {
        item.classList.toggle('selected', item.dataset.skinId === playerState.currentSkin);
    });
}

// Update Diets Display
function updateDietsDisplay() {
    activeDietsElement.innerHTML = '';
    
    // Show only recent diets (last 5)
    const recentDiets = playerState.diets.slice(-5).reverse();
    
    recentDiets.forEach(diet => {
        const dietBadge = document.createElement('div');
        dietBadge.className = 'diet-badge';
        
        const dietIcon = document.createElement('div');
        dietIcon.className = 'diet-icon';
        dietIcon.textContent = 'D';
        
        const dietText = document.createElement('span');
        dietText.textContent = `${diet.name} (+${diet.value})`;
        
        dietBadge.appendChild(dietIcon);
        dietBadge.appendChild(dietText);
        activeDietsElement.appendChild(dietBadge);
    });
    
    if (recentDiets.length === 0) {
        activeDietsElement.innerHTML = '<p>Aucun Diet actif</p>';
    }
}

// Show Eat Effect
function showEatEffect() {
    // Create blood effect
    const bloodEffect = document.createElement('div');
    bloodEffect.className = 'blood-effect active';
    playerElement.appendChild(bloodEffect);
    
    // Create cross eye effect
    const crossEye = document.createElement('div');
    crossEye.className = 'cross-eye active';
    crossEye.style.top = '30%';
    crossEye.style.left = '45%';
    playerElement.appendChild(crossEye);
    
    // Remove effects after animation
    setTimeout(() => {
        bloodEffect.remove();
        crossEye.remove();
    }, 1000);
}

// Show Message
function showMessage(message) {
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = 'game-message';
    messageElement.textContent = message;
    messageElement.style.position = 'fixed';
    messageElement.style.top = '50%';
    messageElement.style.left = '50%';
    messageElement.style.transform = 'translate(-50%, -50%)';
    messageElement.style.background = 'rgba(0, 0, 0, 0.8)';
    messageElement.style.color = 'white';
    messageElement.style.padding = '20px';
    messageElement.style.borderRadius = '10px';
    messageElement.style.zIndex = '1000';
    messageElement.style.fontSize = '1.2em';
    
    document.body.appendChild(messageElement);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 3000);
}

// Utility Functions
function getSkinById(skinId) {
    return allSkins.find(skin => skin.id === skinId);
}

function getFoodById(foodId) {
    return allFoods.find(food => food.id === foodId);
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);
