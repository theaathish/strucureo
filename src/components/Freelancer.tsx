export default function Freelancer() {
  return (
    <section id="freelancer" className="mt-20 w-full max-w-6xl text-center">
      <h3 className="text-2xl font-semibold">Freelancer Platform</h3>
      <p className="text-gray-600 mt-4">
        Find jobs or hire skilled professionals on our freelancer network.
      </p>
      <a
        href="/freelancer-info"
        className="mt-6 inline-block bg-green-500 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600"
      >
        Join as Freelancer
      </a>
    </section>
  );
}
