/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Romance & Travel Configuration
 * Personalize your surprise website here. You can change names, locations,
 * personal letters, mood messages, and WhatsApp settings.
 */

export interface RomanceConfig {
  couple: {
    girlfriendName: string;
    boyfriendName: string;
    relationshipTagline: string;
  };
  intro: {
    badge: string;
    leadText: string;
    actionPrompt: string;
    lipstickRevealText: string;
    skipButtonText: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    curatedBy: string;
    openBagCta: string;
    journeyCta: string;
  };
  journey: {
    title: string;
    subtitle: string;
    description: string;
    stops: Array<{
      id: string;
      city: string;
      country: string;
      code: string;
      tag: string;
      note: string;
      loveTip: string;
      coordinates: string;
      iconType: 'india' | 'doha' | 'georgia';
      color: string;
    }>;
  };
  vanity: {
    title: string;
    subtitle: string;
    description: string;
    mirror: {
      title: string;
      subtitle: string;
      mainMessage: string;
      whisperNote: string;
    };
    eyeshadow: {
      title: string;
      subtitle: string;
      paletteName: string;
      shades: Array<{
        id: string;
        name: string;
        tone: string;
        finish: string;
        color: string;
        sparkleColor?: string;
        note: string;
      }>;
    };
    perfume: {
      title: string;
      subtitle: string;
      bottleName: string;
      notes: string;
      memories: Array<{
        title: string;
        caption: string;
        dateOrPlace: string;
        tag: string;
      }>;
    };
    lipstick: {
      title: string;
      subtitle: string;
      shadeName: string;
      message: string;
      subMessage: string;
    };
  };
  letters: {
    title: string;
    subtitle: string;
    description: string;
    items: Array<{
      id: string;
      seal: string;
      title: string;
      stamp: string;
      subtitle: string;
      paragraphs: string[];
      signoff: string;
    }>;
  };
  finalSurprise: {
    buttonLabel: string;
    boxTitle: string;
    mainQuote: string;
    heartfeltNote: string;
    sendoff: string;
    signature: string;
    whatsapp: {
      enabled: boolean;
      phoneNumber: string; // e.g. "919876543210" without + or dashes
      buttonLabel: string;
      prefilledMessage: string;
    };
  };
}

