import React, { useEffect, useState } from 'react';
import { Download, BookOpen, CheckCircle, FileText, Video, File } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/CardComponents';
import { Progress } from '../../components/Progress';
import { Button } from '../../components/Button';
import AppBody from '../../components/AppBody';
import { getResource, postResource } from '../../services/api';
import { useNavigate, useParams } from 'react-router';
import moment from 'moment';
import { jwtDecode } from 'jwt-decode';
import useAuth from '../../hooks/useAuth';

const CoursDetail = () => {
  const [course, setCourse] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [verified, setVerified] = useState({});
  const [readStatus, setReadStatus] = useState(false);
  const {id} = useParams()
  const apiUrl = import.meta.env.VITE_API_URI_BASE;
  const navigate = useNavigate()

  useAuth()

   const accessToken = localStorage.getItem("token");
      const decodedToken = accessToken ? jwtDecode(accessToken) : null;
    
      if (!accessToken) {
        navigate("/login");
      }
  

  const fetchCourseData = async () => {
    try {
      const response = await getResource(`/course-modules/${id}`);
      const docs = await getResource(`/documents?cours_id=${id}`);
      console.log("Documents : ",docs.data)
      setDocuments(docs.data) // Remplacez `3` par l'ID dynamique si nécessaire
      setCourse(response.data);
      const res = await getResource(`/user-course-progress?course_module_id=${id}`); // Remplacez `3` par l'ID dynamique si nécessaire
        console.log(res.data[0])
        if(res.data[0] != "undefined") 
          setVerified(res.data[0]);
        else setVerified(null)
        
        if(res.data[0].status === "completed") return setReadStatus(true)
      
    } catch (error) {
      console.error('Erreur lors de la récupération des données du cours:', error);
    }

  };

  const markAsRead = async () => {
    try {
      // Timestamp en millisecondes
const now = Date.now();

// Convertir en date
const date = new Date(now);

// Timestamp Unix (secondes)
const unixTimestamp = Math.floor(now / 1000);
      await postResource('/user-course-progress', {
        user_id: 3, // Remplacez par l'ID utilisateur dynamique
        course_module_id: id,
        status: 'completed',
        completion_date:  moment().format('YYYY-MM-DD'),
      });
      setReadStatus(true);
    } catch (error) {
      console.error('Erreur lors du marquage du cours comme lu:', error);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  if (!course) return <p>Chargement...</p>;

  const renderContent = () => {
    switch (course.type) {
      case 'pdf':
        return (
          <div className="flex flex-col items-start gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(course.file_path, '_blank')}
              className="flex items-center gap-2 text-white"
            >
              <FileText className="w-4 h-4" />
              Afficher le PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(course.file_path, '_blank')}
              className="flex items-center gap-2  text-white"
            >
              <Download className="w-4 h-4" />
              Télécharger le PDF
            </Button>
          </div>
        );
      case 'video':
        return (
          <div className="aspect-w-16 aspect-h-9">
            <video controls className="w-full h-full rounded-md">
              <source src={`${apiUrl}/storage/${course.file_path}`} type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          </div>
        );
      case 'text':
        return (
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: course.description }}
          />
        );
      default:
        return (
          <div className="text-gray-500 italic">
            Type de contenu non pris en charge.
          </div>
        );
    }
  };

  return (
    <AppBody bannerCour={true} course={course}>
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">{course.title}</h1>
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{course.title}</CardTitle>
              <p className="text-sm text-gray-500">{course.description}</p>
            </CardHeader>
            <CardContent>{renderContent()}</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Informations supplémentaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  <strong>Durée :</strong> {course.promotion?.duree}
                </p>
                <p>
                  <strong>Niveau :</strong> {course.promotion?.niveau}
                </p>
                {course.qcm && (
                  <div className="flex flex-col gap-3">
                    <p className="font-medium">QCM associé : {course.qcm.title}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/quizz/${course.qcm.id}`)}
                      className="flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      Accéder au QCM
                    </Button>
                  </div>
                )}
                <p>{readStatus}</p>
                <Button
                  size="sm"
                  onClick={markAsRead}
                  disabled={readStatus}
                  className={`flex items-center gap-2 ${
                    readStatus ? 'bg-green-100 text-green-600' : 'bg-[#1a5fa9] text-white'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  {readStatus ? 'Marqué comme lu' : 'Marquer comme lu'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppBody>
  );
};

export default CoursDetail;
