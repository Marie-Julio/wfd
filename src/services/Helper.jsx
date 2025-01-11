import React, {useState} from 'react';
import moment from "moment";
import 'moment/locale/fr'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { postResource } from "./api";
import { jwtDecode } from "jwt-decode";
import CryptoJS, { AES } from 'crypto-js';
import { Navigate } from 'react-router-dom';
import he from 'he';
moment.locale('fr');




export function truncateStringAdvanced(str, maxLength, suffix = '...') {
  if (str.length <= maxLength) {
      return str;
  }
  return str.slice(0, maxLength) + suffix;
}


// Convertir une date au format YYYY-MM-DD en DD/MM/YYYY
export function formatDateForDisplay(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

export const hasAccess = (modele, allowedRoles) => {
  if (!modele || !Array.isArray(modele)) {
    onServerWarning("Les rôles de l'utilisateur ne sont pas disponibles ou ne sont pas dans le format attendu.");
    return false;
  }
  return modele.some(role => allowedRoles.includes(role.nomc));
};

// Fonction pour la gestion des roles
export const hasRole = (roles, allowedRoles) => {
  if (!roles || !Array.isArray(roles)) {
    console.warn("Les rôles de l'utilisateur ne sont pas disponibles ou ne sont pas dans le format attendu.");
    return false;
  }
  return roles.some(role => allowedRoles.includes(role));
};


export const errorMessage = (e) => {
  if (e.response.status === 500) {
    onServerError(e.response.data.message)
  }else if(e.response.status === 404) {
    onServerError(e.response.data.message)
  }else if(e.response.status === 403) {
    onServerError("Accès non autorisé.")
  }else if(e.response.status === 400) {
    onServerError(e.response.data.message)
  }else if(e.response.status === 401) {
    // redirect("/")
    onServerError("Vous n'etes pas connecte. Veuillez-vous reconnecter!")
    
  }else if(e.response.status === 403) {
    onServerError(e.response.data.message)
  }
}

const generateSecretKey = () => {
  const keyLength = 32; // 32 bytes = 256 bits (AES-256)
  const buffer = new Uint8Array(keyLength);
  crypto.getRandomValues(buffer);
  return Array.from(buffer, (byte) =>
      byte.toString(16).padStart(2, '0')
  ).join('');
};

export const dateToFRFrom = date =>{
  return moment(date).format('MMMM Do YYYY, h:mm:ss a');
}

export const dateToFr = date =>{
  
  return moment(date).format('LL');
}

export const dateToFR = date =>{
  return moment(date).format('DD/MM/YYYY')
}

export const dateToInput = date =>{
  return moment(date).format('DD-MM-YYYY')
}

export const dateToY = date =>{
  return moment(date).format('YYYY')
}

export const dateToM = date =>{
  return moment(date).format('MM')
}

export const dateToD = date =>{
  return moment(date).format('DD')
}

// Clé secrète pour le déchiffrement (doit être la même que celle utilisée pour le chiffrement)
const secretKey = import.meta.env.secretKey;

export const encryptToken = (data) => {
  const encrypted = CryptoJS.RC4.encrypt(data, secretKey).toString();
  return encrypted;
  };

export const decryptToken = (data) => {
  const bytes = CryptoJS.RC4.decrypt(data, secretKey);
  var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
  };

/**
 * PHONE DATA
 */

/** Permet de stocker les infos utilisateurs sur le telephone en json*/
export const storeData = async (key, value) => {
  try {
    await localStorage.setItem(key, value)
  } catch (e) {
    // saving error
  }
}


/** Permet de recuperer les infos utilisateurs sur le telephone*/
export const getData = async (key) => {
  try {
    const value = await localStorage.getItem(key)
    if (value !== null) {
      return value
    }
  } catch (e) {
    console.log(e)
  }
}

/** Permet de supprimer les infos utilisateurs sur le telephone*/
export const removeData = async (key) => {
  try {
    const value = await localStorage.removeItem(key)
  } catch (e) {
    console.log(e);
    // error reading value
  }
}

/**
 *  END PHONE DATA
 */


/**
 * 
 * ACCESS TOKEN  
 */

/** Permet de retrouver le token de l'utilisateur connecté */
export const getToken = async () => {
  const access_token = await getData("access_token")
  return access_token
}

/** Permet de retrouver le token de l'utilisateur connecté */
export const getRefreshToken = async () => {
  const refresh_token = await getData("refresh_token")
  //console.log("refresh_token");
  return refresh_token
}

/** Permet de retrouver le token de l'utilisateur connecté */
export const validateToken = async () => {
  const token = await getToken()
  console.log(token)
  if (typeof(token)!="undefined") {
    const tokenInfos = jwtDecode(token)
    const now = Math.floor(Date.now() / 1000)
    if (tokenInfos.exp < now) {
      // await getNewToken()
    return tokenInfos
    }else {
      return tokenInfos
    }
  }

    return false
  
}


const getNewToken = async () => {
  const refresh_token = await getRefreshToken()
  const data = {refresh_token}
   await  postResource(`token/renew`,  data ).then((res) => {
      const access_token =  res.data.token
      const refresh_token =  res.data.refresh_token
      storeData('access_token',access_token)
      storeData('refresh_token',refresh_token)
    })
  }


/**
 *  END ACCESS TOKEN 
 */



/** SERVER ERROR */

export const onServerError = description =>{
  toast.error(description, {
    position: "top-right",
    icon: "🚀",
    // theme: "dark"
      });
}

export const onServerSuccess = description =>{
   
      toast.success(description, {
        position: "top-right",
        icon: "🚀",
        // theme: "dark"
      });
  
}

export const onServerWarning = description =>{
  toast.warn(description, {
    position: "top-right",
    icon: "🚀",
    // theme: "dark"
      });
}

// fonction utilitaire qui permet de rogner l'image en fonction des coordonnées de recadrage définies par l'utilisateur avec le composant Cropper
export const getCroppedImg = (imageSrc, croppedAreaPixels) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      const { width, height } = croppedAreaPixels;
      
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(
        image,
        croppedAreaPixels.x, // Position X où commencer à couper
        croppedAreaPixels.y, // Position Y où commencer à couper
        croppedAreaPixels.width, // Largeur de la zone à couper
        croppedAreaPixels.height, // Hauteur de la zone à couper
        0, // Position X où dessiner sur le canvas
        0, // Position Y où dessiner sur le canvas
        width, // Largeur de l'image rognée
        height // Hauteur de l'image rognée
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Erreur lors de la conversion du canvas en blob.'));
          return;
        }
        const croppedImageUrl = URL.createObjectURL(blob);
        resolve(croppedImageUrl);
      }, 'image/jpeg');
    };

    image.onerror = (error) => reject(error);
  });
};

