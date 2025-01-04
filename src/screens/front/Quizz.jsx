import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/CardComponents';
import { Progress } from '../../components/Progress';
import { Button } from '../../components/Button';
import { AlertCircle, CheckCircle, Timer, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription } from '../../components/Alert';

const QuizInterface = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes en secondes

  // Exemple de données de quiz
  const quiz = {
    title: "Test de connaissances - Recherche documentaire",
    duration: "30 minutes",
    questions: [
      {
        id: 1,
        question: "Quelle base de données est la plus adaptée pour la recherche d'articles scientifiques ?",
        options: [
          "Google Images",
          "ScienceDirect",
          "Wikipedia",
          "Instagram"
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "Qu'est-ce qu'un DOI ?",
        options: [
          "Un type de fichier",
          "Un identifiant numérique d'objet",
          "Un format d'image",
          "Un logiciel de recherche"
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "Quelle méthode est recommandée pour organiser sa bibliographie ?",
        options: [
          "Noter les références sur papier",
          "Mémoriser les références",
          "Utiliser un logiciel de gestion bibliographique",
          "Créer un document Word"
        ],
        correctAnswer: 2
      }
    ]
  };

  const calculateScore = () => {
    let score = 0;
    Object.entries(selectedAnswers).forEach(([questionId, answerIndex]) => {
      const question = quiz.questions.find(q => q.id === parseInt(questionId));
      if (question && question.correctAnswer === answerIndex) {
        score++;
      }
    });
    return {
      score,
      percentage: (score / quiz.questions.length) * 100
    };
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    });
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{quiz.title}</CardTitle>
            <div className="flex items-center gap-2 text-gray-600">
              <Timer className="w-5 h-5" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
          <Progress 
            value={(currentQuestion / quiz.questions.length) * 100} 
            className="mt-4"
          />
        </CardHeader>
      </Card>

      {!showResults ? (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="text-lg font-medium">
                Question {currentQuestion + 1} / {quiz.questions.length}
              </div>
              
              <div className="text-xl mb-4">
                {quiz.questions[currentQuestion].question}
              </div>

              <div className="space-y-3">
                {quiz.questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswers[quiz.questions[currentQuestion].id] === index 
                      ? "default" 
                      : "outline"}
                    className="w-full justify-start text-left h-auto py-4 px-6"
                    onClick={() => handleAnswerSelect(quiz.questions[currentQuestion].id, index)}
                  >
                    {option}
                  </Button>
                ))}
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                >
                  Question précédente
                </Button>
                {currentQuestion === quiz.questions.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={Object.keys(selectedAnswers).length !== quiz.questions.length}
                  >
                    Terminer le test
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                    disabled={!selectedAnswers[quiz.questions[currentQuestion].id]}
                  >
                    Question suivante <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-6">
              <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Test terminé !</h2>
                <div className="text-xl">
                  Votre score: {calculateScore().score}/{quiz.questions.length} 
                  ({Math.round(calculateScore().percentage)}%)
                </div>
              </div>

              {calculateScore().percentage < 50 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Il est recommandé de revoir le cours avant de retenter le test.
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-4 text-left mt-8">
                {quiz.questions.map((question, index) => (
                  <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-medium mb-2">
                      Question {index + 1}: {question.question}
                    </div>
                    <div className="text-sm">
                      Votre réponse: {question.options[selectedAnswers[question.id]]}
                      {selectedAnswers[question.id] === question.correctAnswer ? (
                        <span className="text-green-500 ml-2">✓ Correct</span>
                      ) : (
                        <div className="text-red-500">
                          ✗ Incorrect - La bonne réponse était: {question.options[question.correctAnswer]}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Button onClick={() => window.location.reload()}>
                  Retenter le test
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuizInterface;