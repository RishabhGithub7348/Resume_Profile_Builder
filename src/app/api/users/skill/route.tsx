import { NextRequest, NextResponse } from 'next/server';
import Skill from '@/models/skillModel';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import { connect } from '@/dbConfig/dbConfig';

connect();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    console.log(userId);
    const { skillsToAdd } = await request.json();

    const newSkills = {
      userId,
      skillsToAdd, // Assuming the skills property is an array
    };
    console.log(newSkills);

    const skill = new Skill(newSkills);
    await skill.save();

    return NextResponse.json(skill);
  } catch (error: any) {
    console.error('Error inserting skill:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const skills = await Skill.find({ userId });

    return NextResponse.json(skills);
  } catch (error: any) {
    console.error('Error fetching skills:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const { skillsToAdd } = await request.json();

    const updatedSkill = await Skill.findOneAndUpdate(
      { userId: userId }, // Use an object with property name "userId"
      { skillsToAdd }, // Update the skillsToAdd property
      { new: true } // Return the updated document
    );

    return NextResponse.json(updatedSkill);
  } catch (error: any) {
    console.error('Error updating skill:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
