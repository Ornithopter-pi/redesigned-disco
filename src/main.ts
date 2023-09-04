import { DamageType, IDamage } from "./damage.js"
enum healthStatus {
    Alive,
    Dead,
    Unconsious,
    Disabled,
    Staggered
}

interface damageReduction {
    amount: number,
    drTypes: DamageType[]
}

interface IHealthPoints {
    healthStatus: healthStatus,
    nonLethal: number,
    damageReductions: damageReduction[],
    amountAllowedNegative: number,
    current: number,
    max: number,
    temporary: number,
    takeDamage: (amount: number) => healthStatus
}

interface IInitiative {
    initiative: number
}

interface ICreature {
    name: string
    hp: IHealthPoints
    initiative: IInitiative
}
// IdamageArray is for Damage Reduction values.

function buildCreature(hp: IHealthPoints, name: string): ICreature {
    // TODO: Sort the damage reductions array in this function to spare ourselves pain in 
    //       the next function.
}

function takeDamage(this: IHealthPoints, damage: IDamage): healthStatus {
    //#region nonlethal
    if (damage.type === DamageType.Nonlethal) this.nonLethal += damage.amount;
    if (this.nonLethal = this.current) return healthStatus.Staggered;
    if (this.nonLethal > this.current) return healthStatus.Unconsious;
    if (damage.type === DamageType.Nonlethal) return this.healthStatus;
    //#endregion nonlethal
    //#region damage reduction
    let sentinel = 0
    for (const reduction of this.damageReductions) {
        for (const drType of reduction.drTypes) {
            if (drType === damage.type) {
                sentinel = reduction.amount;
                break;
            }
        }
        if (sentinel) break;
    }
    damage.amount -= sentinel;
    if (damage.amount < 1) return this.healthStatus
    //#endregion
    //#region temporary hp
    if (this.temporary >= 0) {
        this.temporary -= damage.amount;
        if (this.temporary < 0) this.current += this.temporary;
        if (this.current <= this.amountAllowedNegative) return healthStatus.Dead;
        if (this.nonLethal === this.current && this.nonLethal > 0) return healthStatus.Staggered;
        if (this.nonLethal > this.current && this.nonLethal > 0) return healthStatus.Unconsious;
        if (this.current > 0) return healthStatus.Alive;
        return healthStatus.Disabled;
    }
    //#endregion temporary hp

}