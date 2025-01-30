import { useEffect, useState } from "react";
import AppBody from "../../components/AppBody";
import { getResource } from "../../services/api";
import Project from "../../components/Project";

const Promotion = () => {
    
    const [projects, setProjects] = useState([]);
      
    const _init_ = () => {
      getResource("/projets").then((res) => {
          console.log(res.data)
          setProjects(res.data)
      }).catch(e => {
          errorMessage(e)
        })

  }

  useEffect(() => {
      _init_()
  }, [])

    return ( 
    <AppBody>
      <div className=" bg-[#daeff9] flex flex-col md:flex-row justify-between items-center">
        
        <div className="container mx-auto px-4 pt-10 md:pt-0">
          <div className="max-w-7xl mx-auto mb-12 md:m-10">
          
    
          <div className="p-10 bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-md">
      <section className="mb-12">
        <h1 className=" uppercase transform transition-all duration-500 hover:scale-110 text-3xl font-bold text-center text-gray-800 mb-6">
        <span className="after:absolute after:end-0  after:start-0  after:bottom-1 after:lg:h-3 after:h-2 after:w-auto after:rounded-md
         after:bg-[#1a5fa9]/30 relative font-semibold">Nos projets</span>
         : Engagement pour un développement communautaire durable
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Dans un monde en constante évolution, il est essentiel de repenser la manière dont le développement est conçu et mis en œuvre. Trop souvent, les projets sont imposés de l'extérieur, sans tenir compte des réalités locales ou des aspirations des communautés concernées. C'est pourquoi nous avons fait le choix de privilégier une approche participative, où les bénéficiaires sont au cœur de chaque initiative.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Nos projets participatifs sont conçus avec les bénéficiaires, en suivant de près les besoins réels identifiés par ceux qui en feront directement l'expérience. Ce processus inclusif garantit que chaque projet répond véritablement aux attentes de la communauté, en prenant en compte ses particularités, ses défis, mais aussi ses ressources et ses capacités.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Être acteur de son propre développement, c'est avant tout une question d'autonomisation. Nous croyons fermement que la clé de tout changement durable réside dans la capacité de chaque individu à participer activement à l'élaboration des solutions qui le concernent. Cela permet de renforcer les liens sociaux et de favoriser un climat de solidarité, propice à la prospérité collective.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4"><span className="after:absolute after:end-0  after:start-0  after:bottom-1 after:lg:h-3 after:h-2 after:w-auto after:rounded-md after:bg-[#1a5fa9]/30 relative font-semibold">Nos valeurs fondamentales</span></h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Notre engagement ne s'arrête pas simplement à la mise en place de projets. Nous restons constamment à l'écoute de notre communauté, dans un souci de compréhension et d'adaptation continue. C'est ainsi que nous nous prévoyons que nos actions sont en phase avec les besoins évolutifs des populations et que chaque bénéficiaire se sent véritablement impliqué.
        </p>
        <ul className="list-disc pl-8 space-y-2 text-lg text-gray-700 mb-4">
          <li>L'humanité : Agir dans le respect de la dignité de chaque personne.</li>
          <li>La solidarité : Travailler ensemble pour construire un avenir commun.</li>
          <li>La justice sociale : Promouvoir l'égalité des chances sans discrimination.</li>
          <li>La cohésion sociale : Favoriser l'unité et la paix au sein des communautés.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        <span className="after:absolute after:end-0  after:start-0  after:bottom-1 after:lg:h-3 after:h-2 after:w-auto after:rounded-md after:bg-[#1a5fa9]/30 relative font-semibold">Un développement inclusif, équitable et durable</span>
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Nos projets ne sont pas de simples interventions ponctuelles. Ils sont le reflet d'un engagement profond, celui de contribuer à un développement inclusif, équitable et durable. En tant qu'acteurs du changement, nous ne nous contentons pas de fournir des solutions ; nous visons à transformer les mentalités, à redonner aux communautés les clés de leur propre avenir, dans le respect des valeurs humaines et sociales.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Ainsi, grâce à nos projets participatifs, nous affirmons notre conviction : le développement durable qui ne peut commencer que par l'implication de chacun, dans un environnement d'écoute, de solidarité, de justice sociale et de cohésion sociale.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">
        <span className="after:absolute after:end-0  after:start-0  after:bottom-1 after:lg:h-3 after:h-2 after:w-auto after:rounded-md after:bg-[#1a5fa9]/30 relative font-semibold">Découvrez chacun de nos projets</span>
        </h2>
        <p className="text-lg text-gray-700 text-center">
          Découvrez ici les projets qui illustrent notre engagement envers un développement durable et communautaire.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <Project projects={projects}/>
        </div>
      </section>
            </div>
        </div>
      </div>
    </div>
    </AppBody>
    );
}
 
export default Promotion;