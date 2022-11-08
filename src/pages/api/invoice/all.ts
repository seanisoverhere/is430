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
        return await getSingleInvoice(req, res);
    }

    return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
}

const getSingleInvoice = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {

    const { uuid } = req.query

    const data = await prisma.$queryRaw`SELECT * FROM invoice i, payment p 
    WHERE i.invoiceId = p.invoiceId
    AND p.paymentStatus = 'IP'
    AND i.payerId = ${uuid};`

    return res.status(200).json({
        message: "Payment updated success",
        success: true,
        invoice: data,
    })
}