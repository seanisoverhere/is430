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

    const totalAmount = await prisma.$queryRaw`SELECT SUM(ps.paymentAmount) as totalAmt
    FROM is430.payment p, is430.paymentSplit ps 
    WHERE p.paymentId = ps.mainPaymentId
    AND payerId = ${uuid}`

    const totalAmtPaid = await prisma.$queryRaw`SELECT SUM(ps.paymentAmount) as totalAmtPaid 
    FROM payment p, paymentSplit ps 
    WHERE p.paymentId = ps.mainPaymentId 
    AND ps.paymentStatus = 'P' 
    AND payerId = ${uuid};`

    const currenthMthBill: any = await prisma.$queryRaw`SELECT p.paymentId, t3.totalNoOfPayment, ps.paymentAmount, ps.paymentDate, t3.totalNoOfPaidPayment, sup.uuid, p.dueDate
    FROM supplier sup, paymentSplit ps, payment p
    LEFT JOIN
    (SELECT t1.paymentId, totalNoOfPayment, totalNoOfPaidPayment
    FROM
    (SELECT p.paymentId, COUNT(*)  as totalNoOfPayment FROM payment p, paymentSplit ps 
    WHERE p.paymentId = ps.mainPaymentId
    AND p.payerId = 17
    GROUP BY p.paymentId) as t1
    LEFT JOIN
    (SELECT p.paymentId, p.totalAmount, COUNT(ps.paymentStatus) as totalNoOfPaidPayment FROM payment p
    LEFT JOIN paymentSplit ps 
    ON p.paymentId = ps.mainPaymentId
    AND ps.paymentStatus = 'P'
    AND p.payerId = 17
    GROUP BY p.paymentId) as t2
    ON t1.paymentId = t2.paymentId) as t3
    ON p.paymentId = t3.paymentId
    WHERE p.paymentId = ps.mainPaymentId 
    AND sup.uuid = p.receiverId
    AND MONTH(ps.paymentDate) = MONTH(CURDATE())
    AND ps.paymentStatus = 'IP' 
    AND p.payerId = 17
    GROUP BY p.paymentId, t3.totalNoOfPayment, ps.paymentAmount, ps.paymentDate, t3.totalNoOfPaidPayment, sup.uuid, p.dueDate;`

    currenthMthBill.forEach((bill: any) => {
        bill.totalNoOfPayment = Number(bill.totalNoOfPayment);
        bill.totalNoOfPaidPayment = Number(bill.totalNoOfPaidPayment);
    })

    return res.status(200).json({
        totalAmt: totalAmount,
        totalAmtPaid: totalAmtPaid,
        currentMonthBill: currenthMthBill
    })
}