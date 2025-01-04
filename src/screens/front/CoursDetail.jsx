import React, { useState } from 'react';
import { Download, BookOpen, CheckCircle, Clock, FileText, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/CardComponents';
import { Progress } from '../../components/Progress';
import { Button } from '../../components/Button';
import AppBody from '../../components/AppBody';

const CoursDetail = () => {
  const [readCourses, setReadCourses] = useState([]);

  const courses = [
    {
      id: 1,
      title: "Introduction à la recherche documentaire",
      description: "Apprenez les bases de la recherche documentaire et les outils essentiels",
      duration: "2 heures",
      level: "Débutant",
      students: 245,
      modules: [
        {
          id: "m1",
          title: "Les bases de données scientifiques",
          format: "PDF",
          size: "1.2 MB"
        },
        {
          id: "m2",
          title: "Méthodologie de recherche",
          format: "PDF",
          size: "2.1 MB"
        }
      ]
    },
    {
      id: 2,
      title: "Analyse des données de recherche",
      description: "Techniques et outils pour l'analyse des données scientifiques",
      duration: "3 heures",
      level: "Intermédiaire",
      students: 180,
      modules: [
        {
          id: "m3",
          title: "Outils d'analyse statistique",
          format: "PDF",
          size: "1.8 MB"
        },
        {
          id: "m4",
          title: "Visualisation des données",
          format: "PDF",
          size: "1.5 MB"
        }
      ]
    }
  ];

  const handleMarkAsRead = (moduleId) => {
    if (!readCourses.includes(moduleId)) {
      setReadCourses([...readCourses, moduleId]);
    }
  };

  const calculateProgress = (courseModules) => {
    const totalModules = courseModules.length;
    const completedModules = courseModules.filter(module => 
      readCourses.includes(module.id)
    ).length;
    return (completedModules / totalModules) * 100;
  };

  return (
    <AppBody>
         <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Outils pour la Recherche</h1>
      
      <div className="grid gap-8">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <CardHeader className="bg-gray-50 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                  <p className="text-gray-600 text-sm">{course.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <User className="w-4 h-4" />
                    <span>{course.students}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Progress value={calculateProgress(course.modules)} className="h-2" />
                <p className="text-sm text-gray-600 mt-1">
                  Progression : {Math.round(calculateProgress(course.modules))}%
                </p>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {course.modules.map((module) => (
                  <div key={module.id} 
                       className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium">{module.title}</p>
                        <p className="text-sm text-gray-500">
                          {module.format} • {module.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {readCourses.includes(module.id) ? (
                        <div className="flex items-center gap-2 text-green-500">
                          <CheckCircle className="w-5 h-5" />
                          <span className="text-sm">Lu</span>
                        </div>
                      ) : (
                        <>
                          <Button variant="outline" size="sm" 
                              onClick={() => window.open('#', '_blank')}
                              className="flex items-center gap-2 text-white">
                            <BookOpen className="w-4 h-4" />
                            Lire
                          </Button>
                          <Button variant="outline" size="sm"
                              onClick={() => window.open('#', '_blank')}
                              className="flex items-center gap-2 text-white">
                            <Download className="w-4 h-4" />
                            Télécharger
                          </Button>
                          <Button size="sm" 
                              onClick={() => handleMarkAsRead(module.id)}
                              className="flex items-center gap-2">
                            Marquer comme lu
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </AppBody>
  );
};

export default CoursDetail;