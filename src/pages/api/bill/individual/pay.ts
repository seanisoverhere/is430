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

    // const header = {
    //     Header: {
    //         'serviceName': 'creditTransfer',
    //         'userID': 'DEUT0000001',
    //         'PIN': '123456',
    //         'OTP': '999999',
    //     }
    // }

    // const content = {
    //     Content: {
    //         'accountFrom': String(data.mainPayment?.payerAcctId),
    //         'accountTo': String(data.mainPayment?.invoice?.receiverAcctId),
    //         'transactionAmount': String(data.paymentAmount),
    //         'transactionReferenceNumber': String(data.splitLoanId),
    //         'narrative': 'Credit Transfer',
    //     }
    // }

    // const jsonHeader = JSON.stringify(header)
    // const jsonContent = JSON.stringify(content)

    // const creditTransfer: any = await fetch(`http://tbankonline.com/SMUtBank_API/Gateway?Header=${jsonHeader}&Content=${jsonContent}`, {
    //     method: 'POST',
    // })

    // if (creditTransfer.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID !== "010000") {
    //     return res.status(400).json({
    //         message: "Payment update failed",
    //         success: false
    //     })
    // }

    const data = await prisma.paymentSplit.update({
        where: {
            splitLoanId: 2
        },
        data: {
            paymentStatus: 'P'
        },
        include: {
            mainPayment: {
                include: {
                    invoice: true
                }
            }
        }
    })

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