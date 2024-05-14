    let w = window.innerWidth - (window.innerWidth * .05)
    let h = window.innerHeight - (window.innerHeight * .05)
    let player
    let goblin
    let button
    let x = 0
    let y = 0
    let map = 0
    let hit;
    let hit2
    let wall
    canmove = 1
    let heldItems = []
    let equipped = []
    let slimeI
    let goblinI
    let playerI
    let playerWS
    let witch
    let witchI
    let batsI
    let bats
    let killedG = false
    let killedS = false
    let killedW = false
    let killedB = false
    let takaI
    function setup() {
        createCanvas(w,h)
        goblin = new enemy()
        player = new character()
        slime = new enemy2()
        witch = new enemy3()
        bats = new enemy4()
        taka = new enemy5()
        frameRate(30)
    }

    function preload() {
        slimeI = loadImage('slimeL.png')
        goblinI = loadImage('goblinL.png')
        playerI = loadImage('player.png')
        playerWS = loadImage('strongPlayer.png')
        playerWA = loadImage('playerArmor.png')
        playerGS = loadImage('PlayerGS.png')
        witchI = loadImage('witch.png')
        batsI = loadImage('bats.png')
        takaI = loadImage('taka.png')
    }

    function timer(ms) {
        return new Promise((resolve) => {
        setTimeout(() => {
            resolve('resolved');
        }, ms * 1000);
        });
    }

    function enemy() {
        this.x = 500
        this.y = 325
        this.width = 150
        this.height = 150
        this.hp = 100
        this.color = 'rgba(0, 130, 5, 0)'
        this.attack = 18
        this.dick = function() {
            fill(this.color)
            rect(this.x,this.y,this.width, this.height)
        }
}
    function enemy2() {
        this.hp = 130
        this.x = 900
        this.y = 325
        this.width = 150
        this.height = 150
        this.color = 'rgba(0,255,255,0)'
        this.box = function() {
            fill(this.color)
            rect(this.x,this.y,this.width, this.height)
            strokeWeight(0)
        }
    }
    function enemy3() {
        this.hp = 80
        this.x = 700
        this.y = 150
        this.width = 150
        this.height = 150
        this.box = function() {
            fill('rgba(0,0,0,0)')
            rect(this.x,this.y,this.width,this.height)
            strokeWeight(0)
        }
    }
    function enemy5() {
        this.width = 200
        this.height = 200
        this.y = 325
        this.x = 700
    }
    function character() {
        this.x = 0
        this.y = 80
        this.width = 50
        this.height = 50
        this.maxHP = 100
        this.mp = 100
        this.mpMax = 100
        this.attack = 15
        this.playerTurn = false
        this.hp = 100
        this.poison = false
        this.counter = 0
        this.fireballDamage = 35
        this.mpRegen = 0
        this.playerDamage = (Math.floor(Math.random()*10) + 20)
        this.char = function() {
            if ((killedG == false) && (killedS  == false)) {
                playerI.resize(150,150)
                image(playerI, this.x-30, this.y-80)
            }
            if ((killedG == true) && (killedS == false)) {
                playerWS.resize(150,150)
                image(playerWS, this.x-30, this.y-80)
            }
            if ((killedS == true) && (killedG == false)) {
                playerWA.resize(150,150)
                image(playerWA,this.x-30,this.y-80)
                }
            if ((killedS == true) && (killedG == true)) {
                playerGS.resize(150,150)
                image(playerGS, this.x-30, this.y-80)
            }
        }
        this.movement = function() {
            if ((keyIsDown(68)) && (this.x + this.width < w-100)) {
                this.x += 5
            }
            if ((keyIsDown(83)) && (this.y + this.height < h)) {
                this.y += 5
            }
            if ((keyIsDown(65)) && (this.x > 0)) {
                this.x -= 5
            }
            if ((keyIsDown(87)) && (this.y > 0 )) {
                this.y -= 5
                }
            if ((keyIsDown(68)) && (this.x + this.width < w-100) && (keyIsDown(16))) {
                this.x += 7
            }
            if ((keyIsDown(83)) && (this.y + this.height < h) && (keyIsDown(16))) {
                this.y += 7
            }
            if ((keyIsDown(65)) && (this.x > 0) && (keyIsDown(16))) {
                this.x -= 7
            }
            if ((keyIsDown(87)) && (this.y > 0 ) && (keyIsDown(16))) {
                this.y -= 7
                }
            }
        this.pve = async function() {
                let pattern = Math.floor((Math.random()*100) + 1)
                this.playerTurn = true
                this.count1 = 0
                console.log(pattern)
                if ((goblin.hp > 0) && (pattern <= 70)) {
                    if ((this.mp <= this.mpMax)) {
                        this.mp += (Math.floor(Math.random() * 5) + 15)
                        if (this.mp >= this.mpMax) {
                            this.mp -= (this.mp - this.mpMax)
                        }
                    }
                    document.getElementById('textBox').innerHTML ='you attack enemy'
                    goblin.hp -= this.playerDamage
                    const agh = await timer(1)
                    document.getElementById('textBox').innerHTML ='goblin attacks back'
                    this.hp -= (Math.floor(Math.random() * 7) + goblin.attack)
                    const stop = await timer(1)
                    document.getElementById('textBox').innerHTML = 'goblin gains attack!!'
                    goblin.attack += 7
                    console.log(goblin.attack)
                    this.result4 = await timer(1)
                    this.playerTurn = false
                    document.getElementById('textBox').innerHTML = ''
                }
                if ((goblin.hp > 0) && (pattern >= 71)) {
                    if ((this.mp <= this.mpMax)){
                        this.mp += (Math.floor(Math.random() * 5) + 15)
                        if (this.mp >= this.mpMax) {
                            this.mp -= (this.mp - this.mpMax)
                        }
                    }
                    document.getElementById('textBox').innerHTML ='you attack enemy'
                    const agh = await timer(1)
                    document.getElementById('textBox').innerHTML ='goblin defends'
                    goblin.attack += 7
                    const stopp = await timer(1)
                    document.getElementById('textBox').innerHTML ='goblins attack raises!!'
                    console.log(goblin.attack)
                    const result6 = await timer(1)
                    this.playerTurn = false
                }
                if (goblin.hp <= 0) {
                    console.log('doma')
                    document.getElementById('textBox').innerHTML ='OBTAINED LEGENDARY SWORD'
                    this.result5 = await timer(1)
                    this.playerTurn = false
                }
                document.getElementById('textBox').innerHTML = ''
            } 
        this.pveHeal = async function() {
            this.playerTurn = true
            this.count = 0
            let pattern = Math.floor((Math.random()*2) + 1)
            if ((pattern == 1)) {
                if ((this.hp <= this.maxHP) && (this.mp >= 35)) {
                    document.getElementById('textBox').innerHTML = 'You heal'
                    this.hp = .5 * this.maxHP + this.hp
                    this.mp -= 35
                    if (this.hp >= this.maxHP) {
                        this.hp -= (this.hp - this.maxHP)
                    }
                    const waitpls = await timer(1)
                    document.getElementById('textBox').innerHTML = 'goblin attacks' 
                    this.hp -= goblin.attack
                    document.getElementById('textBox').innerHTML = 'goblin gains attack!!'
                    console.log(goblin.attack)
                    this.count = 1
                }
                if ((this.mp <= 34) && (this.count == 0)) {
                    console.log('count 0')
                    document.getElementById('textBox').innerHTML ='Not Enought Mp'
                    const waitpls = await timer(1)
                    document.getElementById('textBox').innerHTML = 'goblin attacks' 
                    this.hp -= goblin.attack
                    document.getElementById('textBox').innerHTML = 'goblin gains attack!!'
                    console.log(goblin.attack)
                }
            }
            if ((pattern == 2) && (this.count == 0) ) {
                if ((this.hp <= this.maxHP) && (this.mp >= 35)) {
                    document.getElementById('textBox').innerHTML = 'You heal'
                    this.hp = .5 * this.maxHP + this.hp
                    this.mp -= 35
                    if (this.hp >= this.maxHP) {
                        this.hp -= (this.hp - this.maxHP)
                    }
                    const agh = await timer(1)
                    document.getElementById('textBox').innerHTML ='goblin defends'
                    goblin.attack += 7
                    const waitt = await timer(1)
                    document.getElementById('textBox').innerHTML ='goblins attack raises'
                    console.log(goblin.attack)
                    this.count = 1
                }
                if ((this.mp <= 34) && (this.count == 0)) {
                    document.getElementById('textBox').innerHTML ='NOT ENOUGH MP'
                    const pause1 = await timer(1)
                    document.getElementById('textBox').innerHTML ='GOBLIN DEFENDS'
                    const pause3 = await timer(1)
                    document.getElementById('textBox').innerHTML ='GOBLIN GAINS ATTACK'
                    goblin.attack += 7
                    console.log(goblin.attack)
                }
            }
            this.count = 0
            const result3 = await timer(1)
            this.playerTurn = false
            document.getElementById('textBox').innerHTML = ''
        }
        this.heal = async function() {
            document.getElementById('textBox').innerHTML = 'you heal'
            this.playerTurn = true
            if ((this.hp <= this.maxHP) && (this.mp >= 35)) {
                this.hp = .5 * this.maxHP + this.hp
                this.mp -= 35
                if (this.hp >= this.maxHP) {
                    this.hp -= (this.hp - this.maxHP)
                    console.log(this.maxHP)
                }
            }
            if ((this.mp <= 34)) {
                document.getElementById('textBox').innerHTML = 'Not Enought Mp'
            }
            const result2 = await timer(1)
            this.playerTurn = false
        }
        this.pveSlime = async function() {
            this.playerTurn = true
            this.damage = (Math.floor(Math.random() * 15) + 20)
            this.pattern = Math.floor((Math.random()*100) + 1)
            this.resistance = Math.floor((Math.random()*2) + 1)
            console.log(this.pattern)
            if (this.mp <= this.mpMax) {
                this.mp += (Math.floor(Math.random() * 5) + 10)
                if (this.mp >= this.mpMax) {
                    this.mp -= (this.mp - this.mpMax)
                    console.log('mp max')
                }
            }
            document.getElementById('textBox').innerHTML = 'YOU ATTACK'
            const relo = await timer(1)
                if ((slime.hp > 0) && (this.pattern <= 90)){
                    if (this.resistance == 2) {
                        slime.hp -= this.playerDamage
                        document.getElementById('textBox').innerHTML = 'SLIME TAKES DAMAGE'
                    }
                    if (this.resistance == 1) {
                        document.getElementById('textBox').innerHTML = 'RESISTED'
                        const q = await timer(1)
                    }
                    const resault = await timer(1)
                    document.getElementById('textBox').innerHTML = 'SLIME ATTACKS BACK'
                    this.hp -= this.damage
                    this.result4 = await timer(1)
                }
                if ((slime.hp > 0) && (this.pattern >= 91)) {
                    document.getElementById('textBox').innerHTML = 'SLIME PROTECTS'
                    const waitplz = await timer(1)
                }
                if (this.counter == 3) {
                    const agh = await timer(1)
                    document.getElementById('textBox').innerHTML = 'SLIME HEALS'
                    slime.hp += 65
                    if (slime.hp >= 130) {
                        slime.hp -= (slime.hp - 130)
                    }
                    this.counter = 0
                }
                if (slime.hp <= 0) {
                    console.log('doma')
                    this.result5 = await timer(1)
                    this.playerTurn = false
                }
                this.playerTurn = false
                this.counter += 1
                console.log(this.counter)
                console.log(this.playerTurn)
                document.getElementById('textBox').innerHTML = ''
            } 
        this.pveHeal2 = async function() {
            document.getElementById('textBox').innerHTML = 'you heal'
            this.playerTurn = true
            this.pattern = Math.floor((Math.random()*2) + 1)
            this.damage = (Math.floor(Math.random() * 15) + 20)
            if ((this.hp <= this.maxHP) && (this.mp >= 35)) {
                this.hp = .5 * this.maxHP + this.hp
                this.mp -= 35
                if (this.hp >= this.maxHP) {
                    this.hp -= (this.hp - this.maxHP)
                }
            }
            const plzwait = await timer(1)
            if ((this.pattern == 1)) {
                document.getElementById('textBox').innerHTML = 'Slime attacks!!'
                this.hp -= this.damage
                const relolo = await timer(1)
            }
            if ((this.pattern == 2)) {
                document.getElementById('textBox').innerHTML = 'Slime defends'
                const constt = await timer(1)
            }
            if ((this.mp <= 34)) {
                document.getElementById('textBox').innerHTML = 'Not Enought Mp'
                const wait = await timer(1)
            }
            this.playerTurn = false
        }
        this.pveWitch = async function() {
            this.playerTurn = true
            document.getElementById('textBox').innerHTML = "YOU ATTACK"
            witch.hp -= this.playerDamage
            if (this.mp <= this.mpMax) {
                this.mp += (Math.floor(Math.random() * 5) + 10)
                if (this.mp >= this.mpMax) {
                    this.mp -= (this.mp - this.mpMax)
                    console.log('mp max')
                }
            }
            if (witch.hp <= 0) {
                console.log('doma')
                this.result5 = await timer(1)
                this.playerTurn = false
            }
            const resultt = await timer(1)
            this.hp -= Math.floor(this.playerDamage * .3)
            document.getElementById('textBox').innerHTML = "WITCH REFLECTS"
            const resulttt = await timer(1)
            this.hp -= Math.floor((Math.random() * 10) + 30)
            document.getElementById('textBox').innerHTML = "WITCH ATTACKS BACK"
            const reslt = await timer(1)
            this.playerTurn = false
            document.getElementById('textBox').innerHTML = ""
        }
        this.pveBats = async function() {
            document.getElementById('textBox').innerHTML =  "YOU ATTACK"
            this.playerTurn = true
            this.pattern = Math.floor((Math.random()*2)+1)
            bats.hp1 -= this.playerDamage
            console.log(this.pattern)
            const agh = await timer(1)
            if ((bats.hp1 > 0) && (this.pattern == 1)) {
                document.getElementById('textBox').innerHTML =  "BAT ATTACKS"
                this.hp -= Math.floor((Math.random()*15) + 25)
                const agh = await timer(1)
                bats.hp1 += 15
                document.getElementById('textBox').innerHTML =  "BAT HEALS"
            }
            if ((bats.hp1 >0) && (this.pattern == 2)){
                this.hp -= Math.floor((Math.random()*15) + 25)
                const agh = await timer(1)
                document.getElementById('textBox').innerHTML = "BAT STEALS MP"
                this.mp -= this.mp/2
            }
            if (bats.hp1 <= 0) {
                console.log('doma')
                this.playerTurn = false
            }
            this.playerTurn = false
            document.getElementById('textBox').innerHTML = ""
            console.log(this.playerTurn)
        }
        this.takasHP = 100
        this.pveTaka = async function() {
            this.playerTurn = true
            this.luckyNumber = Math.floor(Math.random()*101)
            if (this.luckyNumber != 7) {
                document.getElementById('textBox').innerHTML = "where you aiming at bro?"
                const agh = await timer(1)
                this.playerTurn = false
            }
            if (this.luckyNumber == 7){
                this.takasHP -= 88
                document.getElementById('textBox').innerHTML = "AGH DAMN IT, YOU INSIGNIFICANT HOMOSEXUAL LITTLE MONKEY!!!"
                const agh = await timer(3)
                if (this.takasHP > 0) {
                    document.getElementById('textBox').innerHTML = "i believe thats a skill issue on your part"
                    const agh = await timer(2)
                    document.getElementById('textBox').innerHTML = ''
                }
                if (this.takasHP <= 0 ) {
                    document.getElementById('textBox').innerHTML = "Agh at lasteth thee finally did get me, i nev'r bethought thee wouldst! but in the endeth, thee didst.  I desire thou art joyous.  I desire thee liveth the rest of thy life knowing yond thee just end'd anoth'r sir's life.  Thee shouldst wend and rethink thy life and bethink to yourself.  Art thee a winn'r because thee hath killed me? or didst thee killeth me because thou art a winn'r? didst thee completeth the game because thou art grading t? or art thee grading t because thee did complete the game?"
                    const agh = await timer(10)
                    document.getElementById('textBox').innerHTML = "You win :D"
                    const ag = await timer(2)
                    goblin.x = 500
                    witch. x = 700
                    slime. x = 900
                    bats.hp1 = 70
                    witch.hp = 80
                    bats.x = 700
                    bats.y = 450
                    player.mp = 100
                    player.maxHP = 100
                    player.mpMax = 100
                    player.x = 0
                    player.y = 80
                    canmove = 1
                    player.hp = 100
                    killedG = false
                    killedS = false
                    killedB = false
                    KilleDW = false
                }
            }
            this.playerTurn = false
            }
        }


            
    
        function enemy4() {
            this.hp1 = 70
            this.hp2 = 70
            this.hp3 = 70
            this.x = 700
            this.y = 450
            this.which = Math.floor((Math.random()*3)+1)
        }
        let testText = ['HP : 200 | ATTACK : ??']
    function draw() {
        clear()
        document.getElementById("hp").innerHTML = "HP : " + player.hp
        document.getElementById('mp').innerHTML = "MP : " + player.mp
        hit = collideRectRect(player.x, player.y, player.width, player.height, goblin.x,goblin.y, goblin.height, goblin.width)
        if (canmove == 1) {
            player.movement()
            hit2 = collideRectRect(player.x, player.y, player.width, player.height, slime.x, slime.y, slime.width, slime.height)
            hit3 = collideRectRect(player.x, player.y, player.width, player.height, witch.x, witch.y, witch.width, witch.height)
            hit4 = collideRectRect(player.x, player.y, player.width, player.height, bats.x,bats.y,200,200)
            hit5 = collideRectRect(player.x, player.y, player.width,player.height, taka.x, taka.y, 200,200)
            document.getElementById('enemyHP').style.opacity = 0
            if ((hit == false) && (hit2 == false) && (hit3 == false) && (hit4 == false)) {
                document.getElementById('textBox').innerHTML = "Press 1 to attack | Press 2 to heal | Press space to engage"
            }
            if (hit == true) {
                document.getElementById('textBox').innerHTML = "HP : 100 ATTACK : ???"
            }
            if (hit2 == true) {
                document.getElementById('textBox').innerHTML = "HP : 130 ATTACK : 25"
            }
            if (hit3 == true) {
                document.getElementById('textBox').innerHTML = "HP : 80 ATTACK : 35"
            }
            if (hit4 == true) {
                document.getElementById('textBox').innerHTML = "HP : 70 ATTACK : 25"
            }
            goblin.attack = 18
        }
        goblin.dick() 
        slime.box()
        witch.box()
        if (hit == true) {
            console.log('3')
            document.getElementById('textBox').innerHTML = "HP : 100 ATTACK:???"
            if (keyIsDown(32) == true) {
                canmove = 2
                document.getElementById('enemyHP').style.opacity = 1
                document.getElementById('enemyHP').innerHTML = 'GOBLIN HP : ' + goblin.hp
                console.log(canmove)    
                goblin.x = w * 4/5
                console.log('1')
                goblin.hp = 100
                slime.x = -1000
                witch.x = -1000
                bats.x = -1000
                taka.x = -1000
                goblin.x = 900
                goblin.y = 300
                console.log('canmove 1')
                document.getElementById('textBox').innerHTML = ""
            }   
        }
        if (canmove == 4) {
            document.getElementById('enemyHP').innerHTML = 'WITCH HP : ' + witch.hp
            if (witch.hp <= 0) {
                canmove = 1
                slime.x = 900
                slime.y = 325
                taka.x = 700
                goblin.x = 300
                goblin.y = 300
                // = true
                witch.x = 450
                witch.y = 150
                player.mpMax = 150
            }
            if (player.hp <= 0) {
                goblin.x = 500
                witch. x = 700
                slime. x = 900
                taka.x = 700
                bats.hp1 = 70
                witch.hp = 80
                bats.x = 700
                bats.y = 450
                player.mp = 100
                player.maxHP = 100
                player.mpMax = 100
                player.x = 0
                player.y = 80
                canmove = 1
                player.hp = 100
                killedG = false
                killedS = false
                killedB = false
                KilleDW = false
            }
        }
        batsI.resize(200,200)
        slimeI.resize(150,150)
        witchI.resize(150,150)
        goblinI.resize(150,150)
        image(takaI,taka.x,taka.y)
        image(batsI, bats.x,bats.y)
        image(slimeI, slime.x-10, slime.y-20)
        image(goblinI, goblin.x, goblin.y)
        image(witchI, witch.x, witch.y)
        if ((hit2 == true)) {
            console.log('5')
            if (keyIsDown(32) == true) {
                canmove = 3
                console.log(canmove)
                player.x = 500
                player.y = 325
                goblin.x = -1000
                witch.x = -1000
                bats.x = -1000
                taka.x = -1000
                document.getElementById('enemyHP').style.opacity = 1
                document.getElementById('enemyHP').innerHTML = "SLIME HP : " + slime.hp
                slime.hp = 130
                goblin.color = 'rgba(0,0,0,0)'
                document.getElementById('textBox').innerHTML = ""
            }
        } 
        if (hit3 == true) {
            console.log('5')
            if (keyIsDown(32) == true) {
                canmove = 4
                taka.x = -1000
                console.log(canmove)
                player.x = 500
                player.y = 345
                goblin.x = -1000
                slime.x = -1000
                witch.x = 900
                witch.y = 300
                bats.x =-1000
                document.getElementById('enemyHP').style.opacity = 1
                document.getElementById('enemyHP').innerHTML = "WITCH HP : " + witch.hp
                document.getElementById('textBox').innerHTML = ""
            }
        }
        if (hit4 == true) {
            console.log('bats')
            if (keyIsDown(32) == true) {
                canmove = 5
                player.x = 500
                taka.x = -1000
                player.y = 325
                goblin.x = -1000
                slime.x = -1000
                witch.x = -1000
                bats.x = 900
                bats.y = 230
                document.getElementById('enemyHP').style.opacity = 1
                document.getElementById('enemyHP').innerHTML = "BATS HP : " + bats.hp1
                document.getElementById('textBox').innerHTML = ""
            }
        }
        if (hit5 == true) {
            if (keyIsDown((32)) == true) {
                canmove = 6
                player.x = 500
                goblin.x = -1000
                bats.x = -1000
                slime.x = -1000
                witch.x = -1000
                document.getElementById('enemyHP').style.opacity = 1
                document.getElementById('enemyHP').innerHTML = "taka's hitpoints : idk"
                document.getElementById('textBox').innerHTML = ""
            }
        }
        if (canmove == 3) {
            document.getElementById('enemyHP').innerHTML = "SLIME HP : " + slime.hp
            if (slime.hp <= 0) {
                canmove = 1
                //players attack or MP rises
                player.attack = 50
                goblin.color ='rgba(5,130,0,1)'
                killedS = true
                player.hp = 200
                player.maxHP = 200
                taka.x = 700
                goblin.x = 500
                witch. x = 700
                slime. x = 900
                bats.hp1 = 70
                bats.x = 700
                bats.y = 450
            }
            if (player.hp <= 0) {
                goblin.x = 500
                witch. x = 700
                slime. x = 900
                taka.x =700
                bats.hp1 = 70
                bats.x = 700
                bats.y = 450
                player.mp = 100
                player.maxHP = 100
                player.mpMax = 100
                player.x = 0
                player.y = 80
                canmove = 1
                player.hp = 100
                killedG = false
                killedS = false
                killedB = false
                KilleDW = false
            }
        }
        if (canmove == 5) {
            document.getElementById('enemyHP').innerHTML = 'BATS HP : ' + bats.hp1
            if (player.hp <= 0) {
                goblin.x = 500
                witch. x = 700
                slime. x = 900
                bats.hp1 = 70
                bats.x = 700
                bats.y = 450
                taka.x = 700
                player.mp = 100
                player.maxHP = 100
                player.mpMax = 100
                player.x = 0
                player.y = 80
                canmove = 1
                player.hp = 100
                killedG = false
                killedS = false
                killedB = false
                KilleDW = false
            }
            if (bats.hp1 <= 0) {
                canmove = 1
                goblin.x = 500
                witch. x = 700
                slime. x = 900
                bats.hp1 = 70
                bats.x = 700
            }
        }
        if (canmove == 2) {
            document.getElementById('enemyHP').innerHTML = 'GOBLIN HP : ' + goblin.hp
            if (goblin.hp <= 0) {
                canmove = 1
                player.playerDamage = Math.floor((Math.random()*20)+40)
                slime.x = 900
                killedG = true
                goblin.x = 500
                witch. x = 700
                slime. x = 900
                bats.hp1 = 70
                taka.x = 700
                bats.x = 700
                bats.y = 450
                player.hp = 100
            }
            if (player.hp <= 0) {
                goblin.x = 500
                witch. x = 700
                slime. x = 900
                bats.hp1 = 70
                bats.x = 700
                bats.y = 450
                taka.x = 700
                player.mp = 100
                player.maxHP = 100
                player.mpMax = 100
                player.x = 0
                player.y = 80
                canmove = 1
                player.hp = 100
                killedG = false
                killedS = false
                killedB = false
                KilleDW = false
            }
        }
        player.char()
    }

    function keyPressed() {
        if ((keyCode === 49) && (canmove == 2) && (player.playerTurn == false)) {
            player.pve()
        }
        if ((keyCode === 50) && (canmove == 2) && (player.playerTurn == false)) {
            player.pveHeal()
        }
        if ((keyCode === 50) && (canmove == 1) && (player.playerTurn == false)) {
            player.heal()
        }
        if (keyCode === 70) {
            console.log(canmove)
        }
        if ((keyCode === 49) && (canmove == 3) && (player.playerTurn == false)) {
            player.pveSlime()
        }
        if ((keyCode === 50) && (canmove == 3) && (player.playerTurn == false)) {
            player.pveHeal2()
        }
        if ((keyCode == 49) && (canmove == 4) && (player.playerTurn == false)){
            player.pveWitch()
        }
        if ((keyCode == 49) && (canmove == 5) && (player.playerTurn == false)){
            player.pveBats()
        }
        if ((keyCode == 49) && (canmove == 6) && (player.playerTurn == false)){
            player.pveTaka()
        }
    }
