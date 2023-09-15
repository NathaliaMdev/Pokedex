class Pokemon_Detail{
    name;
    number;
    type;
    types = [];
    photo;
    specie;
    height;
    weight;
    abilitie;
    abilities = [];
    eggGroup;
    eggGroups = [];
    growthRate;
    hp;
    attack;
    defense;
    special_attack;
    special_defense;
    speed;
    total_base_stat(){
        return this.hp + this.attack + this.defense + this.special_attack + this.special_defense + this.speed
       
    }
    evolution;
    moveSkill;
    movesSkill = [];
    


}