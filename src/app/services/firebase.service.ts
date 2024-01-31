import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, query, doc, addDoc, setDoc, getDocs, where, getDoc, deleteDoc } from 'firebase/firestore'
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

    setTimeout(()=>{

      // this.addNewDocument('cartas', {name: 'stiven', street: 'calle 39C n 40 - 42', userId: this.user.uid})
      // this.documents = this.getDocuments('cartas', (documents: any)=>{console.log(documents)})
      // this.documents = this.getAllDocuments('cartas', (documents: any)=>{console.log(documents)})
      // this.deleteDocument('cartas', 'uno')

    },500)
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
      querySnapshot.forEach((doc)=>{
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
      querySnapshot.forEach((doc)=>{
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


  async deleteDocument(collectionName: string, documentId: string): Promise<any> {
    try {
      const documentRef = doc(this.database, collectionName, documentId)
      return await deleteDoc(documentRef)
    } catch (error) {
      console.error("Error deleting document: ", error);
      return null
    }
  }
}
