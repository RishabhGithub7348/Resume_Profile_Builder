import {connect} from "@/dbConfig/dbConfig";
import About from "@/models/aboutModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";


connect()

export async function POST(request: NextRequest) {
    try {
      
      const userId = await getDataFromToken(request);
      console.log(userId)
  
      const { about } = await request.json();

      if (!about || about.trim() === '') {
        return NextResponse.json({ error: 'Please provide information about yourself' }, { status: 400 });
      }
      console.log(about);
  
      // Create user-specific About content
      const newAbout = new About({
        userId,
        about,
      });
      console.log(newAbout)
  
      const savedAbout = await newAbout.save();
  
      return NextResponse.json(savedAbout);
    } catch (error: any) {
      console.error('Error inserting About:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }


  export async function  GET(request: NextRequest) {
    try {
      // Get the user ID from the token
      const userId = await getDataFromToken(request);
  
      // Fetch user-specific About content
      const about = await About.findOne({ userId });
  
      // If About content doesn't exist, return an empty response
      if (!about) {
        return NextResponse.json({});
      }
  
      return NextResponse.json(about);
    } catch (error: any) {
      console.error('Error fetching About:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }

  export async function PUT(request: NextRequest) {
    try {
      // Get the user ID from the token
      const userId = await getDataFromToken(request);
  
      const { about } = await request.json();
  
      // Update or insert user-specific About content
      const updatedAbout = await About.findOneAndUpdate(
        { userId },
        { about },
        { new: true, upsert: true }
      );
  
      return NextResponse.json(updatedAbout);
    } catch (error: any) {
      console.error('Error updating About:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }
