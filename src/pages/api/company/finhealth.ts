import { NextApiRequest, NextApiResponse } from "next";

type Data = {
    result: number;
}

const commonWeight = {
    netProfitWeight: 0.25,
    quickRatio: 0.25,
    debtToEquity: 0.25,
    operatingProfit: 0.25
}

const finServiceWeight = {
    netProfitWeight: 0.2,
    quickRatio: 0.2,
    debtToEquity: 0.4,
    operatingProfit: 0.2
}

const consumerStaplesWeight = {
    netProfitWeight: 0.2,
    quickRatio: 0.4,
    debtToEquity: 0.2,
    operatingProfit: 0.2
}

//Profitability
const netProfitMargin = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { industry, sales, otherIncome, costOfGoodsSold, operatingExp, interestExp } = req.body

    const revenue = sales + otherIncome
    const netIncome = revenue - costOfGoodsSold - operatingExp - interestExp
    const netProfit = (netIncome / revenue) * 100

    return res.json({ result: netProfit });
}

//Liquidity
const getQuickRatio = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { currentAssets, currentLiabilities, inventory } = req.body
    const quickRatio = (currentAssets - inventory) / currentLiabilities

    return res.json({ result: quickRatio });
}

//Solvency
const getDebtToEquityRatio = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { currentAssets, currentLiabilities, longTermLiabilities } = req.body
    const debtToEquity = (currentLiabilities + longTermLiabilities) / currentAssets

    return debtToEquity;
}

//Operating Efficiency
const operatingProfitMargin = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { operatingExp, sales, otherIncome } = req.body
    const revenue = sales + otherIncome
    const operatingEfficiency = operatingExp / revenue

    return operatingEfficiency
}

const bizAggregatedScore = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    let { industry } = req.body

    let NETPROFIT_WEIGHT = 0
    let QUICKRATIO_WEIGHT = 0
    let DEBTTOEQUITY_WEIGHT = 0
    let OPERATINGPROFIT_WEIGHT = 0

    if (industry == "finService") {
        NETPROFIT_WEIGHT = finServiceWeight.netProfitWeight
        QUICKRATIO_WEIGHT = finServiceWeight.quickRatio
        DEBTTOEQUITY_WEIGHT = finServiceWeight.debtToEquity
        OPERATINGPROFIT_WEIGHT = finServiceWeight.operatingProfit
    } else if (industry == "consumerStaples") {
        NETPROFIT_WEIGHT = consumerStaplesWeight.netProfitWeight
        QUICKRATIO_WEIGHT = consumerStaplesWeight.quickRatio
        DEBTTOEQUITY_WEIGHT = consumerStaplesWeight.debtToEquity
        OPERATINGPROFIT_WEIGHT = consumerStaplesWeight.operatingProfit
    } else {
        NETPROFIT_WEIGHT = commonWeight.netProfitWeight
        QUICKRATIO_WEIGHT = commonWeight.quickRatio
        DEBTTOEQUITY_WEIGHT = commonWeight.debtToEquity
        OPERATINGPROFIT_WEIGHT = commonWeight.operatingProfit
    }

    const netProfit = await netProfitMargin
    const netProfitFactor = calculateFactor(netProfit, NETPROFIT_WEIGHT)

    const quickRatio = await getQuickRatio
    const quickRatioFactor = calculateFactor(quickRatio, QUICKRATIO_WEIGHT)

    const debtToEquityRatio = await getDebtToEquityRatio
    const debtToEquityRatioFactor = calculateFactor(debtToEquityRatio, DEBTTOEQUITY_WEIGHT)

    const operatingProfit = await operatingProfitMargin
    const operatingProfitFactor = calculateFactor(operatingProfit, OPERATINGPROFIT_WEIGHT)

    const totalWeight = NETPROFIT_WEIGHT + QUICKRATIO_WEIGHT + DEBTTOEQUITY_WEIGHT + OPERATINGPROFIT_WEIGHT
    const weightedScore = (netProfitFactor + quickRatioFactor + debtToEquityRatioFactor + operatingProfitFactor) / totalWeight

    return weightedScore
}

const calculateFactor = (mtdResp: any, weight: number) => {
    const beforeCal = mtdResp

    let calResp = {
        'result': (beforeCal as any).result
    }

    return weight * calResp.result
}