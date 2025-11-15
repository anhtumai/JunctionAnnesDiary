import {
  InterviewQuestion,
  InterviewSession,
  InterviewResponse,
  Photo,
  LegacyStory,
  PhotoCategory,
} from '../types';
import { INTERVIEW_QUESTIONS } from '../constants/data';

/**
 * Interview Engine Service
 * Manages the interview flow, question selection, and story generation
 */

export class InterviewEngine {
  /**
   * Create a new interview session for a photo
   */
  createSession(photo: Photo): InterviewSession {
    const questions = this.selectQuestionsForPhoto(photo);

    return {
      id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      photo,
      questions,
      responses: [],
      currentQuestionIndex: 0,
      status: 'in_progress',
      startedAt: new Date().toISOString(),
    };
  }

  /**
   * Select relevant questions based on photo category
   */
  private selectQuestionsForPhoto(photo: Photo): InterviewQuestion[] {
    // Start with a diverse set of question categories
    const categories = ['people', 'events', 'feelings', 'significance', 'legacy'];
    const selectedQuestions: InterviewQuestion[] = [];

    // Select one question from each category
    categories.forEach((category) => {
      const categoryQuestions = INTERVIEW_QUESTIONS.filter(
        (q) => q.category === category
      );

      if (categoryQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * categoryQuestions.length);
        selectedQuestions.push(categoryQuestions[randomIndex]);
      }
    });

    // Add a detail question if the photo has specific context
    if (photo.category) {
      const detailQuestions = INTERVIEW_QUESTIONS.filter(
        (q) => q.category === 'details'
      );
      if (detailQuestions.length > 0) {
        selectedQuestions.push(detailQuestions[0]);
      }
    }

    return selectedQuestions;
  }

  /**
   * Add a response to the interview session
   */
  addResponse(
    session: InterviewSession,
    transcript: string,
    audioUrl?: string
  ): InterviewSession {
    const currentQuestion = session.questions[session.currentQuestionIndex];

    const response: InterviewResponse = {
      questionId: currentQuestion.id,
      transcript,
      audioUrl,
      timestamp: new Date().toISOString(),
    };

    return {
      ...session,
      responses: [...session.responses, response],
      currentQuestionIndex: session.currentQuestionIndex + 1,
      status:
        session.currentQuestionIndex + 1 >= session.questions.length
          ? 'completed'
          : 'in_progress',
      completedAt:
        session.currentQuestionIndex + 1 >= session.questions.length
          ? new Date().toISOString()
          : undefined,
    };
  }

  /**
   * Get the next question in the interview
   */
  getNextQuestion(session: InterviewSession): InterviewQuestion | null {
    if (session.currentQuestionIndex >= session.questions.length) {
      return null;
    }
    return session.questions[session.currentQuestionIndex];
  }

  /**
   * Generate a legacy story from completed interview session
   */
  generateStory(session: InterviewSession): LegacyStory {
    if (session.status !== 'completed') {
      throw new Error('Cannot generate story from incomplete interview');
    }

    // Generate title based on photo and responses
    const title = this.generateTitle(session);

    // Generate narrative from responses
    const narrative = this.generateNarrative(session);

    // Calculate metadata
    const wordCount = narrative.split(/\s+/).length;
    const estimatedDuration = Math.ceil((wordCount / 150) * 60); // ~150 words per minute

    return {
      id: `story-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      photo: session.photo,
      narrative,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metadata: {
        category: session.photo.category,
        wordCount,
        duration: estimatedDuration,
        tags: this.extractTags(session),
      },
    };
  }

  /**
   * Generate a title for the story
   */
  private generateTitle(session: InterviewSession): string {
    const { photo, responses } = session;

    // Use photo description as base
    if (photo.description) {
      // Capitalize first letter and ensure it's title-like
      const desc = photo.description;
      if (desc.length < 50) {
        return desc;
      }
    }

    // Generate based on category
    const categoryTitles: Record<PhotoCategory, string[]> = {
      birthday: ['A Special Birthday', 'Birthday Celebration', 'Birthday Memories'],
      childhood: ['Growing Up', 'Childhood Days', 'Early Years'],
      business: ['My Business Journey', 'Professional Life', 'Career Milestone'],
      wedding: ['Our Wedding Day', 'The Day We Married', 'Wedding Memories'],
      holiday: ['Holiday Celebration', 'Family Holiday', 'Special Holiday'],
      family: ['Family Moments', 'Time with Family', 'Family Memories'],
      celebration: ['A Celebration', 'Special Occasion', 'Memorable Celebration'],
      milestone: ['A Milestone Moment', 'Life Achievement', 'Important Milestone'],
      other: ['A Precious Memory', 'Looking Back', 'Remembering'],
    };

    const category = photo.category || 'other';
    const titles = categoryTitles[category];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  /**
   * Generate narrative text from interview responses
   */
  private generateNarrative(session: InterviewSession): string {
    const { responses, questions, photo } = session;

    // Start with an introduction based on the photo
    let narrative = '';

    // Add context from photo
    if (photo.date) {
      const year = new Date(photo.date).getFullYear();
      narrative += `This memory takes us back to ${year}. `;
    }

    if (photo.description) {
      narrative += `${photo.description}. `;
    }

    narrative += '\n\n';

    // Combine responses into a flowing narrative
    responses.forEach((response, index) => {
      const question = questions.find((q) => q.id === response.questionId);

      // Add the response with some narrative flow
      if (response.transcript && response.transcript.length > 0) {
        // Add paragraph break between major sections
        if (index > 0 && index % 2 === 0) {
          narrative += '\n\n';
        }

        narrative += response.transcript;

        // Add proper punctuation if missing
        if (!/[.!?]$/.test(response.transcript)) {
          narrative += '. ';
        } else {
          narrative += ' ';
        }
      }
    });

    // Add a closing reflection
    narrative += '\n\nThis memory remains a precious part of my story, a moment I cherish and want to share with those I love.';

    return narrative.trim();
  }

  /**
   * Extract tags from responses for searchability
   */
  private extractTags(session: InterviewSession): string[] {
    const tags: Set<string> = new Set();

    // Add category as tag
    if (session.photo.category) {
      tags.add(session.photo.category);
    }

    // Add people mentioned
    if (session.photo.people) {
      session.photo.people.forEach((person) => tags.add(person.toLowerCase()));
    }

    // Extract common keywords from responses (simplified)
    const commonKeywords = [
      'family',
      'love',
      'happy',
      'celebration',
      'friends',
      'home',
      'special',
      'first',
      'memory',
    ];

    session.responses.forEach((response) => {
      const text = response.transcript.toLowerCase();
      commonKeywords.forEach((keyword) => {
        if (text.includes(keyword)) {
          tags.add(keyword);
        }
      });
    });

    return Array.from(tags);
  }

  /**
   * Get interview progress percentage
   */
  getProgress(session: InterviewSession): number {
    if (session.questions.length === 0) return 0;
    return (session.currentQuestionIndex / session.questions.length) * 100;
  }

  /**
   * Check if interview is complete
   */
  isComplete(session: InterviewSession): boolean {
    return session.status === 'completed';
  }
}

// Export singleton instance
export const interviewEngine = new InterviewEngine();
