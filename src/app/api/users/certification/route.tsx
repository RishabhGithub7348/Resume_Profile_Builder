import { NextRequest, NextResponse } from 'next/server';
import Certification from '@/models/certificationModel';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import { connect } from '@/dbConfig/dbConfig';

connect();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const { courseName, organization, startDate, endDate } = await request.json();

    const newCertification = new Certification({
      userId,
      courseName,
      organization,
      startDate,
      endDate,
    });

    const savedCertification = await newCertification.save();

    return NextResponse.json(savedCertification);
  } catch (error: any) {
    console.error('Error inserting certification:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const certificationData = await Certification.find({ userId });

    return NextResponse.json(certificationData);
  } catch (error: any) {
    console.error('Error fetching certification data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const {  courseName, organization, startDate, endDate } = await request.json();

    const updatedCertification = await Certification.findOneAndUpdate(
      {
        userId: userId,
      },
      {
      
        courseName,
        organization,
        
      },
      { new: true }
    );
    console.log(updatedCertification);

    return NextResponse.json(updatedCertification);
  } catch (error: any) {
    console.error('Error updating certification data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
