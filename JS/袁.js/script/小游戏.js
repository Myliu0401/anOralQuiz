/* 英雄打怪兽的小游戏
英雄和怪兽都具有攻击力、防御力、生命值、暴击几率（暴击时伤害翻倍）
攻击伤害 = 攻击力 - 防御力
伤害最少为1. 
创建一个英雄和一个怪兽，让它们互相攻击，直到一方死亡，输出整个攻击过程。 */
/**
 *
 * 游戏角色构造函数
 * @param {*} name  名字
 * @param {*} attack 攻击力
 * @param {*} defense 防御力
 * @param {*} life 生命值
 * @param {*} Crit 暴击概率
 */
function YouXi(name, attack, defense, life, Crit) {
    this.name = name,
        this.attack = attack,
        this.defense = defense,
        this.life = life,
        this.Crit = Crit,

        console.log(`${name},生命值${life},战斗力${attack},防御力${defense},暴击概率为${Crit}`)


    /**
     * @param {*} Together 攻击对象 
     */
    this.akeWar = function (Together) {
        var str = this.attack - Together.defense
        var sum = Math.random()
        var count = this.Crit / 100
        var boolean = false
        if (str <= 1) {
            Together.life -= 2
        } else {
            Together.life -= str
        }
        if (sum > count) {
            Together.life -= str * 2
            boolean = true
        }
        if (Together.life < 0) {
            Together.life = 0
        }
        console.log(`${this.name}对${Together.name}展开攻击,${Together.name}伤害${str}生命值剩${Together.life} 
                   ${boolean ? '暴击!' : ""}`)

        return Together.life === 0
    }
}

var Hero = new YouXi('刘', 70, 60, 300, 80)
var Beauty = new YouXi('林', 40, 50, 500, 70)

console.log(`${Hero.name}`)
console.log(`VS`)
console.log(`${Beauty.name}`)

while(true){
    if(Hero.akeWar(Beauty)){
        break
    }
    if(Beauty.akeWar(Hero)){
        break
    }
}
console.log('=============')
