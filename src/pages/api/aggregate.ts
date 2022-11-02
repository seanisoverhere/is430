import { NextApiRequest, NextApiResponse } from "next";

const COMPANY_HEALTH_WEIGHT = 1
const INDUSTRY_WEIGHT = 1

type Data = {
    result: number;
}

const scoreAggregate = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const companyFinHealth = COMPANY_HEALTH_WEIGHT * 1
    const industryFactor = INDUSTRY_WEIGHT * 1

    const totalWeight = COMPANY_HEALTH_WEIGHT + INDUSTRY_WEIGHT
    //this will give us from 0 - 1, higher number = higher credit worthiness
    //we need to define 0 - 1, what is RAG
    const weightedScore = (companyFinHealth + industryFactor) / totalWeight

    return weightedScore
}