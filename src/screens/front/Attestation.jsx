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
      const response = await getResource(`/inscriptions?user_id=${decodedToken.id}`);
      setInscriptions(response.data);
    } catch (error) {
      errorMessage(error);
    }
  };

  const downloadAttestationQCM = (qcmId) => {
    const url = `/attestation?id=${2}`;
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
      <section className="items-center justify-center min-h-screen w-full md:m-5">
        <div className="max-w-4xl mx-auto bg-white shadow-xl overflow-hidden">
          {/* Résultats des tests */}
          <div className="mt-6">
            <div
              onClick={() => setIsTestCollapseOpen(!isTestCollapseOpen)}
              className="flex justify-between items-center cursor-pointer bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200"
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
                      <h3 className="text-lg font-medium text-blue-600">{result.qcm.title}</h3>
                      <p className="text-sm text-gray-500">{result.qcm.description}</p>
                      <p className="mt-2">
                        <strong>Score :</strong> {result.score} <br />
                        <strong>Status :</strong> {result.status} <br />
                        <strong>Date :</strong> {new Date(result.created_at).toLocaleDateString()}
                      </p>
                      <button
                        onClick={() => downloadAttestationQCM(result.cours.id)}
                        className="mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-800 text-white rounded-lg flex items-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        Télécharger Attestation
                      </button>
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
              className="flex justify-between items-center cursor-pointer bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200"
            >
              <h2 className="text-lg font-bold">Inscriptions</h2>
              {isInscriptionsCollapseOpen ? <ChevronUp /> : <ChevronDown />}
            </div>
            {isInscriptionsCollapseOpen && (
              <div className="mt-4 bg-white shadow rounded-lg p-6">
                <div className="space-y-4">
                  {inscriptions.map((inscription) => (
                    <div
                      key={inscription.id}
                      className="p-4 bg-gray-50 rounded-lg shadow hover:bg-gray-100"
                    >
                      <h3 className="text-lg font-medium text-blue-600">
                        {inscription.promotion.nom}
                      </h3>
                      <p className="mt-2">
                        <strong>Année :</strong> {inscription.annee} <br />
                        <strong>Status :</strong> {inscription.statut} <br />
                        <strong>Date :</strong>{" "}
                        {new Date(inscription.created_at).toLocaleDateString()}
                      </p>
                      <button
                        onClick={() => downloadCertificateInscription(inscription.id)}
                        className="mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-800 text-white rounded-lg flex items-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        Télécharger Certificat
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </AppBody>
  );
};

export default Attestation;