export const romanceConfig: RomanceConfig = {
  couple: {
    girlfriendName: "My Dearest Love",
    boyfriendName: "Arpan",
    relationshipTagline: "India → Doha → Georgia",
  },
  intro: {
    badge: "A Surprise For You",
    leadText: "I know you're probably double-checking your passport for the tenth time right now.",
    actionPrompt: "Tap to twist open your surprise",
    lipstickRevealText: "Carry My Love With You",
    skipButtonText: "Skip intro",
  },
  hero: {
    headline: "Three stops. One girl. All my love.",
    subheadline: "From India to Doha to Georgia—keep your jacket handy, drink your water, and remember my heart is sitting right next to you.",
    curatedBy: "Made with all my heart, by",
    openBagCta: "Open your beauty bag",
    journeyCta: "View your journey route",
  },
  journey: {
    title: "Her Journey, Drawn in Lipstick",
    subtitle: "Flight Route & Real Whispers Along the Way",
    description: "Follow the flight path from Delhi to your layover in Doha, all the way to the mountains in Georgia. Tap each stop for your personal travel tips.",
    stops: [
      {
        id: "stop-india",
        city: "India (Departure)",
        country: "Home",
        code: "DEL",
        tag: "Takeoff",
        note: "Where it all starts—and where someone is already missing your goofy laugh.",
        loveTip: "Don't stress if the security queue is crazy. Put your earphones in, play our playlist, and grab a water bottle before boarding. Keep your hoodie out—you know you always freeze when the cabin AC turns on.",
        coordinates: "28.6139° N, 77.2090° E",
        iconType: "india",
        color: "#C68B82",
      },
      {
        id: "stop-doha",
        city: "Doha (Layover)",
        country: "Hamad International",
        code: "DOH",
        tag: "Transit Break",
        note: "Halfway there! Stretch your legs and take a breather.",
        loveTip: "First thing: locate your departure gate on the big board so you don't have to stress later. Then go grab a warm coffee and a croissant, say hi to that giant yellow lamp bear, and connect to the airport Wi-Fi to text me.",
        coordinates: "25.2769° N, 51.5200° E",
        iconType: "doha",
        color: "#D4AF37",
      },
      {
        id: "stop-georgia",
        city: "Georgia (Destination)",
        country: "Tbilisi 🇬🇪",
        code: "TBS",
        tag: "Touchdown",
        note: "You made it across the world! Snow-peaked mountains, cobblestone alleys, and a whole new adventure.",
        loveTip: "Welcome to Georgia! Bundle up immediately—the mountain breeze is crisp. Go eat fresh Adjaruli khachapuri (the cheese bread with the egg in the middle) and don't spill the soup when you try khinkali dumplings. Send me a selfie as soon as you get your bags!",
        coordinates: "41.7151° N, 44.8271° E",
        iconType: "georgia",
        color: "#5A1A24",
      },
    ],
  },
  vanity: {
    title: "A Vanity Full of Love",
    subtitle: "Your Travel Beauty Bag",
    description: "Little reminders tucked into your makeup bag for when you need a hug, a laugh, or a reminder of how much I love you.",
    mirror: {
      title: "Compact Mirror",
      subtitle: "A quick look",
      mainMessage: "Look at you. You're brave, you're funny, and you're the prettiest girl on that entire flight.",
      whisperNote: "Whenever you feel tired, overwhelmed, or nervous on this trip, open this up and remember how proud I am of you and how much I adore you.",
    },
    eyeshadow: {
      title: "Eyeshadow Palette",
      subtitle: "Pick your mood",
      paletteName: "Travel Romance Edition · N° 06",
      shades: [
        {
          id: "shade-missing-you",
          name: "Missing You",
          tone: "Velvet Burgundy",
          finish: "Shimmer",
          color: "#6B1D2F",
          sparkleColor: "#D4AF37",
          note: "Look down at your hands right now and imagine mine holding them. Distance is just a temporary number—every passing hour brings you closer to being back in my arms.",
        },
        {
          id: "shade-proud-of-you",
          name: "You Got This",
          tone: "Luminous Champagne",
          finish: "Lustre",
          color: "#E5C384",
          sparkleColor: "#FFF8E7",
          note: "You packed your own bags, navigated airport security, and boarded an international flight all on your own. You're so much cooler and braver than you give yourself credit for.",
        },
        {
          id: "shade-feeling-nervous",
          name: "Deep Breath",
          tone: "Dusty Blossom",
          finish: "Soft Matte",
          color: "#D8A49B",
          sparkleColor: "#F5E6E3",
          note: "If the airport feels chaotic or your chest feels tight: stop walking. Step aside, take two slow sips of water, and drop your shoulders. You don't have to rush anything. You're totally fine.",
        },
        {
          id: "shade-need-a-smile",
          name: "Need a Laugh",
          tone: "Golden Peach",
          finish: "Satin",
          color: "#E29578",
          sparkleColor: "#FFDDD2",
          note: "Remember when we laughed so hard at that stupid video that you snorted and almost choked on your drink? Yeah, bring that smile back right now. Don't be all serious on this plane!",
        },
        {
          id: "shade-sending-a-hug",
          name: "Big Warm Hug",
          tone: "Warm Cashmere",
          finish: "Velvet",
          color: "#9E6D71",
          sparkleColor: "#CBA1A5",
          note: "Sending you the kind of hug where you bury your face in my hoodie and we just stand there for five whole minutes. Pull your jacket tight around you—that's me holding you.",
        },
        {
          id: "shade-adventure",
          name: "Georgia Food",
          tone: "Grecian Bronze",
          finish: "Metallic Foil",
          color: "#9C7A4A",
          sparkleColor: "#E8D5B5",
          note: "Promise me you won't survive on airplane biscuits! Go find a real warm meal in Tbilisi, try all the pastries, take lots of photos, and send me every single thing you eat.",
        },
      ],
    },
    perfume: {
      title: "Perfume Bottle",
      subtitle: "A memory of us",
      bottleName: "Parfum d’Amour N° 23",
      notes: "Scent notes of stolen hoodies, midnight snacks, and laughing until our ribs hurt.",
      memories: [
        {
          title: "Walking in the Rain Together",
          caption: "That night it poured and we shared that tiny umbrella that barely covered either of us. We ended up totally drenched, laughing like idiots. I'd stand in that rain with you any day.",
          dateOrPlace: "One of my favorite nights ever",
          tag: "Scent: Rain on Pavement & Warm Tea",
        },
        {
          title: "When You Fall Asleep On Me",
          caption: "Within five minutes of starting a movie, your head drops onto my shoulder. And when I tease you, you always say: 'I wasn't sleeping, I was just resting my eyes!' I miss that so much.",
          dateOrPlace: "Every single weekend movie night",
          tag: "Scent: Cozy Blankets & Fresh Vanilla",
        },
        {
          title: "Our Airport Hug Before Security",
          caption: "Holding you tight before you walked through the gates. I really didn't want to let go. But I'm so excited for you to see the world. Every hour that passes is one hour closer to holding you again.",
          dateOrPlace: "Terminal Departure Gate",
          tag: "Scent: Warm Jacket & Big Hugs",
        },
      ],
    },
    lipstick: {
      title: "Lipstick",
      subtitle: "A kiss for the journey",
      shadeName: "Eternal Velvet · N° 01",
      message: "Keep this one for when you miss me.",
      subMessage: "A soft kiss travelling with you at 35,000 feet, across time zones and oceans, until I can give you a real one.",
    },
  },
  letters: {
    title: "“Open When…” Letters",
    subtitle: "Folded Notes For Your Bag",
    description: "Whenever you feel a little lonely or need to hear my voice, open these. No countdowns or locks—read them whenever you need them.",
    items: [
      {
        id: "letter-miss-me",
        seal: "💋",
        title: "Open when you miss me",
        stamp: "For quiet skies & lonely moments",
        subtitle: "When the silence feels a bit too quiet",
        paragraphs: [
          "Hey my love,",
          "If you're opening this, maybe you're sitting in your plane seat staring out the window, or lying in a hotel room feeling how quiet everything is. I want to tell you: the house feels insanely quiet without you too. I keep turning around expecting to hear your voice or see you stealing my food.",
          "Close your eyes for five seconds. Remember how warm it feels when we're just lounging together doing nothing, laughing at each other. That doesn't fade just because you're in another country. You're carrying my whole heart in your bag.",
          "Take a deep breath. Eat something sweet, watch a movie, and remember: I'm counting down the days until you're back in front of me."
        ],
        signoff: "Missing you like crazy,",
      },
      {
        id: "letter-nervous",
        seal: "💋",
        title: "Open when you feel nervous",
        stamp: "For airport layovers & unfamiliar streets",
        subtitle: "When things feel confusing or overwhelming",
        paragraphs: [
          "Hey, stop for a second.",
          "Drop your shoulders. Unclench your jaw. Take a slow, deep breath in... and let it out. It is 100% normal to feel a bit anxious right now. Big airports, layovers, announcements in languages you don't speak, passport queues—it can feel like a lot.",
          "But look at what you're doing. You packed your bags, got to the airport, and you're making your way across the world. You don't have to figure out the whole trip in one minute. Just look for your next gate. If you're unsure, ask an airport staff member—they help thousands of people every day.",
          "You're not alone. I'm on the other end of the phone, and I've got your back no matter what. You are doing so, so well."
        ],
        signoff: "Always right behind you,",
      },
      {
        id: "letter-landed",
        seal: "💋",
        title: "Open when you land in Georgia",
        stamp: "Touchdown in Tbilisi 🇬🇪",
        subtitle: "You made it across the world!",
        paragraphs: [
          "YOU DID IT!! ✈️🇬🇪✨",
          "You flew all the way from India, transited through Doha, and now you're officially standing in Georgia! Take a deep breath of that mountain air and give yourself some credit, because you just completed an international solo flight like an absolute pro.",
          "Now put your warm coat on, go get your luggage, and take in the view. I want you to enjoy every single second here. Walk through Old Tbilisi, ride the cable car up to the fortress, eat as much warm khachapuri as you can physically fit in your stomach, and take a million photos.",
          "Don't worry about anything back home. Go have the best adventure of your life—and don't forget to text me that you're safe at your hotel!"
        ],
        signoff: "Your biggest fan,",
      },
    ],
  },
  finalSurprise: {
    buttonLabel: "One last thing…",
    boxTitle: "A Keepsake For The Road",
    mainQuote: "No matter how far you travel, you’ll always have someone here who is happy to hear every little detail of your day.",
    heartfeltNote: "Tell me about the coffee that was too sweet, the customs officer who smiled, the stray dog you saw outside your hotel, or the sunset over the Caucasus. Nothing you tell me is ever too small.",
    sendoff: "Go make the most incredible memories, my love.",
    signature: "With all my love, Arpan",
    whatsapp: {
      enabled: true,
      phoneNumber: "919412584726", // Configured with Arpan's number
      buttonLabel: "I landed 💌",
      prefilledMessage: "Hey my love! ❤️ I just landed safely! Thinking of you so much. Carry my love with you always! ✈️🇬🇪",
    },
  },
};
