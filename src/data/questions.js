export const QUESTION_TYPES = {
  TEXT: 'text',
  IMAGE_SELECT: 'image_select', 
  CHECKBOXES: 'checkboxes',
  LINEAR_SCALE: 'linear_scale',
  YES_NO: 'yes_no',
  COUNTRY_LIST: 'country_list',
  PHONE_NUMBER: 'phone_number',
  DATE: 'date',
  CSAT: 'csat',
};



export const surveyData = {
  title: "Advanced Survey",
  totalQuestions: 9,
  questions: [
    {
      id: 1,
      type: QUESTION_TYPES.TEXT,
      title: "What is your name?",
      description: "Please tell us your full name"
    },
    {
      id: 2,
      type: QUESTION_TYPES.IMAGE_SELECT,
      title: "Select your favorite activities",
      description: "Choose one or more activities you enjoy",
      images: [
        { id: 1, src: "/images/sports.jpg", alt: "Sports" },
        { id: 2, src: "/images/music.jpg", alt: "Music" },
        { id: 3, src: "/images/reading.jpg", alt: "Reading" },
        { id: 4, src: "/images/cooking.jpg", alt: "Cooking" },
        { id: 5, src: "/images/travel.jpg", alt: "Travel" },
        { id: 6, src: "/images/programming.jpg", alt: "Programming" },
      ]
    },
    {
      id: 3,
      type: QUESTION_TYPES.CHECKBOXES,
      title: "What are your interests?",
      description: "Select all that apply",
      options: [
        "Technology",
        "Art",
        "Sports",
        "Music",
        "Travel",
        "Cooking"
      ]
    },
    {
      id: 4,
      type: QUESTION_TYPES.LINEAR_SCALE,
      title: "Rate your satisfaction",
      description: "How satisfied are you with our service?",
      maxValue: 10,
      minValue: 1
    },
    {
      id: 5,
      type: QUESTION_TYPES.YES_NO,
      title: "Would you recommend us?",
      description: "Would you recommend our service to others?"
    },
    {
      id: 6,
      type: QUESTION_TYPES.COUNTRY_LIST,
      title: "Where are you from?",
      description: "Select your country"
    },
    {
      id: 7,
      type: QUESTION_TYPES.PHONE_NUMBER,
      title: "What is your phone number?",
      description: "Please provide your contact number"
    },
    {
      id: 8,
      type: QUESTION_TYPES.DATE,
      title: "When is your birthday?",
      description: "Please select your birth date"
    },
    {
      id: 9,
      type: QUESTION_TYPES.CSAT,
      title: "How satisfied are you?",
      description: "Rate your overall satisfaction"
    }
  ]
}; 
