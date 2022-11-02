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
const netProfitMargin = (sales: number, otherIncome: number,
    costOfGoodsSold: number, operatingExp: number, interestExp: number): number => {

    const revenue = sales + otherIncome
    const netIncome = revenue - costOfGoodsSold - operatingExp - interestExp
    const netProfit = (netIncome / revenue) * 100

    return netProfit;
}

//Liquidity
const getQuickRatio = (currentAssets: number, currentLiabilities: number,
    inventory: number): number => (currentAssets - inventory) / currentLiabilities

//Solvency
const getDebtToEquityRatio = (currentAssets: number, currentLiabilities: number,
    longTermLiabilities: number): number => (currentLiabilities + longTermLiabilities) / currentAssets

//Operating Efficiency
const operatingProfitMargin = (operatingExp: number, sales: number, otherIncome: number): number => {
    const revenue = sales + otherIncome
    const operatingEfficiency = operatingExp / revenue

    return operatingEfficiency
}

export default async function bizAggregatedScore(industry: string, sales: number, otherIncome: number,
    costOfGoodsSold: number, operatingExp: number, interestExp: number, currentAssets: number,
    currentLiabilities: number, inventory: number, longTermLiabilities: number) {

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

    const netProfit = await netProfitMargin(sales, otherIncome, costOfGoodsSold, operatingExp, interestExp)
    const netProfitFactor = netProfit * NETPROFIT_WEIGHT

    const quickRatio = await getQuickRatio(currentAssets, currentLiabilities, inventory)
    const quickRatioFactor = quickRatio * QUICKRATIO_WEIGHT

    const debtToEquityRatio = await getDebtToEquityRatio(currentAssets, currentLiabilities, longTermLiabilities)
    const debtToEquityRatioFactor = debtToEquityRatio * DEBTTOEQUITY_WEIGHT

    const operatingProfit = await operatingProfitMargin(operatingExp, sales, otherIncome)
    const operatingProfitFactor = operatingProfit * OPERATINGPROFIT_WEIGHT

    const totalWeight = NETPROFIT_WEIGHT + QUICKRATIO_WEIGHT + DEBTTOEQUITY_WEIGHT + OPERATINGPROFIT_WEIGHT
    const weightedScore = (netProfitFactor + quickRatioFactor + debtToEquityRatioFactor + operatingProfitFactor) / (totalWeight * 100)

    return weightedScore
}