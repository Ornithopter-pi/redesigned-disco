enum DamageType {
    Acid,
    Adamantine,
    Bleed,
    Bludgeoning,
    Chaotic,
    Cold,
    ColdIron,
    Crushing,
    Divine,
    Electricity,
    Epic,
    Evil,
    Falling,
    Fire,
    Good,
    Lawful,
    Magic,
    Nonlethal,
    Piercing,
    Precision,
    Silver,
    Slashing,
    Sonic,
    Untyped,
}

interface IDamage {
    type: DamageType,
    amount: number
}

export { DamageType, IDamage }