"use client";
import FreelancerLayout from "../FreelancerLayout";
import { useState, useEffect } from "react";
import { getFirestore, collection, setDoc, doc, query, orderBy, onSnapshot, getDocs, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "@/firebase/firebaseConfig";
import { Job, Application } from "@/types";
import { XCircleIcon } from '@heroicons/react/24/solid';

// Simple slugify function
const slugify = (text: string) =>
  text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");

// Extend Job interface with optional company field
interface ExtendedJob extends Job {
  company?: string;
}

interface JobWithApplications extends ExtendedJob {
  applications: Application[];
}

export default function ClientDashboard() {
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const [user, setUser] = useState(auth.currentUser);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  // Jobs posted from this component (company field stored on each job)
  const [jobs, setJobs] = useState<JobWithApplications[]>([]);
  const [filterText, setFilterText] = useState("");
  // For job post modal
  const [showJobModal, setShowJobModal] = useState(false);
  // Selected job for details modal
  const [selectedJob, setSelectedJob] = useState<JobWithApplications | null>(null);
  // Company details (stored in separate "clientsData" document)
  const [companyDetails, setCompanyDetails] = useState("");
  const [companyLocked, setCompanyLocked] = useState(false);

  // Fetch auth and subscribe to jobs
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        // Subscribe to jobs under clients/{email}/jobs
        const jobsRef = collection(db, "clients", currentUser.email, "jobs");
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
              company: data.company,
              createdAt: data.createdAt,
              ref: doc.ref,
              applications
            } as JobWithApplications;
          }));
          setJobs(jobsData);
        });

        // Fetch company details safely using getDoc
        (async () => {
          if (currentUser.email) {
            const companyDocRef = doc(db, "clientsData", currentUser.email);
            const docSnap = await getDoc(companyDocRef);
            if (docSnap.exists()) {
              setCompanyDetails(docSnap.data().companyDetails);
              setCompanyLocked(true);
            }
          }
        })();

        return () => unsubscribeJobs();
      }
    });
    return () => unsubscribeAuth();
  }, [db, auth]);

  // Handle posting a new job
  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) return;
    try {
      const slug = slugify(jobTitle);
      const jobRef = doc(db, "clients", user.email, "jobs", slug);
      const newJob: Omit<ExtendedJob, 'id'> = {
        title: jobTitle,
        description: jobDesc,
        company: companyDetails, // Use company details from right side form
        createdAt: new Date(),
        ref: jobRef
      };
      await setDoc(jobRef, newJob);
      setJobs([{ id: slug, ...newJob, applications: [] }, ...jobs]);
      setJobTitle("");
      setJobDesc("");
      setShowJobModal(false);
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  // Handle saving company details
  const handleSaveCompanyDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email || !companyDetails) return;
    try {
      // Store company details in a separate collection "clientsData" using user email as doc id
      await setDoc(doc(db, "clientsData", user.email), { companyDetails, createdAt: new Date() });
      setCompanyLocked(true);
    } catch (error) {
      console.error("Error saving company details:", error);
    }
  };

  // Filter jobs client-side by title or company
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(filterText.toLowerCase()) ||
    (job.company && job.company.toLowerCase().includes(filterText.toLowerCase()))
  );

  return (
    <FreelancerLayout>
      <h2 className="text-3xl font-bold mb-6">Client Dashboard</h2>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Jobs, Application Chart, and Post List */}
        <div className="flex-1">
          <section className="mb-6">
            <input
              type="text"
              placeholder="Filter jobs by title or company..."
              value={filterText}
              onChange={e => setFilterText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
            />
          </section>

          {/* Application Chart: Simple chart showing total applications per job */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold">Applications Chart</h3>
            <div className="space-y-2 mt-2">
              {jobs.map(job => (
                <div key={job.id} className="flex items-center">
                  <span className="w-1/3 text-sm">{job.title}</span>
                  <div className="w-2/3 bg-gray-200 h-2 rounded relative">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{ width: `${Math.min(job.applications.length * 10, 100)}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs text-gray-600">{job.applications.length}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Post List */}
          <section>
            <h3 className="text-2xl mb-4">Your Jobs</h3>
            <ul className="space-y-4">
              {filteredJobs.map(job => (
                <li
                  key={job.id}
                  className="p-4 border border-gray-200 rounded hover:shadow cursor-pointer"
                  onClick={() => setSelectedJob(job)}
                >
                  <h4 className="text-xl font-semibold">{job.title}</h4>
                  <p className="text-sm text-gray-500">Applications: {job.applications.length}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Floating Post Job Button */}
          <button
            onClick={() => setShowJobModal(true)}
            className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
          >
            Post Job
          </button>
        </div>

        {/* Right Column: Company Details */}
        <div className="w-full md:w-1/3 p-4 border border-gray-200 rounded h-fit">
          <h3 className="text-2xl font-semibold mb-4">Company Details</h3>
          <form onSubmit={handleSaveCompanyDetails} className="space-y-4">
            <input
              type="text"
              placeholder="Enter your Company Details"
              value={companyDetails}
              onChange={e => setCompanyDetails(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              disabled={companyLocked}
              required
            />
            {!companyLocked && (
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-colors"
              >
                Save Company Details
              </button>
            )}
            {companyLocked && (
              <p className="text-green-600 text-sm">Company details saved and locked.</p>
            )}
          </form>
        </div>
      </div>

      {/* Modal for Posting a Job */}
      {showJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
            <button
              onClick={() => setShowJobModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <XCircleIcon className="h-6 w-6" />
            </button>
            <h4 className="text-2xl font-bold mb-4">Post a Job</h4>
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
                Submit Job
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Job Details and Applications */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <XCircleIcon className="h-6 w-6" />
            </button>
            <h4 className="text-2xl font-bold mb-4">{selectedJob.title}</h4>
            <p className="text-sm text-gray-500 mb-1">
              Company: {selectedJob.company ?? "N/A"}
            </p>
            <p className="mb-4">{selectedJob.description}</p>
            <div className="mb-4">
              <h5 className="font-semibold">Applications ({selectedJob.applications.length}):</h5>
              <ul className="mt-2 space-y-2 max-h-60 overflow-y-auto border-t pt-2">
                {selectedJob.applications.map((app, index) => (
                  <li key={index} className="text-sm p-2 border border-gray-200 rounded">
                    <p><strong>Email:</strong> {app.applicantEmail}</p>
                    <p><strong>Note:</strong> {app.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </FreelancerLayout>
  );
}
