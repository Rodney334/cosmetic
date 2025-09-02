import { useCategoryStore } from "@/stores/categorie.store";
import { useIngredientStore } from "@/stores/ingredient.store";
import { useUserStore } from "@/stores/user.store";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

const HomePage = () => {
  const { data: session } = useSession();
  const { getAllIngredient, groupIngredientsByCategory, getIngredientQSP } =
    useIngredientStore();
  const { getAllUser, getUserById } = useUserStore();
  const { getAllCategory } = useCategoryStore();
  // console.log({ session, env: process.env.NEXTAUTH_SECRET });
  useEffect(() => {
    if (session && session.accessToken) {
      getAllIngredient(session.accessToken);
      groupIngredientsByCategory(session.accessToken);
      getUserById(session.accessToken, session.user.id);
      getAllUser(session.accessToken);
      getAllCategory(session.accessToken);
      getIngredientQSP(session.accessToken);
    }
  }, [session]);
  return (
    <div className="min-h-screen bg-[#4B352A] opacity-80 p-6 py-24">
      <div className="max-w-6xl mx-auto pt-20 space-y-10 bg-white rounded-lg w-full px-6 md:px-12 py-10">
        {/* Section 1 : Bienvenue */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl p-8 border border-blue-200">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Bienvenue Curieux Cosmétique
          </h1>
          <p className="text-gray-700 leading-relaxed text-base">
            Yorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet
            feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
            enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
            Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum
            lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in
            elementum tellus.
          </p>
        </div>

        {/* Section 2 : Vidéo */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 border border-blue-100">
          <div className="overflow-hidden rounded-lg border border-gray-300 shadow-lg">
            {/* Bande noire top */}
            <div className="bg-black h-4 w-full"></div>

            {/* Contenu vidéo */}
            {/* <div className="relative bg-black aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/Amug-gIV7ng"
                title="Calculateur Cosmétique - Cosmessence Bio"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div> */}

            {/* Bande noire bottom */}
            <div className="bg-black h-4 w-full"></div>
          </div>
        </div>

        {/* Section 3 : Texte + Bouton */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl p-8 border border-blue-100">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Some Great Title
          </h2>

          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              Yorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus. Maecenas eget condimentum velit, sit amet
              feugiat lectus. Class aptent taciti sociosqu ad litora torquent
              per conubia nostra, per inceptos himenaeos. Praesent auctor purus
              luctus enim egestas, ac scelerisque ante pulvinar. Donec ut
              rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur
              vel bibendum lorem. Morbi convallis convallis diam sit amet
              lacinia. Aliquam in elementum tellus.
            </p>
            <p>
              Curabitur tempor quis eros tempus lacinia. Nam bibendum
              pellentesque quam a convallis. Sed ut vulputate nisl. Integer in
              felis sed leo vestibulum venenatis. Suspendisse quis arcu sem.
              Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend
              magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices
              nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla
              varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis
              eleifend. Sed nec ante dictum sem condimentum ullamcorper quis
              venenatis nisl. Proin vitae facilisis nisl, ac posuere leo.
            </p>
          </div>

          <div className="mt-6 flex justify-start">
            <Link
              href={"/public/recette-create"}
              className="bg-[#4B352A] hover:bg-[#3e2d22] text-white px-6 py-3 rounded-lg font-semibold transition duration-200 cursor-pointer"
            >
              Commencer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
