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
    if (req.method === "POST") {
        return await pay(req, res);
    }

    return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
}

const pay = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {

    const data = await prisma.paymentSplit.update({
        where: {
            splitLoanId: Number(req.body)
        },
        data: {
            paymentStatus: 'P'
        }
    })

    //update main payment to be 'P' if all P
    const remainAmt: any = await prisma.$queryRaw`SELECT (totalAmount - SUM(paymentAmount)) as remainingAmount 
    FROM payment p, paymentSplit ps
    WHERE p.paymentId = ps.mainPaymentId
    AND p.paymentId = ${data.mainPaymentId}
    GROUP BY p.paymentId;`

    if (remainAmt.remainingAmount === 0) {
        await prisma.payment.update({
            where: {
                paymentId: Number(data.mainPaymentId)
            },
            data: {
                paymentStatus: 'P'
            }
        })
    }

    if (!data) {
        return res.status(400).json({
            message: "Payment update failed",
            success: false
        })
    }

    return res.status(200).json({
        message: "Payment updated success",
        success: true
    })
}