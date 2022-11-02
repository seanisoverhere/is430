import { NextApiRequest, NextApiResponse } from "next";

//these can be inserted into db instead
const SECTOR_VOLATILITY: any = {
    basicMaterial: -0.0024,
    utilities: 0.0216,
    consumerDiscretion: 0.0039,
    consumerStaples: 0.0188,
    finSvc: 0.0166,
    healthCare: 0.0154,
    industrial: 0.0194,
    technology: 0.0395,
    teleComm: 0.0171,
}

export default async function calIndustryScore(industry: string) {
    let industryScore = SECTOR_VOLATILITY[industry]
    let maxIndustryScore = Math.max(SECTOR_VOLATILITY.values())
    let minIndustryScore = Math.max(SECTOR_VOLATILITY.values())
    let industryDelta = maxIndustryScore - industryScore
    let normalizedIndustryScore = industryDelta / (maxIndustryScore - minIndustryScore)

    return normalizedIndustryScore
}