import { NextRequest, NextResponse } from 'next/server';
import Experience from '@/models/experienceModel';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import { connect } from '@/dbConfig/dbConfig';

connect();

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const { company, startYear, endYear, role, positionType } = await request.json();

        const newExperience = new Experience({
            userId,
            company,
            startYear,
            endYear,
            role,
            positionType,
        });

        const savedExperience = await newExperience.save();

        return NextResponse.json(savedExperience);
    } catch (error: any) {
        console.error('Error inserting experience data:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);

        const experienceData = await Experience.find({ userId });

        return NextResponse.json(experienceData);
    } catch (error: any) {
        console.error('Error fetching experience data:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const { experienceId, company, startYear, endYear, role, positionType } = await request.json();

        const updatedExperience = await Experience.findOneAndUpdate(
            {userId: userId},
            { company, startYear, endYear, role, positionType },
            { new: true }
        );

        return NextResponse.json(updatedExperience);
    } catch (error: any) {
        console.error('Error updating experience data:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
