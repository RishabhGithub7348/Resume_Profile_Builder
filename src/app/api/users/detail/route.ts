import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/usersModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest){

    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId});
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}


export async function PUT(request: NextRequest) {
    try {
      const userId = await getDataFromToken(request);
      
      const { username, email, number } = await request.json();

   
  
      // Use userId to identify and update user data
      const updatedUser = await User.findByIdAndUpdate(
        userId, // Assuming userId is the _id of the user document
        { username, email, number },
        { new: true } // To get the updated user data in the response
      );
  
      console.log(updatedUser);
  
      return NextResponse.json(updatedUser);
    } catch (error: any) {
      console.error('Error updating user data:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }

  
  
  
  
  
  