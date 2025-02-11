export default function Contact() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg mt-50">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/contact-hero.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-4">
          <h2 className="text-4xl font-bold text-white drop-shadow-lg">Get In Touch</h2>
          <p className="mt-4 text-lg text-white drop-shadow-lg">
            We’d love to hear from you. Let’s work together!
          </p>
        </div>
      </section>

      {/* Details Section */}
      <section className="mt-10 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Map Card */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <div className="p-4 bg-green-50">
              <h4 className="text-2xl font-semibold text-green-700">Our Location</h4>
              <p className="mt-2 text-gray-600">Visit us at our office or drop by for a chat.</p>
            </div>
            <div className="w-full h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086426790843!2d-122.40116848468566!3d37.78899657975679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064c8a99d3b%3A0x8c65d63ad8a2bb45!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1623078289053!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Our Location"
              ></iframe>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <div className="p-4 bg-green-50">
              <h4 className="text-2xl font-semibold text-green-700">Send Us a Message</h4>
              <p className="mt-2 text-gray-600">Have a question or suggestion? Fill out the form below.</p>
            </div>
            <div className="relative p-8 bg-white">
              <form
                action="https://script.google.com/macros/s/EXAMPLE/exec"
                method="POST"
                className="space-y-4"
              >
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your Email"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <textarea
                  name="message"
                  required
                  placeholder="Your Message"
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
