import { Book, Clock} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  UserCircle,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Edit2,
  Save,
  User,
  Download,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { getResource } from "../../services/api";
import { useNavigate, useParams } from "react-router";
import { errorMessage, onServerSuccess } from "../../services/Helper";
import AppBody from "../../components/AppBody";
import { dateToFR, dateToFr, truncateStringAdvanced} from "../../services/Helper";

const Attestation = () => {
  const [isTestCollapseOpen, setIsTestCollapseOpen] = useState(false);
  const [isInscriptionsCollapseOpen, setIsInscriptionsCollapseOpen] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [testSummary, setTestSummary] = useState({});
  const [inscriptions, setInscriptions] = useState([]);
  const [info, setInfo] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const accessToken = localStorage.getItem("token");
  const decodedToken = accessToken ? jwtDecode(accessToken) : null;

  if (!accessToken) {
    navigate("/login");
  }

  const fetchTestResults = async () => {
    try {
      const resultsResponse = await getResource(`/qcm-results?user_id=${decodedToken.id}`);
      const summaryResponse = await getResource(`/qcm-results-score?user_id=${decodedToken.id}`);
      setTestResults(resultsResponse.data);
      setTestSummary(summaryResponse.data[0]);
    } catch (error) {
      errorMessage(error);
    }
  };

  const fetchInscriptions = async () => {
    try {
      const response = await getResource(`/inscription/${decodedToken.id}`);
      setInscriptions(response.data);
    } catch (error) {
      errorMessage(error);
    }
  };

  const downloadAttestationQCM = (qcmId) => {
    const url = `/attestation?id=${qcmId}`;
    getResource(url, { responseType: "blob" })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Attestation_QCM_${qcmId}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => errorMessage(error));
  };

  const downloadCertificateInscription = (inscriptionId) => {
    const url = `/certificat?id=${inscriptionId}`;
    getResource(url, { responseType: "blob" })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Certificat_Inscription_${inscriptionId}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => errorMessage(error));
  };

  useEffect(() => {
    fetchTestResults();
    fetchInscriptions();
  }, []);

  return (
    <AppBody>
    <div className="p-12 bg-[#1a5fa9] flex flex-col md:flex-row justify-between items-center text-white">
      <h1 className="text-2xl font-bold mb-4 md:mb-0">Mes Attestations & Certificats</h1>
    </div>
      <section className="items-center justify-center w-full md:m-5 ">
        <div className="max-w-7xl mx-auto text-center">
            <p className="text-base md:text-xl text-gray-600">
            Mes attestations et certificats que j'ai obtenus au cours de mon parcours académique.
            </p>
        </div>
        <div className="max-w-4xl mx-auto ">
          {/* Résultats des tests */}
          <div className="mt-6">
            <div
              onClick={() => setIsTestCollapseOpen(!isTestCollapseOpen)}
              className="flex justify-between items-center cursor-pointer bg-[#7aa3d1] p-4 rounded-lg shadow hover:bg-[#1a5fa9] hover:text-white"
            >
              <h2 className="text-lg font-bold">Résultats des Tests</h2>
              {isTestCollapseOpen ? <ChevronUp /> : <ChevronDown />}
            </div>
            {isTestCollapseOpen && (
              <div className="mt-4 bg-white shadow rounded-lg p-6">
                <p className="mb-4">
                  <strong>Nombre de tests :</strong> {testSummary.Nombre} <br />
                  <strong>Score total :</strong> {testSummary.Total}
                </p>
                <div className="space-y-4">
                  {testResults.map((result, index) => (
                    
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg shadow hover:bg-gray-100"
                    >
                      <h3 className="text-lg font-medium text-[#1a5fa9]">{result.qcm.title}</h3>
                      <p className="text-sm text-gray-500">
                      <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: result.qcm.description }}
                      /></p>
                      <p className="mt-2">
                        <strong>Score :</strong> {result.score} <br />
                        <strong>Statut :</strong> {result.status === "failed" && <span className=" font-semibold text-red-700"> Echoué </span>} {result.status === "passed" && <span className=" font-semibold text-green-700"> Réussi </span>} <br />
                        <strong>Date :</strong> {new Date(result.created_at).toLocaleDateString()}
                      </p>
                      {result.status === "passed" && <button
                        onClick={() => downloadAttestationQCM(result.cours.id)}
                        className="mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-800 text-white rounded-lg flex items-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        Télécharger Attestation
                      </button>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Inscriptions */}
          <div className="mt-6">
            <div
              onClick={() => setIsInscriptionsCollapseOpen(!isInscriptionsCollapseOpen)}
              className="flex justify-between items-center cursor-pointer bg-[#f9a04d] p-4 rounded-lg shadow hover:bg-[#eb6b11]"
            >
              <h2 className="text-lg font-bold">Inscriptions</h2>
              {isInscriptionsCollapseOpen ? <ChevronUp /> : <ChevronDown />}
            </div>
            {isInscriptionsCollapseOpen && (
              <div className="mt-4 bg-gray-300 shadow rounded-lg p-6">
                <div className="space-y-4">
                  {inscriptions.map((inscription) => (
                    <div key={inscription.id} 
                    className="relative z-2 duration-500 ">
                    <div className="relative bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-md overflow-hidden">
                        <div className="grid lg:grid-cols-12 grid-cols-1">
                            <div className="lg:col-span-4 order-1 lg:order-2 bg-indigo-600 hover:bg-orange-600 transform transition-all duration-500 hover:scale-110">
                                <div className="p-[30px] lg:text-start text-center">
                                    <span className="text-1xl font-medium text-gray-200">Débuté le</span>
                                    <h4 className="text-2xl font-semibold text-gray-200 pb-5"> {dateToFr(inscription.promotion.date_debut)}</h4>
                                    <span className="text-1xl font-medium text-red-500">Cloturé le</span>
                                    <h4 className="text-2xl font-semibold pb-5 text-red-500"> {dateToFr(inscription.promotion.date_fin)}</h4>
                                    <div className="flex items-center space-x-4 text-gray-200">  
                                      <div className=" whitespace-nowrap flex items-center">
                                        <Clock className="mr-1" />
                                        {inscription.promotion.duree}
                                      </div>
                                      <div className=" whitespace-nowrap flex items-center">
                                      <i className="text-lg uil uil-book-open pr-2"></i>
                                      {inscription.promotion.course_modules} Cours
                                      </div>
                                    </div>
                                    <div className="mt-6">
                                    </div>
                                </div>
                            </div>
    
                            <div className="lg:col-span-8 order-2 lg:order-1">
                                <div className="grid grid-cols-1 p-[30px]">
                                    <div className="group flex duration-500">
                                        <div className="transform transition-all duration-500 hover:scale-110 flex align-middle justify-center items-center size-10 mt-1 bg-indigo-600/5 group-hover:bg-indigo-600 group-hover:text-white text-indigo-600 rounded-full text-2xl shadow-sm dark:shadow-gray-800">
                                            <i className="uil uil-award"></i>
                                        </div>
                                        <div className="flex-1 ms-4">
                                            <h4 className="text-indigo-600 mb-0 text-2xl font-semibold">{inscription.promotion.nom}</h4>
                                            <p className="text-slate-400  mt-3"><div dangerouslySetInnerHTML={{
                                              __html: truncateStringAdvanced(inscription.promotion.description, 200),
                                            }}
                                            className="article-content"
                                          /></p>
                                          {inscription.valider == "Oui" && 
                                          <button
                                            onClick={() => downloadCertificateInscription(inscription.id)}
                                            className="mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-800 text-white rounded-lg flex items-center gap-2"
                                          >
                                            <Download className="w-5 h-5" />
                                            Télécharger Certificat
                                          </button>}
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                  ))}
                </div>
              </div>
            )}
          </div><br />
        </div>
      </section>
    </AppBody>
  );
};

export default Attestation;
