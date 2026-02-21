import { NextResponse } from 'next/server';

const RAMAYANA_API_BASE = 'https://ramayana.hindbiswas.com/api/v1';

// Mapping local story IDs to API Kanda and Sarga IDs
const storyMapping: Record<string, { kandaId: number; sargaId: number; kandaName: string }> = {
  "rama-birth": { kandaId: 1, sargaId: 18, kandaName: "Bala Kanda" }, 
  "childhood": { kandaId: 1, sargaId: 26, kandaName: "Bala Kanda" },  
  "swayamvar": { kandaId: 1, sargaId: 67, kandaName: "Bala Kanda" },   
  "exile": { kandaId: 2, sargaId: 18, kandaName: "Ayodhya Kanda" },      
  "golden-deer": { kandaId: 3, sargaId: 44, kandaName: "Aranya Kanda" }, 
  "sita-kidnapped": { kandaId: 3, sargaId: 46, kandaName: "Aranya Kanda" }, 
  "hanuman-meets-rama": { kandaId: 4, sargaId: 3, kandaName: "Kishkindha Kanda" }, 
  "hanuman-lanka": { kandaId: 5, sargaId: 1, kandaName: "Sundara Kanda" }, 
  "lanka-burns": { kandaId: 5, sargaId: 54, kandaName: "Sundara Kanda" }, 
  "ram-setu": { kandaId: 6, sargaId: 22, kandaName: "Yuddha Kanda" },    
  "battle-begins": { kandaId: 6, sargaId: 42, kandaName: "Yuddha Kanda" }, 
  "lakshmana-wounded": { kandaId: 6, sargaId: 101, kandaName: "Yuddha Kanda" }, 
  "final-battle": { kandaId: 6, sargaId: 108, kandaName: "Yuddha Kanda" }, 
  "return-ayodhya": { kandaId: 6, sargaId: 128, kandaName: "Yuddha Kanda" }, 
  "rama-rajya": { kandaId: 7, sargaId: 110, kandaName: "Uttara Kanda" }, 
  "lessons": { kandaId: 1, sargaId: 1, kandaName: "Bala Kanda" },    
};

