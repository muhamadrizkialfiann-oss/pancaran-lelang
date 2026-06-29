import { collection, getDocs, addDoc, setDoc, doc, query, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Truck, InspectionBooking, NegotiationOffer, ConsignmentSubmission } from '../types';
import { INITIAL_TRUCKS } from '../data';

const TRUCKS_COLLECTION = 'trucks';
const BOOKINGS_COLLECTION = 'bookings';
const NEGOTIATIONS_COLLECTION = 'negotiations';
const CONSIGNMENTS_COLLECTION = 'consignments';

// 1. TRUCKS
export async function getTrucks(): Promise<Truck[]> {
  try {
    const querySnapshot = await getDocs(collection(db, TRUCKS_COLLECTION));
    if (querySnapshot.empty) {
      console.log('No trucks in firestore. Seeding with INITIAL_TRUCKS...');
      // Seed INITIAL_TRUCKS
      for (const truck of INITIAL_TRUCKS) {
        await setDoc(doc(db, TRUCKS_COLLECTION, truck.id), truck);
      }
      return INITIAL_TRUCKS;
    }
    
    const trucks: Truck[] = [];
    querySnapshot.forEach((docSnap) => {
      trucks.push({
        ...docSnap.data() as Truck,
        id: docSnap.id
      });
    });
    
    // Sort by lotNo or id to maintain clean catalog
    return trucks.sort((a, b) => a.lotNo.localeCompare(b.lotNo));
  } catch (error) {
    console.error('Error fetching trucks from Firestore, using initial local trucks:', error);
    return INITIAL_TRUCKS;
  }
}

export async function addTruck(truckData: Omit<Truck, 'id'> & { id?: string }): Promise<Truck> {
  const docId = truckData.id || `tr-${Date.now()}`;
  const newTruck: Truck = {
    ...truckData,
    id: docId
  };
  await setDoc(doc(db, TRUCKS_COLLECTION, docId), newTruck);
  return newTruck;
}

// 2. BOOKINGS
export async function getBookings(): Promise<InspectionBooking[]> {
  try {
    const querySnapshot = await getDocs(collection(db, BOOKINGS_COLLECTION));
    const bookings: InspectionBooking[] = [];
    querySnapshot.forEach((docSnap) => {
      bookings.push({
        ...docSnap.data() as InspectionBooking,
        id: docSnap.id
      });
    });
    return bookings;
  } catch (error) {
    console.error('Error fetching bookings from Firestore:', error);
    return [];
  }
}

export async function addBooking(booking: InspectionBooking): Promise<void> {
  await setDoc(doc(db, BOOKINGS_COLLECTION, booking.id), booking);
}

export async function deleteBooking(id: string): Promise<void> {
  await deleteDoc(doc(db, BOOKINGS_COLLECTION, id));
}

// 3. NEGOTIATIONS
export async function getNegotiations(): Promise<NegotiationOffer[]> {
  try {
    const querySnapshot = await getDocs(collection(db, NEGOTIATIONS_COLLECTION));
    const negotiations: NegotiationOffer[] = [];
    querySnapshot.forEach((docSnap) => {
      negotiations.push({
        ...docSnap.data() as NegotiationOffer,
        id: docSnap.id
      });
    });
    return negotiations;
  } catch (error) {
    console.error('Error fetching negotiations from Firestore:', error);
    return [];
  }
}

export async function addNegotiation(negotiation: NegotiationOffer): Promise<void> {
  await setDoc(doc(db, NEGOTIATIONS_COLLECTION, negotiation.id), negotiation);
}

// 4. CONSIGNMENTS
export async function getConsignments(): Promise<ConsignmentSubmission[]> {
  try {
    const querySnapshot = await getDocs(collection(db, CONSIGNMENTS_COLLECTION));
    const consignments: ConsignmentSubmission[] = [];
    querySnapshot.forEach((docSnap) => {
      consignments.push({
        ...docSnap.data() as ConsignmentSubmission,
        id: docSnap.id
      });
    });
    return consignments;
  } catch (error) {
    console.error('Error fetching consignments from Firestore:', error);
    return [];
  }
}

export async function addConsignment(consignment: ConsignmentSubmission): Promise<void> {
  await setDoc(doc(db, CONSIGNMENTS_COLLECTION, consignment.id), consignment);
}
