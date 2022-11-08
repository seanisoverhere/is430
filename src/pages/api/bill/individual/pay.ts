import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { DateTime } from "luxon";

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

    const nextPayment = await prisma.paymentSplit.findUnique({
        where: {
            splitLoanId: Number(data.splitLoanId + 1)
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
                paymentId: String(data.mainPaymentId)
            },
            data: {
                paymentStatus: 'P'
            }
        })

        await fetch("http://tbankonline.com/SMUtBank_API/Gateway", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'serviceName': 'addStandingInstruction',
                'userID': '',
                'PIN': '',
                'OTP': '999999',
            },
            body: JSON.stringify({
                'standingInstructionID': String(data.mainPaymentId)
            })
        })
    } else {
        await fetch("http://tbankonline.com/SMUtBank_API/Gateway", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'serviceName': 'updateStandingInstruction',
                'userID': '',
                'PIN': '',
                'OTP': '999999',
            },
            body: JSON.stringify({
                'standingInstructionID': String(data.mainPaymentId),
                'amount': String(nextPayment?.paymentAmount), //need find a way to get the next payment
                'nextDateTime': String(DateTime.fromISO(String(data.paymentDate)).plus({ month: 1 }).toJSDate()),
                'isRecurring': 'true',
                'frequency': 'Monthly',
                'narrative': 'Payment',
            })
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