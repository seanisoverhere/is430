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
    let { uuid, companyName, uenNo, repaymentPeriod, paymentAmt } = req.body

    const companyUuid = await prisma.supplier.findFirst({
        where: {
            uenNo: uenNo,
        }
    })

    const data = await prisma.payment.create({
        data: {
            paymentDate: DateTime.local().toJSDate(),
            dueDate: (DateTime.local().plus({ month: repaymentPeriod })).toJSDate(),
            totalAmount: paymentAmt,
            paymentStatus: "IP",
            payerId: uuid,
            receiverId: companyUuid?.uuid,
        }
    })

    const mthlyPayment = paymentAmt / repaymentPeriod

    for (let i = 0; i < repaymentPeriod; i++) {
        await prisma.paymentSplit.create({
            data: {
                paymentDate: (DateTime.local().plus({ month: i })).toJSDate(),
                paymentStatus: i == 0 ? 'P' : 'IP',
                paymentAmount: mthlyPayment,
                mainPaymentId: data.paymentId
            }
        })
    }

    // if (!mthlyPayment) {
    //     return res.status(404).json({
    //         message: "Sign up failed",
    //         success: false
    //     })
    // }

    return res.status(200).json({
        message: "Payment inserted",
        success: true
    })
}