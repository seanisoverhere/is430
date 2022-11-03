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

    const latePaymentBill: any = await prisma.$queryRaw`SELECT p.paymentId, t3.totalNoOfPayment, ps.paymentAmount, ps.paymentDate, t3.totalNoOfPaidPayment, sup.uuid, p.dueDate, sup.companyName, sup.uenNo
    FROM supplier sup, paymentSplit ps, payment p
    LEFT JOIN
    (SELECT t1.paymentId, totalNoOfPayment, totalNoOfPaidPayment
    FROM
    (SELECT p.paymentId, COUNT(*)  as totalNoOfPayment FROM payment p, paymentSplit ps 
    WHERE p.paymentId = ps.mainPaymentId
    AND p.payerId = ${uuid}
    GROUP BY p.paymentId) as t1
    LEFT JOIN
    (SELECT p.paymentId, p.totalAmount, COUNT(ps.paymentStatus) as totalNoOfPaidPayment FROM payment p
    LEFT JOIN paymentSplit ps 
    ON p.paymentId = ps.mainPaymentId
    AND ps.paymentStatus = 'P'
    AND p.payerId = ${uuid}
    GROUP BY p.paymentId) as t2
    ON t1.paymentId = t2.paymentId) as t3
    ON p.paymentId = t3.paymentId
    WHERE p.paymentId = ps.mainPaymentId 
    AND sup.uuid = p.receiverId
    AND ps.paymentDate < CURDATE()
    AND ps.paymentStatus = 'IP' 
    AND p.payerId = ${uuid}
    GROUP BY p.paymentId, t3.totalNoOfPayment, ps.paymentAmount, ps.paymentDate, t3.totalNoOfPaidPayment, sup.uuid, p.dueDate, sup.companyName, sup.uenNo;`

    latePaymentBill.forEach((bill: any) => {
        bill.totalNoOfPayment = Number(bill.totalNoOfPayment);
        bill.totalNoOfPaidPayment = Number(bill.totalNoOfPaidPayment);
    })

    let currenthMthBill: any = await prisma.$queryRaw`SELECT p.paymentId, t3.totalNoOfPayment, ps.paymentAmount, ps.paymentDate, t3.totalNoOfPaidPayment, sup.uuid, p.dueDate, sup.companyName, sup.uenNo
    FROM supplier sup, payment p, paymentSplit ps
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
    ON ps.mainPaymentId = t3.paymentId
    WHERE MONTH(ps.paymentDate) = MONTH(CURDATE())
    AND ps.paymentStatus = 'IP' 
    AND p.payerId = 17
    GROUP BY p.paymentId, t3.totalNoOfPayment, ps.paymentAmount, ps.paymentDate, t3.totalNoOfPaidPayment, sup.uuid, p.dueDate, sup.companyName, sup.uenNo;`



    currenthMthBill.forEach((bill: any) => {
        bill.totalNoOfPayment = Number(bill.totalNoOfPayment);
        bill.totalNoOfPaidPayment = Number(bill.totalNoOfPaidPayment);
    })

    // currenthMthBill = currenthMthBill.filter((bill: any) => {
    //     !latePaymentBill.find((rm: any) => (rm.paymentId === bill.paymentId))
    // })

    for (var i = currenthMthBill.length - 1; i >= 0; i--) {
        for (var j = 0; j < latePaymentBill.length; j++) {
            if (currenthMthBill[i] && (currenthMthBill[i].paymentId === latePaymentBill[j].paymentId)) {
                currenthMthBill.splice(i, 1);
            }
        }
    }

    return res.status(200).json({
        totalAmt: totalAmount,
        totalAmtPaid: totalAmtPaid,
        latePaymentBill: latePaymentBill,
        currentMonthBill: currenthMthBill
    })
}