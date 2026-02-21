import { NextResponse } from 'next/server';
import { mahabharatStory } from '@/data/mahabharatStory';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const storyId = searchParams.get('storyId');

  if (!storyId) {
    return NextResponse.json({ error: 'Invalid story ID' }, { status: 400 });
  }

  const story = mahabharatStory.find((s) => s.id === storyId);
  
  if (!story) {
    return NextResponse.json({ error: 'Story not found' }, { status: 404 });
  }

  const titleEn = typeof story.title === 'string' ? story.title : (story.title?.en || '');
  const storyEn = typeof story.story === 'string' ? story.story : (story.story?.en || '');
  const factEn = typeof story.fact === 'string' ? story.fact : (story.fact?.en || '');

  // A majestic shloka for Mahabharat context
  const shlokas = [
    {
      shloka: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्।।",
      translation: "Whenever there is a decline in righteousness and an increase in unrighteousness, O Arjuna, at that time I manifest myself on earth."
    },
    {
      shloka: "परित्राणाय साधूनां विनाशाय च दुष्कृताम्।\nधर्मसंस्थापनार्थाय सम्भवामि युगे युगे।।",
      translation: "To protect the righteous, to annihilate the wicked, and to reestablish the principles of dharma I appear on this earth, age after age."
    }
  ];

  return NextResponse.json({
    title: titleEn,
    kandaName: "Mahabharata Epic",
    description: `${storyEn}\n\nEpic Fact: ${factEn}`,
    shlokas: shlokas,
    source: "Vyasa's Mahabharata"
  });
}
