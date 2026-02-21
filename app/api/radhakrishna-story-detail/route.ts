import { NextResponse } from 'next/server';
import { radhaKrishnaStory } from '@/data/radhaKrishnaStory';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const storyId = searchParams.get('storyId');

  if (!storyId) {
    return NextResponse.json({ error: 'Invalid story ID' }, { status: 400 });
  }

  const story = radhaKrishnaStory.find((s) => s.id === storyId);
  
  if (!story) {
    return NextResponse.json({ error: 'Story not found' }, { status: 404 });
  }

  const titleEn = typeof story.title === 'string' ? story.title : (story.title?.en || '');
  const storyEn = typeof story.story === 'string' ? story.story : (story.story?.en || '');
  const factEn = typeof story.fact === 'string' ? story.fact : (story.fact?.en || '');

  // Shlokas for Radha Krishna
  const shlokas = [
    {
      shloka: "कृष्णाय वासुदेवाय हरये परमात्मने।\nप्रणतक्लेशनाशाय गोविन्दाय नमो नमः॥",
      translation: "I offer my obeisances again and again to Lord Krishna, the son of Vasudeva, the Supreme Soul, the destroyer of our miseries, and the protector of cows."
    },
    {
      shloka: "त्वमेव माता च पिता त्वमेव।\nत्वमेव बन्धुश्च सखा त्वमेव॥\nत्वमेव विद्या द्रविणं त्वमेव।\nत्वमेव सर्वं मम देव देव॥",
      translation: "You are truly my mother, You are truly my father. You are truly my relative, You are truly my friend. You are truly my knowledge, You are truly my wealth. You are truly my all, O God of gods."
    }
  ];

  return NextResponse.json({
    title: titleEn,
    kandaName: "Krishna Leela",
    description: `${storyEn}\n\nDivine Fact: ${factEn}`,
    shlokas: shlokas,
    source: "Bhagavata Purana"
  });
}
