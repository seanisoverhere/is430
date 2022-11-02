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
        return await retrieveBills(req, res);
    }

    return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
}

const retrieveBills = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    let { billId } = req.query

    const splitBills = prisma.$queryRaw`SELECT * 
    FROM paymentSplit ps
    WHERE ps.mainPaymentId = 4; ${billId};`


    return res.status(200).json({
        individualBills: splitBills,
    })
}