import { NextApiResponse } from "next";
import {main} from "../route"
import prisma from "../../../../lib/prismaDb";
import { NextResponse } from "next/server";
import { error } from "console";

export const GET = async (req: Request, res: NextApiResponse)=>{
    try{
        const id = req.url.split("/faq/")[1];
        await main();
        const faq = await prisma.faq.findFirst({where:{id}});
        if(!faq)
            return NextResponse.json({message: "Not Found"},{status:500});
        return NextResponse.json({message: "Success",faq},{status:200});

    }catch(err){
        return NextResponse.json({message: "Error creating",error},{status:500})
    }finally{
        await prisma.$disconnect();
    }
}

export const PUT = async (req: Request, res: NextApiResponse)=>{

    try{
        const id = req.url.split("/faq/")[1];
        const {title,answer} = await req.json();
        await main();
        const faq = await prisma.faq.update({
            data:{title,answer},
            where :{id},
        });
        return NextResponse.json({message: "Success",faq},{status:200});

    }catch(err){
        return NextResponse.json({message: "Error creating",error},{status:500})
    }finally{
        await prisma.$disconnect();
    }

};


export const DELETE = async (req: Request, res: NextApiResponse)=>{

    try{
        const id = req.url.split("/faq/")[1];
        await main();
        const faq = await prisma.faq.delete({where:{id}});

        return NextResponse.json({message: "Success",faq},{status:200});

    }catch(err){
        return NextResponse.json({message: "Error creating",error},{status:500})
    }finally{
        await prisma.$disconnect();
    }

};

