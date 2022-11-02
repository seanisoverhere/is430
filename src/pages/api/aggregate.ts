import { NextApiRequest, NextApiResponse } from "next";
import bizAggregatedScore from "./company/finhealth";
import calIndustryScore from "./industry/score";

const COMPANY_HEALTH_WEIGHT = 0.8;
const INDUSTRY_WEIGHT = 0.2;

type Data = {
    result: number;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "POST") {
        return await scoreAggregate(req, res);
    }
}

const scoreAggregate = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) => {
    let {
        industry,
        sales,
        otherIncome,
        costOfGoodsSold,
        operatingExp,
        interestExp,
        currentAssets,
        currentLiabilities,
        inventory,
        longTermLiabilities,
        uuid
    } = req.body;

    const companyFinHealthScore = await bizAggregatedScore(
        industry,
        sales,
        otherIncome,
        costOfGoodsSold,
        operatingExp,
        interestExp,
        currentAssets,
        currentLiabilities,
        inventory,
        longTermLiabilities
    );
    const companyFinHealthFactor = COMPANY_HEALTH_WEIGHT * companyFinHealthScore;

    const industryOutlookScore = await calIndustryScore(industry);
    const industryOutlookFactor = INDUSTRY_WEIGHT * industryOutlookScore;

    const totalWeight = COMPANY_HEALTH_WEIGHT + INDUSTRY_WEIGHT

    //this will give us from 0 - 1, higher number = higher credit worthiness
    //we need to define 0 - 1, what is RAG
    const weightedScore = (companyFinHealthFactor + industryOutlookFactor) / totalWeight

    await prisma?.business.update({
        where: {
            uuid: uuid,
        },
        data: {
            aggScore: weightedScore,
        }
    })

    return res.status(200).json({ result: weightedScore })
}
