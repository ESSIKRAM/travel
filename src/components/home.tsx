import { Reviews } from "./reviews";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Voyage Découverte</h1>
          <p className="mt-2 text-blue-100">
            Découvrez les meilleures destinations et partagez vos expériences
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Bienvenue sur notre plateforme de voyage
            </h2>
            <p className="text-gray-600">
              Explorez des destinations incroyables, découvrez les avis de nos
              voyageurs et partagez vos propres expériences. Notre communauté
              vous aide à trouver les meilleurs endroits à visiter pour votre
              prochain voyage.
            </p>
          </div>

          <Reviews />
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Voyage Découverte</h3>
              <p className="text-gray-400">
                Votre compagnon de voyage depuis 2023
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-3">À propos</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Notre histoire</li>
                  <li>Équipe</li>
                  <li>Carrières</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">Destinations</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Europe</li>
                  <li>Asie</li>
                  <li>Amériques</li>
                  <li>Afrique</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">Contact</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Aide</li>
                  <li>Support</li>
                  <li>Partenariats</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© 2023 Voyage Découverte. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
