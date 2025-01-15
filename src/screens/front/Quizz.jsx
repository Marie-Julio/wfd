import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/CardComponents';
import { Progress } from '../../components/Progress';
import { Button } from '../../components/Button';
import { CheckCircle, Timer, ArrowRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { getResource, postResource } from '../../services/api';
import {jwtDecode} from 'jwt-decode';
import AppBody from '../../components/AppBody';

const QuizInterface = () => {
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [choices, setChoices] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(100); // 30 minutes en secondes
  const [hasStarted, setHasStarted] = useState(false); // État pour savoir si le test a commencé
  const { id } = useParams();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('token');
  const decodedToken = accessToken ? jwtDecode(accessToken) : null;

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await getResource(`/qcms/${id}`);
        setQuiz(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du QCM', error);
      }

      try {
        const res = await getResource(`/qcm-questions?qcm_id=${id}`);
        setQuestions(res.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des questions', error);
      }
    };

    fetchQuizData();
  }, [id]);

  useEffect(() => {
    if (questions[currentQuestion]) {
      const fetchChoices = async () => {
        try {
          const res = await getResource(`/qcm-choices?question_id=${questions[currentQuestion].id}`);
          setChoices(res.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des choix', error);
        }
      };

      fetchChoices();
    }
  }, [questions, currentQuestion]);

  useEffect(() => {
    if (hasStarted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0) {
      handleSubmit(); // Soumettre automatiquement si le temps est écoulé
    }
  }, [hasStarted, timeLeft]);

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question) => {
      const userAnswer = selectedAnswers[question.id];
      if (userAnswer === question.correct_answer) {
        score++;
      }
    });
    return {
      score,
      percentage: (score / questions.length) * 100,
    };
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer,
    });
  };

  const handleSubmit = async () => {
    const { score, percentage } = calculateScore();
    setShowResults(true);

    try {
      await postResource('/qcm-results', {
        qcm_id: quiz.id,
        user_id: decodedToken.id,
        score: percentage,
        status: percentage >= 80 ? 'passed' : 'failed',
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi des résultats', error);
    }
  };

  if (!quiz) {
    return <div>Chargement...</div>;
  }

  return (
    <AppBody>
      <div className="max-w-9xl mx-auto p-4">
        {!hasStarted ? (
          <Card className="text-center">
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">{quiz.description}</p>
              <Button size="lg" onClick={() => setHasStarted(true)} className="bg-blue-600 text-white">
                Démarrer le test
              </Button>
            </CardContent>
          </Card>
        ) : !showResults ? (
          <>
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-center w-full">
                  <CardTitle>{quiz.title}</CardTitle>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Timer className="w-5 h-5" />
                    <span>{formatTime(timeLeft)}</span>
                  </div>
                </div>
                <Progress
                  value={(currentQuestion / questions.length) * 100}
                  className="mt-4"
                />
              </CardHeader>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="text-lg font-medium">
                    Question {currentQuestion + 1} / {questions.length}
                  </div>

                  <div className="text-xl mb-4">
                    {questions[currentQuestion]?.question_text}
                  </div>

                  <div className="space-y-3">
                    {choices.map((choice) => (
                      <Button
                        key={choice.id}
                        variant={
                          selectedAnswers[questions[currentQuestion]?.id] === choice.choice_text
                            ? 'default'
                            : 'outline'
                        }
                        className="w-full justify-start text-left h-auto py-4 px-6"
                        onClick={() =>
                          handleAnswerSelect(questions[currentQuestion]?.id, choice.choice_text)
                        }
                      >
                        {choice.choice_text}
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
                    {currentQuestion === questions.length - 1 ? (
                      <Button
                        onClick={handleSubmit}
                        disabled={Object.keys(selectedAnswers).length !== questions.length}
                      >
                        Terminer le test
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setCurrentQuestion(currentQuestion + 1)}
                        disabled={!selectedAnswers[questions[currentQuestion]?.id]}
                      >
                        Question suivante <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-6">
                <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
                <div>
                  <h2 className="text-2xl font-bold mb-2">Test terminé !</h2>
                  <div className="text-xl">
                    Votre score: {calculateScore().score}/{questions.length} (
                    {Math.round(calculateScore().percentage)}%)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppBody>
  );
};

export default QuizInterface;
