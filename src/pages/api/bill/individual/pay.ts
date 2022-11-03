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
    let { splitLoanId } = req.body

    const data = await prisma.paymentSplit.update({
        where: {
            splitLoanId: Number(splitLoanId)
        },
        data: {
            paymentStatus: 'P'
        }
    })

    if (!data) {
        return res.status(400).json({
            message: "Payment failed",
            success: false
        })
    }

    return res.status(200).json({
        message: "Payment inserted",
        success: true
    })
}