export type MentionUser = {
  id: string;
  name?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
};

export type Selection = {
  start: number;
  end: number;
};

export type MentionMapKey = [number, number];

export type MentionsMap = Map<MentionMapKey, MentionUser>;
