const symbols = [
    { name: "2x", multiplier: 2, probability: 0.40 },  // 40%
    { name: "5x", multiplier: 5, probability: 0.30 },  // 30%
    { name: "10x", multiplier: 10, probability: 0.15 }, // 15%
    { name: "30x", multiplier: 30, probability: 0.10 }, // 10%
    { name: "100x", multiplier: 100, probability: 0.04 }, // 4% 
    { name: "25000x", multiplier: 25000, probability: 0.01 } // 1%
];

function spin() {
    let rand = Math.random();
    let cumulative = 0;
    for (let symbol of symbols) {
        cumulative += symbol.probability;
        if (rand < cumulative) {
            return symbol;
        }
    }
    return symbols[symbols.length - 1]; 
}

function simulateSpins(rounds, betAmount) {
    let results = {};
    let totalWin = 0;
    
    for (let i = 0; i < rounds; i++) {
        let result = spin();
        totalWin += betAmount * result.multiplier;
        results[result.name] = (results[result.name] || 0) + 1;
    }
    
    console.log("模擬結果:", results);
    console.log("總投注:", rounds * betAmount);
    console.log("總獲利:", totalWin);
    console.log("RTP(實際):", ((totalWin / (rounds * betAmount)) * 100).toFixed(2) + "%");
}

simulateSpins(10000, 10); // 模擬 10,000 次，每次投注 10 元