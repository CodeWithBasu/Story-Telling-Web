import { NextResponse } from 'next/server';
import { narasimhaStory } from '@/data/narasimhaStory';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const storyId = searchParams.get('storyId');

  if (!storyId) {
    return NextResponse.json({ error: 'Invalid story ID' }, { status: 400 });
  }

  const story = narasimhaStory.find((s) => s.id === storyId);
  
  if (!story) {
    return NextResponse.json({ error: 'Story not found' }, { status: 404 });
  }

  const titleEn = typeof story.title === 'string' ? story.title : (story.title?.en || '');
  const storyEn = typeof story.story === 'string' ? story.story : (story.story?.en || '');
  const factEn = typeof story.fact === 'string' ? story.fact : (story.fact?.en || '');

  // Shlokas for Narasimha
  const shlokas = [
    {
      shloka: "उग्रं वीरं महाविष्णुं ज्वलन्तं सर्वतोमुखम्।\nनृसिंहं भीषणं भद्रं मृत्युमृत्युं नमाम्यहम्।।",
      translation: "I bow down to Lord Narasimha who is highly ferocious and brave, who is the Great Vishnu, who burns and who has faces on all sides, who is terrifying but auspicious, and who is the death of death itself."
    }
  ];

  return NextResponse.json({
    title: titleEn,
    kandaName: "Narasimha Purana",
    description: `${storyEn}\n\nDivine Fact: ${factEn}`,
    shlokas: shlokas,
    source: "Bhagavata Purana"
  });
}
