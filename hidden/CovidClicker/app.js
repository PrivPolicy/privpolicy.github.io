const covid = document.getElementById('covid');
const counter = document.getElementById('counter');
const ipsCounter = document.getElementById('ips');
const upgradeContainer = document.getElementById('upgrade-container');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

var currency = 0;
var ips = 0;
var autoUpgradesID = [];

var infectedLimit = 7713468000;
var infectedLimitLog = Math.log(infectedLimit);

var upgradeData = {upgrades: []};

upgradeData.upgrades.push({
    dataTag: "tapValue",
    upgradeName: "Efficiency",
    upgradeEffect: "Infected per tap:",
    current: 1,
    next: 2,
    nextScalar: 1.3,
    level: 1,
    cost: 20,
    costScalar: 1.2,
    costScalarMod: 0.02,
    unlockCost: 0,
    unlocked: false
});
upgradeData.upgrades.push({
    dataTag: "replication",
    upgradeName: "Replication",
    upgradeEffect: "Infected per second:",
    current: 0,
    next: 5,
    nextScalar: 1.3,
    level: 0,
    cost: 200,
    costScalar: 1.08,
    costScalarMod: 0.01,
    unlockCost: 100,
    unlocked: false
});
upgradeData.upgrades.push({
    dataTag: "mutation",
    upgradeName: "Mutation",
    upgradeEffect: "Infected per second:",
    current: 0,
    next: 20,
    nextScalar: 1.25,
    level: 0,
    cost: 1000,
    costScalar: 1.07,
    costScalarMod: 0.013,
    unlockCost: 600,
    unlocked: false
});

//Load?

var upgradeTemplates = document.getElementsByClassName('upgrade-template');
for(var i = 0; i < upgradeTemplates.length; i++) {
    upgradeTemplates[i].style.visibility = "hidden";
    upgradeTemplates[i].addEventListener("click", (event) => {
        buyUpgrade(event);
    });
}

updateCounter();
updateAllDisplay();
checkForUnlocks();
advanceTime();
updateIps();

covid.addEventListener("click", () => {
    currency = currency + upgradeData.upgrades[0].current;
    updateCounter();
});

function buyUpgrade(event) {
    var upgradeName = event.target.parentNode.dataset['upgrade']
    console.log(upgradeName);
    for(var i = 0; i < upgradeData.upgrades.length; i++) {
        if(upgradeData.upgrades[i].dataTag == upgradeName) {
            var upgradeHandle = upgradeData.upgrades[i];

            if(currency >= upgradeHandle.cost) {
                currency = currency - upgradeHandle.cost;
                upgradeHandle.cost = Math.ceil(upgradeHandle.cost * upgradeHandle.costScalar);
                upgradeHandle.level = upgradeHandle.level + 1;
                upgradeHandle.costScalar = upgradeHandle.costScalar + upgradeHandle.costScalarMod;

                upgradeHandle.current = upgradeHandle.next;
                upgradeHandle.next = upgradeHandle.next + Math.floor(Math.max(1, upgradeHandle.next * upgradeHandle.nextScalar - upgradeHandle.next));

                updateUpgradeDisplay(upgradeName, upgradeHandle);
                updateCounter();

                break;
            }
        }
    }
}

function updateCounter() {
    counter.innerText = currency;
    checkForUnlocks();
    updateProgressBar();
}

function updateIps() {
    ips = 0;

    for(var i = 1; i < upgradeData.upgrades.length; i++) {
        if(upgradeData.upgrades[i].unlocked == true) {
            ips += upgradeData.upgrades[i].current
        }
    }

    if(ips > 0) {
        ipsCounter.innerText = "Infected per second: " + ips;
    } else {
        ipsCounter.innerText = "";
    }
}

function updateUpgradeDisplay(name, dataHandle) {
    for(var i = 0; i < upgradeTemplates.length; i++) {
        if(upgradeTemplates[i].dataset["upgrade"] == name) {
            var templateHandle = upgradeTemplates[i];

            templateHandle.children[0].innerText = dataHandle.upgradeName;
            templateHandle.children[1].innerText = dataHandle.upgradeEffect + " " + dataHandle.current;
            templateHandle.children[2].innerText = "Next upgrade: " + dataHandle.next;
            templateHandle.children[3].innerText = "Cost:";
            templateHandle.children[4].innerText = dataHandle.cost;
            templateHandle.children[5].innerText = "LVL " + dataHandle.level;

            break;
        }
    }
}

function updateAllDisplay() {
    for(var i = 0; i < upgradeData.upgrades.length; i++) {
        for(var j = 0; j < upgradeTemplates.length; j++) {
            if(upgradeData.upgrades[i].dataTag == upgradeTemplates[i].dataset["upgrade"]) {
                var name = upgradeTemplates[i].dataset["upgrade"];
                var dataHandle = upgradeData.upgrades[i];

                updateUpgradeDisplay(name, dataHandle);
            }
        }
    }
}

function checkForUnlocks() {
    for(var i = 0; i < upgradeData.upgrades.length; i++) {
        if(currency >= upgradeData.upgrades[i].unlockCost) {
            for(var j = 0; j < upgradeTemplates.length; j++) {
                if(upgradeData.upgrades[i].dataTag == upgradeTemplates[j].dataset['upgrade']) {
                    upgradeTemplates[j].style.visibility = "visible";
                    upgradeData.upgrades[i].unlocked = true;

                    if(upgradeData.upgrades[i].dataTag != "tapValue" && autoUpgradesID.indexOf(i) == -1) {
                        autoUpgradesID.push(i);

                        break;
                    }
                }
            }
        }
    }
}

function advanceTime() {
    setInterval(() => {
        autoUpgradesID.forEach(value => {
            var currencyGenerated = upgradeData.upgrades[value].current;
            currency += currencyGenerated;
        })
            updateCounter();
            updateIps();
    }, 1000);
}

function updateProgressBar() {
    if(currency != 0) {
        var ratio = Math.log(currency) / infectedLimitLog;
    } else {
        var ratio = 0;
    }
    
    progressBar.style.width = ratio * 500 + "px";
    progressText.innerText = (ratio * 100).toFixed(2) + "%";
    progressText.style.left = ratio * 500 - 25 + "px";
}