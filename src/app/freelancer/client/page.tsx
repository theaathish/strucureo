"use client";
import FreelancerLayout from "../FreelancerLayout";
import { useState, useEffect } from "react";
// Removed unused Header import
import Footer from "@/components/Footer";
import { getFirestore, collection, setDoc, doc, query, orderBy, onSnapshot, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "@/firebase/firebaseConfig";
import { Job, Application } from "@/types";

// Simple slugify function
const slugify = (text: string) =>
  text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");

interface JobWithApplications extends Job {
  applications: Application[];
}

export default function ClientDashboard() {
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const [user, setUser] = useState(auth.currentUser); // Assumes user is logged in
  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobs, setJobs] = useState<JobWithApplications[]>([]);

  // Subscribe to current client's jobs from "clients/{email}/jobs"
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        const jobsRef = collection(db, "clients", user.email as string, "jobs");
        const q = query(jobsRef, orderBy("createdAt", "desc"));
        const unsubscribeJobs = onSnapshot(q, async (snapshot) => {
          const jobsData = await Promise.all(snapshot.docs.map(async (doc) => {
            const applicationsRef = collection(doc.ref, "applications");
            const applicationsSnapshot = await getDocs(applicationsRef);
            const applications = applicationsSnapshot.docs.map(appDoc => appDoc.data() as Application);
            
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title,
              description: data.description,
              createdAt: data.createdAt,
              ref: doc.ref,
              applications
            } as JobWithApplications;
          }));
          setJobs(jobsData);
        });
        return () => unsubscribeJobs();
      }
    });
    return () => unsubscribeAuth();
  }, [db, auth]);

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) return;
    
    try {
      const slug = slugify(jobTitle);
      const jobRef = doc(db, "clients", user.email, "jobs", slug);
      const newJob: Omit<Job, 'id'> = {
        title: jobTitle,
        description: jobDesc,
        createdAt: new Date(),
        ref: jobRef
      };
      
      await setDoc(jobRef, newJob);
      setJobs([{ id: slug, ...newJob, applications: [] }, ...jobs]);
      setJobTitle("");
      setJobDesc("");
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <FreelancerLayout>
      <h2 className="text-3xl font-bold mb-6">Client Dashboard</h2>
      <section className="mb-8">
        <h3 className="text-2xl mb-4">Post a Job</h3>
        <form onSubmit={handlePostJob} className="space-y-4">
          <input
            type="text"
            placeholder="Job Title"
            value={jobTitle}
            onChange={e => setJobTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
          <textarea
            placeholder="Job Description"
            value={jobDesc}
            onChange={e => setJobDesc(e.target.value)}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition-colors"
          >
            Post Job
          </button>
        </form>
        <p className="mt-2 text-sm text-gray-600">Your jobs will be listed below.</p>
      </section>
      <section>
        <h3 className="text-2xl mb-4">Your Jobs & Applications</h3>
        <ul className="space-y-4">
          {jobs.map(job => (
            <li key={job.id} className="p-4 border border-gray-200 rounded">
              <h4 className="text-xl font-semibold">{job.title}</h4>
              <p>{job.description}</p>
              <h5 className="text-lg font-semibold mt-4">Applications:</h5>
              <ul className="space-y-2">
                {job.applications?.map((app: Application, index: number) => (
                  <li key={index} className="p-2 border border-gray-300 rounded">
                    <p><strong>Email:</strong> {app.applicantEmail}</p>
                    <p><strong>Note:</strong> {app.note}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
      <Footer />
    </FreelancerLayout>
  );
}
