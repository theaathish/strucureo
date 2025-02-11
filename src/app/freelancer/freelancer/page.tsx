"use client";
import FreelancerLayout from "../FreelancerLayout";
import { useState, useEffect } from "react";
import { getFirestore, collectionGroup, addDoc, collection, serverTimestamp, query, orderBy, onSnapshot, getDocs, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "@/firebase/firebaseConfig";
import { Job, FirebaseError } from "@/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function FreelancerDashboard() {
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser; // For applicant email
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applicationMessage, setApplicationMessage] = useState("");


  useEffect(() => {
    // Query jobs from all clients using a collectionGroup query on "jobs"
    const q = query(collectionGroup(db, "jobs"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const jobsData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          description: data.description,
          createdAt: data.createdAt,
          ref: doc.ref
        } as Job;
      });
      setJobs(jobsData);
    });
    return () => unsubscribe();
  }, [db]);

  const handleApply = async (job: Job, e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      console.error("User not logged in");
      return;
    }
    if (!job.ref) {
      console.error("Invalid job reference");
      return;
    }
    try {
      const applicantEmail = user.email;
      const applicationsRef = collection(job.ref, "applications");
      const q = query(applicationsRef, where("applicantEmail", "==", applicantEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("You have already applied for this job.");
        return;
      }

      const newApp = { applicantEmail, note: applicationMessage, createdAt: serverTimestamp() };
      // Add application to the "applications" subcollection of the job document
      await addDoc(applicationsRef, newApp);
      setApplicationMessage("");
      setSelectedJob(null);
      alert(`Application submitted for: ${job.title}`);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      console.error("Error applying:", firebaseError.message);
    }
  };

  return (
    <FreelancerLayout>
      <h2 className="text-3xl font-bold mb-6">Freelancer Dashboard</h2>
      <div className="min-h-screen bg-white text-gray-900 p-6">
        <Header />
        <section>
          <h3 className="text-2xl mb-4">Available Jobs</h3>
          <ul className="space-y-4">
            {jobs.map(job => (
              <li key={job.id} className="p-4 border border-gray-200 rounded flex justify-between items-center">
                <div>
                  <h4 className="text-xl font-semibold">{job.title}</h4>
                  <p>{job.description}</p>
                </div>
                <button
                  onClick={() => setSelectedJob(job)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Apply
                </button>
              </li>
            ))}
          </ul>
        </section>
        {selectedJob && (
          <section className="mt-8 p-4 border border-gray-300 rounded">
            <h4 className="text-2xl font-semibold mb-4">Apply for: {selectedJob.title}</h4>
            <form onSubmit={e => handleApply(selectedJob, e)} className="space-y-4">
              <textarea
                placeholder="Write your application note..."
                value={applicationMessage}
                onChange={e => setApplicationMessage(e.target.value)}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition-colors"
              >
                Submit Application
              </button>
            </form>
          </section>
        )}
        <Footer />
      </div>
    </FreelancerLayout>
  );
}
