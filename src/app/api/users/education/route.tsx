import { NextRequest, NextResponse } from 'next/server';
import Education from '@/models/educationModel';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import { connect } from '@/dbConfig/dbConfig';

connect();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const { university, course, startYear,    endYear, collegeInfo } = await request.json();

    const newEducation = new Education({
      userId,
      university,
      course,
      startYear,
      endYear,
      collegeInfo,
    });

    const savedEducation = await newEducation.save();

    return NextResponse.json(savedEducation);
  } catch (error: any) {
    console.error('Error inserting education data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const educationData = await Education.find({ userId });

    return NextResponse.json(educationData);
  } catch (error: any) {
    console.error('Error fetching education data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const { university, course, startYear, endYear, collegeInfo } = await request.json();

    const updatedEducation = await Education.findOneAndUpdate(
      { userId },
      {
        university,
        course,
        startYear,
        endYear,
        collegeInfo,
      },
      { new: true, upsert: true }
    );

    return NextResponse.json(updatedEducation);
  } catch (error: any) {
    console.error('Error updating education data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
