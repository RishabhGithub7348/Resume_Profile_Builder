import { NextRequest, NextResponse } from 'next/server';
import Profile from '@/models/profileModel'; // Assuming you have the profileModel imported
import { getDataFromToken } from '@/helpers/getDataFromToken';
import { connect } from '@/dbConfig/dbConfig';

connect();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const { profilePic } = await request.json();

    const newProfile = new Profile({
      userId,
      profilePic,
    });

    const savedProfile = await newProfile.save();

    return NextResponse.json(savedProfile);
  } catch (error: any) {
    console.error('Error inserting profile data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const profileData = await Profile.findOne({ userId });

    return NextResponse.json(profileData);
  } catch (error: any) {
    console.error('Error fetching profile data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
