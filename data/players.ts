export type SkillLevel = {
  name: string;
  percentage: number;
};

export type Lesson = {
  date: string;
  time: string;
  focus: string;
};

export type Milestone = {
  description: string;
  date: string;
};

export type Drill = {
  name: string;
};

export type SkillModule = {
  skill: string;
  percentage: number;
  drills: Drill[];
  coachNote: string;
};

export type PlayerNote = {
  text: string;
  timestamp: string;
};

export type ActivityItem = {
  action: string;
  timestamp: string;
};

export type TierLevel = "Tier V" | "Tier IV" | "Tier III" | "Tier II" | "Tier I";

const TIER_ORDER: TierLevel[] = ["Tier V", "Tier IV", "Tier III", "Tier II", "Tier I"];

export function getTier(pct: number): TierLevel {
  return TIER_ORDER[Math.min(Math.floor(pct / 20), 4)];
}

export function getNextTier(tier: TierLevel): TierLevel | null {
  const idx = TIER_ORDER.indexOf(tier);
  return idx < TIER_ORDER.length - 1 ? TIER_ORDER[idx + 1] : null;
}

export function getTierProgress(pct: number): number {
  if (pct >= 100) return 100;
  const tierIdx = Math.floor(pct / 20);
  if (tierIdx >= 4) return 100;
  return Math.round(((pct % 20) / 20) * 100);
}

export type Player = {
  id: string;
  name: string;
  memberSince: string;
  tagline: string;
  overallProgress: number;
  skills: SkillLevel[];
  currentFocus: {
    title: string;
    coachNote: string;
  };
  upcomingLessons: Lesson[];
  upcomingGoals: string[];
  milestones: Milestone[];
  skillModules: SkillModule[];
  playerNotes: PlayerNote[];
  activityLog: ActivityItem[];
};

