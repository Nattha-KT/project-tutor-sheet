import { NextApiResponse } from "next";
import {main} from "../route"
import prisma from "../../../../lib/prismaDb";
import { NextResponse } from "next/server";
import { error } from "console";

export const GET = async (req: Request, res: NextApiResponse)=>{
    try{
        const id = req.url.split("/blog/")[1];
        await main();
        const post = await prisma.post.findFirst({where:{id}});
        if(!post)
            return NextResponse.json({message: "Not Found"},{status:500});
        return NextResponse.json({message: "Success",post},{status:200});

    }catch(err){
        return NextResponse.json({message: "Error creating",error},{status:500})
    }finally{
        await prisma.$disconnect();
    }
}

export const PUT = async (req: Request, res: NextApiResponse)=>{

    try{
        const id = req.url.split("/blog/")[1];
        const {title,description} = await req.json();
        await main();
        const post = await prisma.post.update({
            data:{title,description},
            where :{id},
        });
        return NextResponse.json({message: "Success",post},{status:200});

    }catch(err){
        return NextResponse.json({message: "Error creating",error},{status:500})
    }finally{
        await prisma.$disconnect();
    }

};


export const DELETE = async (req: Request, res: NextApiResponse)=>{

    try{
        const id = req.url.split("/blog/")[1];
        await main();
        const post = await prisma.post.delete({where:{id}});

        return NextResponse.json({message: "Success",post},{status:200});

    }catch(err){
        return NextResponse.json({message: "Error creating",error},{status:500})
    }finally{
        await prisma.$disconnect();
    }

};