const fallbackData: Record<string, { description: string; shlokas: { shloka: string; translation: string }[] }> = {
  "rama-birth": {
    description: "The descent of Lord Vishnu as Rama to rid the earth of evil and establish Dharma. Born to King Dasharatha and Queen Kaushalya in the Ikshvaku dynasty.",
    shlokas: [{ shloka: "ततो यज्ञे समाप्ते तु ऋतूनां षट् समत्ययुः।\nततश्च द्वादशे मासे चैत्रे नावमिके तिथौ।।", translation: "When six seasons had passed after the completion of the fire sacrifice, in the twelfth month of Chaitra, on the ninth day of the lunar fortnight, Rama was born." }]
  },
  "childhood": {
    description: "Rama and his brothers receive their education from sage Vashistha. Rama demonstrates unparalleled archery skills and protects Vishwamitra's yajna.",
    shlokas: [{ shloka: "विश्वामित्रो महातेजाः रामं राजीवलोचनम्।\nउवाच मधुरं वाक्यं रहस्यं श्रुतिसम्मतम्।।", translation: "The highly resplendent Vishwamitra spoke these sweet words to the lotus-eyed Rama, revealing eternal, scriptural secrets." }]
  },
  "swayamvar": {
    description: "Rama effortlessly lifts and breaks the massive Shiva Dhanush that thousands of mere mortal kings could not even move.",
    shlokas: [{ shloka: "सलीलं धनुरारोप्य सज्यं कृत्वा नरर्षभः।\nपूरयामास तच्छ्रेष्ठं मध्यतश्च बभञ्ज ह।।", translation: "The best of men (Rama) playfully strung the bow, drew it to its fullest extent, and broke it in the middle." }]
  },
  "exile": {
    description: "Fulfilling his father's vows to Queen Kaikeyi, Rama calmly accepts fourteen years of forest exile.",
    shlokas: [{ shloka: "नाहमर्थपरो राजन् वस्तुमिच्छामि गोचरे।\nविद्धि मामृषिभिस्तुल्यं विमलं धर्ममास्थितम्।।", translation: "O King! I do not wish to live merely for wealth. Know me to be intent upon pure Dharma, like a sage." }]
  },
  "golden-deer": {
    description: "The demon Maricha transforms into a captivating golden deer to lure Rama away from Sita.",
    shlokas: [{ shloka: "हा सीते लक्ष्मण इत्येवमाक्रुश्य महास्वनम्।\nपपात भूमौ रुधिरोक्षितो राक्षसपुंगवः।।", translation: "Crying out 'Alas Sita! Alas Lakshmana!' in a loud voice, the best of demons fell on the ground covered in blood." }]
  },
  "sita-kidnapped": {
    description: "Ravana, the ten-headed demon king, forcibly abducts Sita in his flying chariot.",
    shlokas: [{ shloka: "सा ददर्श तदा रामं तथा लक्ष्मणमन्तिकात्।\nहा राम हा लक्ष्मणेति रुरोद जनकात्मजा।।", translation: "Janaka's daughter wept aloud crying 'O Rama! O Lakshmana!' trying to see them in the vicinity." }]
  },
  "hanuman-meets-rama": {
    description: "Rama and Lakshmana meet Hanuman, who presents himself as a humble Brahmin and recognizes Rama's divinity.",
    shlokas: [{ shloka: "वानरोऽहं महाभाग दूतो रामस्य धीमतः।\nसुग्रीवस्य सकाशे वै गच्छामि त्वामनुव्रतः।।", translation: "O highly fortunate one! I am a monkey, a messenger of the wise Rama. I am devoted to you and shall take you to Sugriva." }]
  },
  "hanuman-lanka": {
    description: "Hanuman leaps across the ocean to Lanka and searches the city for Sita.",
    shlokas: [{ shloka: "स सागरमनाधृष्यमभिक्रम्य महाबलः।\nप्लवमानो महीं त्यक्त्वा व्योममाश्रित्य मारुतिः।।", translation: "Endowed with immense strength, Hanuman, the son of the wind, leapt leaving the earth and soared into the sky across the invincible ocean." }]
  },
  "lanka-burns": {
    description: "Hanuman causes massive destruction in Lanka, setting the golden city ablaze with his burning tail.",
    shlokas: [{ shloka: "दीप्यमाने तदा पुच्छे न मे दहति पावकः।\nअशोकवनिकायां तु सीतायाः कुशलं तथा।।", translation: "Though my tail is burning, the fire does not burn me. It is due to the safety and well-being of Sita in Ashoka Vatika." }]
  },
  "ram-setu": {
    description: "With the help of the monkey army, a magnificent bridge is built across the ocean.",
    shlokas: [{ shloka: "ते नलस्य च वीर्येण वानराणां च लीलया।\nबबन्धुः सागरं घोरं नलं सेतुं महाबलम्।।", translation: "By the prowess of Nala and the sportive actions of the monkeys, they bound the dreadful ocean with a mighty bridge." }]
  },
  "battle-begins": {
    description: "The great war between Rama's army and Ravana's formidable demonic forces begins.",
    shlokas: [{ shloka: "ततो युद्धं समभवद् घोरं तुमुललोमहर्षणम्।\nरामरावणसेनानां परस्परजिगीषया।।", translation: "Then a terrifying and hair-raising battle commenced between the armies of Rama and Ravana, each wishing to conquer the other." }]
  },
  "lakshmana-wounded": {
    description: "Indrajit's mysterious weapon fells Lakshmana. Hanuman brings the Sanjeevani mountain to save him.",
    shlokas: [{ shloka: "ततः स लक्ष्मणं दृष्ट्वा सशल्यं रुधिरोक्षितम्।\nरामः शोकपरीतात्मा विलेप करुणं बहु।।", translation: "Seeing Lakshmana pierced by the weapon and covered in blood, Rama, overwhelmed with grief, lamented continuously." }]
  },
  "final-battle": {
    description: "The climactic battle between Rama and Ravana ends with the triumph of good over evil.",
    shlokas: [{ shloka: "स वायुसमवेगेन रामवाणेन ताडितः।\nपपात भुवि निष्प्राणो रावणो लोकरावणः।।", translation: "Struck by Rama's arrow having the velocity of the wind, Ravana, who made the worlds cry, fell lifeless on the earth." }]
  },
  "return-ayodhya": {
    description: "Rama returns victorious to Ayodhya and the city celebrates with thousands of lamps.",
    shlokas: [{ shloka: "पूर्णे चतुर्दशे वर्षे पञ्चम्यां लक्ष्मणाग्रजः।\nभरद्वाजाश्रमं प्राप्य ववन्दे मुनिपुंगवम्।।", translation: "On the completion of fourteen years, on the fifth day, Rama reached Bharadwaja's hermitage and bowed." }]
  },
  "rama-rajya": {
    description: "Rama begins his righteous rule, bringing an era of perfect peace and prosperity.",
    shlokas: [{ shloka: "न पर्यदेवन् विधवा न च व्यालकृतं भयम्।\nन व्याधिजं भयं चासीद् रामे राज्यं प्रशासति।।", translation: "During Rama's rule, there were no grieving widows, no fear of wild animals, and no fear born of diseases." }]
  },
  "lessons": {
    description: "The epic tale teaches dharma, duty, devotion, and the victory of righteousness.",
    shlokas: [{ shloka: "धर्मो रक्षति रक्षितः।", translation: "Dharma protects those who protect it." }]
  }
};
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const storyId = searchParams.get('storyId');
  const apiKey = process.env.RAMAYANA_API_KEY;

  if (!storyId || !storyMapping[storyId]) {
    return NextResponse.json({ error: 'Invalid story ID' }, { status: 400 });
  }

  if (!apiKey) {
    console.warn('API key not configured, will use fallback data directly.');
  }

  const { kandaId, sargaId, kandaName } = storyMapping[storyId];

  try {
    // Potential API URL structures and Auth methods
    const strategies = [
      // Strategy 1: Search for kanda with sargas included (using Bearer token)
      {
        url: `${RAMAYANA_API_BASE}/kanda/${kandaId}?with_sarga=true`,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      },
      // Strategy 2: Direct sarga access (using Bearer token)
      {
        url: `${RAMAYANA_API_BASE}/sarga/${sargaId}`,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      },
      // Strategy 3: Kanda + Sarga nested (using Bearer token)
      {
        url: `${RAMAYANA_API_BASE}/kanda/${kandaId}/sarga/${sargaId}`,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      },
      // Strategy 4: Using api_key as query param (fallback)
      {
        url: `${RAMAYANA_API_BASE}/sarga/${sargaId}?api_key=${apiKey}`,
        headers: { 'Accept': 'application/json' }
      },
      // Strategy 5: Try /kandas to check auth
      {
        url: `${RAMAYANA_API_BASE}/kandas`,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    ];
    
    let res: Response | null = null;
    let usedUrl = '';
    const errorLogs: any[] = [];

    for (const strategy of strategies) {
      try {
        console.log('Trying API Strategy:', strategy.url);
        const attempt = await fetch(strategy.url, { 
          headers: strategy.headers as Record<string, string> 
        });
        if (attempt.ok) {
          res = attempt;
          usedUrl = strategy.url;
          break;
        } else {
          const status = attempt.status;
          const body = await attempt.text();
          console.warn(`Strategy failed (${status}):`, strategy.url, body.substring(0, 100));
          errorLogs.push({ url: strategy.url, status, body: body.substring(0, 200) });
        }
      } catch (e: any) {
        console.error('Fetch error for', strategy.url, e.message);
        errorLogs.push({ url: strategy.url, error: e.message });
      }
    }

    if (!res || !res.ok) {
      console.warn('API fetch strategies failed. Using fallback data for', storyId);
      const fallback = fallbackData[storyId];
      if (fallback) {
        return NextResponse.json({
          title: `Sarga ${sargaId}`,
          kandaName: kandaName,
          description: fallback.description,
          shlokas: fallback.shlokas,
          source: 'Traditional Scriptures (Local Fallback)'
        });
      }

      return NextResponse.json({ 
        error: 'All fetch strategies failed and no fallback available.', 
        status: res?.status || 500,
        mapping: { kandaId, sargaId }
      }, { status: res?.status || 500 });
    }

    let data = await res.json();
    
    // If the response is an array (like from /kandas or /sargas)
    if (Array.isArray(data)) {
      if (usedUrl.includes('/kandas')) {
        const foundKanda = data.find((k: any) => k.id === kandaId || k.serial_no === kandaId);
        if (foundKanda) {
          // If we found the kanda, try to get its sargas if available
          data = foundKanda;
        }
      } else if (usedUrl.includes('/sargas')) {
        const foundSarga = data.find((s: any) => s.id === sargaId || s.sarga_number === sargaId || s.serial_no === sargaId);
        if (foundSarga) data = foundSarga;
      }
    }

    // If the response is a Kanda object and we need to find a specific sarga
    if (data.sargas && Array.isArray(data.sargas)) {
      const foundSarga = data.sargas.find((s: any) => s.id === sargaId || s.sarga_number === sargaId || s.serial_no === sargaId);
      if (foundSarga) data = foundSarga;
    }

    // Process and return relevant detailed data
    return NextResponse.json({
      title: data.name || data.sarga_name || data.title || `Sarga ${sargaId}`,
      kandaName: kandaName,
      description: data.description || data.summary || data.content || '',
      shlokas: data.shlokas || data.verses || [],
      source: 'Valmiki Ramayana API'
    });

  } catch (error: any) {
    console.error('Ramayana API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch detailed content' }, { status: 500 });
  }
}
