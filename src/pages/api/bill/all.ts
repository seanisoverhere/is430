import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

type Data = {
    data?: string;
    message: string;
    success: boolean;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "GET") {
        return await retrieveAllLoans(req, res);
    }

    return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
}

const retrieveAllLoans = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    let { uuid } = req.query

    const totalAmount = prisma.$queryRaw`SELECT SUM(ps.paymentAmount) as totalAmt
    FROM payment p, paymentSplit ps 
    WHERE p.paymentId = ps.mainPaymentId
    AND payerId = ${uuid};`

    const totalAmtPaid = prisma.$queryRaw`SELECT SUM(ps.paymentAmount) as totalAmtPaid 
    FROM payment p, paymentSplit ps 
    WHERE p.paymentId = ps.mainPaymentId 
    AND ps.paymentStatus = 'P' 
    AND payerId = ${uuid};`

    const currenthMthBill = prisma.$queryRaw`SELECT * 
    FROM payment p, paymentSplit ps
    WHERE p.paymentId = ps.mainPaymentId 
    AND MONTH(ps.paymentDate) = MONTH(CURDATE())
    AND ps.paymentStatus = 'IP' 
    AND p.payerId = ${uuid};`

    return res.status(200).json({
        totalAmt: totalAmount,
        totalAmtPaid: totalAmtPaid,
        currentMonthBill: currenthMthBill
    })
}