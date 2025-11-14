export type AnswerField = `answer_item_${1|2|3|4|5|6|7|8|9}`
export type ScoreField = `${AnswerField}_score`

export interface QARecordRaw {
  question_id: string
  question_text: string
  topic: string
  answer_item_1?: string
  answer_item_2?: string
  answer_item_3?: string
  answer_item_4?: string
  answer_item_5?: string
  answer_item_6?: string
  answer_item_7?: string
  answer_item_8?: string
  answer_item_9?: string
  answer_item_1_score?: string
  answer_item_2_score?: string
  answer_item_3_score?: string
  answer_item_4_score?: string
  answer_item_5_score?: string
  answer_item_6_score?: string
  answer_item_7_score?: string
  answer_item_8_score?: string
  answer_item_9_score?: string
}

export interface AnswerItem {
  index: number
  text: string
  score: number | null
}

export interface QARecord {
  question_id: string
  question_text: string
  topic: string
  answers: AnswerItem[]
}
