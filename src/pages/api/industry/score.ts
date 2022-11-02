//these can be inserted into db instead
const SECTOR_VOLATILITY: any = {
    basicMaterial: -0.0024,
    utilities: 0.0216,
    consumerDiscretion: 0.0039,
    consumerStaples: 0.0188,
    finService: 0.0166,
    healthCare: 0.0154,
    industrial: 0.0194,
    technology: 0.0395,
    teleComm: 0.0171,
}

export default async function calIndustryScore(industry: string) {
    let industryScore = SECTOR_VOLATILITY[industry]
    console.log("INDUSTRY START")
    console.log(industryScore)

    const maxIndustryScore = Math.max.apply(null, Object.values(SECTOR_VOLATILITY))
    console.log(maxIndustryScore)
    const minIndustryScore = Math.min.apply(null, Object.values(SECTOR_VOLATILITY))
    console.log(minIndustryScore)
    let industryDelta = maxIndustryScore - industryScore
    console.log(industryDelta)

    let normalizedIndustryScore = industryDelta / (maxIndustryScore - minIndustryScore)
    console.log(normalizedIndustryScore)
    console.log("INDUSTRY END")
    return normalizedIndustryScore
}