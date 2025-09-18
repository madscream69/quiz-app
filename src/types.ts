export interface Question {
    id: number;
    question: string;
    options: string[];
    correct: number;
}

export interface Category {
    id: number;
    name: string;
}

export interface QuizState {
    theme: string;
    questions: Question[];
    currentQuestionIndex: number;
    answers: Record<number, number>;
    score: number;
    isLoading: boolean;
    token: string; // Новый
    categories: Category[] | null; // Новый
    error: string | null; // Новый
}