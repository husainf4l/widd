// Interface for Messi's player analysis data

export interface PlayerAnalysisClass {
  player: {
    name: string;
    jersey_number: number;
    team: string;
    position: string;
    match: string;
  };
  physical_performance: {
    distance_covered_km: number;
    high_speed_runs: number;
    sprints: number;
    top_speed_kmh: number;
    accelerations: number;
    decelerations: number;
    heat_map: string;
    work_rate_zones: {
      attacking_third: number;
      middle_third: number;
      defensive_third: number;
    };
  };
  technical_skills: {
    passes_completed: number;
    passes_attempted: number;
    pass_accuracy_percent: number;
    key_passes: number;
    crosses_attempted: number;
    cross_success_rate: number;
    shots_on_target: number;
    shots_off_target: number;
    dribbles_attempted: number;
    dribble_success_rate: number;
    touches_in_box: number;
    ball_recoveries: number;
    ball_losses: number;
  };
  tactical_positioning: {
    average_position: {
      x: number;
      y: number;
    };
    formation_role: string;
    pressing_zone: string;
    transitions: {
      defense_to_attack: number;
      attack_to_defense: number;
    };
    time_in_possession_percent: number;
    off_ball_movement_index: number;
  };
  defensive_actions: {
    tackles_attempted: number;
    tackles_successful: number;
    interceptions: number;
    blocks: number;
    clearances: number;
    ground_duels: {
      won: number;
      lost: number;
    };
    aerial_duels: {
      won: number;
      lost: number;
    };
  };
  ai_tracking_data: {
    body_orientation: string;
    spatial_awareness_score: number;
    decision_making_time_ms: number;
    pressure_rating: string;
    off_ball_runs: number;
    positional_consistency: number;
    network_links: string[];
  };
  match_events: {
    goals: number;
    assists: number;
    fouls_committed: number;
    fouls_suffered: number;
    yellow_cards: number;
    red_cards: number;
    VAR_reviews: number;
    key_build_up_involvements: number;
  };
}

// Define the interface for match details
export interface MatchDetails {
  teams: [string, string];
  score: {
    home: number;
    away: number;
  };
  time: string;
}

// Demo match details data
export const demoMatchDetails: MatchDetails = {
  teams: ["Argentina", "Saudi Arabia"],
  score: {
    home: 1,
    away: 2,
  },
  time: "90:00",
};

// Class for match details
export class MatchDetailsClass implements MatchDetails {
  teams: [string, string];
  score: { home: number; away: number };
  time: string;
  constructor(teams: [string, string], score: { home: number; away: number }, time: string) {
    this.teams = teams;
    this.score = score;
    this.time = time;
  }
}

//the interface for the player analysis data
export const PlayerAnalysis: PlayerAnalysisClass= {
  player: {
    name: "Lionel Messi",
    jersey_number: 10,
    team: "Argentina",
    position: "Attacking Midfielder",
    match: "Argentina vs Saudi Arabia - FIFA World Cup 2022"
  },
  physical_performance: {
    distance_covered_km: 9.3,
    high_speed_runs: 15,
    sprints: 8,
    top_speed_kmh: 28.5,
    accelerations: 12,
    decelerations: 10,
    heat_map: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREmxcCXe2eCRtMY-qHw0lDQ1PnGpicwv6Uag&s",
    work_rate_zones: {
      attacking_third: 60,
      middle_third: 35,
      defensive_third: 5
    }
  },
  technical_skills: {
    passes_completed: 42,
    passes_attempted: 48,
    pass_accuracy_percent: 87.5,
    key_passes: 4,
    crosses_attempted: 3,
    cross_success_rate: 66.7,
    shots_on_target: 3,
    shots_off_target: 2,
    dribbles_attempted: 6,
    dribble_success_rate: 83.3,
    touches_in_box: 7,
    ball_recoveries: 3,
    ball_losses: 5
  },
  tactical_positioning: {
    average_position: {
      x: 55,
      y: 40
    },
    formation_role: "Free Playmaker",
    pressing_zone: "Right half-space",
    transitions: {
      defense_to_attack: 6,
      attack_to_defense: 3
    },
    time_in_possession_percent: 18,
    off_ball_movement_index: 92
  },
  defensive_actions: {
    tackles_attempted: 2,
    tackles_successful: 1,
    interceptions: 1,
    blocks: 0,
    clearances: 0,
    ground_duels: {
      won: 5,
      lost: 4
    },
    aerial_duels: {
      won: 1,
      lost: 2
    }
  },
  ai_tracking_data: {
    body_orientation: "forward-facing most of the time",
    spatial_awareness_score: 9.1,
    decision_making_time_ms: 850,
    pressure_rating: "moderate",
    off_ball_runs: 11,
    positional_consistency: 95,
    network_links: ["Ángel Di María", "Julián Álvarez"]
  },
  match_events: {
    goals: 1,
    assists: 1,
    fouls_committed: 0,
    fouls_suffered: 4,
    yellow_cards: 0,
    red_cards: 0,
    VAR_reviews: 0,
    key_build_up_involvements: 3
  }
};