export const players: Player[] = [
  {
    id: "alex-chen",
    name: "Alex Chen",
    memberSince: "September 2023",
    tagline:
      "Alex has great court awareness and is developing a powerful serve. Ready to break into the advanced tier.",
    overallProgress: 68,
    skills: [
      { name: "Forehand", percentage: 75 },
      { name: "Backhand", percentage: 60 },
      { name: "Serve", percentage: 55 },
      { name: "Footwork", percentage: 70 },
      { name: "Volleys", percentage: 50 },
      { name: "Strategy", percentage: 65 },
    ],
    currentFocus: {
      title: "Serve Consistency & Toss Placement",
      coachNote:
        "Alex is working on a more consistent ball toss to unlock a reliable first serve. We're targeting 70%+ first serve percentage by end of month.",
    },
    upcomingLessons: [
      { date: "May 3, 2026", time: "10:00 AM", focus: "Serve mechanics & toss drill" },
      { date: "May 7, 2026", time: "4:00 PM", focus: "Backhand cross-court patterns" },
      { date: "May 10, 2026", time: "10:00 AM", focus: "Match play & strategy review" },
    ],
    upcomingGoals: [
      "Reach 70%+ first serve percentage in practice",
      "Complete 10-shot backhand cross-court rally consistently",
      "Initiate a net approach after every deep forehand opportunity",
    ],
    milestones: [
      { description: "Achieved consistent topspin forehand in rally", date: "April 18, 2026" },
      { description: "Completed 10-shot backhand cross-court drill", date: "April 5, 2026" },
      { description: "First successful net approach & put-away", date: "March 22, 2026" },
      { description: "Mastered continental grip for serve", date: "March 1, 2026" },
    ],
    skillModules: [
      {
        skill: "Forehand",
        percentage: 75,
        drills: [
          { name: "Cross-court forehand rally drill" },
          { name: "Inside-out forehand from center mark" },
          { name: "Forehand approach shot + finish" },
        ],
        coachNote:
          "Your topspin forehand is looking great. Focus on your follow-through staying high over the shoulder.",
      },
      {
        skill: "Backhand",
        percentage: 60,
        drills: [
          { name: "Two-handed backhand down-the-line drill" },
          { name: "Slice backhand approach practice" },
          { name: "Backhand return of serve drill" },
        ],
        coachNote:
          "The two-hander is improving. We need more shoulder rotation on the takeback — think 'turn your back to the net.'",
      },
      {
        skill: "Serve",
        percentage: 55,
        drills: [
          { name: "Ball toss isolation drill (no racket)" },
          { name: "Flat serve target practice — deuce box" },
          { name: "Second serve kick serve intro" },
        ],
        coachNote:
          "Consistency is the priority before power. Hit 20 toss-only reps before each practice session.",
      },
      {
        skill: "Footwork",
        percentage: 70,
        drills: [
          { name: "Split-step timing ladder drill" },
          { name: "Side-to-side shuffle to cone markers" },
          { name: "Recovery step after forehand drill" },
        ],
        coachNote:
          "Footwork is a real strength for you. Keep the split-step habit — it's what gives you time for everything else.",
      },
      {
        skill: "Volleys",
        percentage: 50,
        drills: [
          { name: "Wall volley — backhand and forehand alternating" },
          { name: "Approach + first volley from service box" },
          { name: "Poach drill with partner" },
        ],
        coachNote:
          "Stay compact at the net. Short punch, no swing. We'll build up to aggressive net play over the next few months.",
      },
      {
        skill: "Strategy",
        percentage: 65,
        drills: [
          { name: "Point construction: rally to open-court drill" },
          { name: "Serve + 1 pattern play" },
          { name: "10-minute match footage review" },
        ],
        coachNote:
          "You're starting to see patterns on the court. Practice thinking one shot ahead — not just reacting.",
      },
    ],
    playerNotes: [
      {
        text: "Worked on serve toss on my own today. Felt much more consistent after 20 reps.",
        timestamp: "April 29, 2026 · 5:30 PM",
      },
      {
        text: "Did the cross-court forehand drill with a wall for 15 minutes. My timing is getting better.",
        timestamp: "April 25, 2026 · 7:00 PM",
      },
      {
        text: "Tried the inside-out forehand in a practice match — worked twice! Excited to keep building on it.",
        timestamp: "April 20, 2026 · 6:15 PM",
      },
    ],
    activityLog: [
      { action: "Completed serve toss isolation drill", timestamp: "2 days ago" },
      { action: "Reviewed match footage for strategy session", timestamp: "4 days ago" },
      { action: "Logged a personal note", timestamp: "4 days ago" },
      { action: "Completed forehand wall drill", timestamp: "6 days ago" },
    ],
  },
  {
    id: "sofia-martinez",
    name: "Sofia Martinez",
    memberSince: "January 2022",
    tagline:
      "Sofia is one of our top competitive players. Her mental game and consistency under pressure are exceptional.",
    overallProgress: 87,
    skills: [
      { name: "Forehand", percentage: 92 },
      { name: "Backhand", percentage: 88 },
      { name: "Serve", percentage: 85 },
      { name: "Footwork", percentage: 90 },
      { name: "Volleys", percentage: 78 },
      { name: "Strategy", percentage: 88 },
    ],
    currentFocus: {
      title: "Net Approach & Finishing at the Net",
      coachNote:
        "Sofia's baseline game is near-flawless. This month we're sharpening her net approach patterns and first-volley placement to build a more complete all-court game.",
    },
    upcomingLessons: [
      { date: "May 2, 2026", time: "8:00 AM", focus: "Approach shot selection drills" },
      { date: "May 5, 2026", time: "8:00 AM", focus: "First volley + put-away combos" },
      { date: "May 9, 2026", time: "9:00 AM", focus: "Tournament prep & match play" },
    ],
    upcomingGoals: [
      "Execute a net approach in at least 3 out of 5 extended rallies",
      "Place the first volley to the open court on 4 out of 5 attempts",
      "Hit 8 consecutive kick serves to the ad-side target box",
    ],
    milestones: [
      { description: "Won club singles tournament — Spring Open", date: "April 20, 2026" },
      { description: "Hit 85%+ first serve percentage in match", date: "April 10, 2026" },
      { description: "Mastered kick serve on ad-side", date: "March 18, 2026" },
      {
        description: "Successfully executed serve-and-volley 5× in one match",
        date: "February 28, 2026",
      },
    ],
    skillModules: [
      {
        skill: "Forehand",
        percentage: 92,
        drills: [
          { name: "High-ball forehand from defensive position" },
          { name: "Running forehand — recovery drill" },
          { name: "Forehand winner from short ball" },
        ],
        coachNote:
          "Your forehand is a weapon. Continue using it to set up the point — your inside-out pattern is unbeatable.",
      },
      {
        skill: "Backhand",
        percentage: 88,
        drills: [
          { name: "One-handed slice + net approach combo" },
          { name: "Backhand-to-backhand sustained rally" },
          { name: "Backhand winner drill — down the line" },
        ],
        coachNote:
          "Backhand is rock solid. Work on disguising the direction until the last possible moment.",
      },
      {
        skill: "Serve",
        percentage: 85,
        drills: [
          { name: "Kick serve consistency — ad-side target" },
          { name: "Wide slice serve — deuce court" },
          { name: "Serve + second shot pattern drill" },
        ],
        coachNote:
          "The kick serve is your best weapon. Focus on building a reliable serve pattern for each score situation.",
      },
      {
        skill: "Footwork",
        percentage: 90,
        drills: [
          { name: "Transition footwork — baseline to net" },
          { name: "Wide ball recovery and reset drill" },
          { name: "Defensive slide drill on clay" },
        ],
        coachNote:
          "Your footwork is exceptional. Make sure you're recovering to the right position after each attacking shot.",
      },
      {
        skill: "Volleys",
        percentage: 78,
        drills: [
          { name: "First volley from service line — placement drill" },
          { name: "Two-volley put-away sequence" },
          { name: "Half-volley pickup drill" },
        ],
        coachNote:
          "Great improvement on net confidence. Next step: reading the opponent's passing shot direction earlier.",
      },
      {
        skill: "Strategy",
        percentage: 88,
        drills: [
          { name: "Serve pattern planning for each score" },
          { name: "Situational play: 30-40 scenarios" },
          { name: "Video analysis: last tournament match review" },
        ],
        coachNote:
          "Your tactical IQ is outstanding. Keep the mental reset routine between points — it's what separates you in tight sets.",
      },
    ],
    playerNotes: [
      {
        text: "First volley placement was much better in practice today. Coach's tip about angling to the open court is clicking.",
        timestamp: "April 28, 2026 · 6:00 PM",
      },
      {
        text: "Had a tough match against Jenna at the club. Lost in three sets but learned a lot about net play under pressure.",
        timestamp: "April 22, 2026 · 8:00 PM",
      },
      {
        text: "Kick serve is feeling automatic now. Hit 8 in a row on the ad side without thinking about it.",
        timestamp: "April 16, 2026 · 5:00 PM",
      },
    ],
    activityLog: [
      { action: "Completed first-volley placement drill", timestamp: "3 days ago" },
      { action: "Logged a personal note", timestamp: "3 days ago" },
      { action: "Reviewed tournament match footage", timestamp: "5 days ago" },
      { action: "Logged match result: 6-4, 3-6, 4-6 vs Jenna L.", timestamp: "9 days ago" },
    ],
  },
  {
    id: "tyler-brooks",
    name: "Tyler Brooks",
    memberSince: "March 2026",
    tagline:
      "Tyler is brand new to the game and showing real enthusiasm. Making great strides in the fundamentals every week.",
    overallProgress: 32,
    skills: [
      { name: "Forehand", percentage: 40 },
      { name: "Backhand", percentage: 28 },
      { name: "Serve", percentage: 25 },
      { name: "Footwork", percentage: 35 },
      { name: "Volleys", percentage: 20 },
      { name: "Strategy", percentage: 22 },
    ],
    currentFocus: {
      title: "Grip, Stance & Consistent Contact",
      coachNote:
        "Tyler is focused on the eastern forehand grip and getting a repeatable swing path. Big improvements since week one — the fundamentals are clicking.",
    },
    upcomingLessons: [
      { date: "May 3, 2026", time: "11:00 AM", focus: "Eastern grip forehand + rally basics" },
      { date: "May 8, 2026", time: "11:00 AM", focus: "Ready position & split step intro" },
      { date: "May 12, 2026", time: "11:00 AM", focus: "Backhand groundstroke intro" },
    ],
    upcomingGoals: [
      "Hold the eastern forehand grip consistently throughout every rally",
      "Complete a 5-shot back-and-forth rally with the coach",
      "Practice the split step before every coach feed this week",
    ],
    milestones: [
      { description: "Completed 5-shot forehand rally with coach", date: "April 26, 2026" },
      { description: "Learned correct eastern forehand grip", date: "April 12, 2026" },
      { description: "First time hitting over the net consistently", date: "April 5, 2026" },
      { description: "Joined the program!", date: "March 15, 2026" },
    ],
    skillModules: [
      {
        skill: "Forehand",
        percentage: 40,
        drills: [
          { name: "Forehand bounce-and-hit self-feed drill" },
          { name: "Short-court mini-tennis rally" },
          { name: "Target cone forehand warm-up" },
        ],
        coachNote:
          "Great progress on the eastern grip! Focus on watching the ball all the way into the strings.",
      },
      {
        skill: "Backhand",
        percentage: 28,
        drills: [
          { name: "Two-hand backhand grip practice (slow motion)" },
          { name: "Backhand shadow swing — mirror drill" },
          { name: "Feed-and-hit backhand from mid-court" },
        ],
        coachNote:
          "We're just starting backhand work. Don't worry about power — just focus on making clean contact.",
      },
      {
        skill: "Serve",
        percentage: 25,
        drills: [
          { name: "Trophy pose + release drill" },
          { name: "Underhand serve for placement practice" },
          { name: "Continental grip familiarization" },
        ],
        coachNote:
          "Start with underhand serves to build confidence. We'll graduate to the full motion in a few weeks.",
      },
      {
        skill: "Footwork",
        percentage: 35,
        drills: [
          { name: "Ready position stance and bounce drill" },
          { name: "Side-shuffle to ball cone drill" },
          { name: "Basic split-step practice" },
        ],
        coachNote: "Stay on the balls of your feet! Good footwork makes everything else easier.",
      },
      {
        skill: "Volleys",
        percentage: 20,
        drills: [
          { name: "Continental grip volley catch drill" },
          { name: "Short-court slow-feed volley practice" },
        ],
        coachNote:
          "Volleys come later — but it's great we're introducing the grip early. No worries here.",
      },
      {
        skill: "Strategy",
        percentage: 22,
        drills: [
          { name: "Learn the court — zones and areas quiz" },
          { name: "Mini-match: keep it in play for 3 shots" },
        ],
        coachNote:
          "Just focus on keeping the ball in play for now. Court awareness will come naturally as your skills develop.",
      },
    ],
    playerNotes: [
      {
        text: "Practiced grip at home with my racket. Starting to feel more natural!",
        timestamp: "April 27, 2026 · 8:00 PM",
      },
      {
        text: "Did 10 minutes of shadow swings in the backyard. Coach said repetition is key.",
        timestamp: "April 20, 2026 · 7:00 PM",
      },
    ],
    activityLog: [
      { action: "Logged a personal note", timestamp: "3 days ago" },
      { action: "Completed forehand bounce-and-hit drill", timestamp: "5 days ago" },
      { action: "Logged a personal note", timestamp: "11 days ago" },
    ],
  },
  {
    id: "priya-kapoor",
    name: "Priya Kapoor",
    memberSince: "June 2024",
    tagline:
      "Priya has a smart, strategic game and is developing a serious two-handed backhand. Reliable and deeply dedicated.",
    overallProgress: 55,
    skills: [
      { name: "Forehand", percentage: 65 },
      { name: "Backhand", percentage: 55 },
      { name: "Serve", percentage: 48 },
      { name: "Footwork", percentage: 52 },
      { name: "Volleys", percentage: 45 },
      { name: "Strategy", percentage: 62 },
    ],
    currentFocus: {
      title: "Backhand Drive & Two-Handed Power",
      coachNote:
        "Priya's two-hander has real potential. We're working on generating more drive from the legs up — the arm strength is there, now we need the full kinetic chain.",
    },
    upcomingLessons: [
      { date: "May 4, 2026", time: "6:00 PM", focus: "Backhand drive — leg drive & rotation" },
      { date: "May 6, 2026", time: "6:00 PM", focus: "Forehand + backhand groundstroke patterns" },
      { date: "May 11, 2026", time: "6:00 PM", focus: "Serve mechanics — toss and loading" },
    ],
    upcomingGoals: [
      "Feel the leg drive firing on every two-handed backhand this week",
      "Sustain a 20-shot baseline rally with a hitting partner",
      "Bring first serve percentage up to 60% in practice sets",
    ],
    milestones: [
      {
        description: "First two-handed backhand winner in match play",
        date: "April 24, 2026",
      },
      { description: "Sustained 15-shot baseline rally in practice", date: "April 9, 2026" },
      { description: "Developed a reliable second serve", date: "March 14, 2026" },
      { description: "Competed in first club round-robin event", date: "February 8, 2026" },
    ],
    skillModules: [
      {
        skill: "Forehand",
        percentage: 65,
        drills: [
          { name: "High-bouncing topspin forehand drill" },
          { name: "Forehand from open stance — wide ball" },
          { name: "Forehand approach to net" },
        ],
        coachNote:
          "Your forehand is solid and dependable. Next step: use it more aggressively to go for winners, not just consistency.",
      },
      {
        skill: "Backhand",
        percentage: 55,
        drills: [
          { name: "Leg drive on two-hander — slow motion rep" },
          { name: "Cross-court backhand rally drill" },
          { name: "Backhand approach + first-volley combo" },
        ],
        coachNote:
          "Lead with the legs, not the arms. You'll get twice the power and it'll feel easier. Keep the video reps going.",
      },
      {
        skill: "Serve",
        percentage: 48,
        drills: [
          { name: "Flat serve placement — T and body" },
          { name: "Kick serve spin practice — slow arm speed" },
          { name: "Second serve target drill — consistency focus" },
        ],
        coachNote:
          "Your second serve is reliable — now let's make the first serve more of a weapon.",
      },
      {
        skill: "Footwork",
        percentage: 52,
        drills: [
          { name: "Cone drill — lateral agility, 4 cones" },
          { name: "Recovery to center drill after wide ball" },
          { name: "Split-step timing with coach feed" },
        ],
        coachNote:
          "Your footwork is steady but we can add more snap to the split-step. Think quick hands and feet.",
      },
      {
        skill: "Volleys",
        percentage: 45,
        drills: [
          { name: "Backhand volley punch drill" },
          { name: "Forehand volley — low ball pickup" },
          { name: "Approach + two-volley sequence" },
        ],
        coachNote:
          "Good instincts at the net. Work on shortening the backswing — volleys live and die on timing, not power.",
      },
      {
        skill: "Strategy",
        percentage: 62,
        drills: [
          { name: "Rally to open court — point construction drill" },
          { name: "Serve pattern: vary between T, body, and wide" },
          { name: "Situational play: 30-30 game from deuce" },
        ],
        coachNote:
          "Your tactical instincts are really developing. Start thinking about the pattern before you step to the baseline.",
      },
    ],
    playerNotes: [
      {
        text: "Tried the leg drive drill on the wall. I can feel the difference when the kinetic chain clicks!",
        timestamp: "April 28, 2026 · 7:30 PM",
      },
      {
        text: "Had a good hitting session with my partner. Used the cross-court backhand rally drill — 12 shots in a row!",
        timestamp: "April 23, 2026 · 6:00 PM",
      },
      {
        text: "Watching backhand video clips tonight to visualize the rotation.",
        timestamp: "April 18, 2026 · 9:00 PM",
      },
    ],
    activityLog: [
      { action: "Completed leg drive backhand drill", timestamp: "3 days ago" },
      { action: "Logged a personal note", timestamp: "3 days ago" },
      { action: "Completed cross-court rally drill", timestamp: "8 days ago" },
      { action: "Logged a personal note", timestamp: "8 days ago" },
    ],
  },
];
