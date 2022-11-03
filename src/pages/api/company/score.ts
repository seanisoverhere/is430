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
        return await getAggScore(req, res);
    }

    return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
}

const getAggScore = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    let { uuid } = req.body

    const data = await prisma.business.findUnique({
        where: {
            uuid: Number(uuid)
        }
    })

    if (!data) {
        return res.status(404).json({
            message: "No business found",
            success: false
        })
    }

    return res.status(200).json({
        message: "Business found",
        success: true,
        company: data
    })
}