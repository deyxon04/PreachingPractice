import { Injectable, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, query, doc, addDoc, setDoc, getDocs, where, getDoc, deleteDoc, onSnapshot, Unsubscribe } from 'firebase/firestore'
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// @Injectable()
export class FireDatabaseService implements OnDestroy {

  /** Variables de firebase */
  private firebase = initializeApp(environment.firebaseConfig)
  private database = getFirestore(this.firebase)
  
  /** Objetos de contenido */
  private collections$: any = {}
  private collections: any = {}
  
  /** Array de subscripciones */
  private subs: Array<any> = []
  
  constructor() {

  }

  /** Siclo de vida */
  ngOnDestroy(): void {
    this.subs.forEach(item => item.Unsubscribe())
  }

  /**
   * Crea una nueva coleccion en la base de datos si no existe y devuelve un objeto observable de dicha coleccion
   * @param collectionName collection name
   * @returns Objeto observable para suscripcion
   */
  getCollection(collectionName: string): Observable<any> {
    if (!this.collections[collectionName]) this.subscriptionCreate(collectionName)
    return this.collections[collectionName]
  }

  /**
   * Agrega un nuevo Subject al array collections$, un nuevo observable al array collections y agrega la subscripcion de la coleccion al array subs
   * @param collectionName collection name
   */
  subscriptionCreate(collectionName: string): void {
    this.collections$[collectionName] = new Subject<any>
    this.collections[collectionName] = this.collections$[collectionName].asObservable()
    this.subs.push(this.subscription(collectionName, () => { this.updateCollection(collectionName) }))
  }

  /**
   * Publica el cambio del contenido de la coleccion
   * @param collectionName collection name
   */
  async updateCollection(collectionName: string): Promise<void> {
    this.collections$[collectionName].next(await this.getAllDocuments(collectionName))
  }

  /**
   * Devuelve una subscripcion a los cambios de una coleccion en firestore
   * @param collectionName Nombre de la coleccion (lista)
   * @param callBack Funcion, se ejecuta cuando detecta cambios
   * @returns void
   */
  subscription = async (collectionName: string, callBack: Function) => {
    const collectionRef = collection(this.database, collectionName.toLowerCase());
    return onSnapshot(collectionRef, (snapshot) => {
      if (callBack) callBack(collectionName)
    })
  }

  /**
   * Crea un nuevo documento noSQL de firestore y lo almacena en la nube
   * @param collectionName nombre de coleccion
   * @param value {} datos del documento
   * @returns la referencia de firestore al documento creado
   */
  async addNewDocument(collectionName: string, value: any): Promise<any> {
    try {
      return await addDoc(collection(this.database, collectionName), value);
    } catch (e) {
      console.error("Error adding document: ", e);
      return null
    }
  }

  /**
   * Reescribe un documento noSQL de firestore o lo crea como nuevo si no existe 
   * @param collectionName nombre de coleccion
   * @param documentId id del documento
   * @param value datos del documento
   * @returns referencia de firestore al documento modificado
   */
  async setDocument(collectionName: string, documentId: string, value: any): Promise<any> {
    try {
      const documentRef = doc(this.database, collectionName, documentId)
      return await setDoc(documentRef, value)
    } catch (error) {
      console.error('error setting document: ', error)
      return null
    }
  }

  /**
   * Obtiene los documentos de la coleccion dada
   * @param collectionName nombre de coleccion
   * @returns [] todos los documentos de la coleccion
   */
  
  async getAllDocuments(collectionName: string): Promise<any> {
    try {
      const documents: any[] | PromiseLike<any[]> = []
      const querySnapshot = await getDocs(collection(this.database, collectionName))
      querySnapshot.forEach((doc) => {
        documents.push({
          id: doc.id,
          ...doc.data()
        })
      })
      return documents
    } catch (error) {
      console.error("Error getting documents: ", error);
      return null
    }
  }


  /**
   * Elimina un documento de la base de datos
   * @param collectionName nombre de coleccion
   * @param id id del documento
   * @returns referencia al documento de firestore eliminado
   */
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
