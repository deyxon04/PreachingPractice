import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, query, doc, addDoc, setDoc, getDocs, where, getDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
// @Injectable()
export class FireDatabaseService {

  private firebase = initializeApp(environment.firebaseConfig)
  private database = getFirestore(this.firebase)
  public documents: any = []

  constructor() {
    // this.subscription('sites')

  }

  /**
   * Devuelve una subscripcion a los cambios de una coleccion en firestore
   * @param collectionName Nombre de la coleccion (lista)
   * @param callBack Funcion, se ejecuta cuando detecta cambios
   * @returns void
   */
  subscription = async (collectionName: string, callBack?: Function) => {
    // Suscribirse a cambios en la colección
    const collectionRef = collection(this.database, collectionName.toLowerCase());
    // Crear una consulta para la colección (opcional)
    const q = query(collectionRef);
    return onSnapshot(q, (snapshot) => {
      // console.log(snapshot.docChanges())
      if (callBack) callBack(collectionName)
    });
  }

  async addNewDocument(collectionName: string, value: any): Promise<any> {
    try {
      return await addDoc(collection(this.database, collectionName), value);
    } catch (e) {
      console.error("Error adding document: ", e);
      return null
    }
  }

  async setDocument(collectionName: string, documentId: string, value: any): Promise<any> {
    try {
      const documentRef = doc(this.database, collectionName, documentId)
      return await setDoc(documentRef, value)
    } catch (error) {
      console.error('error setting document: ', error)
      return null
    }
  }

  async getDocuments(collectionName: string, callback?: Function): Promise<any> {
    try {
      const documents: any[] | PromiseLike<any[]> = []
      const querySnapshot = await getDocs(query(collection(this.database, collectionName)))
      querySnapshot.forEach((doc) => {
        documents.push({
          id: doc.id,
          ...doc.data()
        })
      })
      if (callback) callback(documents)
      return documents
    } catch (error) {
      console.error("Error getting documents: ", error);
      return null
    }
  }

  async getAllDocuments(collectionName: string, callback?: Function): Promise<any> {
    try {
      const documents: any[] | PromiseLike<any[]> = []
      const querySnapshot = await getDocs(collection(this.database, collectionName))
      querySnapshot.forEach((doc) => {
        documents.push({
          id: doc.id,
          ...doc.data()
        })
      })
      if (callback) return callback(documents)
      return documents
    } catch (error) {
      console.error("Error getting documents: ", error);
      return null
    }
  }


  async deleteDocument(collectionName: string, id: string): Promise<any> {
    try {
      const documentRef = doc(this.database, collectionName, id)
      return await deleteDoc(documentRef)
    } catch (error) {
      console.error("Error deleting document: ", error);
      return null
    }
  }
}
